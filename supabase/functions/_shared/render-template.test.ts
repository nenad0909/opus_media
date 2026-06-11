import { assertEquals } from "jsr:@std/assert@1";
import {
  buildLeadNotificationValues,
  buildTemplateValues,
  renderLeadNotificationTemplate,
  renderTemplate,
} from "./render-template.ts";

Deno.test("renderTemplate replaces only allowlisted placeholders", () => {
  const html = "<p>Hello{{FIRST_NAME}} from {{AGENCY_NAME}} and {{UNKNOWN}}</p>";
  const values = buildTemplateValues({ AGENCY_NAME: "OPUS Media Lab" }, "Alex");
  const rendered = renderTemplate(html, values);
  assertEquals(rendered, "<p>Hello, Alex from OPUS Media Lab and {{UNKNOWN}}</p>");
});

Deno.test("buildTemplateValues omits first name when blank", () => {
  const values = buildTemplateValues({ AGENCY_NAME: "OPUS Media Lab" }, "  ");
  assertEquals(values.FIRST_NAME, "");
});

Deno.test("renderLeadNotificationTemplate replaces lead placeholders", () => {
  const values = buildLeadNotificationValues(
    {
      email: "alex@example.com",
      firstName: "Alex",
      lastName: "Kim",
      businessName: "Acme Co",
      website: "https://acme.test",
      message: "Hello\nWorld",
      submittedAt: "Jun 10, 2026, 11:00 AM",
    },
    { AGENCY_NAME: "OPUS Media Lab", WEBSITE_URL: "https://opusmedialab.com" },
    { html: true },
  );
  const rendered = renderLeadNotificationTemplate(
    "From {{LEAD_FULL_NAME}} <{{LEAD_EMAIL}}>: {{LEAD_MESSAGE}}",
    values,
  );
  assertEquals(rendered, "From Alex Kim <alex@example.com>: Hello<br>World");
});
