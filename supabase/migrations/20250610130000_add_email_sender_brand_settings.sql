insert into public.brand_settings (setting_key, setting_value) values
  ('SENDER_FROM', 'OPUS Media Lab <hello@opusmedialab.com>'),
  ('REPLY_TO_EMAIL', 'hello@opusmedialab.com')
on conflict (setting_key) do update set
  setting_value = excluded.setting_value,
  updated_at = now();
