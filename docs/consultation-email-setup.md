# Consultation thank-you email setup

This project sends automated consultation thank-you emails through **Supabase Edge Functions** and **Resend** when a visitor submits the contact form at `/contact`.

## Architecture

```
Website contact form
  → POST /functions/v1/submit-consultation (public, no login)
  → validate + honeypot + duplicate protection
  → insert consultation_leads
  → load email_templates + brand_settings from Supabase
  → send HTML + plain-text email via Resend
  → log result in email_send_log
  → update consultation_leads.confirmation_sent_at on success
```

The browser never uses a Supabase service-role key or Resend API key.

## 1. Apply the Supabase migration

From the project root, using the Supabase CLI linked to project `odpdrcpazjqmmhwdvqnz`:

```bash
supabase db push
```

Or paste the SQL from these files into the Supabase SQL Editor (in order):

1. `supabase/migrations/20250609120000_create_contact_inquiries.sql` (legacy table, optional)
2. `supabase/migrations/20250610120000_consultation_email_workflow.sql` (required)

Tables created:

| Table | Purpose |
|-------|---------|
| `consultation_leads` | Saved consultation requests |
| `email_templates` | Editable HTML/text templates |
| `brand_settings` | Logo, hero, booking link, agency copy |
| `email_send_log` | Resend success/failure audit trail |

## 2. Upload logo and hero image (optional)

The migration seeds public URLs from the live site:

- Logo: `https://opusmedialab.com/assets/opus_logo.svg`
- Hero: `https://opusmedialab.com/assets/contact_hero.png`

To host assets in Supabase Storage instead:

1. Create a public bucket named `email-assets`.
2. Upload:
   - transparent PNG or SVG logo
   - optional wide consultation hero image (recommended 1200×630 or similar)
3. Copy each file’s public HTTPS URL.
4. Update `brand_settings`:

```sql
update public.brand_settings
set setting_value = 'https://odpdrcpazjqmmhwdvqnz.supabase.co/storage/v1/object/public/email-assets/opus_logo.svg',
    updated_at = now()
where setting_key = 'LOGO_URL';

update public.brand_settings
set setting_value = 'https://odpdrcpazjqmmhwdvqnz.supabase.co/storage/v1/object/public/email-assets/contact_hero.png',
    updated_at = now()
where setting_key = 'HERO_IMAGE_URL';
```

## 3. Update brand settings

```sql
select * from public.brand_settings order by setting_key;
```

| Key | Description |
|-----|-------------|
| `AGENCY_NAME` | Signature name in emails |
| `TAGLINE` | Footer tagline |
| `LOGO_URL` | Public HTTPS logo URL |
| `HERO_IMAGE_URL` | Public HTTPS hero image URL |
| `BOOKING_URL` | **Replace placeholder** — Calendly, Cal.com, etc. |
| `WEBSITE_URL` | Agency website |

Example booking URL update:

```sql
update public.brand_settings
set setting_value = 'https://calendly.com/your-team/30min',
    updated_at = now()
where setting_key = 'BOOKING_URL';
```

## 4. Edit the email template (no redeploy)

```sql
select template_key, subject, is_active, updated_at
from public.email_templates;

update public.email_templates
set html_body = '...',
    text_body = '...',
    subject = 'Let''s schedule your free 30-minute consultation',
    updated_at = now()
where template_key = 'consultation_thank_you';
```

Allowed placeholders:

- `{{FIRST_NAME}}`
- `{{AGENCY_NAME}}`
- `{{TAGLINE}}`
- `{{LOGO_URL}}`
- `{{HERO_IMAGE_URL}}`
- `{{BOOKING_URL}}`
- `{{WEBSITE_URL}}`

## 5. Verify a sending domain in Resend

