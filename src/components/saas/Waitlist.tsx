'use client';

import {useEffect, useRef, useState, type FormEvent} from 'react';
import {Banner} from '@astryxdesign/core/Banner';
import {Button} from '@astryxdesign/core/Button';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {FormLayout} from '@astryxdesign/core/FormLayout';
import {Heading} from '@astryxdesign/core/Heading';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {Selector} from '@astryxdesign/core/Selector';
import {TextArea} from '@astryxdesign/core/TextArea';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Section} from './Section';
import {CheckIcon} from './icons';
import {
  EMPTY_WAITLIST,
  ROLES,
  TEAM_SIZES,
  USE_CASE_MAX,
  firstError,
  hasErrors,
  validateWaitlist,
  type WaitlistErrors,
  type WaitlistValues,
} from './lib/validation';
import styles from './saas.module.css';

const SIMULATED_DELAY_MS = 900;

function status(message?: string) {
  return message ? {type: 'error' as const, message} : undefined;
}

export function Waitlist() {
  const [values, setValues] = useState<WaitlistValues>(EMPTY_WAITLIST);
  const [errors, setErrors] = useState<WaitlistErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState<WaitlistValues | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    if (done) successRef.current?.focus();
  }, [done]);

  const set = <K extends keyof WaitlistValues>(key: K, value: WaitlistValues[K]) => {
    const next = {...values, [key]: value};
    setValues(next);
    if (attempted) setErrors(validateWaitlist(next));
  };

  const focusField = (field: string) => {
    const wrap = formRef.current?.querySelector(`[data-field="${field}"]`);
    const target = wrap?.querySelector<HTMLElement>(
      'input:not([type="hidden"]), textarea, button, [role="combobox"], [tabindex="0"]',
    );
    target?.focus();
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setAttempted(true);
    const found = validateWaitlist(values);
    setErrors(found);
    if (hasErrors(found)) {
      const first = firstError(found);
      if (first) focusField(first);
      return;
    }
    setIsSubmitting(true);
    timer.current = setTimeout(() => {
      setIsSubmitting(false);
      setDone(values);
    }, SIMULATED_DELAY_MS);
  };

  const reset = () => {
    setValues(EMPTY_WAITLIST);
    setErrors({});
    setAttempted(false);
    setDone(null);
  };

  const errorCount = Object.keys(errors).length;

  return (
    <Section
      id="waitlist"
      eyebrow="Waitlist"
      title="Be first to try Pulsegrid"
      lead="Leave a few details and we would reach out when a private preview opens. This is a concept demo, so the form validates but never sends anything.">
      <div className={styles.waitlistGrid}>
        <div className={styles.waitlistAside}>
          <ul className={styles.checkList}>
            <li>
              <CheckIcon className={styles.checkIcon} />
              Early access to the preview workspace
            </li>
            <li>
              <CheckIcon className={styles.checkIcon} />A say in what we build after funnels and retention
            </li>
            <li>
              <CheckIcon className={styles.checkIcon} />
              No marketing emails, ever
            </li>
          </ul>
          <Banner
            status="info"
            title="Demo form"
            description="Nothing you enter leaves your browser. Use a made-up address such as name@example.com."
          />
        </div>

        <div className={styles.formCard}>
          {done ? (
            <div className={styles.success}>
              <span className={styles.successIcon}>
                <CheckIcon />
              </span>
              <div role="status" aria-live="polite" className={styles.successText}>
                <Heading level={3} ref={successRef} tabIndex={-1} className={styles.successTitle}>
                  Thanks, that all looks right
                </Heading>
                <p className={styles.bodyText}>
                  <strong>Demo only: you have not been added to any list.</strong> Nothing was sent or stored for{' '}
                  {done.email.trim()}. In a real launch, this is where a confirmation email would be promised.
                </p>
              </div>
              <Button label="Fill in the form again" onClick={reset} />
            </div>
          ) : null}

          {!done ? (
            <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="waitlist-note">
              <FormLayout defaultOptionality="required">
                {attempted && errorCount > 0 ? (
                  <p className={styles.formError} role="alert">
                    Please fix {errorCount} {errorCount === 1 ? 'field' : 'fields'} below.
                  </p>
                ) : null}
                <div data-field="email">
                  <TextInput
                    label="Work email"
                    type="email"
                    value={values.email}
                    onChange={v => set('email', v)}
                    autoComplete="email"
                    placeholder="name@example.com"
                    htmlName="email"
                    status={status(errors.email)}
                    width="100%"
                  />
                </div>
                <div data-field="teamSize">
                  <Selector
                    label="Team size"
                    options={TEAM_SIZES}
                    value={values.teamSize || undefined}
                    onChange={v => set('teamSize', v)}
                    placeholder="Choose a size"
                    htmlName="teamSize"
                    status={status(errors.teamSize)}
                    width="100%"
                  />
                </div>
                <div data-field="role">
                  <RadioList
                    label="Your role"
                    value={values.role}
                    onChange={v => set('role', v)}
                    orientation="horizontal"
                    htmlName="role"
                    status={status(errors.role)}>
                    {ROLES.map(r => (
                      <RadioListItem key={r.value} value={r.value} label={r.label} />
                    ))}
                  </RadioList>
                </div>
                <div data-field="useCase">
                  <TextArea
                    label="What would you like to measure first?"
                    isOptional
                    value={values.useCase}
                    onChange={v => set('useCase', v)}
                    maxLength={USE_CASE_MAX}
                    rows={3}
                    placeholder="For example: why trial users stall before inviting a teammate"
                    htmlName="useCase"
                    status={status(errors.useCase)}
                    width="100%"
                  />
                </div>
                <div data-field="consent">
                  <CheckboxInput
                    label="I understand this is a concept demo and nothing will be sent"
                    value={values.consent}
                    onChange={checked => set('consent', checked)}
                    htmlName="consent"
                    status={errors.consent ? {type: 'error', message: errors.consent} : undefined}
                  />
                </div>
                <div className={styles.formActions}>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    label={isSubmitting ? 'Checking your details' : 'Join the waitlist'}
                    isLoading={isSubmitting}
                  />
                  <p id="waitlist-note" className={styles.finePrint}>
                    Demo only. No account is created and no email is sent.
                  </p>
                </div>
              </FormLayout>
            </form>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
