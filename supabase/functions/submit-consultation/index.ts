import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { buildTemplateValues, renderTemplate } from "../_shared/render-template.ts";
import {
  FIELD_LIMITS,
  normalizeEmail,
  normalizeResendReplyTo,
  resolveResendFrom,
  trimField,
} from "../_shared/validation.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const DUPLICATE_WINDOW_MINUTES = 15;
const TEMPLATE_KEY = "consultation_thank_you";

type SubmissionPayload = {
  email?: string;
  firstName?: string;
  businessName?: string;
  website?: string;
  message?: string;
  companyWebsite?: string;
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function friendlyError(status: number) {
  const messages: Record<number, string> = {
    400: "Please check your details and try again.",
    405: "Method not allowed.",
    500: "We could not process your request right now. Please try again shortly.",
    502: "Your request was saved, but we could not send the confirmation email. Please contact us directly.",
  };
  return jsonResponse({ ok: false, error: messages[status] ?? "Something went wrong. Please try again." }, status);
}

async function logEmailAttempt(
  supabase: ReturnType<typeof createClient>,
  entry: {
    leadId: string | null;
    recipient: string;
    templateKey: string;
    status: string;
    resendEmailId?: string | null;
    errorMessage?: string | null;
  },
) {
  const { error } = await supabase.from("email_send_log").insert({
    lead_id: entry.leadId,
    recipient: entry.recipient,
    template_key: entry.templateKey,
    resend_email_id: entry.resendEmailId ?? null,
    status: entry.status,
    error_message: entry.errorMessage ?? null,
  });
  if (error) console.error("email_send_log insert failed:", error);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return friendlyError(405);
  }

  let payload: SubmissionPayload;
  try {
    payload = await req.json();
  } catch {
    return friendlyError(400);
  }

  const honeypot = String(payload.companyWebsite ?? "").trim();
  const websiteRaw = String(payload.website ?? "").trim();
  if (honeypot && honeypot.toLowerCase() !== websiteRaw.toLowerCase()) {
    return jsonResponse({ ok: true, message: "Thank you. Please check your email to schedule your consultation." });
  }

  const email = normalizeEmail(payload.email);
  if (!email) return friendlyError(400);

  const firstName = trimField(payload.firstName, FIELD_LIMITS.firstName);
  const businessName = trimField(payload.businessName, FIELD_LIMITS.businessName);
  const website = trimField(payload.website, FIELD_LIMITS.website);
  const message = trimField(payload.message, FIELD_LIMITS.message);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const resendApiKey = Deno.env.get("RESEND_API_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Missing Supabase server configuration");
    return friendlyError(500);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const duplicateSince = new Date(Date.now() - DUPLICATE_WINDOW_MINUTES * 60 * 1000).toISOString();
  const { data: recentLead } = await supabase
    .from("consultation_leads")
    .select("id, confirmation_sent_at")
    .eq("email", email)
    .not("confirmation_sent_at", "is", null)
    .gte("confirmation_sent_at", duplicateSince)
    .order("confirmation_sent_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (recentLead?.confirmation_sent_at) {
    return jsonResponse({
      ok: true,
      message: "Thank you. Please check your email to schedule your consultation.",
    });
  }

  const { data: lead, error: insertError } = await supabase
    .from("consultation_leads")
    .insert({
      email,
      first_name: firstName || null,
      business_name: businessName || null,
      website: website || null,
      message: message || null,
      source: "website-consultation-form",
    })
    .select("id")
    .single();

  if (insertError || !lead) {
    console.error("consultation_leads insert failed:", insertError);
    return friendlyError(500);
  }

  const leadId = lead.id as string;

  const [{ data: template, error: templateError }, { data: brandRows, error: brandError }] = await Promise.all([
    supabase
      .from("email_templates")
      .select("subject, html_body, text_body")
      .eq("template_key", TEMPLATE_KEY)
      .eq("is_active", true)
      .maybeSingle(),
    supabase.from("brand_settings").select("setting_key, setting_value"),
  ]);

  if (templateError || brandError || !template) {
    console.error("Template or brand settings load failed:", templateError, brandError);
    await logEmailAttempt(supabase, {
      leadId,
      recipient: email,
      templateKey: TEMPLATE_KEY,
      status: "failed",
      errorMessage: "Template or brand settings unavailable",
    });
    return friendlyError(500);
  }

  const brandSettings = Object.fromEntries(
    (brandRows ?? []).map((row) => [row.setting_key, row.setting_value]),
  ) as Record<string, string>;

  const resendReplyTo = normalizeResendReplyTo(
    Deno.env.get("RESEND_REPLY_TO") ?? brandSettings.REPLY_TO_EMAIL,
  );
  const agencyName = brandSettings.AGENCY_NAME ?? "OPUS Media Lab";

  // Try env secret, then brand_settings, then build from agency + reply email.
  const resendFrom = resolveResendFrom([
    Deno.env.get("RESEND_FROM"),
    brandSettings.SENDER_FROM,
    resendReplyTo ? `${agencyName} <${resendReplyTo}>` : null,
    resendReplyTo,
  ]) ?? "";

  const htmlValues = buildTemplateValues(brandSettings, firstName, { html: true });
  const textValues = buildTemplateValues(brandSettings, firstName);
  const subject = renderTemplate(template.subject, textValues);
  const html = renderTemplate(template.html_body, htmlValues);
  const text = renderTemplate(template.text_body, textValues);

  const missingResend: string[] = [];
  if (!resendApiKey) missingResend.push("RESEND_API_KEY");
  if (!resendFrom) missingResend.push("SENDER_FROM (brand_settings) or RESEND_FROM");
  if (!resendReplyTo) missingResend.push("REPLY_TO_EMAIL (brand_settings) or RESEND_REPLY_TO");

  if (missingResend.length) {
    const detail = `Resend not configured: missing ${missingResend.join(", ")}`;
    console.error(detail);
    await logEmailAttempt(supabase, {
      leadId,
      recipient: email,
      templateKey: TEMPLATE_KEY,
      status: "failed",
      errorMessage: detail,
    });
    return friendlyError(500);
  }

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: resendFrom,
      to: [email],
      reply_to: resendReplyTo,
      subject,
      html,
      text,
    }),
  });

  const resendBody = await resendRes.json().catch(() => ({}));

  if (!resendRes.ok) {
    const detail = typeof resendBody === "object" ? JSON.stringify(resendBody) : String(resendBody);
    console.error("Resend failed:", detail);
    await logEmailAttempt(supabase, {
      leadId,
      recipient: email,
      templateKey: TEMPLATE_KEY,
      status: "failed",
      errorMessage: detail.slice(0, 1000),
    });
    return friendlyError(502);
  }

  const resendEmailId = typeof resendBody?.id === "string" ? resendBody.id : null;
  const sentAt = new Date().toISOString();

  await Promise.all([
    supabase.from("consultation_leads").update({ confirmation_sent_at: sentAt }).eq("id", leadId),
    logEmailAttempt(supabase, {
      leadId,
      recipient: email,
      templateKey: TEMPLATE_KEY,
      status: "sent",
      resendEmailId,
    }),
  ]);

  return jsonResponse({
    ok: true,
    message: "Thank you. Please check your email to schedule your consultation.",
  });
});
