'use client';

import {useEffect, useImperativeHandle, useRef, useState, useSyncExternalStore, type FormEvent, type Ref} from 'react';
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
import {Calendar, type ISODateString} from '@astryxdesign/core/Calendar';
import {ToggleButton} from '@astryxdesign/core/ToggleButton';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {Avatar} from '@astryxdesign/core/Avatar';
import {MetadataList, MetadataListItem} from '@astryxdesign/core/MetadataList';
import {Skeleton} from '@astryxdesign/core/Skeleton';
import {SectionShell} from './SectionShell';
import {clinicianById, clinicians, specialties, specialtyById, type Clinician, type SpecialtyId} from './lib/data';
import {filterClinicians} from './lib/filter';
import {bookingWindow, formatLongDate, isBookableDate, localToday} from './lib/dates';
import {generateSlots} from './lib/slots';
import {formatDays} from './lib/format';
import {
  hasErrors,
  REASON_MAX,
  stepError,
  validateContact,
  type BookingDraft,
  type ContactDetails,
  type ContactErrors,
} from './lib/validation';
import styles from './clinic.module.css';

export type BookingHandle = {startWith: (clinician: Clinician) => void};

const STEPS = ['Specialty', 'Clinician', 'Date and time', 'Your details', 'Review'];
const CONFIRMED = STEPS.length;

const EMPTY_DRAFT: BookingDraft = {specialty: null, clinician: null, date: null, time: null};
const EMPTY_CONTACT: ContactDetails = {name: '', email: '', phone: '', reason: ''};

const noopSubscribe = () => () => {};

function errorStatus(message: string | undefined) {
  return message ? ({type: 'error', message} as const) : undefined;
}

