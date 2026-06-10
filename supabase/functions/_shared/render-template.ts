const ALLOWED_PLACEHOLDERS = new Set([
  "FIRST_NAME",
  "AGENCY_NAME",
  "TAGLINE",
  "LOGO_URL",
  "HERO_IMAGE_URL",
  "BOOKING_URL",
  "WEBSITE_URL",
]);

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

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
