-- Remove hero image border and footer divider from consultation thank-you email

update public.email_templates set
  html_body = $html$
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
              <img src="{{LOGO_URL}}" alt="{{AGENCY_NAME}} logo" width="200" style="display:block;margin:0 auto;max-width:200px;height:auto;" />
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
              <p style="margin:0;font-size:15px;line-height:1.6;color:#c8cad4;">
                If you have questions before we meet, simply reply to this email and our team will get back to you.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:24px 32px 8px;background-color:#111520;">
              <img src="{{HERO_IMAGE_URL}}" alt="{{AGENCY_NAME}}" width="200" style="display:block;margin:0 auto;max-width:200px;height:auto;border:0;outline:none;" />
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 32px;">
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
  updated_at = now()
where template_key = 'consultation_thank_you';
