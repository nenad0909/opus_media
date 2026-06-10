import { assertEquals } from "jsr:@std/assert@1";
import {
  formatResendFrom,
  normalizeEmail,
  normalizeResendReplyTo,
  resolveResendFrom,
  trimField,
} from "./validation.ts";

Deno.test("normalizeEmail lowercases and validates", () => {
  assertEquals(normalizeEmail("  Hello@Example.COM "), "hello@example.com");
  assertEquals(normalizeEmail("not-an-email"), null);
});

Deno.test("trimField enforces max length", () => {
  assertEquals(trimField("  abcdefghij  ", 5), "abcde");
});

Deno.test("formatResendFrom strips wrapping quotes", () => {
  assertEquals(
    formatResendFrom('"OPUS Media Lab <hello@opusmedialab.com>"'),
    "OPUS Media Lab <hello@opusmedialab.com>",
  );
});

Deno.test("resolveResendFrom skips invalid env and uses fallback", () => {
  assertEquals(
    resolveResendFrom([
      "not-an-email",
      "OPUS Media Lab <hello@opusmedialab.com>",
    ]),
    "OPUS Media Lab <hello@opusmedialab.com>",
  );
});

Deno.test("normalizeResendReplyTo extracts plain email", () => {
  assertEquals(
    normalizeResendReplyTo("OPUS Media Lab <hello@opusmedialab.com>"),
    "hello@opusmedialab.com",
  );
});