export function Booking({ref}: {ref?: Ref<BookingHandle>}) {
  // The viewer's date is only known in the browser; the static HTML renders
  // a placeholder for the calendar until hydration.
  const today = useSyncExternalStore(noopSubscribe, () => localToday(), () => null);

  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<BookingDraft>(EMPTY_DRAFT);
  const [contact, setContact] = useState<ContactDetails>(EMPTY_CONTACT);
  const [showContactErrors, setShowContactErrors] = useState(false);
  const [stepMessage, setStepMessage] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const shouldFocusHeading = useRef(false);

  const clinician = draft.clinician ? clinicianById(draft.clinician) : undefined;
  const contactErrors: ContactErrors = showContactErrors ? validateContact(contact) : {};

  function goTo(next: number) {
    shouldFocusHeading.current = true;
    setStepMessage(null);
    setStep(next);
  }

  useImperativeHandle(ref, () => ({
    startWith(c: Clinician) {
      setDraft({specialty: c.specialty, clinician: c.id, date: null, time: null});
      goTo(2);
    },
  }));

  // Move focus to the new step's heading after navigation (not on first load).
  useEffect(() => {
    if (shouldFocusHeading.current) {
      shouldFocusHeading.current = false;
      headingRef.current?.focus();
    }
  }, [step]);

  // After a failed Continue, move focus to the first problem.
  useEffect(() => {
    if (attempt === 0) return;
    const target = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"], [data-step-error]');
    target?.focus();
  }, [attempt]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step < 3) {
      const problem = stepError(step, draft);
      if (problem) {
        setStepMessage(problem);
        setAttempt(a => a + 1);
        return;
      }
    }
    if (step === 3) {
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
    goTo(0);
  }

  const headingId = 'booking-step-heading';
  const stepTitle =
    step === CONFIRMED
      ? 'Demo request complete'
      : ['Choose a specialty', 'Choose a clinician', 'Pick a date and time', 'Your contact details', 'Review your request'][
          step
        ];

  return (
    <SectionShell
      id="book"
      eyebrow="Appointment request"
      title="Request an appointment"
      lead="Five short steps. This is a demonstration: no appointment is booked and nothing you type is sent or saved."
      tinted>
      <VStack gap={6} className={styles.bookingShell}>
        <Banner
          status="warning"
          title="Not a real clinic"
          description="Do not enter real medical or personal information. In an emergency, contact your local emergency number."
        />
        <Card padding={6} elevation="low">
          <VStack gap={6}>
            {step < CONFIRMED ? (
              <Stepper
                activeStep={step}
                label="Appointment request progress"
                horizontalOptions={{minimumStepWidth: 112, collapsedVariant: 'withLabel'}}>
                {STEPS.map((label, i) => (
                  <Step key={label} step={i} label={label} />
                ))}
              </Stepper>
            ) : null}

            <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby={headingId}>
              <VStack gap={6}>
                <VStack gap={1}>
                  {step < CONFIRMED ? (
                    <Text type="supporting">
                      Step {step + 1} of {STEPS.length}
                    </Text>
                  ) : null}
                  <Heading level={3} id={headingId} ref={headingRef} tabIndex={-1} className={styles.stepHeading}>
                    {stepTitle}
                  </Heading>
                </VStack>

                {stepMessage ? (
                  <Banner
                    status="error"
                    title={stepMessage}
                    role="alert"
                    tabIndex={-1}
                    data-step-error=""
                  />
                ) : null}

                {step === 0 ? (
                  <RadioList
                    label="Specialty"
                    isLabelHidden
                    isRequired
                    value={draft.specialty ?? ''}
                    onChange={value => {
                      setStepMessage(null);
                      setDraft(d =>
                        d.specialty === value ? d : {specialty: value, clinician: null, date: null, time: null},
                      );
                    }}>
                    {specialties.map(s => (
                      <RadioListItem key={s.id} value={s.id} label={s.name} description={s.summary} />
                    ))}
                  </RadioList>
                ) : null}

                {step === 1 && draft.specialty ? (
                  <VStack gap={3}>
                    <Text color="secondary" as="p">
                      Showing clinicians for {specialtyById(draft.specialty as SpecialtyId).name}.
                    </Text>
                    <RadioList
                      label="Clinician"
                      isLabelHidden
                      isRequired
                      value={draft.clinician ?? ''}
                      onChange={value => {
                        setStepMessage(null);
                        setDraft(d => (d.clinician === value ? d : {...d, clinician: value, date: null, time: null}));
                      }}>
                      {filterClinicians(clinicians, draft.specialty as SpecialtyId).map(c => (
                        <RadioListItem
                          key={c.id}
                          value={c.id}
                          label={c.name}
                          description={`${c.title} · in clinic ${formatDays(c.days, true)}`}
                          startContent={<Avatar name={c.name.replace(/^Dr /, '')} alt="" size={40} tooltip={false} />}
                        />
                      ))}
                    </RadioList>
                  </VStack>
                ) : null}

                {step === 2 && clinician ? (
                  <DateAndTime
                    clinician={clinician}
                    today={today}
                    date={draft.date}
                    time={draft.time}
                    onDate={date => {
                      setStepMessage(null);
                      setDraft(d => ({...d, date, time: null}));
                    }}
                    onTime={time => {
                      setStepMessage(null);
                      setDraft(d => ({...d, time}));
                    }}
                  />
                ) : null}

                {step === 3 ? (
                  <VStack gap={5}>
                    <Text color="secondary" as="p">
                      We only ask for what a front desk would need to confirm a time. Use made-up details: this demo
                      never sends them anywhere.
                    </Text>
                    <Grid columns={{minWidth: 260, max: 2}} gap={5}>
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
                        isRequired
                        autoComplete="off"
                        placeholder="(555) 010-0100"
                        value={contact.phone}
                        onChange={phone => setContact(c => ({...c, phone}))}
                        status={errorStatus(contactErrors.phone)}
                        statusVariant="detached"
                      />
                    </Grid>
                    <TextArea
                      label="Reason for visit"
                      isOptional
                      rows={3}
                      maxLength={REASON_MAX}
                      description="Keep it short and general, for example “follow-up visit”. Please do not include symptoms, diagnoses or other sensitive health information."
                      value={contact.reason}
                      onChange={reason => setContact(c => ({...c, reason}))}
                      status={errorStatus(contactErrors.reason)}
                      statusVariant="detached"
                    />
                  </VStack>
                ) : null}

                {step === 4 && clinician && draft.date && draft.time ? (
                  <VStack gap={5}>
                    <MetadataList columns="multi">
                      <MetadataListItem label="Specialty">{specialtyById(clinician.specialty).name}</MetadataListItem>
                      <MetadataListItem label="Clinician">{clinician.name}</MetadataListItem>
                      <MetadataListItem label="Date">{formatLongDate(draft.date)}</MetadataListItem>
                      <MetadataListItem label="Time">{draft.time}</MetadataListItem>
                      <MetadataListItem label="Name">{contact.name.trim()}</MetadataListItem>
                      <MetadataListItem label="Email">{contact.email.trim()}</MetadataListItem>
                      <MetadataListItem label="Phone">{contact.phone.trim()}</MetadataListItem>
                      <MetadataListItem label="Reason">{contact.reason.trim() || 'Not given'}</MetadataListItem>
                    </MetadataList>
                    <Banner
                      status="info"
                      title="Demo only"
                      description="Selecting “Send demo request” will not book an appointment or send any data."
                    />
                  </VStack>
                ) : null}

                {step === CONFIRMED && clinician && draft.date && draft.time ? (
                  <VStack gap={5}>
                    <Banner
                      status="success"
                      title="No appointment was booked and nothing was sent"
                      description="This is a concept demo. Your answers stayed in this browser tab and are cleared when you start again or leave the page."
                    />
                    <Text as="p">
                      In a real clinic, this is where you would see a confirmation for {clinician.name} on{' '}
                      {formatLongDate(draft.date)} at {draft.time}. Northstar Clinic is fictional, so no one will
                      contact you.
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
                    <Button
                      type="submit"
                      variant="primary"
                      label={step === 4 ? 'Send demo request' : 'Continue'}
                    />
                  ) : (
                    <Button label="Start a new request" variant="primary" onClick={restart} />
                  )}
                </HStack>
              </VStack>
            </form>
          </VStack>
        </Card>
      </VStack>
    </SectionShell>
  );
}

