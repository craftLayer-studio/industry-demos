import {describe, expect, it} from 'vitest';
import {EMPTY_ENQUIRY, firstName, hasErrors, validateEnquiry, type EnquiryDraft} from './enquiry';

const valid: EnquiryDraft = {
  name: 'Sam Example',
  email: 'sam@example.com',
  phone: '',
  area: 'property',
  contact: 'email',
  otherParty: '',
  message: 'We are buying a leasehold flat and would like a quote.',
  consent: true,
};

describe('validateEnquiry', () => {
  it('flags every required field on an empty draft', () => {
    const e = validateEnquiry(EMPTY_ENQUIRY);
    expect(Object.keys(e).sort()).toEqual(['area', 'consent', 'contact', 'email', 'message', 'name']);
    expect(hasErrors(e)).toBe(true);
  });

  it('accepts a complete draft', () => {
    expect(hasErrors(validateEnquiry(valid))).toBe(false);
  });

  it('checks email format and message length', () => {
    expect(validateEnquiry({...valid, email: 'sam@'}).email).toMatch(/name@example.com/);
    expect(validateEnquiry({...valid, message: 'Too short'}).message).toMatch(/at least 20/);
    expect(validateEnquiry({...valid, message: 'x'.repeat(1001)}).message).toMatch(/under 1000/);
  });

  it('requires a phone number only when phone is the chosen reply method', () => {
    expect(validateEnquiry({...valid, contact: 'phone'}).phone).toMatch(/phone number/);
    expect(validateEnquiry({...valid, contact: 'phone', phone: '0555 010 0199'}).phone).toBeUndefined();
    expect(validateEnquiry({...valid, phone: 'call me'}).phone).toMatch(/digits/);
  });

  it('extracts a first name', () => {
    expect(firstName('  Sam   Example ')).toBe('Sam');
  });
});
