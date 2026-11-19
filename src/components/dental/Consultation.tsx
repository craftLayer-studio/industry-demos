'use client';

import {useEffect, useRef, useState, type FormEvent} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Card} from '@astryxdesign/core/Card';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Banner} from '@astryxdesign/core/Banner';
import {FormLayout} from '@astryxdesign/core/FormLayout';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {Selector} from '@astryxdesign/core/Selector';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {SectionShell} from './SectionShell';
import {categories, treatments} from './lib/data';
import {
  EMPTY_FORM,
  MESSAGE_MAX,
  validateConsultation,
  type ConsultationForm,
  type ContactMethod,
  type PreferredTime,
} from './lib/validation';
import styles from './dental.module.css';

const INTEREST_OPTIONS = [
  {value: 'not-sure', label: 'Not sure yet: I would like advice'},
  ...categories.map(c => ({
    type: 'section' as const,
    title: c.label,
    options: treatments.filter(t => t.category === c.id).map(t => ({value: t.id, label: t.name})),
  })),
];
const VALID_INTERESTS = ['not-sure', ...treatments.map(t => t.id)];

const TIME_LABELS: Record<PreferredTime, string> = {
  any: 'Any time',
  morning: 'Mornings',
  afternoon: 'Afternoons',
  evening: 'Early evenings',
};

function errorStatus(message: string | undefined) {
  return message ? ({type: 'error', message} as const) : undefined;
}

export function Consultation() {
  const [form, setForm] = useState<ConsultationForm>(EMPTY_FORM);
  const [showErrors, setShowErrors] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [done, setDone] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  const errors = showErrors ? validateConsultation(form, VALID_INTERESTS) : {};
  const errorCount = Object.keys(errors).length;

  function set<K extends keyof ConsultationForm>(key: K, value: ConsultationForm[K]) {
    setForm(f => ({...f, [key]: value}));
  }

  useEffect(() => {
    if (attempt === 0) return;
    const target = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
    target?.focus();
  }, [attempt]);

  useEffect(() => {
    if (done) successRef.current?.focus();
  }, [done]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowErrors(true);
    if (Object.keys(validateConsultation(form, VALID_INTERESTS)).length > 0) {
      setAttempt(a => a + 1);
      return;
    }
    setDone(true);
  }

  function reset() {
    setForm(EMPTY_FORM);
    setShowErrors(false);
    setDone(false);
  }

  return (
    <SectionShell
      id="consultation"
      tone="deep"
      eyebrow="Consultation"
      title="Request a consultation"
      lead="Tell us a little about what you are looking for. This is a demonstration: nothing you type is sent, stored or booked.">
      <div className={styles.consultGrid}>
        <Card padding={6} className={styles.formCard}>
          {done ? (
            <VStack gap={5} className={styles.success}>
              <h3 ref={successRef} tabIndex={-1} className={styles.focusHeading}>
                Demo request complete
              </h3>
              <Banner
                status="success"
                title="Your entries passed the checks"
                description="This is a concept demo, so nothing was sent, no appointment was booked and no data was stored. A real practice would contact you to arrange a time."
                collapsible={false}
              />
              <HStack>
                <Button label="Start again" variant="secondary" onClick={reset} />
              </HStack>
            </VStack>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="consultation-note">
              <VStack gap={6}>
                <Text as="p" color="secondary" id="consultation-note">
                  Use made-up details. Fields are required unless marked optional.
                </Text>
                <p className={styles.srOnly} aria-live="polite">
                  {showErrors && errorCount > 0
                    ? `${errorCount} ${errorCount === 1 ? 'field needs' : 'fields need'} attention.`
                    : ''}
                </p>
                <FormLayout defaultOptionality="required">
                  <div className={styles.twoUp}>
                    <TextInput
                      label="Full name"
                      value={form.name}
                      onChange={v => set('name', v)}
                      autoComplete="off"
                      status={errorStatus(errors.name)}
                      statusVariant="detached"
                    />
                    <TextInput
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={v => set('email', v)}
                      autoComplete="off"
                      placeholder="name@example.com"
                      status={errorStatus(errors.email)}
                      statusVariant="detached"
                    />
                  </div>
                  <RadioList
                    label="How should we contact you?"
                    value={form.contactMethod}
                    onChange={v => set('contactMethod', v as ContactMethod)}
                    orientation="horizontal">
                    <RadioListItem value="email" label="Email" />
                    <RadioListItem value="phone" label="Phone" />
                  </RadioList>
                  <div className={styles.twoUp}>
                    {form.contactMethod === 'phone' ? (
                      <TextInput
                        label="Phone"
                        type="tel"
                        value={form.phone}
                        onChange={v => set('phone', v)}
                        autoComplete="off"
                        description="Needed so we can call you"
                        status={errorStatus(errors.phone)}
                        statusVariant="detached"
                      />
                    ) : (
                      <TextInput
                        label="Phone"
                        type="tel"
                        value={form.phone}
                        onChange={v => set('phone', v)}
                        autoComplete="off"
                        isOptional
                        status={errorStatus(errors.phone)}
                        statusVariant="detached"
                      />
                    )}
                    <Selector
                      label="Best time to reach you"
                      value={form.preferredTime}
                      onChange={v => set('preferredTime', (v ?? 'any') as PreferredTime)}
                      options={(Object.keys(TIME_LABELS) as PreferredTime[]).map(k => ({value: k, label: TIME_LABELS[k]}))}
                    />
                  </div>
                  <Selector
                    label="What would you like to discuss?"
                    value={form.interest || undefined}
                    onChange={v => set('interest', v ?? '')}
                    options={INTEREST_OPTIONS}
                    placeholder="Choose a treatment"
                    hasSearch
                    status={errorStatus(errors.interest)}
                    statusVariant="detached"
                  />
                  <TextArea
                    label="Anything else?"
                    description="For example, if you feel nervous or need step-free access. Please do not include medical details."
                    value={form.message}
                    onChange={v => set('message', v)}
                    rows={4}
                    maxLength={MESSAGE_MAX}
                    isOptional
                    status={errorStatus(errors.message)}
                    statusVariant="detached"
                  />
                  <CheckboxInput
                    label="I understand this is a concept demo and nothing will be sent or booked"
                    value={form.consent}
                    onChange={v => set('consent', v)}
                    isRequired
                    status={errors.consent ? {type: 'error', message: errors.consent} : undefined}
                  />
                </FormLayout>
                <HStack gap={3} wrap="wrap" vAlign="center">
                  <Button type="submit" label="Send demo request" variant="primary" size="lg" />
                  <Text type="supporting" color="secondary">
                    Nothing is sent. Your entries are only checked in this browser.
                  </Text>
                </HStack>
              </VStack>
            </form>
          )}
        </Card>
        <div className={styles.consultAside}>
          <h3 className={styles.consultAsideTitle}>
            Before you send
          </h3>
          <ul className={styles.consultList}>
            <li>
              <strong>Use made-up details</strong>
              <span>This is a concept demo, so there is no one at the other end.</span>
            </li>
            <li>
              <strong>Leave out medical history</strong>
              <span>A real practice would ask for that privately, at your first visit.</span>
            </li>
            <li>
              <strong>Nothing leaves your browser</strong>
              <span>Your entries are checked on this page and cleared when you start again.</span>
            </li>
          </ul>
        </div>
      </div>
    </SectionShell>
  );
}
