import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const digest = async (value: string) =>
  new Uint8Array(
    await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)),
  );

const secretsMatch = async (provided: string, expected: string) => {
  const [providedHash, expectedHash] = await Promise.all([
    digest(provided),
    digest(expected),
  ]);

  let difference = 0;
  for (let index = 0; index < expectedHash.length; index += 1) {
    difference |= providedHash[index] ^ expectedHash[index];
  }

  return difference === 0;
};

Deno.serve(async (request) => {
  if (request.method !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  const expectedSecret = Deno.env.get("KEEPALIVE_SECRET");
  const providedSecret = request.headers.get("x-keepalive-secret");

  if (!expectedSecret) {
    return json(500, { error: "Missing server configuration" });
  }

  if (!providedSecret || !(await secretsMatch(providedSecret, expectedSecret))) {
    return json(401, { error: "Unauthorized" });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    return json(500, { error: "Missing Supabase configuration" });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const { error } = await supabase
    .from("contact_inquiries")
    .select("id")
    .limit(1);

  if (error) {
    console.error("Keepalive database query failed", error.message);
    return json(500, { error: "Database query failed" });
  }

  return json(200, { ok: true });
});
