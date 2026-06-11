const ALLOWED_PLACEHOLDERS = new Set([
  "FIRST_NAME",
  "AGENCY_NAME",
  "TAGLINE",
  "LOGO_URL",
  "HERO_IMAGE_URL",
  "BOOKING_URL",
  "WEBSITE_URL",
]);

const LEAD_NOTIFICATION_PLACEHOLDERS = new Set([
  "AGENCY_NAME",
  "WEBSITE_URL",
  "SUBMITTED_AT",
  "LEAD_FULL_NAME",
  "LEAD_FIRST_NAME",
  "LEAD_LAST_NAME",
  "LEAD_EMAIL",
  "LEAD_BUSINESS_NAME",
  "LEAD_WEBSITE",
  "LEAD_MESSAGE",
]);

export type LeadNotificationInput = {
  email: string;
  firstName: string;
  lastName: string;
  businessName: string;
  website: string;
  message: string;
  submittedAt: string;
};

export type TemplateValues = Record<string, string>;

export function buildTemplateValues(
  brandSettings: Record<string, string>,
  firstName: string,
  options: { html?: boolean } = {},
): TemplateValues {
  const trimmedName = firstName.trim();
  const safeName = options.html ? escapeHtml(trimmedName) : trimmedName;
  return {
    FIRST_NAME: safeName ? `, ${safeName}` : "",
    AGENCY_NAME: brandSettings.AGENCY_NAME ?? "",
    TAGLINE: brandSettings.TAGLINE ?? "",
    LOGO_URL: brandSettings.LOGO_URL ?? "",
    HERO_IMAGE_URL: brandSettings.HERO_IMAGE_URL ?? "",
    BOOKING_URL: brandSettings.BOOKING_URL ?? "",
    WEBSITE_URL: brandSettings.WEBSITE_URL ?? "",
  };
}

export function renderTemplate(template: string, values: TemplateValues): string {
  return template.replace(/\{\{([A-Z_]+)\}\}/g, (match, key: string) => {
    if (!ALLOWED_PLACEHOLDERS.has(key)) return match;
    return values[key] ?? "";
  });
}

function displayValue(value: string, html: boolean): string {
  const trimmed = value.trim();
  if (trimmed) return html ? escapeHtml(trimmed) : trimmed;
  return html ? "&mdash;" : "—";
}

function formatLeadWebsite(value: string, html: boolean): string {
  const trimmed = value.trim();
  if (!trimmed) return html ? "&mdash;" : "—";
  const safe = html ? escapeHtml(trimmed) : trimmed;
  if (!html) return safe;
  const href = trimmed.startsWith("http") ? escapeHtml(trimmed) : escapeHtml(`https://${trimmed}`);
  return `<a href="${href}" style="color:#d6ff3d;text-decoration:none;">${safe}</a>`;
}

export function buildLeadNotificationValues(
  lead: LeadNotificationInput,
  brandSettings: Record<string, string>,
  options: { html?: boolean } = {},
): TemplateValues {
  const html = options.html === true;
  const firstName = displayValue(lead.firstName, html);
  const lastName = displayValue(lead.lastName, html);
  const fullNameParts = [lead.firstName.trim(), lead.lastName.trim()].filter(Boolean);
  const fullName = fullNameParts.length
    ? (html ? escapeHtml(fullNameParts.join(" ")) : fullNameParts.join(" "))
    : (html ? "&mdash;" : "—");

  const message = lead.message.trim();
  const formattedMessage = message
    ? (html ? escapeHtml(message).replaceAll("\n", "<br>") : message)
    : (html ? "&mdash;" : "—");

  return {
    AGENCY_NAME: html ? escapeHtml(brandSettings.AGENCY_NAME ?? "") : (brandSettings.AGENCY_NAME ?? ""),
    WEBSITE_URL: html ? escapeHtml(brandSettings.WEBSITE_URL ?? "") : (brandSettings.WEBSITE_URL ?? ""),
    SUBMITTED_AT: html ? escapeHtml(lead.submittedAt) : lead.submittedAt,
    LEAD_FULL_NAME: fullName,
    LEAD_FIRST_NAME: firstName,
    LEAD_LAST_NAME: lastName,
    LEAD_EMAIL: html ? escapeHtml(lead.email) : lead.email,
    LEAD_BUSINESS_NAME: displayValue(lead.businessName, html),
    LEAD_WEBSITE: formatLeadWebsite(lead.website, html),
    LEAD_MESSAGE: formattedMessage,
  };
}

export function renderLeadNotificationTemplate(template: string, values: TemplateValues): string {
  return template.replace(/\{\{([A-Z_]+)\}\}/g, (match, key: string) => {
    if (!LEAD_NOTIFICATION_PLACEHOLDERS.has(key)) return match;
    return values[key] ?? "";
  });
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
