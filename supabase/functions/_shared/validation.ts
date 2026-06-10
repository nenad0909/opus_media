const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PLAIN_FROM_RE = /^[^\s<>"']+@[^\s<>"']+\.[^\s<>"']+$/;
const EMBEDDED_EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

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

export function sanitizeResendAddressInput(value: unknown): string {
  return String(value ?? "")
    .replace(/[\u201C\u201D\u2018\u2019]/g, "")
    .replace(/[\r\n]+/g, "")
    .trim();
}

function stripWrappingQuotes(value: string): string {
  let cleaned = value.trim();
  while (
    (cleaned.startsWith('"') && cleaned.endsWith('"')) ||
    (cleaned.startsWith("'") && cleaned.endsWith("'"))
  ) {
    cleaned = cleaned.slice(1, -1).trim();
  }
  return cleaned;
}

/** Resend accepts `email@example.com` or `Name <email@example.com>`. */
export function formatResendFrom(value: unknown): string | null {
  let cleaned = stripWrappingQuotes(sanitizeResendAddressInput(value));
  if (!cleaned) return null;

  if (PLAIN_FROM_RE.test(cleaned)) return cleaned;

  const named = cleaned.match(/^(.+?)\s*<([^>]+)>$/);
  if (named) {
    const name = named[1].trim().replace(/^["']|["']$/g, "");
    const addr = named[2].trim().replace(/^["']|["']$/g, "");
    if (PLAIN_FROM_RE.test(addr)) return `${name} <${addr}>`;
  }

  const emailMatch = cleaned.match(EMBEDDED_EMAIL_RE);
  if (emailMatch) {
    const addr = emailMatch[0];
    const name = cleaned
      .replace(emailMatch[0], "")
      .replace(/[<>,"']/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (name) return `${name} <${addr}>`;
    return addr;
  }

  return null;
}

export function resolveResendFrom(candidates: unknown[]): string | null {
  for (const candidate of candidates) {
    const formatted = formatResendFrom(candidate);
    if (formatted) return formatted;
  }
  return null;
}

/** @deprecated Use formatResendFrom */
export function normalizeResendFrom(value: unknown): string {
  return formatResendFrom(value) ?? "";
}

/** Resend reply_to must be a plain email address. */
export function normalizeResendReplyTo(value: unknown): string {
  const formatted = formatResendFrom(value);
  if (!formatted) return "";

  const named = formatted.match(/<([^>]+)>/);
  if (named?.[1]) return named[1].trim().toLowerCase();

  return formatted.trim().toLowerCase();
}
