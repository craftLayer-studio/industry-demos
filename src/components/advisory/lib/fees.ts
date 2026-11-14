/**
 * Illustrative fee estimator for the fictional Halden & Rowe demo.
 * All prices are invented sample figures, not a real quote or tariff.
 * Pure functions only: no React, no DOM.
 */

export type BusinessType = 'startup' | 'services' | 'commerce' | 'nonprofit';
export type ServiceId = 'bookkeeping' | 'year-end' | 'tax' | 'payroll' | 'fundraising' | 'cfo';
export type Billing = 'monthly' | 'annual';

export const BUSINESS_TYPES: {value: BusinessType; label: string; description: string; factor: number}[] = [
  {value: 'startup', label: 'Venture-backed startup', description: 'Investor reporting and fast change', factor: 1.15},
  {value: 'services', label: 'Services business', description: 'Agencies, studios and consultancies', factor: 1},
  {value: 'commerce', label: 'Retail or e-commerce', description: 'Stock, platforms and many small sales', factor: 1.2},
  {value: 'nonprofit', label: 'Non-profit', description: 'Restricted funds and board reporting', factor: 0.9},
];

export type ServicePrice = {
  id: ServiceId;
  label: string;
  /** Base monthly sample price in whole dollars, before the business-type factor. */
  base: number;
};

export const SERVICE_PRICES: ServicePrice[] = [
  {id: 'bookkeeping', label: 'Bookkeeping', base: 240},
  {id: 'year-end', label: 'Year-end accounts', base: 150},
  {id: 'tax', label: 'Tax planning support', base: 110},
  {id: 'payroll', label: 'Payroll', base: 60},
  {id: 'fundraising', label: 'Fundraising readiness', base: 650},
  {id: 'cfo', label: 'Fractional CFO', base: 2400},
];

export const LIMITS = {
  transactions: {min: 0, max: 2000, step: 50},
  employees: {min: 0, max: 250},
} as const;

/** Transactions included in the bookkeeping base price. */
export const INCLUDED_TRANSACTIONS = 100;
/** Sample price per extra block of 50 transactions. */
export const TRANSACTION_BLOCK = 50;
export const TRANSACTION_BLOCK_PRICE = 35;
/** Sample payroll price per employee per month. */
export const PAYROLL_PER_EMPLOYEE = 15;
/** Annual billing discount (illustrative). */
export const ANNUAL_DISCOUNT = 0.1;

export type EstimateInput = {
  businessType: BusinessType;
  transactions: number;
  employees: number;
  services: ServiceId[];
  billing: Billing;
};

export type EstimateLine = {
  id: ServiceId | 'discount';
  label: string;
  detail: string;
  /** Monthly amount in whole dollars. Negative for the discount line. */
  monthly: number;
};

export type Estimate = {
  lines: EstimateLine[];
  /** Monthly sum of service lines before any discount. */
  subtotal: number;
  discount: number;
  /** Effective monthly amount after any discount. */
  monthlyTotal: number;
  /** Amount for twelve months after any discount. */
  annualTotal: number;
  billing: Billing;
};

export function clampInt(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, Math.round(value)));
}

export function businessTypeFactor(type: BusinessType): number {
  return BUSINESS_TYPES.find(t => t.value === type)?.factor ?? 1;
}

/** Extra blocks of transactions beyond the included allowance. */
export function extraTransactionBlocks(transactions: number): number {
  const t = clampInt(transactions, LIMITS.transactions.min, LIMITS.transactions.max);
  return Math.max(0, Math.ceil((t - INCLUDED_TRANSACTIONS) / TRANSACTION_BLOCK));
}

function roundTo5(n: number): number {
  return Math.round(n / 5) * 5;
}

function plural(n: number, one: string, many = `${one}s`): string {
  return `${n.toLocaleString('en-US')} ${n === 1 ? one : many}`;
}

export function estimateFees(input: EstimateInput): Estimate {
  const factor = businessTypeFactor(input.businessType);
  const transactions = clampInt(input.transactions, LIMITS.transactions.min, LIMITS.transactions.max);
  const employees = clampInt(input.employees, LIMITS.employees.min, LIMITS.employees.max);
  const chosen = new Set(input.services);

  const lines: EstimateLine[] = [];
  for (const svc of SERVICE_PRICES) {
    if (!chosen.has(svc.id)) continue;
    let raw = svc.base;
    let detail = 'Sample monthly fee';
    if (svc.id === 'bookkeeping') {
      const blocks = extraTransactionBlocks(transactions);
      raw += blocks * TRANSACTION_BLOCK_PRICE;
      detail =
        blocks > 0
          ? `${plural(transactions, 'transaction')} a month (${INCLUDED_TRANSACTIONS} included)`
          : `Up to ${INCLUDED_TRANSACTIONS} transactions a month included`;
    } else if (svc.id === 'payroll') {
      raw += employees * PAYROLL_PER_EMPLOYEE;
      detail = employees > 0 ? `Base fee plus ${plural(employees, 'employee')}` : 'Base fee, no employees yet';
    } else if (svc.id === 'year-end') {
      detail = 'Annual accounts, spread monthly';
    } else if (svc.id === 'fundraising') {
      detail = 'While preparing for a raise';
    } else if (svc.id === 'cfo') {
      detail = 'Around two days a month';
    } else if (svc.id === 'tax') {
      detail = 'Planning sessions and deadline tracking';
    }
    lines.push({id: svc.id, label: svc.label, detail, monthly: roundTo5(raw * factor)});
  }

  const subtotal = lines.reduce((sum, l) => sum + l.monthly, 0);
  const discount = input.billing === 'annual' ? Math.round(subtotal * ANNUAL_DISCOUNT) : 0;
  if (discount > 0) {
    lines.push({
      id: 'discount',
      label: 'Annual billing',
      detail: `${Math.round(ANNUAL_DISCOUNT * 100)}% off when paid yearly`,
      monthly: -discount,
    });
  }
  const monthlyTotal = subtotal - discount;
  return {lines, subtotal, discount, monthlyTotal, annualTotal: monthlyTotal * 12, billing: input.billing};
}

const money = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 0});

export function formatMoney(amount: number): string {
  if (amount < 0) return `−${money.format(Math.abs(amount))}`;
  return money.format(amount);
}

/** Map an employee count to the consultation form's company-size options. */
export function sizeFromEmployees(employees: number): CompanySize {
  if (employees <= 1) return 'solo';
  if (employees <= 10) return '2-10';
  if (employees <= 50) return '11-50';
  return '51-250';
}

export type CompanySize = 'solo' | '2-10' | '11-50' | '51-250';
