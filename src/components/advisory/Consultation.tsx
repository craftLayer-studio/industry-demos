'use client';

import {useEffect, useImperativeHandle, useRef, useState, type FormEvent, type Ref} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Grid} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Banner} from '@astryxdesign/core/Banner';
import {Stepper, Step} from '@astryxdesign/core/Stepper';
import {CheckboxList, CheckboxListItem} from '@astryxdesign/core/CheckboxList';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {Selector} from '@astryxdesign/core/Selector';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {ToggleButton} from '@astryxdesign/core/ToggleButton';
import {FormLayout} from '@astryxdesign/core/FormLayout';
import {SectionShell} from './SectionShell';
import {SERVICE_PRICES, sizeFromEmployees} from './lib/fees';
import {
  describeWindow,
  EMPTY_DRAFT,
  hasErrors,
  NOTE_MAX,
  REQUIRED_WINDOWS,
  SIZES,
  sortWindows,
  STAGES,
  TIMES,
  toggleWindow,
  validateStep,
  WEEKDAYS,
  type ConsultDraft,
  type DraftErrors,
  type Topic,
  type WindowId,
} from './lib/consultation';
import type {EstimateHandoff} from './FeeEstimator';
import styles from './advisory.module.css';

export type ConsultationHandle = {startFromEstimate: (handoff: EstimateHandoff) => void};

const STEPS = ['Topics', 'Company', 'Format and time', 'Review'];
const STEP_TITLES = [
  'What would you like to discuss?',
  'About you and your company',
  'How and when to meet',
  'Review your request',
];
const CONFIRMED = STEPS.length;

const TOPICS: {value: Topic; label: string}[] = [
  ...SERVICE_PRICES.map(s => ({value: s.id as Topic, label: s.label})),
  {value: 'other', label: 'Something else'},
];

function topicLabel(t: Topic) {
  return TOPICS.find(x => x.value === t)?.label ?? t;
}

function errorStatus(message: string | undefined) {
  return message ? ({type: 'error', message} as const) : undefined;
}

