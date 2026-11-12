'use client';

import {useEffect, useRef, useState, useSyncExternalStore} from 'react';
import {Banner} from '@astryxdesign/core/Banner';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {DateInput} from '@astryxdesign/core/DateInput';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack} from '@astryxdesign/core/HStack';
import {NumberInput} from '@astryxdesign/core/NumberInput';
import {Selector} from '@astryxdesign/core/Selector';
import {Text} from '@astryxdesign/core/Text';
import {TextArea} from '@astryxdesign/core/TextArea';
import {TextInput} from '@astryxdesign/core/TextInput';
import {VStack} from '@astryxdesign/core/VStack';
import type {ISODateString} from '@astryxdesign/core/utils';
import {
  BOOKING_WINDOW_DAYS,
  addDays,
  formatDateLong,
  formatTime,
  isOpenDay,
  hoursSummary,
  parseISODate,
  reservationSlots,
  toISODate,
} from './lib/hours';
import {
  EMPTY_RESERVATION,
  MAX_PARTY,
  MAX_REQUESTS_LENGTH,
  MIN_PARTY,
  hasErrors,
  validateReservation,
  type Errors,
  type ReservationField,
  type ReservationValues,
} from './lib/validation';
import styles from './restaurant.module.css';

const subscribe = () => () => {};
const getToday = () => toISODate(new Date());
const getServerToday = () => '';

function statusOf(message?: string) {
  return message ? {type: 'error' as const, message} : undefined;
}

