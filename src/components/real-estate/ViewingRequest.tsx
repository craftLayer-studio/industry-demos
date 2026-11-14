'use client';

import {useEffect, useRef, useState, useSyncExternalStore, type FormEvent} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Banner} from '@astryxdesign/core/Banner';
import {FormLayout} from '@astryxdesign/core/FormLayout';
import {Selector} from '@astryxdesign/core/Selector';
import {DateInput} from '@astryxdesign/core/DateInput';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {MetadataList, MetadataListItem} from '@astryxdesign/core/MetadataList';
import type {ISODateString} from '@astryxdesign/core/Calendar';
import {SectionShell} from './SectionShell';
import {useEstate} from './EstateProvider';
import {areaById, properties, propertyById} from './lib/data';
import {formatListingPrice} from './lib/format';
import {
  EMPTY_VIEWING,
  FIELD_ORDER,
  NOTES_MAX,
  formatLongDate,
  hasErrors,
  isWeekdayDate,
  localToday,
  timeSlots,
  validateViewing,
  viewingWindow,
  type ViewingDraft,
} from './lib/viewing';
import styles from './ashgrove.module.css';

const noopSubscribe = () => () => {};
const known = (id: string) => Boolean(propertyById(id));

const propertyOptions = [
  {
    type: 'section' as const,
    title: 'For sale',
    options: properties
      .filter(p => p.mode === 'buy')
      .map(p => ({value: p.id, label: p.title, description: `${areaById(p.area).name} · ${formatListingPrice(p.price, p.mode)}`})),
  },
  {
    type: 'section' as const,
    title: 'To rent',
    options: properties
      .filter(p => p.mode === 'rent')
      .map(p => ({value: p.id, label: p.title, description: `${areaById(p.area).name} · ${formatListingPrice(p.price, p.mode)}`})),
  },
];

function errorStatus(message: string | undefined) {
  return message ? ({type: 'error', message} as const) : undefined;
}

export function ViewingRequest() {
  const {viewingRequest} = useEstate();
  // The viewer's date is only known in the browser.
  const today = useSyncExternalStore(noopSubscribe, () => localToday(), () => null);

  const [draft, setDraft] = useState<ViewingDraft>(EMPTY_VIEWING);
  const [showErrors, setShowErrors] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [sent, setSent] = useState<ViewingDraft | null>(null);
  const [seenNonce, setSeenNonce] = useState(0);

  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  // A listing's "Request a viewing" pre-selects that home (adjust state during render).
  if (viewingRequest && viewingRequest.nonce !== seenNonce) {
    setSeenNonce(viewingRequest.nonce);
    setSent(null);
    setDraft(d => ({...d, propertyId: viewingRequest.value}));
  }

  const errors = showErrors && today ? validateViewing(draft, today, known) : {};
  const range = today ? viewingWindow(today) : null;

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
    if (hasErrors(validateViewing(draft, today, known))) {
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

  const chosen = draft.propertyId ? propertyById(draft.propertyId) : undefined;
  const errorCount = Object.keys(errors).length;

  return (
    <SectionShell
      id="viewing"
      tone="stone"
      eyebrow="Viewings"
      title="Request a viewing"
      lead="Pick a home, a weekday in the next 30 days and a time. This is a demonstration: nothing is booked and nothing you type leaves this page.">
      <Card padding={6} elevation="low" className={styles.viewingCard}>
        {sent ? (
          <VStack gap={5}>
            <Heading level={3} ref={doneRef} tabIndex={-1} className={styles.formHeading}>
              Demo request complete
            </Heading>
            <Banner
              status="success"
              title="No viewing was booked and nothing was sent"
              description="Ashgrove Property is a fictional agency. Your answers stayed in this browser tab and are cleared when you start again or leave the page."
            />
            <MetadataList columns="multi">
              <MetadataListItem label="Home">{propertyById(sent.propertyId)?.title}</MetadataListItem>
              <MetadataListItem label="Date">{formatLongDate(sent.date)}</MetadataListItem>
              <MetadataListItem label="Time">{timeSlots.find(s => s.value === sent.slot)?.label}</MetadataListItem>
              <MetadataListItem label="Name">{sent.name.trim()}</MetadataListItem>
            </MetadataList>
            <Text as="p" color="secondary">
              On a real agency site, this is where the branch would confirm the time by email. No one will contact you.
            </Text>
            <HStack>
              <Button label="Start another request" variant="primary" onClick={reset} />
            </HStack>
          </VStack>
        ) : (
          <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby="viewing-form-heading">
            <VStack gap={6}>
              <VStack gap={1}>
                <Heading level={3} id="viewing-form-heading" tabIndex={-1} className={styles.formHeading}>
                  Your viewing
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
                <div className={styles.viewingGrid}>
                  <VStack gap={5}>
                    <div data-field="propertyId">
                      <Selector
                        label="Home"
                        placeholder="Choose a sample listing"
                        options={propertyOptions}
                        value={draft.propertyId || undefined}
                        onChange={v => set('propertyId', v ?? '')}
                        status={errorStatus(errors.propertyId)}
                        statusVariant="detached"
                        width="100%"
                      />
                    </div>
                    <div data-field="date">
                      <DateInput
                        label="Date"
                        description="Weekdays only, from tomorrow up to 30 days ahead."
                        value={(draft.date || undefined) as ISODateString | undefined}
                        onChange={v => set('date', v ?? '')}
                        min={(range?.min ?? undefined) as ISODateString | undefined}
                        max={(range?.max ?? undefined) as ISODateString | undefined}
                        dateConstraints={[(d: Date) => isWeekdayDate(d)]}
                        presentation="adaptive-bottom-sheet"
                        weekStartsOn="mon"
                        format="date_weekday"
                        status={errorStatus(errors.date)}
                        statusVariant="detached"
                        width="100%"
                      />
                    </div>
                    <div data-field="slot">
                      <RadioList
                        label="Time slot"
                        value={draft.slot}
                        onChange={v => set('slot', v)}
                        status={errorStatus(errors.slot)}>
                        {timeSlots.map(s => (
                          <RadioListItem key={s.value} value={s.value} label={s.label} description={s.description} />
                        ))}
                      </RadioList>
                    </div>
                  </VStack>
                  <VStack gap={5}>
                    <div data-field="name">
                      <TextInput
                        label="Full name"
                        autoComplete="off"
                        value={draft.name}
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
                        value={draft.email}
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
                        autoComplete="off"
                        placeholder="01632 960 000"
                        value={draft.phone}
                        onChange={v => set('phone', v)}
                        status={errorStatus(errors.phone)}
                        statusVariant="detached"
                        width="100%"
                      />
                    </div>
                    <div data-field="notes">
                      <TextArea
                        label="Notes for the agent"
                        isOptional
                        rows={3}
                        maxLength={NOTES_MAX}
                        placeholder="For example: we are chain-free, or we would like to see the garden."
                        value={draft.notes}
                        onChange={v => set('notes', v)}
                        status={errorStatus(errors.notes)}
                        statusVariant="detached"
                        width="100%"
                      />
                    </div>
                    {chosen ? (
                      <Text type="supporting" color="secondary" as="p">
                        Viewing {chosen.title}, {areaById(chosen.area).name}: {formatListingPrice(chosen.price, chosen.mode)} (sample).
                      </Text>
                    ) : null}
                  </VStack>
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