export function Consultation({ref}: {ref?: Ref<ConsultationHandle>}) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<ConsultDraft>(EMPTY_DRAFT);
  const [errors, setErrors] = useState<DraftErrors>({});
  const [attempt, setAttempt] = useState(0);
  const [estimate, setEstimate] = useState<string | null>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const shouldFocusHeading = useRef(false);

  function goTo(next: number) {
    shouldFocusHeading.current = true;
    setErrors({});
    setStep(next);
  }

  function update<K extends keyof ConsultDraft>(key: K, value: ConsultDraft[K]) {
    setDraft(d => ({...d, [key]: value}));
    if (errors[key as keyof DraftErrors]) {
      setErrors(e => ({...e, [key]: undefined}));
    }
  }

  useImperativeHandle(ref, () => ({
    startFromEstimate({services, employees, summary}: EstimateHandoff) {
      setDraft(d => ({...d, topics: services, size: d.size || sizeFromEmployees(employees)}));
      setEstimate(summary);
      goTo(0);
    },
  }));

  // Move focus to the step heading after navigation (never on first load).
  useEffect(() => {
    if (shouldFocusHeading.current) {
      shouldFocusHeading.current = false;
      headingRef.current?.focus();
    }
  }, [step, estimate]);

  // After a failed Continue, move focus to the first invalid control.
  useEffect(() => {
    if (attempt === 0) return;
    const form = formRef.current;
    const target =
      form?.querySelector<HTMLElement>('[aria-invalid="true"]') ?? form?.querySelector<HTMLElement>('[data-step-error]');
    target?.focus();
  }, [attempt]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step < 3) {
      const found = validateStep(step, draft);
      if (hasErrors(found)) {
        setErrors(found);
        setAttempt(a => a + 1);
        return;
      }
    }
    goTo(step + 1);
  }

  function restart() {
    setDraft(EMPTY_DRAFT);
    setEstimate(null);
    goTo(0);
  }

  const headingId = 'consult-step-heading';
  const errorCount = Object.values(errors).filter(Boolean).length;
  const windowsLeft = REQUIRED_WINDOWS - draft.windows.length;

  return (
    <SectionShell
      id="consult"
      eyebrow="Consultation request"
      title="Book an introductory consultation"
      lead="Four short steps. This is a demonstration: no consultation is booked and nothing you type is sent or saved.">
      <VStack gap={6} className={styles.consultShell}>
        <section className={styles.panel} aria-label="Consultation request form">
          <VStack gap={8}>
            {step < CONFIRMED ? (
              <Stepper
                activeStep={step}
                label="Consultation request progress"
                horizontalOptions={{minimumStepWidth: 120, collapsedVariant: 'withLabel'}}>
                {STEPS.map((label, i) => (
                  <Step key={label} step={i} label={label} />
                ))}
              </Stepper>
            ) : null}

            <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby={headingId}>
              <VStack gap={6}>
                <VStack gap={1}>
                  {step < CONFIRMED ? (
                    <Text type="supporting" as="p">
                      Step {step + 1} of {STEPS.length}
                    </Text>
                  ) : null}
                  <Heading level={3} id={headingId} ref={headingRef} tabIndex={-1} className={styles.stepHeading}>
                    {step === CONFIRMED ? 'Request complete' : STEP_TITLES[step]}
                  </Heading>
                </VStack>

                {errorCount > 0 ? (
                  <Banner
                    status="error"
                    title={
                      errorCount === 1 ? 'One answer needs attention.' : `${errorCount} answers need attention.`
                    }
                    role="alert"
                  />
                ) : null}

                {step === 0 ? (
                  <VStack gap={5}>
                    {estimate ? (
                      <p className={styles.prefillNote} role="status">
                        Prefilled from your fee estimate ({estimate}). Adjust the topics if you like.
                      </p>
                    ) : null}
                    <CheckboxList
                      label="Topics"
                      description="Choose everything you would like to cover. You can change this later."
                      isRequired
                      value={draft.topics}
                      onChange={v => update('topics', v as Topic[])}
                      status={errorStatus(errors.topics)}>
                      {TOPICS.map(t => (
                        <CheckboxListItem key={t.value} value={t.value} label={t.label} />
                      ))}
                    </CheckboxList>
                    <TextArea
                      label="Anything we should know?"
                      isOptional
                      rows={3}
                      maxLength={NOTE_MAX}
                      description="Keep it general. Please do not share account numbers or other sensitive details."
                      value={draft.note}
                      onChange={v => update('note', v)}
                      status={errorStatus(errors.note)}
                      statusVariant="detached"
                    />
                  </VStack>
                ) : null}

                {step === 1 ? (
                  <FormLayout defaultOptionality="required">
                    <Grid columns={{minWidth: 240, max: 2}} gap={5}>
                      <TextInput
                        label="Your name"
                        isRequired
                        autoComplete="off"
                        value={draft.name}
                        onChange={v => update('name', v)}
                        status={errorStatus(errors.name)}
                        statusVariant="detached"
                      />
                      <TextInput
                        label="Email"
                        type="email"
                        isRequired
                        autoComplete="off"
                        placeholder="name@example.com"
                        value={draft.email}
                        onChange={v => update('email', v)}
                        status={errorStatus(errors.email)}
                        statusVariant="detached"
                      />
                      <TextInput
                        label="Company or organisation"
                        isRequired
                        autoComplete="off"
                        value={draft.company}
                        onChange={v => update('company', v)}
                        status={errorStatus(errors.company)}
                        statusVariant="detached"
                      />
                      <Selector
                        label="Company size"
                        isRequired
                        placeholder="Choose a size"
                        options={SIZES}
                        value={draft.size || undefined}
                        onChange={v => update('size', v as ConsultDraft['size'])}
                        status={errorStatus(errors.size)}
                        statusVariant="detached"
                        width="100%"
                      />
                      <Selector
                        label="Stage"
                        isRequired
                        placeholder="Choose a stage"
                        options={STAGES}
                        value={draft.stage || undefined}
                        onChange={v => update('stage', v as ConsultDraft['stage'])}
                        status={errorStatus(errors.stage)}
                        statusVariant="detached"
                        width="100%"
                      />
                    </Grid>
                  </FormLayout>
                ) : null}

                {step === 2 ? (
                  <VStack gap={8}>
                    <RadioList
                      label="Preferred format"
                      isRequired
                      value={draft.format}
                      onChange={v => update('format', v as ConsultDraft['format'])}
                      status={errorStatus(errors.format)}>
                      <RadioListItem value="video" label="Video call" description="About 30 minutes, link sent by email" />
                      <RadioListItem
                        value="in-person"
                        label="In person"
                        description="At the (fictional) Ledger Row office"
                      />
                    </RadioList>

                    <fieldset className={styles.windowsFieldset} aria-describedby="windows-help windows-status">
                      <legend className={styles.windowsLegend}>Preferred time windows</legend>
                      <VStack gap={3}>
                        <Text as="p" type="supporting" id="windows-help">
                          Choose exactly {REQUIRED_WINDOWS} weekday windows that would suit you.{' '}
                          {TIMES.map(t => `${t.label} ${t.range}`).join(' · ')}.
                        </Text>
                        <div>
                          {WEEKDAYS.map(day => (
                            <fieldset key={day.id} className={styles.dayGroup}>
                              <legend>{day.label}</legend>
                              <div className={styles.dayButtons}>
                                {TIMES.map(t => {
                                  const id = `${day.id}-${t.id}` as WindowId;
                                  const pressed = draft.windows.includes(id);
                                  return (
                                    <ToggleButton
                                      key={id}
                                      label={t.label}
                                      size="sm"
                                      isPressed={pressed}
                                      isDisabled={!pressed && windowsLeft <= 0}
                                      onPressedChange={() => update('windows', toggleWindow(draft.windows, id))}
                                    />
                                  );
                                })}
                              </div>
                            </fieldset>
                          ))}
                        </div>
                        <p id="windows-status" className={styles.timeKey} aria-live="polite">
                          {draft.windows.length} of {REQUIRED_WINDOWS} chosen
                          {draft.windows.length > 0
                            ? `: ${sortWindows(draft.windows).map(describeWindow).join('; ')}.`
                            : '.'}
                        </p>
                        {errors.windows ? (
                          <p className={styles.inlineError} tabIndex={-1} data-step-error="">
                            {errors.windows}
                          </p>
                        ) : null}
                      </VStack>
                    </fieldset>
                  </VStack>
                ) : null}

                {step === 3 ? (
                  <VStack gap={5}>
                    <dl className={styles.reviewList}>
                      <ReviewRow label="Topics" onEdit={() => goTo(0)} editLabel="Edit topics">
                        <ul>
                          {draft.topics.map(t => (
                            <li key={t}>{topicLabel(t)}</li>
                          ))}
                        </ul>
                      </ReviewRow>
                      {estimate ? <ReviewRow label="Attached estimate">{estimate} (illustrative)</ReviewRow> : null}
                      {draft.note.trim() ? <ReviewRow label="Note">{draft.note.trim()}</ReviewRow> : null}
                      <ReviewRow label="Name" onEdit={() => goTo(1)} editLabel="Edit company details">
                        {draft.name.trim()}
                      </ReviewRow>
                      <ReviewRow label="Email">{draft.email.trim()}</ReviewRow>
                      <ReviewRow label="Company">{draft.company.trim()}</ReviewRow>
                      <ReviewRow label="Size">{SIZES.find(s => s.value === draft.size)?.label}</ReviewRow>
                      <ReviewRow label="Stage">{STAGES.find(s => s.value === draft.stage)?.label}</ReviewRow>
                      <ReviewRow label="Format" onEdit={() => goTo(2)} editLabel="Edit format and times">
                        {draft.format === 'video' ? 'Video call' : 'In person'}
                      </ReviewRow>
                      <ReviewRow label="Time windows">
                        <ul>
                          {sortWindows(draft.windows).map(w => (
                            <li key={w}>{describeWindow(w)}</li>
                          ))}
                        </ul>
                      </ReviewRow>
                    </dl>
                    <Banner
                      status="info"
                      title="Demo only"
                      description="Selecting “Send demo request” will not book a consultation or send any data."
                    />
                  </VStack>
                ) : null}

                {step === CONFIRMED ? (
                  <VStack gap={5}>
                    <Banner
                      status="success"
                      title="Demo only: no consultation was booked and nothing was sent"
                      description="Halden & Rowe is a fictional firm. Your answers stayed in this browser tab and are cleared when you start again or leave the page."
                    />
                    <Text as="p">
                      In a real firm, this is where you would see a confirmation and a partner would reply to suggest
                      one of your {REQUIRED_WINDOWS} windows. No one will contact you.
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
                    <Button type="submit" variant="primary" label={step === 3 ? 'Send demo request' : 'Continue'} />
                  ) : (
                    <Button label="Start a new request" variant="primary" onClick={restart} />
                  )}
                </HStack>
              </VStack>
            </form>
          </VStack>
        </section>
      </VStack>
    </SectionShell>
  );
}

function ReviewRow({
  label,
  children,
  onEdit,
  editLabel,
}: {
  label: string;
  children: React.ReactNode;
  onEdit?: () => void;
  editLabel?: string;
}) {
  return (
    <div className={styles.reviewRow}>
      <dt>{label}</dt>
      <dd>
        <HStack gap={3} justify="between" vAlign="start" wrap="wrap">
          <span>{children}</span>
          {onEdit && editLabel ? <Button label={editLabel} variant="ghost" size="sm" onClick={onEdit} /> : null}
        </HStack>
      </dd>
    </div>
  );
}
