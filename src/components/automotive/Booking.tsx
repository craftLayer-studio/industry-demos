'use client';

import {useEffect, useRef, useState, useSyncExternalStore, type FormEvent} from 'react';
import type {ISODateString} from '@astryxdesign/core/Calendar';
import {Banner} from '@astryxdesign/core/Banner';
import {Button} from '@astryxdesign/core/Button';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {DateInput} from '@astryxdesign/core/DateInput';
import {FormLayout} from '@astryxdesign/core/FormLayout';
import {Heading} from '@astryxdesign/core/Heading';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {Selector} from '@astryxdesign/core/Selector';
import {TextArea} from '@astryxdesign/core/TextArea';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Section} from './Section';
import {SERVICES, serviceById, type ServiceId} from './lib/estimate';
import {formatPlate} from './lib/plate';
import {
  BOOKING_ORDER,
  EMPTY_BOOKING,
  NOTES_MAX,
  TIME_SLOTS,
  earliestBookingDate,
  firstError,
  hasErrors,
  latestBookingDate,
  parseISO,
  toISODate,
  validateBooking,
  type BookingErrors,
  type BookingField,
  type BookingValues,
} from './lib/validation';
import styles from './torque.module.css';

export type BookingSeed = {service: ServiceId; plate: string; nonce: number};

const DELAY_MS = 600;
/** Astryx date constraints return true for allowed dates: closed on Sundays. */
const WORKSHOP_DAYS = [(d: Date) => d.getDay() !== 0];
const status = (message?: string) => (message ? {type: 'error' as const, message} : undefined);
const noopSubscribe = () => () => {};

function formatDate(iso: string) {
  return parseISO(iso)?.toLocaleDateString('en-GB', {weekday: 'long', day: 'numeric', month: 'long'}) ?? iso;
}

