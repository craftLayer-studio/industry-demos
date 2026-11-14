/**
 * Subscription pricing for the Brightwater concept. Sample figures only:
 * nothing here is a real offer.
 */
import {sizeMultiplier, type BagSize, type Grind} from './cart';

export type Style = 'bright' | 'balanced' | 'rich' | 'decaf' | 'roasters-choice';
export type Frequency = 'weekly' | 'fortnightly' | 'monthly';

export const STYLES: {value: Style; label: string; description: string; base: number}[] = [
  {value: 'bright', label: 'Bright and fruity', description: 'Light roasts with floral, berry and citrus notes.', base: 1900},
  {value: 'balanced', label: 'Balanced and sweet', description: 'Medium roasts with caramel and chocolate.', base: 1650},
  {value: 'rich', label: 'Rich and dark', description: 'Heavier roasts for espresso and milk drinks.', base: 1500},
  {value: 'decaf', label: 'Decaf', description: 'A rotating decaf, sweet enough for late cups.', base: 1700},
  {value: 'roasters-choice', label: "Roaster's choice", description: 'Whatever is tasting best on the roast day.', base: 1800},
];

export const FREQUENCIES: {value: Frequency; label: string; perYear: number}[] = [
  {value: 'weekly', label: 'Every week', perYear: 52},
  {value: 'fortnightly', label: 'Every two weeks', perYear: 26},
  {value: 'monthly', label: 'Every month', perYear: 12},
];

/** Sample subscriber discount applied to each bag. */
export const SUBSCRIPTION_DISCOUNT = 0.1;

export type SubscriptionConfig = {
  style: Style;
  size: BagSize;
  bags: number;
  frequency: Frequency;
  grind: Grind;
};

export const DEFAULT_SUBSCRIPTION: SubscriptionConfig = {
  style: 'balanced',
  size: '250g',
  bags: 1,
  frequency: 'fortnightly',
  grind: 'whole',
};

export type SubscriptionQuote = {
  /** Full price per bag before the discount, cents. */
  listPerBag: number;
  perBag: number;
  perDelivery: number;
  deliveriesPerYear: number;
  /** Average monthly spend (per delivery x deliveries per year / 12), cents. */
  monthly: number;
  savingPerDelivery: number;
};

export function quoteSubscription(config: SubscriptionConfig): SubscriptionQuote {
  const style = STYLES.find(s => s.value === config.style) ?? STYLES[0];
  const frequency = FREQUENCIES.find(f => f.value === config.frequency) ?? FREQUENCIES[0];
  const bags = Math.min(3, Math.max(1, Math.round(config.bags)));
  const listPerBag = Math.round((style.base * sizeMultiplier(config.size)) / 5) * 5;
  const perBag = Math.round((listPerBag * (1 - SUBSCRIPTION_DISCOUNT)) / 5) * 5;
  const perDelivery = perBag * bags;
  return {
    listPerBag,
    perBag,
    perDelivery,
    deliveriesPerYear: frequency.perYear,
    monthly: Math.round((perDelivery * frequency.perYear) / 12),
    savingPerDelivery: (listPerBag - perBag) * bags,
  };
}
