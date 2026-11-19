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
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {Selector} from '@astryxdesign/core/Selector';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {DateInput} from '@astryxdesign/core/DateInput';
import type {ISODateString} from '@astryxdesign/core/Calendar';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {SectionShell} from './SectionShell';
import {PetPortrait} from './illustrations';
import {petLabel, petTypes, type PetType} from './lib/data';
import {
  hasErrors,
  isRequestableDate,
  NOTES_MAX,
  parseISODate,
  toISODate,
  validateAppointment,
  type AppointmentErrors,
  type AppointmentRequest,
  type TimeOfDay,
  type VisitReason,
} from './lib/validation';
import styles from './vet.module.css';

const EMPTY: AppointmentRequest = {
  ownerName: '',
  email: '',
  petName: '',
  pet: '',
  reason: '',
  date: '',
  timeOfDay: 'morning',
  notes: '',
  understood: false,
};

const reasons: {id: VisitReason; label: string}[] = [
  {id: 'checkup', label: 'Check-up'},
  {id: 'vaccination', label: 'Vaccination'},
  {id: 'nails', label: 'Nail clip'},
  {id: 'other', label: 'Something else'},
];

const noopSubscribe = () => () => {};
const getDayStamp = () => toISODate(new Date());
const getServerDayStamp = () => null;

function err(message: string | undefined) {
  return message ? ({type: 'error', message} as const) : undefined;
}

