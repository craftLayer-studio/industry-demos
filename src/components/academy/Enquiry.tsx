'use client';

import {useEffect, useRef, useState, type FormEvent, type MouseEvent} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Banner} from '@astryxdesign/core/Banner';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {Selector} from '@astryxdesign/core/Selector';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {FormLayout} from '@astryxdesign/core/FormLayout';
import {MetadataList, MetadataListItem} from '@astryxdesign/core/MetadataList';
import {SectionShell} from './SectionShell';
import {ENQUIRY_HEADING_ID, useAcademy} from './AcademyProvider';
import {CONTACT_EMAIL, courseById, courses, formatLabel, subjects} from './lib/data';
import {cohortOptions} from './lib/cohorts';
import {
  EMPTY_ENQUIRY,
  GOALS_MAX,
  hasErrors,
  orderedErrors,
  validateEnquiry,
  type EnquiryDraft,
  type EnquiryErrors,
  type EnquiryField,
} from './lib/validation';
import styles from './academy.module.css';

const COURSE_IDS = courses.map(c => c.id);

const courseOptions = subjects.map(s => ({
  type: 'section' as const,
  title: s.label,
  options: courses
    .filter(c => c.subject === s.id)
    .map(c => ({value: c.id, label: c.title, description: formatLabel(c.format)})),
}));

const experienceOptions = [
  {value: 'beginner', label: 'New to this subject', description: 'I have not studied or practised it before.'},
  {value: 'intermediate', label: 'Some experience', description: 'I have tried it at work, in a course or on my own.'},
  {value: 'advanced', label: 'Confident and want depth', description: 'I use it regularly and want to go further.'},
  {value: 'unsure', label: 'Not sure', description: 'I would like help choosing the right level.'},
];

const FIELD_LABELS: Record<EnquiryField, string> = {
  name: 'Full name',
  email: 'Email',
  courseId: 'Course',
  cohort: 'Preferred start',
  experience: 'Experience level',
  goals: 'Your goals',
  consent: 'Demo acknowledgement',
};

function fieldId(field: EnquiryField) {
  return `enquiry-field-${field}`;
}

function errorStatus(message: string | undefined) {
  return message ? ({type: 'error', message} as const) : undefined;
}

function focusField(field: EnquiryField) {
  const wrapper = document.getElementById(fieldId(field));
  const target = wrapper?.querySelector<HTMLElement>(
    'input:not([type="hidden"]):checked, input:not([type="hidden"]), textarea, button, [tabindex="0"]',
  );
  wrapper?.scrollIntoView({block: 'center'});
  target?.focus();
}

type Status = 'editing' | 'sending' | 'sent';

