'use client';

import {useEffect, useRef, useState, type FormEvent} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Banner} from '@astryxdesign/core/Banner';
import {FormLayout} from '@astryxdesign/core/FormLayout';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {MetadataList, MetadataListItem} from '@astryxdesign/core/MetadataList';
import {SectionShell} from './SectionShell';
import {StayFields} from './StayFields';
import {useStay, type Stay} from './StayProvider';
import {useToday} from './useToday';
import {roomById} from './lib/data';
import {formatLongDate} from './lib/dates';
import {formatGBP, quoteStay} from './lib/rates';
import {
  EMPTY_CONTACT,
  FIELD_ORDER,
  REQUESTS_MAX,
  arrivalOptions,
  hasErrors,
  validateBooking,
  type ContactDraft,
} from './lib/booking';
import styles from './saltmarsh.module.css';

type Sent = {stay: Stay; contact: ContactDraft; total: number};

function errorStatus(message: string | undefined) {
  return message ? ({type: 'error', message} as const) : undefined;
}

export function BookingRequest() {
  const {stay} = useStay();
  const today = useToday();
  const [contact, setContact] = useState<ContactDraft>(EMPTY_CONTACT);
  const [showErrors, setShowErrors] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [sent, setSent] = useState<Sent | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  const errors = showErrors && today ? validateBooking(stay, contact, today) : {};
  const errorCount = Object.keys(errors).length;
  const quote = quoteStay(stay);
  const room = roomById(stay.roomId);

  function set<K extends keyof ContactDraft>(key: K, value: ContactDraft[K]) {
    setContact(c => ({...c, [key]: value}));
  }

  useEffect(() => {
    if (attempt === 0) return;
    const firstBad = FIELD_ORDER.find(k => k in errors);
    if (!firstBad) return;
    const field = formRef.current?.querySelector<HTMLElement>(`[data-field="${firstBad}"]`);
    const control =
      field?.querySelector<HTMLElement>('input:not([type="hidden"]):not([disabled]), textarea') ??
      field?.querySelector<HTMLElement>('button, [tabindex="0"]');
    control?.focus();
    // Only re-run on a new submit attempt.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt]);

  useEffect(() => {
    if (sent) doneRef.current?.focus();
  }, [sent]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!today) return;
    setShowErrors(true);
    if (hasErrors(validateBooking(stay, contact, today))) {
      setAttempt(a => a + 1);
      return;
    }
    setSent({stay, contact, total: quote.total});
  }

  function reset() {
    setContact(EMPTY_CONTACT);
    setShowErrors(false);
    setSent(null);
    window.setTimeout(() => document.getElementById('book-form-heading')?.focus(), 0);
  }

  return (
    <SectionShell
      id="book"
      tone="glass"
      eyebrow="Request a stay"
      title="Ask for your room"
      lead="Your room, dates and guests carry over from the search and rate calculator. This is a demonstration: nothing is booked or charged, and nothing you type leaves this page.">
      <Card padding={6} elevation="low" className={styles.bookCard}>
        {sent ? (
          <VStack gap={5}>
            <Heading level={3} ref={doneRef} tabIndex={-1} className={styles.cardHeading}>
              Demo request complete
            </Heading>
            <Banner
              status="success"
              title="Nothing was booked, sent or charged"
              description="The Saltmarsh is a fictional hotel. Your answers stayed in this browser tab and are cleared when you start again or leave the page."
            />
            <MetadataList columns="multi">
              <MetadataListItem label="Room">{roomById(sent.stay.roomId)?.name}</MetadataListItem>
              <MetadataListItem label="Check-in">{formatLongDate(sent.stay.checkIn)}</MetadataListItem>
              <MetadataListItem label="Check-out">{formatLongDate(sent.stay.checkOut)}</MetadataListItem>
              <MetadataListItem label="Guests">{sent.stay.guests}</MetadataListItem>
              <MetadataListItem label="Name">{sent.contact.name.trim()}</MetadataListItem>
              <MetadataListItem label="Sample total">{formatGBP(sent.total)}</MetadataListItem>
            </MetadataList>
            <Text as="p" color="secondary">
              On a real hotel site, this is where the front desk would confirm by email. No one will contact you.
            </Text>
            <HStack>
              <Button label="Start another request" variant="primary" onClick={reset} />
            </HStack>
          </VStack>
        ) : (
          <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby="book-form-heading">
            <VStack gap={6}>
              <VStack gap={1}>
                <Heading level={3} id="book-form-heading" tabIndex={-1} className={styles.cardHeading}>
                  Your stay request
                </Heading>
                <Text type="supporting" color="secondary" as="p">
                  All fields are required unless marked optional. Use made-up details.
                </Text>
              </VStack>
              {showErrors && errorCount > 0 ? (
                <p className={styles.formError} role="alert">
                  {errorCount === 1 ? 'One field needs attention.' : `${errorCount} fields need attention.`}
                </p>
              ) : null}
              <FormLayout defaultOptionality="required">
                <div className={styles.bookGrid}>
                  <VStack gap={5}>
                    <StayFields idPrefix="book" errors={errors} />
                    {room && quote.ok ? (
                      <p className={styles.bookSummary}>
                        {room.name}, {quote.nights.length} {quote.nights.length === 1 ? 'night' : 'nights'}: sample total{' '}
                        <strong>{formatGBP(quote.total)}</strong>
                        {stay.breakfast ? ' with breakfast' : ''}.
                      </p>
                    ) : null}
                  </VStack>
                  <VStack gap={5}>
                    <div data-field="name">
                      <TextInput
                        label="Full name"
                        autoComplete="off"
                        value={contact.name}
                        onChange={v => set('name', v)}
                        status={errorStatus(errors.name)}
                        statusVariant="detached"
                        width="100%"
                      />
                    </div>
                    <div data-field="email">
                      <TextInput
                        label="Email"
                        type="email"
                        autoComplete="off"
                        placeholder="name@example.com"
                        value={contact.email}
                        onChange={v => set('email', v)}
                        status={errorStatus(errors.email)}
                        statusVariant="detached"
                        width="100%"
                      />
                    </div>
                    <div data-field="phone">
                      <TextInput
                        label="Phone"
                        type="tel"
                        isOptional
                        autoComplete="off"
                        placeholder="555 0100"
                        value={contact.phone}
                        onChange={v => set('phone', v)}
                        status={errorStatus(errors.phone)}
                        statusVariant="detached"
                        width="100%"
                      />
                    </div>
                    <div data-field="arrival">
                      <RadioList label="Arrival time" value={contact.arrival} onChange={v => set('arrival', v)} status={errorStatus(errors.arrival)}>
                        {arrivalOptions.map(o => (
                          <RadioListItem key={o.value} value={o.value} label={o.label} />
                        ))}
                      </RadioList>
                    </div>
                    <div data-field="requests">
                      <TextArea
                        label="Requests"
                        isOptional
                        rows={3}
                        maxLength={REQUESTS_MAX}
                        placeholder="For example: a cot, an early breakfast or a quiet room."
                        value={contact.requests}
                        onChange={v => set('requests', v)}
                        status={errorStatus(errors.requests)}
                        statusVariant="detached"
                        width="100%"
                      />
                    </div>
                    <div data-field="acknowledge">
                      <CheckboxInput
                        label="I understand this is a demo and nothing will be booked or charged"
                        value={contact.acknowledge}
                        onChange={v => set('acknowledge', v)}
                        status={errors.acknowledge ? {type: 'error', message: errors.acknowledge} : undefined}
                      />
                    </div>
                  </VStack>
                </div>
              </FormLayout>
              <HStack gap={3} wrap="wrap" vAlign="center">
                <Button type="submit" variant="primary" size="lg" label="Send demo request" />
                <Text type="supporting" color="secondary">
                  Demo only: nothing is booked, sent or charged.
                </Text>
              </HStack>
            </VStack>
          </form>
        )}
      </Card>
    </SectionShell>
  );
}
