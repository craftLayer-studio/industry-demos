'use client';

import {useEffect, useRef, useState, type FormEvent} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Banner} from '@astryxdesign/core/Banner';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {ToggleButton, ToggleButtonGroup} from '@astryxdesign/core/ToggleButton';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {FormLayout} from '@astryxdesign/core/FormLayout';
import {SectionShell} from './SectionShell';
import {
  allocate,
  DEDICATION_MAX,
  DEFAULT_PRESET,
  EMPTY_DONATION,
  formatMoney,
  MAX_AMOUNT,
  MIN_AMOUNT,
  PRESETS,
  selectedAmount,
  validateDonation,
  yearlyTotal,
  type DonationDraft,
  type DonationErrors,
  type Frequency,
} from './lib/donation';
import {countErrors} from './lib/validation';
import styles from './nonprofit.module.css';

function errorStatus(message: string | undefined) {
  return message ? ({type: 'error', message} as const) : undefined;
}

type Confirmed = {amount: number; frequency: Frequency; name: string; dedication: string};

export function Donate() {
  const [draft, setDraft] = useState<DonationDraft>(EMPTY_DONATION);
  const [errors, setErrors] = useState<DonationErrors>({});
  const [attempt, setAttempt] = useState(0);
  const [confirmed, setConfirmed] = useState<Confirmed | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  function update<K extends keyof DonationDraft>(key: K, value: DonationDraft[K]) {
    setDraft(d => ({...d, [key]: value}));
    if (key in errors) setErrors(e => ({...e, [key]: undefined}));
  }

  function setFrequency(value: string) {
    const frequency = value as Frequency;
    // Keep a custom amount; otherwise move to the sensible default for the new frequency.
    setDraft(d => ({...d, frequency, preset: d.preset === 'custom' ? 'custom' : String(DEFAULT_PRESET[frequency])}));
  }

  useEffect(() => {
    if (attempt === 0) return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [attempt]);

  useEffect(() => {
    if (confirmed) doneRef.current?.focus();
  }, [confirmed]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateDonation(draft);
    setErrors(found);
    if (countErrors(found) > 0) {
      setAttempt(a => a + 1);
      return;
    }
    setConfirmed({
      amount: selectedAmount(draft) ?? 0,
      frequency: draft.frequency,
      name: draft.name.trim(),
      dedication: draft.hasDedication ? draft.dedicationName.trim() : '',
    });
  }

  function restart() {
    setDraft(EMPTY_DONATION);
    setErrors({});
    setConfirmed(null);
  }

  const amount = selectedAmount(draft);
  const monthly = draft.frequency === 'monthly';
  const errorCount = countErrors(errors);
  const food = amount ? allocate(amount)[0] : null;

  return (
    <SectionShell
      id="donate"
      tone="butter"
      eyebrow="Donate"
      title="Put something on the table"
      lead="Try the donation flow below. It is a demonstration only: there is no payment step, no money is taken and nothing you type is sent.">
      <div className={styles.donateGrid}>
        <VStack gap={5} className={styles.donateAside}>
          <div className={styles.summaryCard}>
            <Text as="p" color="inherit" className={styles.summaryLabel}>
              Your sample gift
            </Text>
            <p className={styles.summaryAmount}>
              {amount ? formatMoney(amount) : '–'}
              <span className={styles.summaryPer}>{monthly ? ' a month' : ' once'}</span>
            </p>
            <Text as="p" color="inherit">
              {amount
                ? monthly
                  ? `That is ${formatMoney(yearlyTotal(amount, 'monthly'))} over twelve months.`
                  : 'A single gift, with no repeat.'
                : 'Enter a valid amount to see a summary.'}
            </Text>
            {food ? (
              <Text as="p" type="supporting" color="inherit" className={styles.summaryNote}>
                Illustrative: in the sample model above, {formatMoney(food.amount)}
                {monthly ? ' a month' : ''} would go to food and pantry stock.
              </Text>
            ) : null}
          </div>
          <Text as="p" color="secondary">
            Monthly gifts are a good fit for food networks because they make stock easier to plan. In this concept,
            a monthly gift could be paused or cancelled at any time.
          </Text>
        </VStack>

        <div className={styles.formPanel}>
          {confirmed ? (
            <VStack gap={4} role="status">
              <Heading level={3} ref={doneRef} tabIndex={-1} className={styles.cardTitle}>
                Thank you, {confirmed.name}
              </Heading>
              <p className={styles.demoDone}>Demo only: no payment was taken and nothing was sent.</p>
              <Text as="p" color="secondary">
                You tried a {formatMoney(confirmed.amount)} {confirmed.frequency === 'monthly' ? 'monthly' : 'one-off'}{' '}
                gift
                {confirmed.dedication ? ` in honour of ${confirmed.dedication}` : ''}. On a real site this is where a
                secure payment provider would take over.
              </Text>
              <HStack>
                <Button label="Start again" onClick={restart} />
              </HStack>
            </VStack>
          ) : (
            <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby="donate-form-heading">
              <VStack gap={6}>
                <Heading level={3} id="donate-form-heading" className={styles.cardTitle}>
                  Choose a gift
                </Heading>
                {errorCount > 0 ? (
                  <Banner
                    status="error"
                    role="alert"
                    title={errorCount === 1 ? 'One answer needs attention.' : `${errorCount} answers need attention.`}
                  />
                ) : null}

                <SegmentedControl value={draft.frequency} onChange={setFrequency} label="How often" layout="fill">
                  <SegmentedControlItem value="once" label="One-off" />
                  <SegmentedControlItem value="monthly" label="Monthly" />
                </SegmentedControl>

                <fieldset className={styles.fieldset}>
                  <legend className={styles.legend}>Amount{monthly ? ' each month' : ''}</legend>
                  <ToggleButtonGroup
                    label={`Amount${monthly ? ' each month' : ''}`}
                    value={draft.preset}
                    onChange={v => {
                      if (typeof v === 'string') update('preset', v);
                    }}
                    size="lg"
                    className={styles.amountGroup}>
                    {PRESETS[draft.frequency].map(a => (
                      <ToggleButton key={a} value={String(a)} label={formatMoney(a)} />
                    ))}
                    <ToggleButton value="custom" label="Other" />
                  </ToggleButtonGroup>
                </fieldset>

                <FormLayout defaultOptionality="required">
                  {draft.preset === 'custom' ? (
                    <TextInput
                      label="Other amount (USD)"
                      description={`Between ${formatMoney(MIN_AMOUNT)} and ${formatMoney(MAX_AMOUNT)}, sample only.`}
                      value={draft.custom}
                      onChange={v => update('custom', v)}
                      inputMode="decimal"
                      placeholder="25"
                      htmlName="custom-amount"
                      status={errorStatus(errors.custom)}
                    />
                  ) : null}

                  <CheckboxInput
                    label="Dedicate this gift to someone"
                    description="Add a name and a short note."
                    value={draft.hasDedication}
                    onChange={v => update('hasDedication', v)}
                  />
                  {draft.hasDedication ? (
                    <>
                      <TextInput
                        label="In honour of"
                        value={draft.dedicationName}
                        onChange={v => update('dedicationName', v)}
                        placeholder="Gran Okafor"
                        status={errorStatus(errors.dedicationName)}
                      />
                      <TextArea
                        label="Note"
                        description={`${draft.dedicationNote.length} of ${DEDICATION_MAX} characters`}
                        value={draft.dedicationNote}
                        onChange={v => update('dedicationNote', v)}
                        maxLength={DEDICATION_MAX}
                        rows={2}
                        isOptional
                        status={errorStatus(errors.dedicationNote)}
                      />
                    </>
                  ) : null}

                  <TextInput
                    label="Your name"
                    value={draft.name}
                    onChange={v => update('name', v)}
                    autoComplete="name"
                    status={errorStatus(errors.name)}
                  />
                  <TextInput
                    label="Email"
                    type="email"
                    description="Use a made-up address such as you@example.com."
                    value={draft.email}
                    onChange={v => update('email', v)}
                    autoComplete="email"
                    status={errorStatus(errors.email)}
                  />
                </FormLayout>

                <VStack gap={2}>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    label={amount ? `Donate ${formatMoney(amount)}${monthly ? ' monthly' : ''} (demo)` : 'Donate (demo)'}
                  />
                  <Text as="p" type="supporting" color="secondary">
                    No card details are asked for. Common Table is fictional and cannot accept money.
                  </Text>
                </VStack>
              </VStack>
            </form>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
