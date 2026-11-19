'use client';

import {useEffect, useImperativeHandle, useRef, useState, type FormEvent, type Ref} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Grid} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
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
import {practiceAreas, practiceById, type PracticeId} from './lib/data';
import {
  EMPTY_ENQUIRY,
  firstName,
  hasErrors,
  MESSAGE_MAX,
  validateEnquiry,
  type EnquiryDraft,
  type EnquiryErrors,
} from './lib/enquiry';
import styles from './legal.module.css';

export type EnquiryHandle = {
  prefillArea: (area: PracticeId) => void;
  prefillQuote: (summary: string) => void;
};

function errorStatus(message: string | undefined) {
  return message ? ({type: 'error', message} as const) : undefined;
}

export function Enquiry({ref}: {ref?: Ref<EnquiryHandle>}) {
  const [draft, setDraft] = useState<EnquiryDraft>(EMPTY_ENQUIRY);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [attempt, setAttempt] = useState(0);
  const [sent, setSent] = useState<EnquiryDraft | null>(null);
  const [prefill, setPrefill] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldScroll = useRef(false);

  function update<K extends keyof EnquiryDraft>(key: K, value: EnquiryDraft[K]) {
    setDraft(d => ({...d, [key]: value}));
    if (errors[key]) setErrors(e => ({...e, [key]: undefined}));
  }

  function bringIntoView() {
    shouldScroll.current = true;
    setSent(null);
  }

  useImperativeHandle(ref, () => ({
    prefillArea(area) {
      setDraft(d => ({...d, area}));
      setErrors(e => ({...e, area: undefined}));
      setPrefill(`Practice area set to ${practiceById(area)?.label ?? area}.`);
      bringIntoView();
    },
    prefillQuote(summary) {
      setDraft(d => ({
        ...d,
        area: 'property',
        message: d.message.trim() ? d.message : `I would like to discuss a conveyancing estimate. ${summary}.`,
      }));
      setErrors(e => ({...e, area: undefined, message: undefined}));
      setPrefill('Prefilled from your conveyancing estimate. Edit anything you like.');
      bringIntoView();
    },
  }));

  useEffect(() => {
    if (!shouldScroll.current) return;
    shouldScroll.current = false;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    sectionRef.current?.scrollIntoView?.({behavior: reduce ? 'auto' : 'smooth', block: 'start'});
    formRef.current?.querySelector<HTMLElement>('input, textarea, button')?.focus({preventScroll: true});
  }, [prefill, draft.area]);

  useEffect(() => {
    if (attempt === 0) return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [attempt]);

  useEffect(() => {
    if (sent) doneRef.current?.focus();
  }, [sent]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEnquiry(draft);
    if (hasErrors(found)) {
      setErrors(found);
      setAttempt(a => a + 1);
      return;
    }
    setErrors({});
    setSent(draft);
    setDraft(EMPTY_ENQUIRY);
    setPrefill(null);
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <SectionShell
      id="enquiry"
      tone="deep"
      eyebrow="VI. Confidential enquiry"
      title="Tell us briefly what you need"
      lead="Keep it general: a sentence or two is plenty. This is a demonstration, so nothing you type is sent, stored or read by anyone.">
      <div ref={sectionRef} className={styles.enquiryGrid}>
        <aside className={styles.enquiryAside} aria-label="About this form">
          <VStack gap={4}>
            <Text as="p" className={styles.smallCaps}>
              Before you write
            </Text>
            <ul className={styles.ruledList}>
              <li>A real firm would run a conflict check before discussing details.</li>
              <li>Do not include bank details, passwords or documents.</li>
              <li>Nothing here is legal advice, and no solicitor–client relationship is formed.</li>
            </ul>
          </VStack>
        </aside>
        <div className={styles.panel}>
          {sent ? (
            <VStack gap={5} className={styles.done}>
              <span className={styles.seal} aria-hidden="true">
                M&amp;P
              </span>
              <Heading level={3} ref={doneRef} tabIndex={-1} className={styles.practiceTitle}>
                Thank you, {firstName(sent.name)}
              </Heading>
              <p role="status" className={styles.doneStatus}>
                Demo only: nothing was sent. Your {practiceById(sent.area)?.label.toLowerCase()} enquiry was checked in
                your browser and then discarded. No one will contact you.
              </p>
              <Text as="p" color="secondary">
                On a real site, this is where the firm would confirm when and how it will reply.
              </Text>
              <div>
                <Button label="Start a new enquiry" onClick={() => setSent(null)} />
              </div>
            </VStack>
          ) : (
            <form ref={formRef} noValidate onSubmit={onSubmit} aria-label="Confidential enquiry form">
              <VStack gap={6}>
                {prefill ? (
                  <p className={styles.prefillNote} role="status">
                    {prefill}
                  </p>
                ) : null}
                {errorCount > 0 ? (
                  <Banner
                    status="error"
                    title={errorCount === 1 ? 'One answer needs attention.' : `${errorCount} answers need attention.`}
                    role="alert"
                  />
                ) : null}
                <FormLayout defaultOptionality="required">
                  <Grid columns={{minWidth: 240, max: 2}} gap={5}>
                    <TextInput
                      label="Full name"
                      isRequired
                      autoComplete="name"
                      value={draft.name}
                      onChange={v => update('name', v)}
                      status={errorStatus(errors.name)}
                      statusVariant="detached"
                    />
                    <TextInput
                      label="Email"
                      type="email"
                      isRequired
                      autoComplete="email"
                      placeholder="name@example.com"
                      value={draft.email}
                      onChange={v => update('email', v)}
                      status={errorStatus(errors.email)}
                      statusVariant="detached"
                    />
                    <TextInput
                      label="Phone"
                      type="tel"
                      isOptional
                      autoComplete="tel"
                      description="Only needed if you would like a call."
                      value={draft.phone}
                      onChange={v => update('phone', v)}
                      status={errorStatus(errors.phone)}
                      statusVariant="detached"
                    />
                    <Selector
                      label="Practice area"
                      isRequired
                      placeholder="Choose an area"
                      options={practiceAreas.map(a => ({value: a.id, label: a.label}))}
                      value={draft.area || undefined}
                      onChange={v => update('area', v as PracticeId)}
                      status={errorStatus(errors.area)}
                      statusVariant="detached"
                      width="100%"
                    />
                  </Grid>
                  <RadioList
                    label="How should we reply?"
                    isRequired
                    orientation="horizontal"
                    value={draft.contact}
                    onChange={v => update('contact', v as EnquiryDraft['contact'])}
                    status={errorStatus(errors.contact)}>
                    <RadioListItem value="email" label="Email" />
                    <RadioListItem value="phone" label="Phone call" />
                  </RadioList>
                  <TextInput
                    label="Other party's name"
                    isOptional
                    autoComplete="off"
                    description="For a conflict-of-interest check, for example the seller or your former partner. Leave blank if not relevant."
                    value={draft.otherParty}
                    onChange={v => update('otherParty', v)}
                    statusVariant="detached"
                  />
                  <TextArea
                    label="How can we help?"
                    isRequired
                    rows={5}
                    maxLength={MESSAGE_MAX}
                    description="A short summary is enough. Please do not include sensitive personal or financial details."
                    value={draft.message}
                    onChange={v => update('message', v)}
                    status={errorStatus(errors.message)}
                    statusVariant="detached"
                  />
                  <CheckboxInput
                    label="I understand this is a concept demo, nothing is sent and nothing here is legal advice"
                    isRequired
                    value={draft.consent}
                    onChange={checked => update('consent', checked)}
                    status={errors.consent ? {type: 'error', message: errors.consent} : undefined}
                  />
                </FormLayout>
                <HStack gap={3} wrap="wrap" vAlign="center">
                  <Button type="submit" label="Send enquiry (demo)" variant="primary" size="lg" />
                  <Text type="supporting">Nothing is sent. Answers are checked in your browser only.</Text>
                </HStack>
              </VStack>
            </form>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
