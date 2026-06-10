const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const FIELD_LIMITS = {
  firstName: 80,
  businessName: 120,
  website: 200,
  message: 2000,
} as const;

export function normalizeEmail(value: unknown): string | null {
  const email = String(value ?? "").trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) return null;
  return email;
}

export function trimField(value: unknown, maxLength: number): string {
  return String(value ?? "").trim().slice(0, maxLength);
}