function DateAndTime({
  clinician,
  today,
  date,
  time,
  onDate,
  onTime,
}: {
  clinician: Clinician;
  today: string | null;
  date: string | null;
  time: string | null;
  onDate: (iso: string) => void;
  onTime: (time: string) => void;
}) {
  if (!today) {
    return <Skeleton height={320} />;
  }
  const {min, max} = bookingWindow(today);
  const slots = date ? generateSlots(clinician.id, date, today, clinician.days) : [];

  return (
    <section className={styles.dateRow} aria-label="Date and time">
      <VStack gap={3}>
        <Text type="label" as="p" id="date-help-label">
          Date
        </Text>
        <Text type="supporting" as="p" id="date-help">
          Weekdays only, from tomorrow up to 60 days ahead. {clinician.name} is in clinic on{' '}
          {formatDays(clinician.days, true)}; other days are unavailable.
        </Text>
        <section className={styles.calendarWrap} aria-labelledby="date-help-label" aria-describedby="date-help">
          <Calendar
            value={date as ISODateString | null}
            min={min as ISODateString}
            max={max as ISODateString}
            weekStartsOn="mon"
            hasVariableRowCount
            dateConstraints={[
              (d: Date) => isBookableDate(localToday(d), today, clinician.days),
            ]}
            onChange={(value: string) => onDate(value)}
          />
        </section>
      </VStack>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          {date ? `Available times on ${formatLongDate(date)}` : 'Available times'}
        </legend>
        {date ? (
          <VStack gap={3}>
            <Grid columns={{minWidth: 88}} gap={2}>
              {slots.map(s => (
                <ToggleButton
                  key={s.time}
                  label={s.label}
                  isPressed={time === s.time}
                  onPressedChange={() => onTime(s.time)}
                />
              ))}
            </Grid>
            <Text type="supporting" as="p" role="status">
              {time ? `Selected ${time}.` : `${slots.length} demo times available. Times are generated for the demo.`}
            </Text>
          </VStack>
        ) : (
          <Text color="secondary" as="p">
            Choose a date to see demo times.
          </Text>
        )}
      </fieldset>
    </section>
  );
}
