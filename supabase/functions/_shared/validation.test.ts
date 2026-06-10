import { assertEquals } from "jsr:@std/assert@1";
import { normalizeEmail, trimField } from "./validation.ts";

Deno.test("normalizeEmail lowercases and validates", () => {
  assertEquals(normalizeEmail("  Hello@Example.COM "), "hello@example.com");
  assertEquals(normalizeEmail("not-an-email"), null);
});

Deno.test("trimField enforces max length", () => {
  assertEquals(trimField("  abcdefghij  ", 5), "abcde");
});