export function Enquiry() {
  const {draft, setDraft, today, prefilledFrom, clearPrefill} = useAcademy();
  const [showErrors, setShowErrors] = useState(false);
  const [status, setStatus] = useState<Status>('editing');
  const [submitted, setSubmitted] = useState<EnquiryDraft | null>(null);
  const [attempt, setAttempt] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  const errors: EnquiryErrors = showErrors ? validateEnquiry(draft, COURSE_IDS) : {};
  const errorList = orderedErrors(errors);
  const course = draft.courseId ? courseById(draft.courseId) : undefined;
  const cohorts = cohortOptions(course, today);
  const prefilled = prefilledFrom ? courseById(prefilledFrom) : undefined;

  // Move focus to the error summary after each failed submit.
  useEffect(() => {
    if (attempt > 0) summaryRef.current?.focus();
  }, [attempt]);

  useEffect(() => {
    if (status === 'sent') successRef.current?.focus();
  }, [status]);

  function set<K extends keyof EnquiryDraft>(key: K, value: EnquiryDraft[K]) {
    setDraft(d => ({...d, [key]: value}));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    setShowErrors(true);
    if (hasErrors(validateEnquiry(draft, COURSE_IDS))) {
      setAttempt(a => a + 1);
      return;
    }
    setStatus('sending');
    // Simulated latency so the loading state is visible. Nothing is sent.
    window.setTimeout(() => {
      setSubmitted(draft);
      setStatus('sent');
    }, 900);
  }

  function reset() {
    setDraft(() => EMPTY_ENQUIRY);
    setShowErrors(false);
    setSubmitted(null);
    setStatus('editing');
    clearPrefill();
    window.setTimeout(() => document.getElementById(ENQUIRY_HEADING_ID)?.focus(), 0);
  }

  function onSummaryLink(e: MouseEvent<HTMLAnchorElement>, field: EnquiryField) {
    e.preventDefault();
    focusField(field);
  }

  const submittedCourse = submitted ? courseById(submitted.courseId) : undefined;
  const submittedCohort = submitted
    ? (cohortOptions(submittedCourse, today).find(o => o.value === submitted.cohort)?.label ?? submitted.cohort)
    : '';

  return (
    <SectionShell
      id="enquire"
      headingId={ENQUIRY_HEADING_ID}
      variant="ink"
      eyebrow="Enrolment enquiry"
      title="Ask about a course or a start date"
      lead="Tell us what you would like to learn and when you could start. In a real academy an adviser would reply by email; this demo keeps everything in your browser tab.">
      <div className={styles.enquiryGrid}>
        <aside className={styles.enquiryAside} aria-label="About this form">
          <VStack gap={4}>
            <Heading level={3} className={styles.asideTitle}>
              What happens next
            </Heading>
            <ol className={styles.asideSteps}>
              <li>An adviser reads your goals and checks the course fits.</li>
              <li>You get a reply with the next start dates and a full syllabus.</li>
              <li>If it feels right, you choose a cohort. No commitment before that.</li>
            </ol>
            <Text as="p" type="supporting" className={styles.asideNote}>
              Prefer email? Write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> (a placeholder address
              for this demo).
            </Text>
          </VStack>
        </aside>

        <div className={styles.enquiryCard}>
          {status === 'sent' && submitted ? (
            <VStack gap={5}>
              <Heading level={3} ref={successRef} tabIndex={-1} className={styles.successTitle}>
                Thanks, {submitted.name.trim().split(' ')[0]}. Your demo enquiry is complete.
              </Heading>
              <Banner
                status="success"
                title="Demo only: nothing was sent and no place was reserved"
                description="Quillmark Academy is a fictional concept demo. Your answers stayed in this browser tab and are cleared when you start again or leave the page."
              />
              <MetadataList columns="multi">
                <MetadataListItem label="Course">{submittedCourse?.title ?? ''}</MetadataListItem>
                <MetadataListItem label="Preferred start">{submittedCohort}</MetadataListItem>
                <MetadataListItem label="Experience">
                  {experienceOptions.find(o => o.value === submitted.experience)?.label ?? ''}
                </MetadataListItem>
                <MetadataListItem label="Email">{submitted.email.trim()}</MetadataListItem>
              </MetadataList>
              <HStack>
                <Button label="Start another enquiry" variant="secondary" onClick={reset} />
              </HStack>
            </VStack>
          ) : (
            <form noValidate onSubmit={onSubmit} aria-labelledby={ENQUIRY_HEADING_ID} aria-busy={status === 'sending'}>
              <VStack gap={6}>
                {errorList.length > 0 ? (
                  <div ref={summaryRef} tabIndex={-1} className={styles.errorSummary} role="alert" aria-labelledby="error-summary-title">
                    <p id="error-summary-title" className={styles.errorSummaryTitle}>
                      {errorList.length === 1 ? 'There is 1 problem to fix' : `There are ${errorList.length} problems to fix`}
                    </p>
                    <ul>
                      {errorList.map(e => (
                        <li key={e.field}>
                          <a href={`#${fieldId(e.field)}`} onClick={ev => onSummaryLink(ev, e.field)}>
                            {FIELD_LABELS[e.field]}: {e.message}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {prefilled && draft.courseId === prefilled.id ? (
                  <p className={styles.prefillNote}>
                    Course pre-filled from the catalogue: <strong>{prefilled.title}</strong>. You can change it below.
                  </p>
                ) : null}

                <Text as="p" type="supporting" color="secondary">
                  All fields are required unless marked optional. Please use made-up details.
                </Text>

                <FormLayout defaultOptionality="required">
                  <div className={styles.twoCol}>
                    <div id={fieldId('name')}>
                      <TextInput
                        label="Full name"
                        isRequired
                        autoComplete="name"
                        value={draft.name}
                        onChange={v => set('name', v)}
                        status={errorStatus(errors.name)}
                        statusVariant="detached"
                        width="100%"
                      />
                    </div>
                    <div id={fieldId('email')}>
                      <TextInput
                        label="Email"
                        type="email"
                        isRequired
                        autoComplete="email"
                        value={draft.email}
                        onChange={v => set('email', v)}
                        status={errorStatus(errors.email)}
                        statusVariant="detached"
                        width="100%"
                      />
                    </div>
                  </div>
                  <div className={styles.twoCol}>
                    <div id={fieldId('courseId')}>
                      <Selector
                        label="Course"
                        isRequired
                        placeholder="Choose a course"
                        options={courseOptions}
                        value={draft.courseId || undefined}
                        onChange={v => setDraft(d => ({...d, courseId: v, cohort: ''}))}
                        hasSearch
                        searchPlaceholder="Search courses"
                        status={errorStatus(errors.courseId)}
                        statusVariant="detached"
                        width="100%"
                      />
                    </div>
                    <div id={fieldId('cohort')}>
                      <Selector
                        label="Preferred start"
                        isRequired
                        placeholder={course ? 'Choose a start' : 'Choose a course first'}
                        options={cohorts}
                        value={draft.cohort || undefined}
                        onChange={v => set('cohort', v)}
                        isDisabled={!course}
                        disabledMessage="Choose a course first to see its start dates."
                        status={errorStatus(errors.cohort)}
                        statusVariant="detached"
                        width="100%"
                      />
                    </div>
                  </div>
                  <div id={fieldId('experience')}>
                    <RadioList
                      label="Experience level"
                      description="Your experience with this subject, so we can suggest the right starting point."
                      isRequired
                      value={draft.experience}
                      onChange={v => set('experience', v as EnquiryDraft['experience'])}
                      status={errorStatus(errors.experience)}>
                      {experienceOptions.map(o => (
                        <RadioListItem key={o.value} value={o.value} label={o.label} description={o.description} />
                      ))}
                    </RadioList>
                  </div>
                  <div id={fieldId('goals')}>
                    <TextArea
                      label="Your goals"
                      isOptional
                      description="What would you like to be able to do after the course? Keep it short."
                      rows={4}
                      maxLength={GOALS_MAX}
                      value={draft.goals}
                      onChange={v => set('goals', v)}
                      status={errorStatus(errors.goals)}
                      statusVariant="detached"
                      width="100%"
                    />
                  </div>
                  <div id={fieldId('consent')}>
                    <CheckboxInput
                      label="I understand this is a concept demo and nothing I enter will be sent or stored"
                      isRequired
                      value={draft.consent}
                      onChange={v => set('consent', v)}
                      status={errorStatus(errors.consent) as {type: 'error'; message: string} | undefined}
                    />
                  </div>
                </FormLayout>

                <HStack gap={3} vAlign="center" wrap="wrap">
                  <Button
                    type="submit"
                    label={status === 'sending' ? 'Sending demo enquiry' : 'Send demo enquiry'}
                    variant="primary"
                    size="lg"
                    isLoading={status === 'sending'}
                  />
                  <p className={styles.srStatus} role="status" aria-live="polite">
                    {status === 'sending' ? 'Sending demo enquiry…' : ''}
                  </p>
                </HStack>
              </VStack>
            </form>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
