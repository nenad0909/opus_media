import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import {
  buildLeadNotificationValues,
  buildTemplateValues,
  renderLeadNotificationTemplate,
  renderTemplate,
} from "../_shared/render-template.ts";
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
const THANK_YOU_TEMPLATE_KEY = "consultation_thank_you";
const ADMIN_TEMPLATE_KEY = "consultation_admin_notify";

type SubmissionPayload = {
  email?: string;
  firstName?: string;
  lastName?: string;
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

async function sendResendEmail(
  resendApiKey: string,
  payload: {
    from: string;
    to: string[];
    replyTo?: string;
    subject: string;
    html: string;
    text: string;
  },
): Promise<{ ok: true; id: string | null } | { ok: false; detail: string }> {
  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: payload.from,
      to: payload.to,
      reply_to: payload.replyTo,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    }),
  });

  const resendBody = await resendRes.json().catch(() => ({}));
  if (!resendRes.ok) {
    const detail = typeof resendBody === "object" ? JSON.stringify(resendBody) : String(resendBody);
    return { ok: false, detail: detail.slice(0, 1000) };
  }

  const resendEmailId = typeof resendBody?.id === "string" ? resendBody.id : null;
  return { ok: true, id: resendEmailId };
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
  const lastName = trimField(payload.lastName, FIELD_LIMITS.lastName);
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
      message:
        "Thank you. We already sent a confirmation email to this address — please check your inbox and spam folder. You can submit again with the same email after 15 minutes if needed.",
    });
  }

  const { data: lead, error: insertError } = await supabase
    .from("consultation_leads")
    .insert({
      email,
      first_name: firstName || null,
      last_name: lastName || null,
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

  const [
    { data: thankYouTemplate, error: thankYouTemplateError },
    { data: adminTemplate, error: adminTemplateError },
    { data: brandRows, error: brandError },
  ] = await Promise.all([
    supabase
      .from("email_templates")
      .select("subject, html_body, text_body")
      .eq("template_key", THANK_YOU_TEMPLATE_KEY)
      .eq("is_active", true)
      .maybeSingle(),
    supabase
      .from("email_templates")
      .select("subject, html_body, text_body")
      .eq("template_key", ADMIN_TEMPLATE_KEY)
      .eq("is_active", true)
      .maybeSingle(),
    supabase.from("brand_settings").select("setting_key, setting_value"),
  ]);

  if (thankYouTemplateError || brandError || !thankYouTemplate) {
    console.error("Template or brand settings load failed:", thankYouTemplateError, brandError);
    await logEmailAttempt(supabase, {
      leadId,
      recipient: email,
      templateKey: THANK_YOU_TEMPLATE_KEY,
      status: "failed",
      errorMessage: "Template or brand settings unavailable",
    });
    return friendlyError(500);
  }

  if (adminTemplateError) {
    console.error("Admin template load failed:", adminTemplateError);
  }

  const brandSettings = Object.fromEntries(
    (brandRows ?? []).map((row) => [row.setting_key, row.setting_value]),
  ) as Record<string, string>;

  const resendReplyTo = normalizeResendReplyTo(
    Deno.env.get("RESEND_REPLY_TO") ?? brandSettings.REPLY_TO_EMAIL,
  );
  const agencyName = brandSettings.AGENCY_NAME ?? "OPUS Media Lab";
  const notificationTo = normalizeResendReplyTo(
    Deno.env.get("ADMIN_NOTIFICATION_TO") ?? brandSettings.NOTIFICATION_TO ?? "hello@opusmedialab.com",
  );

  const resendFrom = resolveResendFrom([
    Deno.env.get("RESEND_FROM"),
    brandSettings.SENDER_FROM,
    resendReplyTo ? `${agencyName} <${resendReplyTo}>` : null,
    resendReplyTo,
  ]) ?? "";

  const htmlValues = buildTemplateValues(brandSettings, firstName, { html: true });
  const textValues = buildTemplateValues(brandSettings, firstName);
  const thankYouSubject = renderTemplate(thankYouTemplate.subject, textValues);
  const thankYouHtml = renderTemplate(thankYouTemplate.html_body, htmlValues);
  const thankYouText = renderTemplate(thankYouTemplate.text_body, textValues);

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
      templateKey: THANK_YOU_TEMPLATE_KEY,
      status: "failed",
      errorMessage: detail,
    });
    return friendlyError(500);
  }

  const thankYouResult = await sendResendEmail(resendApiKey, {
    from: resendFrom,
    to: [email],
    replyTo: resendReplyTo,
    subject: thankYouSubject,
    html: thankYouHtml,
    text: thankYouText,
  });

  if (!thankYouResult.ok) {
    console.error("Resend failed:", thankYouResult.detail);
    await logEmailAttempt(supabase, {
      leadId,
      recipient: email,
      templateKey: THANK_YOU_TEMPLATE_KEY,
      status: "failed",
      errorMessage: thankYouResult.detail,
    });
    return friendlyError(502);
  }

  const sentAt = new Date().toISOString();

  await Promise.all([
    supabase.from("consultation_leads").update({ confirmation_sent_at: sentAt }).eq("id", leadId),
    logEmailAttempt(supabase, {
      leadId,
      recipient: email,
      templateKey: THANK_YOU_TEMPLATE_KEY,
      status: "sent",
      resendEmailId: thankYouResult.id,
    }),
  ]);

  if (adminTemplate && notificationTo) {
    const submittedAt = new Date(sentAt).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "America/Los_Angeles",
    });

    const leadInput = {
      email,
      firstName,
      lastName,
      businessName,
      website,
      message,
      submittedAt,
    };

    const adminHtmlValues = buildLeadNotificationValues(leadInput, brandSettings, { html: true });
    const adminTextValues = buildLeadNotificationValues(leadInput, brandSettings);
    const adminSubject = renderLeadNotificationTemplate(adminTemplate.subject, adminTextValues);
    const adminHtml = renderLeadNotificationTemplate(adminTemplate.html_body, adminHtmlValues);
    const adminText = renderLeadNotificationTemplate(adminTemplate.text_body, adminTextValues);

    const adminResult = await sendResendEmail(resendApiKey, {
      from: resendFrom,
      to: [notificationTo],
      replyTo: email,
      subject: adminSubject,
      html: adminHtml,
      text: adminText,
    });

    await logEmailAttempt(supabase, {
      leadId,
      recipient: notificationTo,
      templateKey: ADMIN_TEMPLATE_KEY,
      status: adminResult.ok ? "sent" : "failed",
      resendEmailId: adminResult.ok ? adminResult.id : null,
      errorMessage: adminResult.ok ? null : adminResult.detail,
    });

    if (!adminResult.ok) {
      console.error("Admin notification failed:", adminResult.detail);
    }
  } else {
    console.error("Admin notification skipped: template or NOTIFICATION_TO unavailable");
  }

  return jsonResponse({
    ok: true,
    message: "Thank you. Please check your email to schedule your consultation.",
  });
});
