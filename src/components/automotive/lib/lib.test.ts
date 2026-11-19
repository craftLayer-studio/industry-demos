import {describe, expect, it} from 'vitest';
import {DEFAULT_INPUT, SERVICES, engineApplies, estimate, formatMoney, formatRange, type EstimateInput} from './estimate';
import {SAMPLE_VEHICLES, formatPlate, hashPlate, normalisePlate, plateError, sampleVehicleFor} from './plate';
import {
  EMPTY_BOOKING,
  EMPTY_REMINDER,
  earliestBookingDate,
  firstError,
  hasErrors,
  isWorkshopDay,
  latestBookingDate,
  validateBooking,
  validateReminder,
  BOOKING_ORDER,
} from './validation';

const at = (patch: Partial<EstimateInput>) => estimate({...DEFAULT_INPUT, ...patch});

describe('estimate', () => {
  it('prices the default full service as a sample range', () => {
    const e = estimate(DEFAULT_INPUT);
    expect(e.ok).toBe(true);
    if (!e.ok) return;
    // 2 h at £72 = £144 labour + £92 parts = £236, +/- 12% rounded to £5.
    expect(e.items.map(i => i.amount)).toEqual([144, 92]);
    expect(e.low).toBe(210);
    expect(e.high).toBe(265);
    expect(formatRange(e)).toBe('£210 to £265');
  });

  it('charges a single fixed sample fee for an MOT regardless of vehicle', () => {
    const a = at({service: 'mot', vehicle: 'city'});
    const b = at({service: 'mot', vehicle: 'van', engine: 'large', fuel: 'diesel'});
    expect(a).toEqual(b);
    expect(a.ok && a.low === a.high && a.low === 45).toBe(true);
    expect(formatRange(a)).toBe('£45');
  });

  it('scales with vehicle class and engine size', () => {
    const city = at({vehicle: 'city', engine: 'small'});
    const suv = at({vehicle: 'suv', engine: 'large'});
    expect(city.ok && suv.ok).toBe(true);
    if (city.ok && suv.ok) expect(suv.high).toBeGreaterThan(city.high);
  });

  it('ignores engine size for electric cars and makes routine work cheaper', () => {
    const small = at({fuel: 'electric', engine: 'small'});
    const large = at({fuel: 'electric', engine: 'large'});
    const petrol = at({fuel: 'petrol'});
    expect(small).toEqual(large);
    if (small.ok && petrol.ok) expect(small.high).toBeLessThan(petrol.low);
    expect(engineApplies('electric')).toBe(false);
    expect(engineApplies('diesel')).toBe(true);
  });

  it('refuses the EV health check for petrol and diesel cars', () => {
    expect(at({service: 'ev', fuel: 'petrol'}).ok).toBe(false);
    expect(at({service: 'ev', fuel: 'diesel'}).ok).toBe(false);
    expect(at({service: 'ev', fuel: 'hybrid'}).ok).toBe(true);
    expect(formatRange(at({service: 'ev', fuel: 'petrol'}))).toBe('Not available');
  });

  it('always returns low <= high for every combination', () => {
    for (const service of SERVICES.map(s => s.value))
      for (const vehicle of ['city', 'family', 'suv', 'van'] as const)
        for (const engine of ['small', 'medium', 'large'] as const)
          for (const fuel of ['petrol', 'diesel', 'hybrid', 'electric'] as const) {
            const e = estimate({service, vehicle, engine, fuel});
            if (e.ok) {
              expect(e.low).toBeGreaterThan(0);
              expect(e.low).toBeLessThanOrEqual(e.high);
            }
          }
  });

  it('formats money in pounds', () => {
    expect(formatMoney(1234)).toBe('£1,234');
  });
});

describe('plate', () => {
  it('normalises and formats', () => {
    expect(normalisePlate(' ab12-cde ')).toBe('AB12CDE');
    expect(formatPlate('ab12cde')).toBe('AB12 CDE');
    expect(formatPlate('a1')).toBe('A1');
  });

  it('validates the plate shape', () => {
    expect(plateError('')).toMatch(/Enter a registration/);
    expect(plateError('A')).toMatch(/2 to 8/);
    expect(plateError('ABCDEFGHJ1')).toMatch(/2 to 8/);
    expect(plateError('ABCD')).toMatch(/one letter and one number/);
    expect(plateError('AB12 CDE')).toBeUndefined();
  });

  it('picks the same sample vehicle for the same plate, ignoring spacing and case', () => {
    expect(hashPlate('AB12 CDE')).toBe(hashPlate('ab12cde'));
    const v = sampleVehicleFor('AB12 CDE');
    expect(v).toBeDefined();
    expect(SAMPLE_VEHICLES).toContain(v);
    expect(sampleVehicleFor('ab12cde')).toBe(v);
    expect(sampleVehicleFor('nope')).toBeUndefined();
  });
});

describe('validation', () => {
  const today = new Date(2026, 10, 18); // Wednesday 18 November 2026

  it('requires every reminder field', () => {
    const e = validateReminder(EMPTY_REMINDER);
    expect(Object.keys(e).sort()).toEqual(['consent', 'email', 'month', 'plate']);
    expect(hasErrors(validateReminder({email: 'a@example.com', plate: 'AB12CDE', month: 'March', consent: true}))).toBe(false);
  });

  it('flags every required booking field and orders the first error', () => {
    const e = validateBooking(EMPTY_BOOKING, today);
    expect(Object.keys(e).sort()).toEqual(['consent', 'date', 'email', 'name', 'plate', 'service', 'slot']);
    expect(firstError(e, BOOKING_ORDER)).toBe('name');
  });

  it('enforces the booking window and closes on Sundays', () => {
    expect(earliestBookingDate(today)).toBe('2026-11-19');
    expect(latestBookingDate(today)).toBe('2027-01-13');
    expect(isWorkshopDay('2026-11-22')).toBe(false);
    const base = {
      ...EMPTY_BOOKING,
      name: 'Sam Driver',
      email: 'sam@example.com',
      plate: 'AB12 CDE',
      service: 'full',
      slot: '08:00',
      consent: true,
    };
    expect(validateBooking({...base, date: '2026-11-18'}, today).date).toMatch(/tomorrow/);
    expect(validateBooking({...base, date: '2026-11-22'}, today).date).toMatch(/Sundays/);
    expect(validateBooking({...base, date: '2027-03-01'}, today).date).toMatch(/eight weeks/);
    expect(validateBooking({...base, date: '2026-11-21'}, today)).toEqual({});
    expect(validateBooking({...base, date: '2026-11-21', phone: 'abc'}, today).phone).toBeDefined();
  });
});
