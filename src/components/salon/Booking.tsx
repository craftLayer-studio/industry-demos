'use client';

import {useEffect, useRef, useState, useSyncExternalStore, type FormEvent} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Grid} from '@astryxdesign/core/Grid';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Banner} from '@astryxdesign/core/Banner';
import {Stepper, Step} from '@astryxdesign/core/Stepper';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {DateInput} from '@astryxdesign/core/DateInput';
import type {ISODateString} from '@astryxdesign/core/Calendar';
import {ToggleButton} from '@astryxdesign/core/ToggleButton';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {Avatar} from '@astryxdesign/core/Avatar';
import {MetadataList, MetadataListItem} from '@astryxdesign/core/MetadataList';
import {Skeleton} from '@astryxdesign/core/Skeleton';
import {FormLayout} from '@astryxdesign/core/FormLayout';
import {SectionShell} from './SectionShell';
import {useBookingBridge} from './BookingBridge';
import {
  categories,
  categoryById,
  openingHours,
  serviceById,
  servicesIn,
  specialistById,
  specialists,
  type CategoryId,
} from './lib/data';
import {bookingWindow, formatLongDate, isBookableDate, isoWeekday, localISO, BOOKING_WINDOW_DAYS} from './lib/dates';
import {formatClock, formatDays, formatDuration, formatPrice} from './lib/format';
import {generateSlots} from './lib/slots';
import {
  ANY,
  NOTES_MAX,
  STEP_IDS,
  stepError,
  validateContact,
  type AppointmentDraft,
  type ContactDetails,
  type ContactErrors,
} from './lib/validation';
import styles from './salon.module.css';

const STEP_LABELS = ['Service', 'Specialist', 'Date', 'Time', 'Details', 'Review'];
const STEP_TITLES = [
  'Choose a service',
  'Choose a specialist',
  'Pick a date',
  'Pick a time',
  'Your contact details',
  'Review your request',
];
const CONTACT = 4;
const REVIEW = 5;
const CONFIRMED = STEP_IDS.length;

const EMPTY_DRAFT: AppointmentDraft = {service: null, specialist: null, date: null, time: null};
const EMPTY_CONTACT: ContactDetails = {name: '', email: '', phone: '', notes: ''};

const noopSubscribe = () => () => {};

function errorStatus(message: string | undefined) {
  return message ? ({type: 'error', message} as const) : undefined;
}

function hasErrors(e: object) {
  return Object.keys(e).length > 0;
}

