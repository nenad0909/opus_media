import { assertEquals } from "jsr:@std/assert@1";
import { buildTemplateValues, renderTemplate } from "./render-template.ts";

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
