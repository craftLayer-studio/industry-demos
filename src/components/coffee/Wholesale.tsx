'use client';

import {useEffect, useRef, useState, type FormEvent} from 'react';
import {Banner} from '@astryxdesign/core/Banner';
import {Button} from '@astryxdesign/core/Button';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {FormLayout} from '@astryxdesign/core/FormLayout';
import {Heading} from '@astryxdesign/core/Heading';
import {Selector} from '@astryxdesign/core/Selector';
import {TextArea} from '@astryxdesign/core/TextArea';
import {TextInput} from '@astryxdesign/core/TextInput';
import {CounterArt} from './art';
import {Section} from './Section';
import {CheckIcon} from './icons';
import {
  BUSINESS_TYPES,
  EMPTY_WHOLESALE,
  MESSAGE_MAX,
  VOLUMES,
  WHOLESALE_ORDER,
  firstError,
  hasErrors,
  validateWholesale,
  type Errors,
  type WholesaleField,
  type WholesaleValues,
} from './lib/validation';
import styles from './coffee.module.css';

const DELAY_MS = 800;

function status(message?: string) {
  return message ? {type: 'error' as const, message} : undefined;
}

export function Wholesale() {
  const [values, setValues] = useState<WholesaleValues>(EMPTY_WHOLESALE);
  const [errors, setErrors] = useState<Errors<WholesaleField>>({});
  const [attempted, setAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState<WholesaleValues | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  useEffect(() => {
    if (done) successRef.current?.focus();
  }, [done]);

  const set = <K extends WholesaleField>(key: K, value: WholesaleValues[K]) => {
    const next = {...values, [key]: value};
    setValues(next);
    if (attempted) setErrors(validateWholesale(next));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setAttempted(true);
    const found = validateWholesale(values);
    setErrors(found);
    if (hasErrors(found)) {
      const first = firstError(found, WHOLESALE_ORDER);
      const wrap = formRef.current?.querySelector(`[data-field="${first}"]`);
      wrap
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
    setValues(EMPTY_WHOLESALE);
    setErrors({});
    setAttempted(false);
    setDone(null);
  };

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <Section
      id="wholesale"
      eyebrow="04 · Wholesale"
      title="Pouring Brightwater at your counter"
      tone="raised"
      lead="For cafés, kitchens, offices and shops. Tell us roughly what you need and, in a real version of this site, the roastery would reply with sample bags and a price list.">
      <div className={styles.wholesaleGrid}>
        <div className={styles.wholesaleAside}>
          <CounterArt />
          <ul className={styles.checkList}>
            {[
              'Roast-to-order on a fixed weekly day',
              'Espresso and filter blends dialled in with your team',
              'Sample bags before you commit to anything',
            ].map(t => (
              <li key={t}>
                <CheckIcon className={styles.checkIcon} />
                {t}
              </li>
            ))}
          </ul>
          <p className={styles.finePrint}>
            Illustrative service description for a fictional business. No offer or price list exists.
          </p>
        </div>

        <div className={styles.formCard}>
          {done ? (
            <div className={styles.success} role="status">
              <span className={styles.doneIcon}>
                <CheckIcon />
              </span>
              <Heading level={3} ref={successRef} tabIndex={-1} className={styles.doneTitle}>
                Enquiry checked, thank you
              </Heading>
              <p className={styles.bodyText}>
                <strong>Demo only: nothing was sent.</strong> Your enquiry for {done.business.trim()} stayed in this
                browser tab. No one will contact {done.email.trim()}.
              </p>
              <Button label="Start a new enquiry" onClick={reset} />
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="wholesale-note">
              <FormLayout defaultOptionality="required">
                <Banner
                  status="info"
                  title="Demo form"
                  description="Nothing you type leaves your browser. Use a made-up address such as name@example.com."
                />
                {attempted && errorCount > 0 ? (
                  <p className={styles.formError} role="alert">
                    Please fix {errorCount} {errorCount === 1 ? 'field' : 'fields'} below.
                  </p>
                ) : null}
                <div className={styles.formRow}>
                  <div data-field="business">
                    <TextInput
                      label="Business name"
                      value={values.business}
                      onChange={v => set('business', v)}
                      autoComplete="organization"
                      status={status(errors.business)}
                      width="100%"
                    />
                  </div>
                  <div data-field="name">
                    <TextInput
                      label="Your name"
                      value={values.name}
                      onChange={v => set('name', v)}
                      autoComplete="name"
                      status={status(errors.name)}
                      width="100%"
                    />
                  </div>
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
                <div className={styles.formRow}>
                  <div data-field="type">
                    <Selector
                      label="Type of business"
                      options={BUSINESS_TYPES}
                      value={values.type || undefined}
                      onChange={v => set('type', v ?? '')}
                      placeholder="Choose one"
                      status={status(errors.type)}
                      width="100%"
                    />
                  </div>
                  <div data-field="volume">
                    <Selector
                      label="Estimated volume"
                      options={VOLUMES}
                      value={values.volume || undefined}
                      onChange={v => set('volume', v ?? '')}
                      placeholder="Choose a range"
                      status={status(errors.volume)}
                      width="100%"
                    />
                  </div>
                </div>
                <div data-field="message">
                  <TextArea
                    label="Anything else?"
                    isOptional
                    value={values.message}
                    onChange={v => set('message', v)}
                    maxLength={MESSAGE_MAX}
                    rows={3}
                    placeholder="Brewing equipment, menu style, delivery days"
                    status={status(errors.message)}
                    width="100%"
                  />
                </div>
                <div data-field="consent">
                  <CheckboxInput
                    label="I understand this is a concept demo and nothing will be sent"
                    value={values.consent}
                    onChange={checked => set('consent', checked)}
                    status={errors.consent ? {type: 'error', message: errors.consent} : undefined}
                  />
                </div>
                <div className={styles.formActions}>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    label={isSubmitting ? 'Checking your details' : 'Send demo enquiry'}
                    isLoading={isSubmitting}
                  />
                  <p id="wholesale-note" className={styles.finePrint}>
                    Demo only. No message is sent and nothing is stored.
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