export function Booking() {
  // The viewer's date is only known in the browser.
  const today = useSyncExternalStore(noopSubscribe, () => localISO(), () => null);
  const bridge = useBookingBridge();

  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<AppointmentDraft>(EMPTY_DRAFT);
  const [category, setCategory] = useState<CategoryId>('hair');
  const [contact, setContact] = useState<ContactDetails>(EMPTY_CONTACT);
  const [showContactErrors, setShowContactErrors] = useState(false);
  const [stepMessage, setStepMessage] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  // Bumped on every navigation so focus moves to the step heading.
  const [nav, setNav] = useState(0);

  const service = draft.service ? serviceById(draft.service) : undefined;
  const specialist = draft.specialist && draft.specialist !== ANY ? specialistById(draft.specialist) : undefined;
  const contactErrors: ContactErrors = showContactErrors ? validateContact(contact) : {};

  function goTo(next: number) {
    setNav(n => n + 1);
    setStepMessage(null);
    setStep(next);
  }

  useEffect(() => {
    return bridge.register({
      startWithService(id) {
        const s = serviceById(id);
        if (!s) return;
        setCategory(s.category);
        setDraft({service: id, specialist: null, date: null, time: null});
        setNav(n => n + 1);
        setStepMessage(null);
        setStep(1);
      },
      startWithSpecialist(id) {
        const sp = specialistById(id);
        if (!sp) return;
        setCategory(sp.categories[0]);
        setDraft({service: null, specialist: id, date: null, time: null});
        setNav(n => n + 1);
        setStepMessage(null);
        setStep(0);
      },
    });
  }, [bridge]);

  // Move focus to the new step's heading after navigation (not on first load).
  useEffect(() => {
    if (nav === 0) return;
    headingRef.current?.focus({preventScroll: true});
    headingRef.current?.scrollIntoView({block: 'nearest'});
  }, [nav]);

  // After a failed Continue, move focus to the first problem.
  useEffect(() => {
    if (attempt === 0) return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"], [data-step-error]')?.focus();
  }, [attempt]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step < CONTACT) {
      const problem = stepError(STEP_IDS[step], draft, today);
      if (problem) {
        setStepMessage(problem);
        setAttempt(a => a + 1);
        return;
      }
    }
    if (step === CONTACT) {
      setShowContactErrors(true);
      if (hasErrors(validateContact(contact))) {
        setAttempt(a => a + 1);
        return;
      }
    }
    goTo(step + 1);
  }

  function restart() {
    setDraft(EMPTY_DRAFT);
    setContact(EMPTY_CONTACT);
    setShowContactErrors(false);
    setCategory('hair');
    goTo(0);
  }

  function chooseService(id: string) {
    setStepMessage(null);
    setDraft(d => {
      if (d.service === id) return d;
      const s = serviceById(id);
      const keep = d.specialist === ANY || (d.specialist && s && specialistById(d.specialist)?.categories.includes(s.category));
      return {service: id, specialist: keep ? d.specialist : null, date: null, time: null};
    });
  }

  const headingId = 'book-step-heading';
  const stepTitle = step === CONFIRMED ? 'Demo request complete' : STEP_TITLES[step];
  const eligible = service ? specialists.filter(s => s.categories.includes(service.category)) : [];

  return (
    <SectionShell
      id="book"
      eyebrow="Appointment request"
      title="Request an appointment"
      lead="Six short steps. This is a demonstration: no appointment is booked and nothing you type is sent or saved.">
      <Card padding={6} className={styles.bookingCard}>
        <VStack gap={6}>
          {step < CONFIRMED ? (
            <Stepper
              activeStep={step}
              label="Appointment request progress"
              horizontalOptions={{minimumStepWidth: 96, collapsedVariant: 'withLabel'}}>
              {STEP_LABELS.map((label, i) => (
                <Step key={label} step={i} label={label} />
              ))}
            </Stepper>
          ) : null}

          <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby={headingId}>
            <VStack gap={6}>
              <VStack gap={1}>
                {step < CONFIRMED ? (
                  <Text type="supporting">
                    Step {step + 1} of {STEP_LABELS.length}
                  </Text>
                ) : null}
                <Heading level={3} id={headingId} ref={headingRef} tabIndex={-1} className={styles.focusHeading}>
                  {stepTitle}
                </Heading>
              </VStack>

              {stepMessage ? (
                <Banner status="error" title={stepMessage} role="alert" tabIndex={-1} data-step-error="" />
              ) : null}

              {step === 0 ? (
                <VStack gap={4}>
                  {specialist ? (
                    <Text as="p" color="secondary">
                      Requesting with {specialist.name}: showing services they offer.
                    </Text>
                  ) : null}
                  <div className={styles.segmentTight}>
                  <SegmentedControl
                    label="Service category"
                    value={category}
                    layout="hug"
                    onChange={v => setCategory(v as CategoryId)}>
                    {categories
                      .filter(c => !specialist || specialist.categories.includes(c.id))
                      .map(c => (
                        <SegmentedControlItem key={c.id} value={c.id} label={c.name} />
                      ))}
                  </SegmentedControl>
                  </div>
                  <RadioList
                    label={`${categoryById(category).name} services`}
                    isRequired
                    value={draft.service ?? ''}
                    onChange={chooseService}>
                    {servicesIn(category).map(s => (
                      <RadioListItem
                        key={s.id}
                        value={s.id}
                        label={s.name}
                        description={`${formatDuration(s.duration)} · sample price ${formatPrice(s.price, s.isFrom)}`}
                      />
                    ))}
                  </RadioList>
                  {service && service.category !== category ? (
                    <Text type="supporting" as="p">
                      Selected: {service.name} ({categoryById(service.category).name}).
                    </Text>
                  ) : null}
                </VStack>
              ) : null}

              {step === 1 && service ? (
                <VStack gap={3}>
                  <Text color="secondary" as="p">
                    Showing specialists who offer {service.name.toLowerCase()}. “Any specialist” gives the widest choice
                    of times.
                  </Text>
                  <RadioList
                    label="Specialist"
                    isLabelHidden
                    isRequired
                    value={draft.specialist ?? ''}
                    onChange={value => {
                      setStepMessage(null);
                      setDraft(d => (d.specialist === value ? d : {...d, specialist: value, date: null, time: null}));
                    }}>
                    <RadioListItem
                      value={ANY}
                      label="Any specialist"
                      description="We match you with whoever is free at your chosen time."
                      startContent={<Avatar name="Any" alt="" size={40} tooltip={false} />}
                    />
                    {eligible.map(s => (
                      <RadioListItem
                        key={s.id}
                        value={s.id}
                        label={s.name}
                        description={`${s.role} · in the studio ${formatDays(s.days)}`}
                        startContent={<Avatar name={s.name} alt="" size={40} tooltip={false} />}
                      />
                    ))}
                  </RadioList>
                </VStack>
              ) : null}

              {step === 2 && service ? (
                today ? (
                  <DateStep
                    today={today}
                    date={draft.date}
                    specialistDays={specialist?.days}
                    specialistName={specialist?.name}
                    onDate={date => {
                      setStepMessage(null);
                      setDraft(d => ({...d, date, time: null}));
                    }}
                  />
                ) : (
                  <Skeleton height={80} />
                )
              ) : null}

              {step === 3 && service && draft.date && today ? (
                <TimeStep
                  today={today}
                  date={draft.date}
                  duration={service.duration}
                  category={service.category}
                  specialistId={specialist?.id ?? null}
                  time={draft.time}
                  onTime={time => {
                    setStepMessage(null);
                    setDraft(d => ({...d, time}));
                  }}
                />
              ) : null}

              {step === CONTACT ? (
                <VStack gap={5}>
                  <Text color="secondary" as="p">
                    Use made-up details: this demo never sends them anywhere.
                  </Text>
                  <FormLayout defaultOptionality="required">
                    <Grid columns={{minWidth: 240, max: 2}} gap={5}>
                      <TextInput
                        label="Full name"
                        isRequired
                        autoComplete="off"
                        value={contact.name}
                        onChange={name => setContact(c => ({...c, name}))}
                        status={errorStatus(contactErrors.name)}
                        statusVariant="detached"
                      />
                      <TextInput
                        label="Email"
                        type="email"
                        isRequired
                        autoComplete="off"
                        placeholder="name@example.com"
                        value={contact.email}
                        onChange={email => setContact(c => ({...c, email}))}
                        status={errorStatus(contactErrors.email)}
                        statusVariant="detached"
                      />
                      <TextInput
                        label="Phone"
                        type="tel"
                        isOptional
                        autoComplete="off"
                        placeholder="555 0100 222"
                        value={contact.phone}
                        onChange={phone => setContact(c => ({...c, phone}))}
                        status={errorStatus(contactErrors.phone)}
                        statusVariant="detached"
                      />
                    </Grid>
                    <TextArea
                      label="Anything we should know?"
                      isOptional
                      rows={3}
                      maxLength={NOTES_MAX}
                      description="For example a preferred finish or that you would like a quiet appointment."
                      value={contact.notes}
                      onChange={notes => setContact(c => ({...c, notes}))}
                      status={errorStatus(contactErrors.notes)}
                      statusVariant="detached"
                    />
                  </FormLayout>
                </VStack>
              ) : null}

              {step === REVIEW && service && draft.date && draft.time ? (
                <VStack gap={5}>
                  <MetadataList columns="multi">
                    <MetadataListItem label="Service">{service.name}</MetadataListItem>
                    <MetadataListItem label="Duration">{formatDuration(service.duration)}</MetadataListItem>
                    <MetadataListItem label="Sample price">{formatPrice(service.price, service.isFrom)}</MetadataListItem>
                    <MetadataListItem label="Specialist">{specialist?.name ?? 'Any specialist'}</MetadataListItem>
                    <MetadataListItem label="Date">{formatLongDate(draft.date)}</MetadataListItem>
                    <MetadataListItem label="Time">{draft.time}</MetadataListItem>
                    <MetadataListItem label="Name">{contact.name.trim()}</MetadataListItem>
                    <MetadataListItem label="Email">{contact.email.trim()}</MetadataListItem>
                    <MetadataListItem label="Phone">{contact.phone.trim() || 'Not given'}</MetadataListItem>
                    <MetadataListItem label="Notes">{contact.notes.trim() || 'None'}</MetadataListItem>
                  </MetadataList>
                  {service.note ? <Banner status="info" title="Patch test" description={service.note} /> : null}
                  <Banner
                    status="warning"
                    title="Demo only"
                    description="Selecting “Send demo request” will not book an appointment or send any data."
                  />
                </VStack>
              ) : null}

              {step === CONFIRMED && service && draft.date && draft.time ? (
                <VStack gap={5}>
                  <Banner
                    status="success"
                    title="No appointment was booked and nothing was sent"
                    description="This is a concept demo. Your answers stayed in this browser tab and are cleared when you start again or leave the page."
                  />
                  <Text as="p">
                    In a real salon, this is where you would see a confirmation for {service.name.toLowerCase()} with{' '}
                    {specialist?.name ?? 'the first available specialist'} on {formatLongDate(draft.date)} at{' '}
                    {draft.time}. Fernlight is fictional, so no one will contact you.
                  </Text>
                </VStack>
              ) : null}

              <HStack gap={3} wrap="wrap" justify="between">
                {step > 0 && step < CONFIRMED ? (
                  <Button label="Back" variant="secondary" onClick={() => goTo(step - 1)} />
                ) : (
                  <span />
                )}
                {step < CONFIRMED ? (
                  <Button type="submit" variant="primary" label={step === REVIEW ? 'Send demo request' : 'Continue'} />
                ) : (
                  <Button label="Start a new request" variant="primary" onClick={restart} />
                )}
              </HStack>
            </VStack>
          </form>
        </VStack>
      </Card>
    </SectionShell>
  );
}

