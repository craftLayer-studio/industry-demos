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
import {DateInput} from '@astryxdesign/core/DateInput';
import type {ISODateString} from '@astryxdesign/core/Calendar';
import {Selector} from '@astryxdesign/core/Selector';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {MetadataList, MetadataListItem} from '@astryxdesign/core/MetadataList';
import {SectionShell} from './SectionShell';
import {useToday} from './useToday';
import {formatLongDate, localDateToISO} from './lib/dates';
import {
  EMPTY_VIEWING,
  FIELD_ORDER,
  MESSAGE_MAX,
  guestOptions,
  hasErrors,
  isViewingDay,
  slotOptions,
  validateViewing,
  viewingWindow,
  type ViewingDraft,
} from './lib/viewing';
import styles from './hollin.module.css';

function errorStatus(message: string | undefined) {
  return message ? ({type: 'error', message} as const) : undefined;
}

// DateInput constraints return true for ALLOWED dates.
const viewingDayConstraint = [(date: Date) => isViewingDay(localDateToISO(date))];

export function ViewingRequest() {
  const today = useToday();
  const [draft, setDraft] = useState<ViewingDraft>(EMPTY_VIEWING);
  const [showErrors, setShowErrors] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [sent, setSent] = useState<ViewingDraft | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  const errors = showErrors && today ? validateViewing(draft, today) : {};
  const errorCount = Object.keys(errors).length;
  const window_ = today ? viewingWindow(today) : null;

  function set<K extends keyof ViewingDraft>(key: K, value: ViewingDraft[K]) {
    setDraft(d => ({...d, [key]: value}));
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
    if (hasErrors(validateViewing(draft, today))) {
      setAttempt(a => a + 1);
      return;
    }
    setSent(draft);
  }

  function reset() {
    setDraft(EMPTY_VIEWING);
    setShowErrors(false);
    setSent(null);
    window.setTimeout(() => document.getElementById('viewing-form-heading')?.focus(), 0);
  }

  return (
    <SectionShell
      id="viewing"
      tone="paper"
      eyebrow="Come and see it"
      title="Request a viewing"
      lead="Viewings in this sample setup run on Tuesdays, Thursdays and Saturdays. This is a demonstration: nothing is booked, and nothing you type leaves this page.">
      <Card padding={6} elevation="low" className={styles.formCard}>
        {sent ? (
          <VStack gap={5}>
            <Heading level={3} ref={doneRef} tabIndex={-1} className={styles.cardHeading}>
              Demo request complete
            </Heading>
            <Banner
              status="success"
              title="Nothing was booked or sent"
              description="Hollin Barn is a fictional venue. Your answers stayed in this browser tab and are cleared when you start again or leave the page."
            />
            <MetadataList columns="multi">
              <MetadataListItem label="Name">{sent.name.trim()}</MetadataListItem>
              {sent.partner.trim() ? <MetadataListItem label="Partner">{sent.partner.trim()}</MetadataListItem> : null}
              <MetadataListItem label="Viewing date">{formatLongDate(sent.viewingDate)}</MetadataListItem>
              <MetadataListItem label="Time">{slotOptions.find(s => s.value === sent.slot)?.label}</MetadataListItem>
              <MetadataListItem label="Guests">{guestOptions.find(g => g.value === sent.guests)?.label}</MetadataListItem>
            </MetadataList>
            <Text as="p" color="secondary">
              On a real venue site, the wedding coordinator would reply by email to confirm. No one will contact you.
            </Text>
            <HStack>
              <Button label="Start another request" variant="primary" onClick={reset} />
            </HStack>
          </VStack>
        ) : (
          <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby="viewing-form-heading">
            <VStack gap={6}>
              <VStack gap={1}>
                <Heading level={3} id="viewing-form-heading" tabIndex={-1} className={styles.cardHeading}>
                  Your viewing request
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
                <div className={styles.formGrid}>
                  <VStack gap={5}>
                    <div data-field="name">
                      <TextInput
                        label="Your name"
                        autoComplete="off"
                        value={draft.name}
                        onChange={v => set('name', v)}
                        status={errorStatus(errors.name)}
                        statusVariant="detached"
                        width="100%"
                      />
                    </div>
                    <div data-field="partner">
                      <TextInput
                        label="Partner's name"
                        isOptional
                        autoComplete="off"
                        value={draft.partner}
                        onChange={v => set('partner', v)}
                        status={errorStatus(errors.partner)}
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
                        value={draft.email}
                        onChange={v => set('email', v)}
                        status={errorStatus(errors.email)}
                        statusVariant="detached"
                        width="100%"
                      />
                    </div>
                    <div data-field="guests">
                      <Selector
                        label="Rough guest count"
                        placeholder="Choose a range"
                        options={guestOptions}
                        value={draft.guests || undefined}
                        onChange={v => set('guests', v)}
                        status={errorStatus(errors.guests)}
                        statusVariant="detached"
                        width="100%"
                      />
                    </div>
                  </VStack>
                  <VStack gap={5}>
                    <div data-field="viewingDate">
                      <DateInput
                        label="Viewing date"
                        description="Tuesdays, Thursdays or Saturdays, up to 120 days ahead."
                        value={(draft.viewingDate || undefined) as ISODateString | undefined}
                        onChange={v => set('viewingDate', v ?? '')}
                        min={window_?.min as ISODateString | undefined}
                        max={window_?.max as ISODateString | undefined}
                        dateConstraints={viewingDayConstraint}
                        weekStartsOn="mon"
                        presentation="popover"
                        format="date_weekday"
                        status={errorStatus(errors.viewingDate)}
                        statusVariant="detached"
                        width="100%"
                      />
                    </div>
                    <div data-field="slot">
                      <RadioList label="Viewing time" value={draft.slot} onChange={v => set('slot', v)} status={errorStatus(errors.slot)}>
                        {slotOptions.map(o => (
                          <RadioListItem key={o.value} value={o.value} label={o.label} description={o.description} />
                        ))}
                      </RadioList>
                    </div>
                  </VStack>
                </div>
                <div data-field="message" className={styles.formFull}>
                  <TextArea
                    label="Anything else?"
                    isOptional
                    rows={3}
                    maxLength={MESSAGE_MAX}
                    placeholder="For example: a rough season, accessibility needs or questions for the coordinator."
                    value={draft.message}
                    onChange={v => set('message', v)}
                    status={errorStatus(errors.message)}
                    statusVariant="detached"
                    width="100%"
                  />
                </div>
                <div data-field="acknowledge" className={styles.formFull}>
                  <CheckboxInput
                    label="I understand this is a demo and no viewing will be booked"
                    value={draft.acknowledge}
                    onChange={v => set('acknowledge', v)}
                    status={errors.acknowledge ? {type: 'error', message: errors.acknowledge} : undefined}
                  />
                </div>
              </FormLayout>
              <HStack gap={3} wrap="wrap" vAlign="center">
                <Button type="submit" variant="primary" size="lg" label="Send demo request" />
                <Text type="supporting" color="secondary">
                  Demo only: nothing is booked or sent.
                </Text>
              </HStack>
            </VStack>
          </form>
        )}
      </Card>
    </SectionShell>
  );
}