export function Reservation() {
  const today = useSyncExternalStore(subscribe, getToday, getServerToday);
  const [values, setValues] = useState<ReservationValues>(EMPTY_RESERVATION);
  const [now, setNow] = useState<Date | null>(null);
  const [errors, setErrors] = useState<Errors<ReservationField>>({});
  const [submitted, setSubmitted] = useState(false);
  const [confirmed, setConfirmed] = useState<ReservationValues | null>(null);
  const confirmRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (confirmed) confirmRef.current?.focus();
  }, [confirmed]);

  const date = parseISODate(values.date);
  const slots = date && now ? reservationSlots(date, now) : [];
  const timeOptions = slots.map((t) => ({value: t, label: formatTime(t)}));

  const set = <K extends ReservationField>(key: K, value: ReservationValues[K]) => {
    const current = new Date();
    setNow(current);
    const next = {...values, [key]: value};
    if (key === 'date') {
      const d = parseISODate(String(value));
      if (!d || !reservationSlots(d, current).includes(next.time)) next.time = '';
    }
    setValues(next);
    if (submitted) setErrors(validateReservation(next, current));
  };

  const submit = () => {
    const current = new Date();
    setNow(current);
    setSubmitted(true);
    const found = validateReservation(values, current);
    setErrors(found);
    if (!hasErrors(found)) setConfirmed(values);
  };

  const reset = () => {
    setValues(EMPTY_RESERVATION);
    setErrors({});
    setSubmitted(false);
    setConfirmed(null);
  };

  const errorCount = Object.values(errors).filter(Boolean).length;
  const maxDate = today ? toISODate(addDays(parseISODate(today) as Date, BOOKING_WINDOW_DAYS)) : undefined;

  return (
    <section className={styles.reserve} id="reserve" aria-labelledby="reserve-title">
      <VStack className={styles.container} gap={6}>
        <section className={styles.reserveGrid} aria-label="Reservation">
          <VStack gap={4} className={styles.reserveIntro}>
            <Text type="label" className={styles.eyebrow}>
              Reservations
            </Text>
            <Heading level={2} id="reserve-title" className={styles.sectionTitle}>
              Book a table
            </Heading>
            <Text as="p" color="secondary" className={styles.sectionLede}>
              We hold tables for up to {MAX_PARTY} guests online. Times follow our opening hours, with the last seating an
              hour before close.
            </Text>
            <dl className={styles.hoursCompact}>
              {hoursSummary().map((row) => (
                <div key={row.days}>
                  <dt>{row.days}</dt>
                  <dd>{row.hours}</dd>
                </div>
              ))}
            </dl>
            <Text type="supporting">
              Demo only: submitting this form does not book a table or send any email.
            </Text>
          </VStack>

          <Card className={styles.reserveCard} padding={6}>
            {confirmed ? (
              <VStack gap={4}>
                <Heading level={3} ref={confirmRef} tabIndex={-1} className={styles.confirmTitle}>
                  Request noted, {confirmed.name.trim().split(/\s+/)[0]}
                </Heading>
                <Banner
                  status="success"
                  title="Demo confirmation: no table has been booked"
                  description="Juniper Kitchen is fictional. Nothing was sent to a restaurant and no confirmation email will arrive."
                  collapsible={false}
                />
                <dl className={styles.summary}>
                  <div>
                    <dt>Date</dt>
                    <dd>{formatDateLong(parseISODate(confirmed.date) as Date)}</dd>
                  </div>
                  <div>
                    <dt>Time</dt>
                    <dd>{formatTime(confirmed.time)}</dd>
                  </div>
                  <div>
                    <dt>Guests</dt>
                    <dd>{confirmed.partySize}</dd>
                  </div>
                  <div>
                    <dt>Contact</dt>
                    <dd>
                      {confirmed.email} · {confirmed.phone}
                    </dd>
                  </div>
                  {confirmed.requests.trim() ? (
                    <div>
                      <dt>Requests</dt>
                      <dd>{confirmed.requests.trim()}</dd>
                    </div>
                  ) : null}
                </dl>
                <HStack>
                  <Button label="Make another request" onClick={reset} />
                </HStack>
              </VStack>
            ) : (
              <form
                noValidate
                aria-label="Table reservation request"
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}>
                <VStack gap={5}>
                  {submitted && errorCount > 0 ? (
                    <div role="alert">
                      <Banner
                        status="error"
                        title={`Please fix ${errorCount} ${errorCount === 1 ? 'field' : 'fields'} to continue.`}
                        collapsible={false}
                      />
                    </div>
                  ) : null}
                  <section className={styles.formRow} aria-label="When">
                    <DateInput
                      label="Date"
                      isRequired
                      value={(values.date || undefined) as ISODateString | undefined}
                      onChange={(v) => set('date', v ?? '')}
                      min={(today || undefined) as ISODateString | undefined}
                      max={maxDate as ISODateString | undefined}
                      dateConstraints={[(d) => isOpenDay(d)]}
                      status={statusOf(errors.date)}
                      statusVariant="detached"
                      width="100%"
                    />
                    <Selector
                      label="Time"
                      isRequired
                      placeholder={!values.date ? 'Pick a date first' : slots.length ? 'Choose a time' : 'No times left'}
                      isDisabled={!values.date || slots.length === 0}
                      disabledMessage={!values.date ? 'Choose a date to see available times.' : 'No times available on this date.'}
                      options={timeOptions}
                      value={values.time}
                      onChange={(v) => set('time', v ?? '')}
                      status={statusOf(errors.time)}
                      statusVariant="detached"
                      width="100%"
                    />
                    <NumberInput
                      label="Guests"
                      isRequired
                      min={MIN_PARTY}
                      max={MAX_PARTY}
                      isIntegerOnly
                      hasNumberSteppers
                      value={values.partySize}
                      onChange={(v) => set('partySize', v)}
                      status={statusOf(errors.partySize)}
                      statusVariant="detached"
                      width="100%"
                    />
                  </section>
                  <TextInput
                    label="Full name"
                    isRequired
                    autoComplete="name"
                    value={values.name}
                    onChange={(v) => set('name', v)}
                    status={statusOf(errors.name)}
                    statusVariant="detached"
                    width="100%"
                  />
                  <section className={styles.formRow2} aria-label="Contact details">
                    <TextInput
                      type="email"
                      label="Email"
                      isRequired
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={values.email}
                      onChange={(v) => set('email', v)}
                      status={statusOf(errors.email)}
                      statusVariant="detached"
                      width="100%"
                    />
                    <TextInput
                      type="tel"
                      label="Phone"
                      isRequired
                      autoComplete="tel"
                      placeholder="(555) 010-0000"
                      value={values.phone}
                      onChange={(v) => set('phone', v)}
                      status={statusOf(errors.phone)}
                      statusVariant="detached"
                      width="100%"
                    />
                  </section>
                  <TextArea
                    label="Special requests"
                    isOptional
                    description="Allergies, celebrations, accessibility needs or seating preferences."
                    rows={3}
                    maxLength={MAX_REQUESTS_LENGTH}
                    value={values.requests}
                    onChange={(v) => set('requests', v)}
                    status={statusOf(errors.requests)}
                    statusVariant="detached"
                    width="100%"
                  />
                  <HStack gap={3} align="center" wrap="wrap">
                    <Button type="submit" variant="primary" size="lg" label="Request table" />
                    <Text type="supporting">Demo: no booking is made.</Text>
                  </HStack>
                </VStack>
              </form>
            )}
          </Card>
        </section>
      </VStack>
    </section>
  );
}
