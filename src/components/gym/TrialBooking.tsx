'use client';

import {useEffect, useRef, useState, type FormEvent} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {DateInput} from '@astryxdesign/core/DateInput';
import {FormLayout} from '@astryxdesign/core/FormLayout';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack} from '@astryxdesign/core/HStack';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {Selector} from '@astryxdesign/core/Selector';
import {Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {VStack} from '@astryxdesign/core/VStack';
import type {ISODateString} from '@astryxdesign/core/Calendar';
import {
  bookingFields,
  emptyBooking,
  experienceOptions,
  findClass,
  hasErrors,
  MAX_DAYS_AHEAD,
  nextDateForClass,
  parseISODate,
  toISODate,
  validateBooking,
  validateField,
  type BookingErrors,
  type BookingField,
  type BookingValues,
  type ExperienceLevel,
} from './booking';
import {days, schedule} from './data';
import {useGymState, useTodayISO} from './GymState';
import {dayName, sortClasses} from './schedule';
import {SectionIntro} from './SectionIntro';
import styles from './gym.module.css';

const fieldLabels: Record<BookingField, string> = {
  name: 'Full name',
  email: 'Email',
  phone: 'Phone',
  classId: 'Class',
  date: 'Trial date',
  experience: 'Training experience',
  consent: 'Consent',
};

const classOptions = days
  .map(d => ({
    type: 'section' as const,
    title: d.long,
    options: sortClasses(schedule.filter(c => c.day === d.id)).map(c => ({value: c.id, label: `${c.start}  ${c.name}`})),
  }))
  .filter(s => s.options.length > 0);

/** Simulated network latency so the loading state is visible. Nothing is sent. */
const FAKE_DELAY_MS = 1200;

function formatLongDate(iso: string): string {
  const date = parseISODate(iso);
  return date
    ? date.toLocaleDateString('en-US', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})
    : iso;
}

function addDaysISO(iso: string, n: number): string {
  const d = parseISODate(iso)!;
  return toISODate(new Date(d.getFullYear(), d.getMonth(), d.getDate() + n));
}