1. Sign in at [resend.com](https://resend.com).
2. Add and verify `opusmedialab.com` (DNS records).
3. Until verification completes, you may use `onboarding@resend.dev` for testing only.

## 6. Create a Resend API key

Resend Dashboard → API Keys → Create API Key.

## 7. Configure Resend

### Option A — Supabase ↔ Resend integration (recommended)

If you connected Resend in the Resend dashboard (**Integrations → Connect to Supabase**), Supabase automatically sets `RESEND_API_KEY` for Edge Functions and configures Auth SMTP.

You do **not** need separate `RESEND_FROM` / `RESEND_REPLY_TO` secrets. Those come from `brand_settings`:

| Key | Default |
|-----|---------|
| `SENDER_FROM` | `OPUS Media Lab <hello@opusmedialab.com>` |
| `REPLY_TO_EMAIL` | `hello@opusmedialab.com` |

Update in SQL anytime:

```sql
update public.brand_settings set setting_value = 'OPUS Media Lab <hello@opusmedialab.com>', updated_at = now() where setting_key = 'SENDER_FROM';
update public.brand_settings set setting_value = 'hello@opusmedialab.com', updated_at = now() where setting_key = 'REPLY_TO_EMAIL';
```

Apply `supabase/migrations/20250610130000_add_email_sender_brand_settings.sql` if those rows are missing.

### Option B — Manual API key only

```bash
supabase secrets set RESEND_API_KEY=re_xxxxxxxx --project-ref odpdrcpazjqmmhwdvqnz
```

Optional overrides: `RESEND_FROM`, `RESEND_REPLY_TO` in Edge Function secrets.

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are provided automatically to Edge Functions.

## 8. Deploy the Edge Function

`supabase/config.toml` disables JWT verification **only** for `submit-consultation`:

```toml
[functions.submit-consultation]
verify_jwt = false
```

Deploy:

```bash
supabase functions deploy submit-consultation --project-ref odpdrcpazjqmmhwdvqnz
```

## 9. Configure the frontend `.env`

```env
VITE_SUPABASE_URL=https://odpdrcpazjqmmhwdvqnz.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
VITE_SUBMIT_CONSULTATION_URL=https://odpdrcpazjqmmhwdvqnz.supabase.co/functions/v1/submit-consultation
```

Restart the dev server:

```bash
npm run dev
```

## 10. Test the endpoint

```bash
curl -X POST "https://odpdrcpazjqmmhwdvqnz.supabase.co/functions/v1/submit-consultation" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_PUBLISHABLE_KEY" \
  -H "apikey: YOUR_PUBLISHABLE_KEY" \
  -d '{
    "email": "you@example.com",
    "firstName": "Test",
    "businessName": "Example Co",
    "message": "Interested in a consultation."
  }'
```

Expected success response:

```json
{
  "ok": true,
  "message": "Thank you. Please check your email to schedule your consultation."
}
```

## 11. Test the website form

1. Run `npm run dev`.
2. Open `/contact`.
3. Submit the form with a real inbox you control.
4. Confirm the thank-you email arrives with the booking button.

## 12. Review delivery logs

```sql
select
  l.created_at,
  l.recipient,
  l.status,
  l.resend_email_id,
  l.error_message,
  c.email,
  c.confirmation_sent_at
from public.email_send_log l
left join public.consultation_leads c on c.id = l.lead_id
order by l.created_at desc
limit 50;
```

## Placeholders still requiring manual replacement

| Item | Current value | Action |
|------|---------------|--------|
| `BOOKING_URL` | `REPLACE_WITH_BOOKING_URL` | Set your Calendly/Cal.com link |
| `RESEND_API_KEY` | not in repo | Add as Edge Function secret |
| `RESEND_FROM` | not in repo | Use verified Resend sender |
| `RESEND_REPLY_TO` | not in repo | Set team inbox |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | in local `.env` only | Keep out of git |

## Local validation commands

```bash
npm run build
deno test supabase/functions/_shared/
```

No lint or typecheck scripts are configured in this repository yet.
