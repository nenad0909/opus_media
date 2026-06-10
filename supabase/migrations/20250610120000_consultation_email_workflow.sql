-- Consultation thank-you email workflow

create table if not exists public.consultation_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  first_name text,
  business_name text,
  website text,
  message text,
  source text not null default 'website-consultation-form',
  confirmation_sent_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists consultation_leads_email_created_at_idx
  on public.consultation_leads (email, created_at desc);

create table if not exists public.email_templates (
  template_key text primary key,
  subject text not null,
  html_body text not null,
  text_body text not null,
  is_active boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.brand_settings (
  setting_key text primary key,
  setting_value text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.email_send_log (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.consultation_leads (id) on delete set null,
  recipient text not null,
  template_key text not null,
  resend_email_id text,
  status text not null,
  error_message text,
  created_at timestamptz not null default now()
);

create index if not exists email_send_log_created_at_idx
  on public.email_send_log (created_at desc);

alter table public.consultation_leads enable row level security;
alter table public.email_templates enable row level security;
alter table public.brand_settings enable row level security;
alter table public.email_send_log enable row level security;

-- Seed brand settings (update URLs in Supabase after deploy)
insert into public.brand_settings (setting_key, setting_value) values
  ('AGENCY_NAME', 'OPUS Media Lab'),
  ('TAGLINE', 'A performance-driven digital marketing agency helping ambitious brands grow through strategy, creative, paid media, and conversion optimization.'),
  ('LOGO_URL', 'https://opusmedialab.com/assets/opus_logo.svg'),
  ('HERO_IMAGE_URL', 'https://opusmedialab.com/assets/contact_hero.png'),
  ('BOOKING_URL', 'REPLACE_WITH_BOOKING_URL'),
  ('WEBSITE_URL', 'https://opusmedialab.com'),
  ('SENDER_FROM', 'OPUS Media Lab <hello@opusmedialab.com>'),
  ('REPLY_TO_EMAIL', 'hello@opusmedialab.com')
on conflict (setting_key) do update set
  setting_value = excluded.setting_value,
  updated_at = now();

insert into public.email_templates (template_key, subject, html_body, text_body, is_active) values
(
  'consultation_thank_you',
  'Let''s schedule your free 30-minute consultation',
  $html$
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank you for reaching out</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0c12;font-family:Arial,Helvetica,sans-serif;color:#e8e8ec;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0c12;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#111520;border:1px solid #1e2433;">
          <tr>
            <td style="padding:32px 32px 24px;text-align:center;">
              <img src="{{LOGO_URL}}" alt="{{AGENCY_NAME}} logo" width="160" style="display:block;margin:0 auto;max-width:160px;height:auto;" />
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 24px;">
              <img src="{{HERO_IMAGE_URL}}" alt="Consultation with {{AGENCY_NAME}}" width="536" style="display:block;width:100%;max-width:536px;height:auto;border:1px solid #1e2433;" />
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 8px;">
              <h1 style="margin:0;font-size:26px;line-height:1.25;color:#ffffff;font-weight:700;">Thank you for reaching out{{FIRST_NAME}}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 16px;">
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#c8cad4;">
                We appreciate your interest in {{AGENCY_NAME}}. We would love to learn more about your business, your marketing goals, and where you want to grow next.
              </p>
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#c8cad4;">
                Your complimentary 30-minute consultation is a focused conversation about opportunities to strengthen your online presence, attract qualified leads, and support sustainable business growth.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:8px 32px 28px;">
              <a href="{{BOOKING_URL}}" style="display:inline-block;background-color:#d6ff3d;color:#0a0c12;font-size:15px;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:0;">Schedule My 30-Minute Consultation</a>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 24px;">
              <p style="margin:0;font-size:15px;line-height:1.6;color:#c8cad4;">
                If you have questions before we meet, simply reply to this email and our team will get back to you.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 32px;border-top:1px solid #1e2433;">
              <p style="margin:24px 0 8px;font-size:15px;line-height:1.5;color:#ffffff;font-weight:600;">The {{AGENCY_NAME}} Team</p>
              <p style="margin:0 0 16px;font-size:14px;line-height:1.5;color:#9aa0b0;">{{TAGLINE}}</p>
              <p style="margin:0;font-size:12px;line-height:1.5;color:#6b7280;">
                You received this email because you requested a consultation through <a href="{{WEBSITE_URL}}" style="color:#d6ff3d;">{{WEBSITE_URL}}</a>.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
$html$,
  $text$
Thank you for reaching out{{FIRST_NAME}}

We appreciate your interest in {{AGENCY_NAME}}. We would love to learn more about your business, your marketing goals, and where you want to grow next.

Your complimentary 30-minute consultation is a focused conversation about opportunities to strengthen your online presence, attract qualified leads, and support sustainable business growth.

Schedule your consultation:
{{BOOKING_URL}}

If you have questions before we meet, simply reply to this email and our team will get back to you.

— The {{AGENCY_NAME}} Team
{{TAGLINE}}

You received this email because you requested a consultation through {{WEBSITE_URL}}.
$text$,
  true
)
on conflict (template_key) do update set
  subject = excluded.subject,
  html_body = excluded.html_body,
  text_body = excluded.text_body,
  is_active = excluded.is_active,
  updated_at = now();

comment on table public.consultation_leads is 'Prospective client consultation requests from the website';
comment on table public.email_templates is 'Editable transactional email templates';
comment on table public.brand_settings is 'Agency branding and link settings for emails';
comment on table public.email_send_log is 'Resend delivery outcomes for consultation emails';
