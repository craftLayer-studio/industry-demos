/** Deterministic US-dollar formatting for sample prices (no locale surprises between server and browser). */
export function formatPrice(amount: number): string {
  const digits = String(Math.round(amount));
  let out = '';
  for (let i = 0; i < digits.length; i += 1) {
    if (i > 0 && (digits.length - i) % 3 === 0) out += ',';
    out += digits[i];
  }
  return `$${out}`;
}

/** Each of three equal monthly instalments, rounded up to the dollar. */
export function instalment(amount: number, parts = 3): number {
  return Math.ceil(amount / parts);
}