export function Booking({seed}: {seed: BookingSeed | null}) {
  const [values, setValues] = useState<BookingValues>(EMPTY_BOOKING);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState<BookingValues | null>(null);
  const [seenSeed, setSeenSeed] = useState<number | null>(null);
  // Dates depend on the visitor's clock, so read today only on the client.
  const todayISO = useSyncExternalStore(noopSubscribe, () => toISODate(new Date()), () => null);
  const today = todayISO ? parseISO(todayISO) : null;
  const minDate = today ? (earliestBookingDate(today) as ISODateString) : undefined;
  const maxDate = today ? (latestBookingDate(today) as ISODateString) : undefined;
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Apply a seed from the estimator once (adjusting state during render).
  if (seed && seed.nonce !== seenSeed) {
    setSeenSeed(seed.nonce);
    setDone(null);
    setValues(v => ({...v, service: seed.service, plate: seed.plate || v.plate}));
  }

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  useEffect(() => {
    if (done) successRef.current?.focus();
  }, [done]);

  const set = <K extends BookingField>(key: K, value: BookingValues[K]) => {
    const next = {...values, [key]: value};
    setValues(next);
    if (attempted) setErrors(validateBooking(next, new Date()));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setAttempted(true);
    const found = validateBooking(values, new Date());
    setErrors(found);
    if (hasErrors(found)) {
      const first = firstError(found, BOOKING_ORDER);
      formRef.current
        ?.querySelector(`[data-field="${first}"]`)
        ?.querySelector<HTMLElement>('input:not([type="hidden"]), textarea, button, [role="combobox"]')
        ?.focus();
      return;
    }
    setIsSubmitting(true);
    timer.current = setTimeout(() => {
      setIsSubmitting(false);
      setDone(values);
    }, DELAY_MS);
  };

  const reset = () => {
    setValues(EMPTY_BOOKING);
    setErrors({});
    setAttempted(false);
    setDone(null);
  };

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <Section
      id="booking"
      code="BKG-06"
      kicker="Booking request"
      tone="raised"
      title="Request a workshop slot"
      lead="Pick a service, a drop-off day and a time. In a real version the workshop would confirm by email. Here, nothing leaves your browser.">
      <div className={styles.bookingGrid}>
        <aside className={styles.bookingAside} aria-label="Before you book">
          <h3 className={styles.miniHeadingLarge}>Good to know (in this concept)</h3>
          <ul className={styles.checks}>
            <li>Drop-offs Monday to Saturday, from tomorrow</li>
            <li>Bring the locking wheel nut key and any service book</li>
            <li>Extra work is always quoted and approved first</li>
            <li>MOTs and short jobs can be done while you wait</li>
          </ul>
        </aside>

        <div className={styles.formCard}>
          {done ? (
            <div className={styles.success} role="status">
              <Heading level={3} ref={successRef} tabIndex={-1} className={styles.successTitle}>
                Booking request checked
              </Heading>
              <p className={styles.bodyText}>
                <strong>Demo only: nothing was booked, sent or charged.</strong> Your{' '}
                {serviceById(done.service as ServiceId).label.toLowerCase()} request for {formatPlate(done.plate)} on{' '}
                {formatDate(done.date)} stayed in this browser tab. No one will contact {done.email.trim()}.
              </p>
              <Button label="Start a new request" onClick={reset} />
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate aria-labelledby="booking-heading" aria-describedby="booking-note">
              <FormLayout defaultOptionality="required">
                <Banner
                  status="info"
                  title="Demo form"
                  description="Nothing you type is sent or stored. Use a made-up address such as name@example.com."
                />
                {attempted && errorCount > 0 ? (
                  <p className={styles.formError} role="alert">
                    Please fix {errorCount} {errorCount === 1 ? 'field' : 'fields'} below.
                  </p>
                ) : null}
                <div className={styles.formRow}>
                  <div data-field="name">
                    <TextInput label="Your name" value={values.name} onChange={v => set('name', v)} autoComplete="name" status={status(errors.name)} width="100%" />
                  </div>
                  <div data-field="email">
                    <TextInput
                      label="Email"
                      type="email"
                      value={values.email}
                      onChange={v => set('email', v)}
                      autoComplete="email"
                      placeholder="name@example.com"
                      status={status(errors.email)}
                      width="100%"
                    />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div data-field="phone">
                    <TextInput
                      label="Phone"
                      type="tel"
                      isOptional
                      value={values.phone}
                      onChange={v => set('phone', v)}
                      autoComplete="tel"
                      placeholder="555 0100"
                      status={status(errors.phone)}
                      width="100%"
                    />
                  </div>
                  <div data-field="plate">
                    <TextInput
                      label="Registration"
                      description="Made-up plates are fine."
                      value={values.plate}
                      onChange={v => set('plate', v.toUpperCase())}
                      autoComplete="off"
                      placeholder="AB12 CDE"
                      status={status(errors.plate)}
                      width="100%"
                    />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div data-field="service">
                    <Selector
                      label="Service"
                      options={SERVICES.map(s => ({value: s.value, label: s.label}))}
                      value={values.service || undefined}
                      onChange={v => set('service', v ?? '')}
                      placeholder="Choose a service"
                      status={status(errors.service)}
                      width="100%"
                    />
                  </div>
                  <div data-field="date">
                    <DateInput
                      label="Drop-off date"
                      description="Monday to Saturday, from tomorrow."
                      value={(values.date || undefined) as ISODateString | undefined}
                      onChange={v => set('date', v ?? '')}
                      min={minDate}
                      max={maxDate}
                      dateConstraints={WORKSHOP_DAYS}
                      weekStartsOn="mon"
                      status={status(errors.date)}
                      width="100%"
                    />
                  </div>
                </div>
                <div data-field="slot">
                  <RadioList label="Drop-off time" value={values.slot} onChange={v => set('slot', v)} status={status(errors.slot)}>
                    {TIME_SLOTS.map(s => (
                      <RadioListItem key={s.value} value={s.value} label={s.label} />
                    ))}
                  </RadioList>
                </div>
                <div data-field="notes">
                  <TextArea
                    label="Anything we should know?"
                    isOptional
                    value={values.notes}
                    onChange={v => set('notes', v)}
                    maxLength={NOTES_MAX}
                    rows={3}
                    placeholder="Warning lights, noises, mileage"
                    status={status(errors.notes)}
                    width="100%"
                  />
                </div>
                <div data-field="consent">
                  <CheckboxInput
                    label="I understand this is a concept demo and nothing will be booked"
                    value={values.consent}
                    onChange={checked => set('consent', checked)}
                    status={status(errors.consent)}
                  />
                </div>
                <div className={styles.formActions}>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    label={isSubmitting ? 'Checking your details' : 'Send demo booking request'}
                    isLoading={isSubmitting}
                  />
                  <p id="booking-note" className={styles.finePrint}>
                    Demo only. Nothing is sent, booked or charged.
                  </p>
                </div>
              </FormLayout>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
