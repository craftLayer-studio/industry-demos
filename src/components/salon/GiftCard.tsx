'use client';

import {useEffect, useRef, useState, type FormEvent} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {Banner} from '@astryxdesign/core/Banner';
import {FormLayout} from '@astryxdesign/core/FormLayout';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {NumberInput} from '@astryxdesign/core/NumberInput';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {SectionShell} from './SectionShell';
import {Frond} from './art';
import {giftAmounts} from './lib/data';
import {formatPrice} from './lib/format';
import {
  GIFT_MAX,
  GIFT_MESSAGE_MAX,
  GIFT_MIN,
  giftAmount,
  hasErrors,
  validateGift,
  type GiftDraft,
} from './lib/giftCard';
import styles from './salon.module.css';

const EMPTY: GiftDraft = {
  amountChoice: '50',
  customAmount: null,
  recipientName: '',
  recipientEmail: '',
  senderName: '',
  message: '',
};

function status(message: string | undefined) {
  return message ? ({type: 'error', message} as const) : undefined;
}

export function GiftCard() {
  const [draft, setDraft] = useState<GiftDraft>(EMPTY);
  const [showErrors, setShowErrors] = useState(false);
  const [done, setDone] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  const errors = showErrors ? validateGift(draft) : {};
  const amount = giftAmount(draft);

  useEffect(() => {
    if (attempt === 0) return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [attempt]);

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  function set<K extends keyof GiftDraft>(key: K, value: GiftDraft[K]) {
    setDraft(d => ({...d, [key]: value}));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowErrors(true);
    if (hasErrors(validateGift(draft))) {
      setAttempt(a => a + 1);
      return;
    }
    setDone(true);
  }

  function reset() {
    setDraft(EMPTY);
    setShowErrors(false);
    setDone(false);
  }

  return (
    <SectionShell
      id="gift-cards"
      eyebrow="Gift cards"
      title="Give an afternoon of calm"
      lead="Build a sample gift card and watch the preview update. This is a demo: no card is issued and nothing is charged."
      tone="petal">
      <div className={styles.giftGrid}>
        <Card padding={6} className={styles.giftFormCard}>
          {done ? (
            <VStack gap={5}>
              <Heading level={3} ref={doneRef} tabIndex={-1} className={styles.focusHeading}>
                Demo gift card ready
              </Heading>
              <Banner
                status="success"
                title="Nothing was charged and no card was issued"
                description="Fernlight is a fictional studio. Your details stayed in this browser tab and were not sent anywhere."
              />
              <Text as="p" color="secondary">
                In a real shop, {draft.recipientName.trim()} would receive a {formatPrice(amount ?? 0)} gift card from{' '}
                {draft.senderName.trim()} after payment.
              </Text>
              <HStack>
                <Button label="Build another" variant="primary" onClick={reset} />
              </HStack>
            </VStack>
          ) : (
            <form ref={formRef} noValidate onSubmit={onSubmit} aria-label="Gift card builder">
              <FormLayout defaultOptionality="required">
                <VStack gap={2}>
                  <Text type="label" as="p" id="gift-amount-label">
                    Amount
                  </Text>
                  <div className={styles.segmentTight}>
                  <SegmentedControl
                    label="Gift card amount"
                    value={draft.amountChoice}
                    layout="hug"
                    onChange={v => set('amountChoice', v)}>
                    {giftAmounts.map(a => (
                      <SegmentedControlItem key={a} value={String(a)} label={`£${a}`} />
                    ))}
                    <SegmentedControlItem value="custom" label="Custom" />
                  </SegmentedControl>
                  </div>
                </VStack>
                {draft.amountChoice === 'custom' ? (
                  <NumberInput
                    label="Custom amount"
                    description={`Whole pounds, £${GIFT_MIN} to £${GIFT_MAX}.`}
                    isRequired
                    value={draft.customAmount}
                    onChange={v => set('customAmount', v)}
                    units="GBP"
                    step={5}
                    status={status(errors.customAmount)}
                    statusVariant="detached"
                  />
                ) : null}
                <TextInput
                  label="Recipient name"
                  isRequired
                  autoComplete="off"
                  value={draft.recipientName}
                  onChange={v => set('recipientName', v)}
                  status={status(errors.recipientName)}
                  statusVariant="detached"
                />
                <TextInput
                  label="Recipient email"
                  isOptional
                  type="email"
                  autoComplete="off"
                  placeholder="name@example.com"
                  description="In this demo nothing is emailed."
                  value={draft.recipientEmail}
                  onChange={v => set('recipientEmail', v)}
                  status={status(errors.recipientEmail)}
                  statusVariant="detached"
                />
                <TextInput
                  label="From"
                  isRequired
                  autoComplete="off"
                  value={draft.senderName}
                  onChange={v => set('senderName', v)}
                  status={status(errors.senderName)}
                  statusVariant="detached"
                />
                <TextArea
                  label="Message"
                  isOptional
                  rows={3}
                  maxLength={GIFT_MESSAGE_MAX}
                  value={draft.message}
                  onChange={v => set('message', v)}
                  status={status(errors.message)}
                  statusVariant="detached"
                />
                <HStack gap={3} wrap="wrap" vAlign="center">
                  <Button type="submit" label="Create demo gift card" variant="primary" />
                  <Text type="supporting">Demo only. Nothing is charged.</Text>
                </HStack>
              </FormLayout>
            </form>
          )}
        </Card>
        <figure className={styles.giftPreviewWrap}>
          <div className={styles.giftPreview} aria-hidden="true">
            <svg viewBox="0 0 200 260" className={styles.giftArt} focusable="false">
              <Frond base={{x: 170, y: 270}} control={{x: 200, y: 150}} tip={{x: 120, y: 40}} pairs={13} length={44} />
            </svg>
            <span className={styles.giftBrand}>Fernlight</span>
            <span className={styles.giftAmount}>{amount ? formatPrice(amount) : '£ —'}</span>
            <span className={styles.giftTo}>For {draft.recipientName.trim() || 'someone lovely'}</span>
            <span className={styles.giftMessage}>
              {draft.message.trim() || 'Your message will appear here.'}
            </span>
            <span className={styles.giftFrom}>With love from {draft.senderName.trim() || 'you'}</span>
            <span className={styles.giftSample}>Sample card · not valid for use</span>
          </div>
          <figcaption className={styles.giftCaption}>
            Live preview: {amount ? formatPrice(amount) : 'no amount yet'} for{' '}
            {draft.recipientName.trim() || 'your recipient'}. Sample only, not a real gift card.
          </figcaption>
        </figure>
      </div>
    </SectionShell>
  );
}
