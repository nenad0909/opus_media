import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type ContactPayload = {
  first?: string;
  last?: string;
  email?: string;
  company?: string;
  message?: string;
  consent?: boolean;
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  let payload: ContactPayload;
  try {
    payload = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  const first = String(payload.first ?? "").trim();
  const last = String(payload.last ?? "").trim();
  const email = String(payload.email ?? "").trim().toLowerCase();
  const company = String(payload.company ?? "").trim();
  const message = String(payload.message ?? "").trim();
  const consent = Boolean(payload.consent);

  if (!first || !last || !email || !message || !consent) {
    return jsonResponse({ error: "Missing required fields" }, 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ error: "Invalid email address" }, 400);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const fromEmail = Deno.env.get("CONTACT_FROM_EMAIL");
  const toEmail = Deno.env.get("CONTACT_TO_EMAIL");

  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ error: "Server configuration error" }, 500);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { error: insertError } = await supabase.from("contact_inquiries").insert({
    first_name: first,
    last_name: last,
    email,
    company: company || null,
    message,
    consent,
  });

  if (insertError) {
    console.error("Supabase insert failed:", insertError);
    return jsonResponse({ error: "Failed to save inquiry" }, 500);
  }

  if (resendApiKey && fromEmail && toEmail) {
    const subject = `New inquiry from ${first} ${last}`;
    const html = `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(first)} ${escapeHtml(last)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(company || "—")}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replaceAll("\n", "<br>")}</p>
    `;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject,
        html,
      }),
    });

    if (!resendRes.ok) {
      const detail = await resendRes.text();
      console.error("Resend failed:", detail);
      return jsonResponse({ error: "Inquiry saved but notification email failed" }, 502);
    }
  }

  return jsonResponse({ ok: true });
});
