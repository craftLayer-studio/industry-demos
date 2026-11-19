'use client';

import {useEffect, useRef, useState, type FormEvent} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {FormLayout} from '@astryxdesign/core/FormLayout';
import {Heading} from '@astryxdesign/core/Heading';
import {Selector} from '@astryxdesign/core/Selector';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Section} from './Section';
import {formatPlate} from './lib/plate';
import {
  EMPTY_REMINDER,
  MONTHS,
  REMINDER_ORDER,
  firstError,
  hasErrors,
  validateReminder,
  type ReminderErrors,
  type ReminderField,
  type ReminderValues,
} from './lib/validation';
import styles from './torque.module.css';

const status = (message?: string) => (message ? {type: 'error' as const, message} : undefined);

export function MotReminder() {
  const [values, setValues] = useState<ReminderValues>(EMPTY_REMINDER);
  const [errors, setErrors] = useState<ReminderErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [done, setDone] = useState<ReminderValues | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (done) successRef.current?.focus();
  }, [done]);

  const set = <K extends ReminderField>(key: K, value: ReminderValues[K]) => {
    const next = {...values, [key]: value};
    setValues(next);
    if (attempted) setErrors(validateReminder(next));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAttempted(true);
    const found = validateReminder(values);
    setErrors(found);
    if (hasErrors(found)) {
      const first = firstError(found, REMINDER_ORDER);
      formRef.current
        ?.querySelector(`[data-field="${first}"]`)
        ?.querySelector<HTMLElement>('input:not([type="hidden"]), button, [role="combobox"]')
        ?.focus();
      return;
    }
    setDone(values);
  };

  const reset = () => {
    setValues(EMPTY_REMINDER);
    setErrors({});
    setAttempted(false);
    setDone(null);
  };

  return (
    <Section
      id="mot"
      code="MOT-04"
      kicker="MOT reminder"
      title="Never drive past your MOT date"
      lead="Sign up for a reminder a month before your MOT is due. In this demo the sign-up is checked in your browser and then thrown away.">
      <div className={styles.motGrid}>
        <div className={styles.motCard} aria-hidden="true">
          <p className={styles.motCardLabel}>MOT due</p>
          <p className={styles.motCardValue}>{values.month ? values.month.slice(0, 3).toUpperCase() : '---'}</p>
          <p className={styles.motCardPlate}>{values.plate ? formatPlate(values.plate) : 'AB12 CDE'}</p>
          <p className={styles.motCardFoot}>Reminder: 30 days before · sample</p>
        </div>
        <div className={styles.formCard}>
          {done ? (
            <div className={styles.success} role="status">
              <Heading level={3} ref={successRef} tabIndex={-1} className={styles.successTitle}>
                Reminder details checked
              </Heading>
              <p className={styles.bodyText}>
                <strong>Demo only: no reminder was set and nothing was stored or sent.</strong> {formatPlate(done.plate)}{' '}
                with an MOT due in {done.month} stayed in this browser tab, and no one will email {done.email.trim()}.
              </p>
              <Button label="Start again" onClick={reset} />
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate aria-labelledby="mot-heading">
              <FormLayout defaultOptionality="required">
                {attempted && hasErrors(errors) ? (
                  <p className={styles.formError} role="alert">
                    Please fix the highlighted fields.
                  </p>
                ) : null}
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
                <div className={styles.formRow}>
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
                  <div data-field="month">
                    <Selector
                      label="MOT due month"
                      description="Check your last certificate."
                      options={MONTHS}
                      value={values.month || undefined}
                      onChange={v => set('month', v ?? '')}
                      placeholder="Choose a month"
                      status={status(errors.month)}
                      width="100%"
                    />
                  </div>
                </div>
                <div data-field="consent">
                  <CheckboxInput
                    label="I understand this is a concept demo and no reminder will be sent"
                    value={values.consent}
                    onChange={checked => set('consent', checked)}
                    status={status(errors.consent)}
                  />
                </div>
                <div className={styles.formActions}>
                  <Button type="submit" variant="primary" label="Set demo reminder" />
                  <p className={styles.finePrint}>Demo only. Nothing is sent or stored.</p>
                </div>
              </FormLayout>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
