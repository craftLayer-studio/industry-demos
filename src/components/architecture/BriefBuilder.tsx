'use client';

import {useEffect, useRef, useState, type FormEvent, type ReactNode} from 'react';
import {Banner} from '@astryxdesign/core/Banner';
import {Button} from '@astryxdesign/core/Button';
import {FormLayout} from '@astryxdesign/core/FormLayout';
import {Heading} from '@astryxdesign/core/Heading';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {Step, Stepper} from '@astryxdesign/core/Stepper';
import {Text} from '@astryxdesign/core/Text';
import {TextArea} from '@astryxdesign/core/TextArea';
import {TextInput} from '@astryxdesign/core/TextInput';
import {SectionShell} from './SectionShell';
import {useStudio} from './StudioProvider';
import {TYPES, typeLabel, type ProjectType} from './lib/projects';
import {BUDGET_BANDS, bandById, formatRange, indicativeFee, type BudgetBand} from './lib/fees';
import {
  BRIEF_STEPS,
  EMPTY_BRIEF,
  hasErrors,
  NOTE_MAX,
  PLANNING,
  TIMELINES,
  validateBriefStep,
  type BriefDraft,
  type BriefErrors,
  type PlanningStatus,
  type Timeline,
} from './lib/brief';
import styles from './ostrander.module.css';

const STEP_TITLES = [
  'What kind of project is it?',
  'What is the construction budget?',
  'When would you like to start?',
  'How can the studio reach you?',
  'Review your brief',
];
const REVIEW = 4;
const DONE = 5;

const TYPE_HELP: Record<ProjectType, string> = {
  residential: 'A new house or a small group of homes.',
  extension: 'Adding to an existing building: rear, side, roof or garden room.',
  commercial: 'Shops, workspace, cafés, guesthouses and community buildings.',
  interior: 'Reworking the inside of an existing space.',
};

function status(message: string | undefined) {
  return message ? ({type: 'error', message} as const) : undefined;
}

