/** Shared, framework-free validation helpers for the Common Table forms. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

export function requireName(value: string, label = 'your name'): string | undefined {
  const v = value.trim();
  if (!v) return `Enter ${label}.`;
  if (v.length < 2) return 'Use at least 2 characters.';
  if (v.length > 80) return 'Use 80 characters or fewer.';
  return undefined;
}

export function requireEmail(value: string): string | undefined {
  if (!value.trim()) return 'Enter your email address.';
  if (!isValidEmail(value)) return 'Enter an email address like name@example.com.';
  return undefined;
}

export function hasErrors(errors: Record<string, string | undefined>): boolean {
  return Object.values(errors).some(Boolean);
}

export function countErrors(errors: Record<string, string | undefined>): number {
  return Object.values(errors).filter(Boolean).length;
}

export type NewsletterErrors = {email?: string};

export function validateNewsletter(email: string): NewsletterErrors {
  return {email: requireEmail(email)};
}