function DateStep({
  today,
  date,
  specialistDays,
  specialistName,
  onDate,
}: {
  today: string;
  date: string | null;
  specialistDays?: readonly number[];
  specialistName?: string;
  onDate: (iso: string | null) => void;
}) {
  const {min, max} = bookingWindow(today);
  return (
    <VStack gap={3} className={styles.dateStep}>
      <DateInput
        label="Appointment date"
        isRequired
        description={`From tomorrow up to ${BOOKING_WINDOW_DAYS} days ahead. Closed Mondays.${
          specialistName && specialistDays ? ` ${specialistName} is in ${formatDays(specialistDays)}.` : ''
        }`}
        value={(date ?? undefined) as ISODateString | undefined}
        onChange={v => onDate(v ?? null)}
        min={min as ISODateString}
        max={max as ISODateString}
        weekStartsOn="mon"
        presentation="popover"
        format="date_weekday"
        dateConstraints={[(d: Date) => isBookableDate(localISO(d), today, specialistDays)]}
        width="100%"
      />
    </VStack>
  );
}

function TimeStep({
  today,
  date,
  duration,
  category,
  specialistId,
  time,
  onTime,
}: {
  today: string;
  date: string;
  duration: number;
  category: CategoryId;
  specialistId: string | null;
  time: string | null;
  onTime: (time: string) => void;
}) {
  const slots = generateSlots({iso: date, today, duration, specialistId, categoryIds: [category]});
  const hours = openingHours[isoWeekday(date)];
  const chosen = slots.find(s => s.time === time);
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Available times on {formatLongDate(date)}</legend>
      <VStack gap={3}>
        <Text type="supporting" as="p">
          {hours
            ? `Open ${formatClock(hours.open)} to ${formatClock(hours.close)}. Each time leaves room for the full ${formatDuration(duration)} before closing.`
            : ''}
        </Text>
        <Grid columns={{minWidth: 84}} gap={2}>
          {slots.map(s => (
            <ToggleButton
              key={s.time}
              label={s.time}
              isPressed={time === s.time}
              onPressedChange={() => onTime(s.time)}
            />
          ))}
        </Grid>
        <p className={styles.slotStatus} role="status">
          {chosen
            ? `Selected ${chosen.time}, finishing around ${chosen.ends}.`
            : `${slots.length} demo times available. Times are generated for the demo.`}
        </p>
      </VStack>
    </fieldset>
  );
}
