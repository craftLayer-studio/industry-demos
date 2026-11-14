/** Gift card builder validation. Demo only: no card is issued, nothing is charged. */

export const GIFT_MIN = 20;
export const GIFT_MAX = 500;
export const GIFT_MESSAGE_MAX = 160;
export const NAME_MAX = 60;

export type GiftDraft = {
  /** A preset amount as a string ("50"), or "custom". */
  amountChoice: string;
  customAmount: number | null;
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  message: string;
};

export type GiftErrors = Partial<Record<'customAmount' | 'recipientName' | 'recipientEmail' | 'senderName' | 'message', string>>;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** The amount the card would carry, or null if the custom amount is not set. */
export function giftAmount(d: Pick<GiftDraft, 'amountChoice' | 'customAmount'>): number | null {
  if (d.amountChoice === 'custom') return d.customAmount ?? null;
  const n = Number(d.amountChoice);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export function validateGift(d: GiftDraft): GiftErrors {
  const e: GiftErrors = {};
  if (d.amountChoice === 'custom') {
    const n = d.customAmount;
    if (n == null || Number.isNaN(n)) e.customAmount = `Enter an amount between £${GIFT_MIN} and £${GIFT_MAX}.`;
    else if (!Number.isInteger(n)) e.customAmount = 'Use whole pounds only.';
    else if (n < GIFT_MIN || n > GIFT_MAX) e.customAmount = `Choose between £${GIFT_MIN} and £${GIFT_MAX}.`;
  }
  const recipient = d.recipientName.trim();
  if (!recipient) e.recipientName = 'Enter who the gift card is for.';
  else if (recipient.length > NAME_MAX) e.recipientName = `Keep the name under ${NAME_MAX} characters.`;

  const email = d.recipientEmail.trim();
  if (email && !EMAIL_RE.test(email)) e.recipientEmail = 'Enter an email like name@example.com, or leave it blank.';

  const sender = d.senderName.trim();
  if (!sender) e.senderName = 'Enter your name so they know who it is from.';
  else if (sender.length > NAME_MAX) e.senderName = `Keep the name under ${NAME_MAX} characters.`;

  if (d.message.length > GIFT_MESSAGE_MAX) e.message = `Keep the message to ${GIFT_MESSAGE_MAX} characters.`;
  return e;
}

export function hasErrors(e: object): boolean {
  return Object.keys(e).length > 0;
}
