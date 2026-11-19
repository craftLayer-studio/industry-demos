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
import {
  EMPTY_SURVEY,
  NOTES_MAX,
  PROJECT_TYPES,
  PROPERTY_TYPES,
  earliestSurveyDate,
  firstError,
  hasErrors,
  latestSurveyDate,
  toISODate,
  validateSurvey,
  type Errors,
  type SurveyField,
  type SurveyValues,
} from './lib/validation';
import styles from './keystone.module.css';

const DELAY_MS = 700;

/** Astryx date constraints return true for allowed dates: no Sunday surveys. */
const SURVEY_DAYS = [(d: Date) => d.getDay() !== 0];

function status(message?: string) {
  return message ? {type: 'error' as const, message} : undefined;
}

function noopSubscribe() {
  return () => {};
}

function parseLocal(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function formatDate(iso: string) {
  return parseLocal(iso).toLocaleDateString('en-GB', {weekday: 'long', day: 'numeric', month: 'long'});
}

export function Survey() {
  const [values, setValues] = useState<SurveyValues>(EMPTY_SURVEY);
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState<SurveyValues | null>(null);
  // Dates depend on the visitor's clock, so read today only on the client.
  const todayISO = useSyncExternalStore(noopSubscribe, () => toISODate(new Date()), () => null);
  const today = todayISO ? parseLocal(todayISO) : null;
  const minDate = today ? (earliestSurveyDate(today) as ISODateString) : undefined;
  const maxDate = today ? (latestSurveyDate(today) as ISODateString) : undefined;
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

  const set = <K extends SurveyField>(key: K, value: SurveyValues[K]) => {
    const next = {...values, [key]: value};
    setValues(next);
    if (attempted) setErrors(validateSurvey(next, new Date()));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setAttempted(true);
    const found = validateSurvey(values, new Date());
    setErrors(found);
    if (hasErrors(found)) {
      const first = firstError(found);
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
    setValues(EMPTY_SURVEY);
    setErrors({});
    setAttempted(false);
    setDone(null);
  };

  const errorCount = Object.values(errors).filter(Boolean).length;
  const projectLabel = (v: string) => PROJECT_TYPES.find(p => p.value === v)?.label.toLowerCase() ?? v;

  return (
    <Section
      id="survey"
      number="07"
      kicker="Site survey"
      tone="yellow"
      title="Request a site survey"
      lead="Tell us about the job and pick a preferred day. In a real version of this site, a site lead would confirm a visit. Here, nothing leaves your browser.">
      <div className={styles.surveyGrid}>
        <aside className={styles.surveyAside} aria-label="What happens at a survey">
          <h3 className={styles.miniHeadingLarge}>At the visit (in this concept)</h3>
          <ol className={styles.involves}>
            <li>About an hour on site with a site lead</li>
            <li>Measurements, access and drainage checked</li>
            <li>Structure and roof looked over</li>
            <li>A written summary and next steps afterwards</li>
          </ol>
          <p className={styles.finePrint}>Surveys run Monday to Saturday in this fictional example.</p>
        </aside>

        <div className={styles.formCard}>
          {done ? (
            <div className={styles.success} role="status">
              <Heading level={3} ref={successRef} tabIndex={-1} className={styles.successTitle}>
                Request checked, thank you
              </Heading>
              <p className={styles.bodyText}>
                <strong>Demo only: no survey was booked and nothing was sent.</strong> Your {projectLabel(done.project)}{' '}
                request for {formatDate(done.date)} stayed in this browser tab. No one will contact {done.email.trim()}.
              </p>
              <Button label="Start a new request" onClick={reset} className={styles.btnOutline} />
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate aria-labelledby="survey-heading" aria-describedby="survey-note">
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
                    <TextInput
                      label="Your name"
                      value={values.name}
                      onChange={v => set('name', v)}
                      autoComplete="name"
                      status={status(errors.name)}
                      width="100%"
                    />
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
                  <div data-field="area">
                    <TextInput
                      label="Town or area"
                      description="Any made-up place is fine."
                      value={values.area}
                      onChange={v => set('area', v)}
                      autoComplete="address-level2"
                      status={status(errors.area)}
                      width="100%"
                    />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div data-field="project">
                    <Selector
                      label="Type of project"
                      options={PROJECT_TYPES}
                      value={values.project || undefined}
                      onChange={v => set('project', v ?? '')}
                      placeholder="Choose one"
                      status={status(errors.project)}
                      width="100%"
                    />
                  </div>
                  <div data-field="date">
                    <DateInput
                      label="Preferred survey date"
                      description="Monday to Saturday, from two days ahead."
                      value={(values.date || undefined) as ISODateString | undefined}
                      onChange={v => set('date', v ?? '')}
                      min={minDate}
                      max={maxDate}
                      dateConstraints={SURVEY_DAYS}
                      status={status(errors.date)}
                      width="100%"
                    />
                  </div>
                </div>
                <div data-field="property">
                  <RadioList
                    label="Property type"
                    orientation="horizontal"
                    value={values.property}
                    onChange={v => set('property', v)}
                    status={status(errors.property)}>
                    {PROPERTY_TYPES.map(p => (
                      <RadioListItem key={p.value} value={p.value} label={p.label} />
                    ))}
                  </RadioList>
                </div>
                <div data-field="notes">
                  <TextArea
                    label="About the job"
                    isOptional
                    value={values.notes}
                    onChange={v => set('notes', v)}
                    maxLength={NOTES_MAX}
                    rows={3}
                    placeholder="Rough size, what the space is for, any access issues"
                    status={status(errors.notes)}
                    width="100%"
                  />
                </div>
                <div data-field="consent">
                  <CheckboxInput
                    label="I understand this is a concept demo and no survey will be booked"
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
                    label={isSubmitting ? 'Checking your details' : 'Request demo survey'}
                    isLoading={isSubmitting}
                    className={styles.btnSlab}
                  />
                  <p id="survey-note" className={styles.finePrint}>
                    Demo only. Nothing is sent, booked or stored.
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
