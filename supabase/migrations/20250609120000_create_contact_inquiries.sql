create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  company text,
  message text not null,
  consent boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.contact_inquiries enable row level security;

create index if not exists contact_inquiries_created_at_idx
  on public.contact_inquiries (created_at desc);

comment on table public.contact_inquiries is 'Contact form submissions from opusmedialab.com';
