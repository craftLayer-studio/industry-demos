import {describe, expect, it} from 'vitest';
import {
  clampInt,
  estimateFees,
  extraTransactionBlocks,
  formatMoney,
  sizeFromEmployees,
  type EstimateInput,
} from './fees';

const base: EstimateInput = {
  businessType: 'services',
  transactions: 100,
  employees: 0,
  services: ['bookkeeping'],
  billing: 'monthly',
};

describe('estimateFees', () => {
  it('prices bookkeeping within the included allowance at the base fee', () => {
    const e = estimateFees(base);
    expect(e.lines).toHaveLength(1);
    expect(e.lines[0]).toMatchObject({id: 'bookkeeping', monthly: 240});
    expect(e.monthlyTotal).toBe(240);
    expect(e.annualTotal).toBe(2880);
    expect(e.discount).toBe(0);
  });

  it('adds transaction blocks beyond the allowance', () => {
    expect(extraTransactionBlocks(100)).toBe(0);
    expect(extraTransactionBlocks(101)).toBe(1);
    expect(extraTransactionBlocks(400)).toBe(6);
    const e = estimateFees({...base, transactions: 400});
    expect(e.lines[0].monthly).toBe(240 + 6 * 35);
    expect(e.lines[0].detail).toMatch(/400 transactions/);
  });

  it('prices payroll per employee', () => {
    const e = estimateFees({...base, services: ['payroll'], employees: 8});
    expect(e.lines[0].monthly).toBe(60 + 8 * 15);
    expect(e.lines[0].detail).toBe('Base fee plus 8 employees');
    expect(estimateFees({...base, services: ['payroll'], employees: 1}).lines[0].detail).toBe(
      'Base fee plus 1 employee',
    );
  });

  it('applies the business-type factor and rounds to $5', () => {
    const e = estimateFees({...base, businessType: 'commerce', services: ['tax']});
    // 110 * 1.2 = 132 -> 130
    expect(e.lines[0].monthly).toBe(130);
    const np = estimateFees({...base, businessType: 'nonprofit', services: ['cfo']});
    expect(np.lines[0].monthly).toBe(2160);
  });

  it('keeps service lines in a stable order regardless of selection order', () => {
    const e = estimateFees({...base, services: ['cfo', 'bookkeeping', 'payroll']});
    expect(e.lines.map(l => l.id)).toEqual(['bookkeeping', 'payroll', 'cfo']);
    expect(e.subtotal).toBe(240 + 60 + 2400);
  });

  it('adds an annual discount line and totals', () => {
    const e = estimateFees({...base, services: ['bookkeeping', 'year-end'], billing: 'annual'});
    expect(e.subtotal).toBe(390);
    expect(e.discount).toBe(39);
    expect(e.lines.at(-1)).toMatchObject({id: 'discount', monthly: -39});
    expect(e.monthlyTotal).toBe(351);
    expect(e.annualTotal).toBe(351 * 12);
  });

  it('returns an empty estimate when no services are chosen', () => {
    const e = estimateFees({...base, services: [], billing: 'annual'});
    expect(e.lines).toEqual([]);
    expect(e.monthlyTotal).toBe(0);
  });

  it('clamps out-of-range and non-numeric inputs', () => {
    expect(clampInt(-5, 0, 10)).toBe(0);
    expect(clampInt(12.6, 0, 10)).toBe(10);
    expect(clampInt(Number.NaN, 0, 10)).toBe(0);
    const e = estimateFees({...base, services: ['payroll'], employees: 9999});
    expect(e.lines[0].monthly).toBe(60 + 250 * 15);
  });
});

describe('formatting helpers', () => {
  it('formats whole dollars with a true minus sign', () => {
    expect(formatMoney(2880)).toBe('$2,880');
    expect(formatMoney(-39)).toBe('−$39');
  });

  it('maps employees to a company size', () => {
    expect(sizeFromEmployees(0)).toBe('solo');
    expect(sizeFromEmployees(7)).toBe('2-10');
    expect(sizeFromEmployees(40)).toBe('11-50');
    expect(sizeFromEmployees(120)).toBe('51-250');
  });
});