export function TrialBooking() {
  const {requestedClassId} = useGymState();
  const todayISO = useTodayISO();
  const [values, setValues] = useState<BookingValues>(emptyBooking);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [handledRequest, setHandledRequest] = useState('');
  const fieldRefs = useRef<Partial<Record<BookingField, HTMLElement | null>>>({});
  const summaryRef = useRef<HTMLElement | null>(null);
  const successRef = useRef<HTMLHeadingElement | null>(null);

  const today = () => (todayISO ? parseISODate(todayISO)! : new Date());

  // A class picked in the timetable pre-fills the form (adjusting state during render, not in an effect).
  if (requestedClassId && requestedClassId !== handledRequest) {
    setHandledRequest(requestedClassId);
    const c = findClass(requestedClassId);
    if (c && status !== 'sending') {
      setStatus('idle');
      setValues(v => ({...v, classId: c.id, date: nextDateForClass(c, today())}));
      setErrors(e => ({...e, classId: undefined, date: undefined}));
    }
  }

  useEffect(() => {
    if (status === 'done') successRef.current?.focus();
  }, [status]);

  function update<K extends BookingField>(field: K, value: BookingValues[K]) {
    const next = {...values, [field]: value};
    if (field === 'classId') {
      const c = findClass(value as string);
      // Suggest the next session of the chosen class unless the current date already fits.
      if (c && validateField('date', {...next}, today())) next.date = nextDateForClass(c, today());
    }
    setValues(next);
    if (submitted) {
      // After the first submit attempt, keep errors live as the user fixes them.
      setErrors(validateBooking(next, today()));
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    setSubmitted(true);
    const found = validateBooking(values, today());
    setErrors(found);
    if (hasErrors(found)) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStatus('sending');
    await new Promise(resolve => setTimeout(resolve, FAKE_DELAY_MS));
    setStatus('done');
  }

  function focusField(field: BookingField) {
    const root = fieldRefs.current[field];
    const target = root?.querySelector<HTMLElement>(
      'input:not([type="hidden"]), button[role="combobox"], button, [tabindex]:not([tabindex="-1"])',
    );
    target?.focus();
  }

  function reset() {
    setValues(emptyBooking);
    setErrors({});
    setSubmitted(false);
    setStatus('idle');
  }

  const err = (field: BookingField) => (errors[field] ? {type: 'error' as const, message: errors[field]} : undefined);
  const errorList = bookingFields.filter(f => errors[f]);
  const chosen = findClass(values.classId);
  const isSending = status === 'sending';

  return (
    <section id="trial" aria-labelledby="trial-title" className={`${styles.section} ${styles.trialSection}`} tabIndex={-1}>
      <HStack className={`${styles.wrap} ${styles.trialGrid}`}>
        <VStack gap={6} className={styles.trialPitch}>
          <SectionIntro index="05" eyebrow="Free trial" id="trial-title" title="Your first class is on us">
            Pick any class on the timetable. A coach will meet you ten minutes early, show you around and adjust the
            session to your level.
          </SectionIntro>
          <ol className={styles.steps}>
            <li>
              <strong>Choose a class</strong>
              <span>From the timetable or the list in the form.</span>
            </li>
            <li>
              <strong>Pick a date</strong>
              <span>Any session in the next {MAX_DAYS_AHEAD} days.</span>
            </li>
            <li>
              <strong>Turn up and train</strong>
              <span>Bring water and trainers. We have the rest.</span>
            </li>
          </ol>
        </VStack>

        <VStack className={styles.formCard}>
          {status === 'done' ? (
            <VStack gap={4} className={styles.success}>
              <Text type="code" className={styles.eyebrow}>
                Demo complete
              </Text>
              <Heading level={3} className={styles.successTitle} ref={successRef} tabIndex={-1}>
                Request ready. Nothing was sent.
              </Heading>
              <Text as="p">
                This is a concept demo, so no booking was made and your details never left this page. In a live build,{' '}
                <strong>{values.name.trim()}</strong> would receive a confirmation at <strong>{values.email.trim()}</strong>{' '}
                for <strong>{chosen ? chosen.name : 'the chosen class'}</strong> on{' '}
                <strong>{formatLongDate(values.date)}</strong>
                {chosen ? ` at ${chosen.start}` : ''}.
              </Text>
              <HStack gap={2} wrap="wrap">
                <Button variant="primary" label="Book another trial" onClick={reset} />
                <Button variant="ghost" href="#schedule" label="Back to the timetable" />
              </HStack>
            </VStack>
          ) : (
            <form noValidate onSubmit={onSubmit} aria-labelledby="trial-form-title" aria-busy={isSending}>
              <VStack gap={5}>
                <VStack gap={1}>
                  <Heading level={3} id="trial-form-title" className={styles.formTitle}>
                    Book a free trial
                  </Heading>
                  <Text type="supporting">All fields are required. Demo only: nothing is sent.</Text>
                </VStack>

                {errorList.length > 0 ? (
                  <VStack
                    as="section"
                    gap={2}
                    className={styles.errorSummary}
                    ref={summaryRef}
                    tabIndex={-1}
                    aria-labelledby="trial-error-title"
                  >
                    <Heading level={4} id="trial-error-title" className={styles.errorTitle}>
                      {errorList.length === 1 ? 'Fix 1 field to continue' : `Fix ${errorList.length} fields to continue`}
                    </Heading>
                    <ul className={styles.errorList}>
                      {errorList.map(f => (
                        <li key={f}>
                          <button type="button" className={styles.errorLink} onClick={() => focusField(f)}>
                            {fieldLabels[f]}: {errors[f]}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </VStack>
                ) : null}

                <FormLayout defaultOptionality="required">
                  <VStack ref={el => {
                    fieldRefs.current.name = el;
                  }}>
                    <TextInput
                      label={fieldLabels.name}
                      value={values.name}
                      onChange={v => update('name', v)}
                      autoComplete="name"
                      htmlName="name"
                      status={err('name')}
                      statusVariant="detached"
                      isDisabled={isSending}
                    />
                  </VStack>
                  <HStack gap={4} wrap="wrap" className={styles.formRow}>
                    <VStack ref={el => {
                    fieldRefs.current.email = el;
                  }} className={styles.formCell}>
                      <TextInput
                        type="email"
                        label={fieldLabels.email}
                        value={values.email}
                        onChange={v => update('email', v)}
                        autoComplete="email"
                        inputMode="email"
                        htmlName="email"
                        status={err('email')}
                        statusVariant="detached"
                        isDisabled={isSending}
                      />
                    </VStack>
                    <VStack ref={el => {
                    fieldRefs.current.phone = el;
                  }} className={styles.formCell}>
                      <TextInput
                        type="tel"
                        label={fieldLabels.phone}
                        value={values.phone}
                        onChange={v => update('phone', v)}
                        autoComplete="tel"
                        inputMode="tel"
                        htmlName="phone"
                        placeholder="(555) 010-0000"
                        status={err('phone')}
                        statusVariant="detached"
                        isDisabled={isSending}
                      />
                    </VStack>
                  </HStack>
                  <HStack gap={4} wrap="wrap" className={styles.formRow}>
                    <VStack ref={el => {
                    fieldRefs.current.classId = el;
                  }} className={styles.formCell}>
                      <Selector
                        label={fieldLabels.classId}
                        options={classOptions}
                        value={values.classId}
                        onChange={v => update('classId', v ?? '')}
                        placeholder="Choose from the timetable"
                        htmlName="classId"
                        status={err('classId')}
                        statusVariant="detached"
                        width="100%"
                        isDisabled={isSending}
                      />
                    </VStack>
                    <VStack ref={el => {
                    fieldRefs.current.date = el;
                  }} className={styles.formCell}>
                      <DateInput
                        label={fieldLabels.date}
                        value={(values.date || undefined) as ISODateString | undefined}
                        onChange={v => update('date', v ?? '')}
                        min={(todayISO ?? undefined) as ISODateString | undefined}
                        max={(todayISO ? addDaysISO(todayISO, MAX_DAYS_AHEAD) : undefined) as ISODateString | undefined}
                        description={chosen ? `${chosen.name} runs on ${dayName(chosen.day)}s.` : 'Choose a class first to see its day.'}
                        status={err('date')}
                        statusVariant="detached"
                        weekStartsOn="mon"
                        presentation="popover"
                        dateConstraints={
                          chosen
                            ? [(d: Date) => d.getDay() !== (days.find(x => x.id === chosen.day)?.index ?? -1)]
                            : undefined
                        }
                        width="100%"
                        isDisabled={isSending}
                      />
                    </VStack>
                  </HStack>
                  <VStack ref={el => {
                    fieldRefs.current.experience = el;
                  }}>
                    <RadioList
                      label={fieldLabels.experience}
                      value={values.experience}
                      onChange={v => update('experience', v as ExperienceLevel)}
                      htmlName="experience"
                      status={err('experience')}
                      isDisabled={isSending}
                    >
                      {experienceOptions.map(o => (
                        <RadioListItem key={o.value} value={o.value} label={o.label} description={o.description} />
                      ))}
                    </RadioList>
                  </VStack>
                  <VStack ref={el => {
                    fieldRefs.current.consent = el;
                  }}>
                    <CheckboxInput
                      label="I agree to be contacted about this trial. (In this demo nobody will contact you.)"
                      value={values.consent}
                      onChange={checked => update('consent', checked)}
                      htmlName="consent"
                      status={errors.consent ? {type: 'error', message: errors.consent} : undefined}
                      isDisabled={isSending}
                    />
                  </VStack>
                </FormLayout>

                <HStack gap={3} wrap="wrap" align="center">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    label={isSending ? 'Checking your request' : 'Request my free trial'}
                    isLoading={isSending}
                  />
                  <Text type="supporting" role="status" aria-live="polite">
                    {isSending ? 'Preparing your request. Nothing is being sent.' : ''}
                  </Text>
                </HStack>
              </VStack>
            </form>
          )}
        </VStack>
      </HStack>
    </section>
  );
}

