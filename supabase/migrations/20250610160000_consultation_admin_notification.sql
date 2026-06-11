-- Admin notification when a consultation form is submitted

alter table public.consultation_leads
  add column if not exists last_name text;

insert into public.brand_settings (setting_key, setting_value) values
  ('NOTIFICATION_TO', 'hello@opusmedialab.com')
on conflict (setting_key) do update set
  setting_value = excluded.setting_value,
  updated_at = now();

insert into public.email_templates (template_key, subject, html_body, text_body, is_active) values
(
  'consultation_admin_notify',
  'New consultation request from {{LEAD_FULL_NAME}}',
  $html$
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New consultation request</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0c12;font-family:Arial,Helvetica,sans-serif;color:#e8e8ec;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0c12;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#111520;border:1px solid #1e2433;">
          <tr>
            <td style="padding:32px 32px 16px;">
              <p style="margin:0 0 8px;font-family:monospace;font-size:11px;letter-spacing:0.14em;color:#d6ff3d;text-transform:uppercase;">New inquiry</p>
              <h1 style="margin:0;font-size:24px;line-height:1.3;color:#ffffff;font-weight:700;">Consultation form submission</h1>
              <p style="margin:12px 0 0;font-size:14px;line-height:1.5;color:#9aa0b0;">Submitted {{SUBMITTED_AT}} via {{WEBSITE_URL}}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #1e2433;">
                <tr>
                  <td style="padding:14px 16px;border-bottom:1px solid #1e2433;font-size:12px;color:#9aa0b0;text-transform:uppercase;letter-spacing:0.08em;width:34%;">Name</td>
                  <td style="padding:14px 16px;border-bottom:1px solid #1e2433;font-size:15px;color:#ffffff;">{{LEAD_FULL_NAME}}</td>
                </tr>
                <tr>
                  <td style="padding:14px 16px;border-bottom:1px solid #1e2433;font-size:12px;color:#9aa0b0;text-transform:uppercase;letter-spacing:0.08em;">Email</td>
                  <td style="padding:14px 16px;border-bottom:1px solid #1e2433;font-size:15px;color:#ffffff;"><a href="mailto:{{LEAD_EMAIL}}" style="color:#d6ff3d;text-decoration:none;">{{LEAD_EMAIL}}</a></td>
                </tr>
                <tr>
                  <td style="padding:14px 16px;border-bottom:1px solid #1e2433;font-size:12px;color:#9aa0b0;text-transform:uppercase;letter-spacing:0.08em;">Company</td>
                  <td style="padding:14px 16px;border-bottom:1px solid #1e2433;font-size:15px;color:#ffffff;">{{LEAD_BUSINESS_NAME}}</td>
                </tr>
                <tr>
                  <td style="padding:14px 16px;font-size:12px;color:#9aa0b0;text-transform:uppercase;letter-spacing:0.08em;">Website</td>
                  <td style="padding:14px 16px;font-size:15px;color:#ffffff;">{{LEAD_WEBSITE}}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 32px;">
              <p style="margin:0 0 10px;font-size:12px;color:#9aa0b0;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
              <div style="padding:16px;background:rgba(10,14,22,0.6);border:1px solid #1e2433;font-size:15px;line-height:1.6;color:#e8e8ec;white-space:pre-wrap;">{{LEAD_MESSAGE}}</div>
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
New consultation form submission
Submitted {{SUBMITTED_AT}} via {{WEBSITE_URL}}

Name: {{LEAD_FULL_NAME}}
Email: {{LEAD_EMAIL}}
Company: {{LEAD_BUSINESS_NAME}}
Website: {{LEAD_WEBSITE}}

Message:
{{LEAD_MESSAGE}}
$text$,
  true
)
on conflict (template_key) do update set
  subject = excluded.subject,
  html_body = excluded.html_body,
  text_body = excluded.text_body,
  is_active = excluded.is_active,
  updated_at = now();