export function AppointmentForm() {
  const todayISO = useSyncExternalStore(noopSubscribe, getDayStamp, getServerDayStamp);
  const today = todayISO ? parseISODate(todayISO) : null;

  const [req, setReq] = useState<AppointmentRequest>(EMPTY);
  const [showErrors, setShowErrors] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [submitted, setSubmitted] = useState<AppointmentRequest | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  const errors: AppointmentErrors = showErrors && today ? validateAppointment(req, today) : {};

  useEffect(() => {
    if (attempt === 0) return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [attempt]);

  useEffect(() => {
    if (submitted) doneRef.current?.focus();
  }, [submitted]);

  function update<K extends keyof AppointmentRequest>(key: K, value: AppointmentRequest[K]) {
    setReq(r => ({...r, [key]: value}));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!today) return;
    setShowErrors(true);
    if (hasErrors(validateAppointment(req, today))) {
      setAttempt(a => a + 1);
      return;
    }
    setSubmitted(req);
  }

  function reset() {
    setReq(EMPTY);
    setShowErrors(false);
    setSubmitted(null);
  }

  const minDate = today ? (toISODate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)) as ISODateString) : undefined;
  const maxDate = today ? (toISODate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 60)) as ISODateString) : undefined;
  const errorCount = Object.keys(errors).length;

  return (
    <SectionShell
      id="appointment"
      eyebrow="Appointments"
      title="Request an appointment"
      lead="Tell us a little about you and your pet. This is a demonstration: nothing is booked, and nothing you type is sent or saved."
      tone="cream">
      <section className={styles.formGrid} aria-label="Appointment request form">
        <VStack gap={5} className={styles.formShell}>
          <Banner
            status="warning"
            title="Not a real practice"
            description="Please do not enter real personal details. If your pet needs urgent help, contact your nearest out-of-hours vet."
          />
          <Card padding={6} elevation="low">
            {submitted ? (
              <VStack gap={4}>
                <Heading level={3} ref={doneRef} tabIndex={-1} className={styles.formHeading}>
                  Demo request complete
                </Heading>
                <Banner
                  status="success"
                  title="Nothing was sent or booked"
                  description={`This is a concept demo, so your request for ${submitted.petName.trim()} (${petLabel(
                    submitted.pet as PetType,
                  ).toLowerCase()}) stayed in your browser. No appointment was made and no one will contact you.`}
                />
                <HStack>
                  <Button label="Start another request" variant="secondary" onClick={reset} />
                </HStack>
              </VStack>
            ) : (
              <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby="appointment-form-heading">
                <VStack gap={6}>
                  <Heading level={3} id="appointment-form-heading" className={styles.formHeading}>
                    Your visit request
                  </Heading>
                  {errorCount > 0 ? (
                    <p role="alert" className={styles.formAlert}>
                      Please fix {errorCount} {errorCount === 1 ? 'field' : 'fields'} before sending the demo request.
                    </p>
                  ) : null}
                  <FormLayout defaultOptionality="required">
                    <FormLayout direction="horizontal">
                      <TextInput
                        label="Your name"
                        value={req.ownerName}
                        onChange={v => update('ownerName', v)}
                        autoComplete="off"
                        status={err(errors.ownerName)}
                      />
                      <TextInput
                        label="Email"
                        type="email"
                        value={req.email}
                        onChange={v => update('email', v)}
                        placeholder="name@example.com"
                        autoComplete="off"
                        status={err(errors.email)}
                      />
                    </FormLayout>
                    <FormLayout direction="horizontal">
                      <TextInput
                        label="Pet's name"
                        value={req.petName}
                        onChange={v => update('petName', v)}
                        autoComplete="off"
                        status={err(errors.petName)}
                      />
                      <Selector
                        label="Type of pet"
                        placeholder="Choose a pet type"
                        options={petTypes.map(p => ({value: p.id, label: p.label}))}
                        value={req.pet || undefined}
                        onChange={v => update('pet', v as PetType)}
                        status={err(errors.pet)}
                      />
                    </FormLayout>
                    <RadioList
                      label="Reason for visit"
                      value={req.reason}
                      onChange={v => update('reason', v as VisitReason)}
                      status={err(errors.reason)}>
                      {reasons.map(r => (
                        <RadioListItem key={r.id} value={r.id} label={r.label} />
                      ))}
                    </RadioList>
                    <FormLayout direction="horizontal">
                      <DateInput
                        label="Preferred date"
                        description="Tomorrow up to 60 days ahead. Closed Sundays."
                        value={(req.date || undefined) as ISODateString | undefined}
                        onChange={v => update('date', v ?? '')}
                        min={minDate}
                        max={maxDate}
                        dateConstraints={today ? [d => isRequestableDate(d, today)] : undefined}
                        presentation="adaptive-bottom-sheet"
                        weekStartsOn="mon"
                        format="date_weekday"
                        status={err(errors.date)}
                      />
                      <VStack gap={2}>
                        <Text type="label" weight="semibold" as="p">
                          Time of day
                        </Text>
                        <SegmentedControl
                          label="Time of day"
                          value={req.timeOfDay}
                          onChange={v => update('timeOfDay', v as TimeOfDay)}
                          layout="fill">
                          <SegmentedControlItem value="morning" label="Morning" />
                          <SegmentedControlItem value="afternoon" label="Afternoon" />
                        </SegmentedControl>
                      </VStack>
                    </FormLayout>
                    <TextArea
                      label="Anything we should know?"
                      isOptional
                      value={req.notes}
                      onChange={v => update('notes', v)}
                      maxLength={NOTES_MAX}
                      rows={3}
                      status={err(errors.notes)}
                    />
                    <CheckboxInput
                      label="I understand this is a demo and nothing will be sent or booked"
                      value={req.understood}
                      onChange={v => update('understood', v)}
                      isRequired
                      status={errors.understood ? {type: 'error', message: errors.understood} : undefined}
                    />
                  </FormLayout>
                  <HStack>
                    <Button type="submit" label="Send demo request" variant="primary" size="lg" isDisabled={!today} />
                  </HStack>
                </VStack>
              </form>
            )}
          </Card>
        </VStack>
        <Card padding={6} variant="green" className={styles.formAside}>
          <VStack gap={4}>
            <HStack gap={2} className={styles.asidePets}>
              <PetPortrait pet="cat" className={styles.asidePortrait} />
              <PetPortrait pet="rabbit" className={styles.asidePortrait} />
              <PetPortrait pet="small" className={styles.asidePortrait} />
            </HStack>
            <Heading level={3}>What would happen next</Heading>
            <Text as="p" color="secondary">
              At a real practice, the front desk would reply to suggest a time that suits you and your pet.
            </Text>
            <Text as="p" color="secondary">
              Here, your request stays in this browser tab. Nothing is sent, booked or stored.
            </Text>
          </VStack>
        </Card>
      </section>
    </SectionShell>
  );
}