export function BriefBuilder() {
  const {preset} = useStudio();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<BriefDraft>(EMPTY_BRIEF);
  const [errors, setErrors] = useState<BriefErrors>({});
  const [attempt, setAttempt] = useState(0);
  const [prefill, setPrefill] = useState<string | null>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const focusHeading = useRef(false);

  function goTo(next: number) {
    focusHeading.current = true;
    setErrors({});
    setStep(next);
  }

  function update<K extends keyof BriefDraft>(key: K, value: BriefDraft[K]) {
    setDraft(d => ({...d, [key]: value}));
    if (errors[key]) setErrors(e => ({...e, [key]: undefined}));
  }

  // Prefill from a project sheet or the fee guide.
  const lastNonce = useRef(0);
  useEffect(() => {
    if (!preset || preset.nonce === lastNonce.current) return;
    lastNonce.current = preset.nonce;
    setDraft(d => ({...d, type: preset.type ?? d.type, budget: preset.budget ?? d.budget}));
    setPrefill(preset.source);
    focusHeading.current = true;
    setErrors({});
    setStep(preset.budget ? 2 : 1);
  }, [preset]);

  useEffect(() => {
    if (focusHeading.current) {
      focusHeading.current = false;
      headingRef.current?.focus({preventScroll: true});
    }
  }, [step, prefill]);

  useEffect(() => {
    if (attempt === 0) return;
    const form = formRef.current;
    const target =
      form?.querySelector<HTMLElement>('[aria-invalid="true"]') ?? form?.querySelector<HTMLElement>('[data-step-error]');
    target?.focus();
  }, [attempt]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step < REVIEW) {
      const found = validateBriefStep(step, draft);
      if (hasErrors(found)) {
        setErrors(found);
        setAttempt(a => a + 1);
        return;
      }
    }
    goTo(step + 1);
  }

  function restart() {
    setDraft(EMPTY_BRIEF);
    setPrefill(null);
    goTo(0);
  }

  const errorCount = Object.values(errors).filter(Boolean).length;
  const fee = draft.type && draft.budget ? indicativeFee(draft.type, draft.budget) : null;
  const headingId = 'brief-step-heading';

  return (
    <SectionShell
      id="brief"
      index="05"
      eyebrow="Brief builder"
      tone="sheet"
      title="Sketch out a brief, one question at a time."
      lead="Tell the studio what you have in mind. This is a demonstration: nothing you enter is sent, saved or seen by anyone.">
      <div className={styles.briefGrid}>
        <aside className={styles.briefAside} aria-label="About the brief builder">
          <p className={styles.listLabel}>What happens next, in a real practice</p>
          <ol className={styles.moveList}>
            <li>An architect reads the brief and replies with questions.</li>
            <li>A first conversation, usually on site.</li>
            <li>A written fee proposal for the early stages.</li>
          </ol>
          <p className={styles.smallPrint}>In this demo none of that happens: the form ends with a demo-only confirmation.</p>
        </aside>

        <div className={styles.briefPanel}>
          {step < DONE ? (
            <Stepper
              activeStep={step}
              label="Brief progress"
              horizontalOptions={{minimumStepWidth: 96, collapsedVariant: 'withLabel'}}>
              {BRIEF_STEPS.map((label, i) => (
                <Step key={label} step={i} label={label} />
              ))}
            </Stepper>
          ) : null}

          <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby={headingId} className={styles.briefForm}>
            <div>
              {step < DONE ? (
                <p className={styles.stepCount}>
                  Step {step + 1} of {BRIEF_STEPS.length}
                </p>
              ) : null}
              <Heading level={3} id={headingId} ref={headingRef} tabIndex={-1} className={styles.stepHeading}>
                {step === DONE ? 'Brief complete' : STEP_TITLES[step]}
              </Heading>
            </div>

            {prefill && step < DONE ? (
              <p className={styles.prefillNote} role="status">
                Prefilled from {prefill}. Change anything you like.
              </p>
            ) : null}

            {errorCount > 0 ? (
              <Banner
                status="error"
                title={errorCount === 1 ? 'One answer needs attention.' : `${errorCount} answers need attention.`}
                role="alert"
              />
            ) : null}

            {step === 0 ? (
              <>
                <RadioList
                  label="Project type"
                  isRequired
                  value={draft.type}
                  onChange={v => update('type', v as ProjectType)}
                  status={status(errors.type)}>
                  {TYPES.map(t => (
                    <RadioListItem key={t.value} value={t.value} label={t.label} description={TYPE_HELP[t.value]} />
                  ))}
                </RadioList>
                <TextArea
                  label="A sentence or two about the project"
                  isOptional
                  rows={3}
                  maxLength={NOTE_MAX}
                  description="For example: a kitchen extension to a 1930s semi. Please keep personal details out."
                  value={draft.note}
                  onChange={v => update('note', v)}
                  status={status(errors.note)}
                  statusVariant="detached"
                />
              </>
            ) : null}

            {step === 1 ? (
              <>
                <RadioList
                  label="Construction budget"
                  description="Build cost only, excluding fees, VAT and land. A band is fine."
                  isRequired
                  value={draft.budget}
                  onChange={v => update('budget', v as BudgetBand)}
                  status={status(errors.budget)}>
                  {BUDGET_BANDS.map(b => (
                    <RadioListItem key={b.value} value={b.value} label={b.label} />
                  ))}
                </RadioList>
                <p className={styles.feeHint} aria-live="polite">
                  {fee && draft.type
                    ? `Illustrative fee for a ${typeLabel(draft.type).toLowerCase()} in this band: ${formatRange(fee)}. Sample figure only.`
                    : 'Choose a band to see an illustrative fee range.'}
                </p>
              </>
            ) : null}

            {step === 2 ? (
              <>
                <RadioList
                  label="Hoped-for start"
                  isRequired
                  value={draft.timeline}
                  onChange={v => update('timeline', v as Timeline)}
                  status={status(errors.timeline)}>
                  {TIMELINES.map(t => (
                    <RadioListItem key={t.value} value={t.value} label={t.label} description={t.description} />
                  ))}
                </RadioList>
                <RadioList
                  label="Planning permission"
                  isRequired
                  value={draft.planning}
                  onChange={v => update('planning', v as PlanningStatus)}
                  status={status(errors.planning)}>
                  {PLANNING.map(t => (
                    <RadioListItem key={t.value} value={t.value} label={t.label} />
                  ))}
                </RadioList>
              </>
            ) : null}

            {step === 3 ? (
              <FormLayout defaultOptionality="required">
                <TextInput
                  label="Your name"
                  isRequired
                  autoComplete="name"
                  value={draft.name}
                  onChange={v => update('name', v)}
                  status={status(errors.name)}
                  statusVariant="detached"
                />
                <TextInput
                  label="Email"
                  type="email"
                  isRequired
                  autoComplete="email"
                  description="Use a made-up address such as name@example.com. Nothing is sent."
                  value={draft.email}
                  onChange={v => update('email', v)}
                  status={status(errors.email)}
                  statusVariant="detached"
                />
                <TextInput
                  label="Phone"
                  type="tel"
                  isOptional
                  autoComplete="tel"
                  value={draft.phone}
                  onChange={v => update('phone', v)}
                  status={status(errors.phone)}
                  statusVariant="detached"
                />
              </FormLayout>
            ) : null}

            {step === REVIEW ? (
              <>
                <dl className={styles.reviewList}>
                  <ReviewRow label="Project type" onEdit={() => goTo(0)} editLabel="Edit project">
                    {draft.type ? typeLabel(draft.type) : ''}
                  </ReviewRow>
                  {draft.note.trim() ? <ReviewRow label="About the project">{draft.note.trim()}</ReviewRow> : null}
                  <ReviewRow label="Budget" onEdit={() => goTo(1)} editLabel="Edit budget">
                    {draft.budget ? bandById(draft.budget).label : ''}
                    {fee ? ` (illustrative fee: ${formatRange(fee).replace(/^From/, 'from')})` : ''}
                  </ReviewRow>
                  <ReviewRow label="Start" onEdit={() => goTo(2)} editLabel="Edit timeline">
                    {TIMELINES.find(t => t.value === draft.timeline)?.label}
                  </ReviewRow>
                  <ReviewRow label="Planning">{PLANNING.find(t => t.value === draft.planning)?.label}</ReviewRow>
                  <ReviewRow label="Name" onEdit={() => goTo(3)} editLabel="Edit contact details">
                    {draft.name.trim()}
                  </ReviewRow>
                  <ReviewRow label="Email">{draft.email.trim()}</ReviewRow>
                  {draft.phone.trim() ? <ReviewRow label="Phone">{draft.phone.trim()}</ReviewRow> : null}
                </dl>
                <Banner
                  status="info"
                  title="Demo only"
                  description="Selecting “Send demo brief” will not contact anyone or send any data."
                />
              </>
            ) : null}

            {step === DONE ? (
              <>
                <Banner
                  status="success"
                  title="Demo only: nothing was sent"
                  description="Ostrander Studio is a fictional practice. Your answers stayed in this browser tab and are cleared when you start again or leave the page."
                />
                <Text as="p">
                  In a real practice, this is where you would see a confirmation and an architect would reply. No one
                  will contact you.
                </Text>
              </>
            ) : null}

            <div className={styles.formActions}>
              {step > 0 && step < DONE ? (
                <Button label="Back" variant="secondary" onClick={() => goTo(step - 1)} />
              ) : (
                <span />
              )}
              {step < DONE ? (
                <Button type="submit" variant="primary" label={step === REVIEW ? 'Send demo brief' : 'Continue'} />
              ) : (
                <Button label="Start a new brief" variant="primary" onClick={restart} />
              )}
            </div>
          </form>
        </div>
      </div>
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
  children: ReactNode;
  onEdit?: () => void;
  editLabel?: string;
}) {
  return (
    <div className={styles.reviewRow}>
      <dt>{label}</dt>
      <dd>{children}</dd>
      {onEdit && editLabel ? (
        <dd className={styles.reviewEdit}>
          <Button label={editLabel} variant="ghost" size="sm" onClick={onEdit} />
        </dd>
      ) : null}
    </div>
  );
}
