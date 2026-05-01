create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  official_id text,
  name text not null,
  slug text unique not null,
  category text,
  official_url text,
  short_description text,
  long_description text,
  hero_image_url text,
  gallery_images jsonb default '[]'::jsonb,
  viewer_360_type text default 'placeholder',
  viewer_360_images jsonb default '[]'::jsonb,
  viewer_360_embed_url text,
  price_label text,
  battery_type text,
  range_label text,
  top_speed text,
  motor_power text,
  charging_time text,
  warranty text,
  variants jsonb default '[]'::jsonb,
  colors jsonb default '[]'::jsonb,
  specifications jsonb default '{}'::jsonb,
  highlights jsonb default '[]'::jsonb,
  no_licence_required boolean default false,
  no_rto_required boolean default false,
  low_speed_vehicle boolean default false,
  student_friendly boolean default false,
  eligibility_note text,
  disclaimer_text text,
  brochure_url text,
  import_status text default 'Needs review',
  is_featured boolean default false,
  is_published boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  whatsapp text,
  email text,
  selected_vehicle_id uuid references public.products(id) on delete set null,
  selected_vehicle_name text,
  enquiry_type text,
  preferred_visit_date date,
  city text,
  message text,
  consent boolean default false,
  status text default 'New',
  admin_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb not null,
  updated_at timestamptz default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text default 'General',
  product_id uuid references public.products(id) on delete cascade,
  is_published boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.policies (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content text,
  official_reference_url text,
  is_published boolean default true,
  updated_at timestamptz default now()
);

create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  type text default 'showroom',
  is_featured boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists enquiries_set_updated_at on public.enquiries;
create trigger enquiries_set_updated_at before update on public.enquiries
for each row execute function public.set_updated_at();

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at before update on public.site_settings
for each row execute function public.set_updated_at();

drop trigger if exists faqs_set_updated_at on public.faqs;
create trigger faqs_set_updated_at before update on public.faqs
for each row execute function public.set_updated_at();

drop trigger if exists policies_set_updated_at on public.policies;
create trigger policies_set_updated_at before update on public.policies
for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;
alter table public.products enable row level security;
alter table public.enquiries enable row level security;
alter table public.site_settings enable row level security;
alter table public.faqs enable row level security;
alter table public.policies enable row level security;
alter table public.gallery enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = auth.uid()
  );
$$;

drop policy if exists "Admins can read admin users" on public.admin_users;
create policy "Admins can read admin users" on public.admin_users
for select to authenticated using (public.is_admin());

drop policy if exists "Public can read published products" on public.products;
create policy "Public can read published products" on public.products
for select to anon, authenticated using (is_published = true);

drop policy if exists "Admins manage products" on public.products;
create policy "Admins manage products" on public.products
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public can insert enquiries" on public.enquiries;
create policy "Public can insert enquiries" on public.enquiries
for insert to anon, authenticated with check (true);

drop policy if exists "Admins manage enquiries" on public.enquiries;
create policy "Admins manage enquiries" on public.enquiries
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings" on public.site_settings
for select to anon, authenticated using (true);

drop policy if exists "Admins manage site settings" on public.site_settings;
create policy "Admins manage site settings" on public.site_settings
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public can read published faqs" on public.faqs;
create policy "Public can read published faqs" on public.faqs
for select to anon, authenticated using (is_published = true);

drop policy if exists "Admins manage faqs" on public.faqs;
create policy "Admins manage faqs" on public.faqs
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public can read published policies" on public.policies;
create policy "Public can read published policies" on public.policies
for select to anon, authenticated using (is_published = true);

drop policy if exists "Admins manage policies" on public.policies;
create policy "Admins manage policies" on public.policies
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public can read gallery" on public.gallery;
create policy "Public can read gallery" on public.gallery
for select to anon, authenticated using (true);

drop policy if exists "Admins manage gallery" on public.gallery;
create policy "Admins manage gallery" on public.gallery
for all to authenticated using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public)
values
  ('vehicle-images', 'vehicle-images', true),
  ('showroom-gallery', 'showroom-gallery', true),
  ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

drop policy if exists "Public can read public image buckets" on storage.objects;
create policy "Public can read public image buckets" on storage.objects
for select to anon, authenticated
using (bucket_id in ('vehicle-images', 'showroom-gallery', 'site-assets'));

drop policy if exists "Admins manage public image buckets" on storage.objects;
create policy "Admins manage public image buckets" on storage.objects
for all to authenticated
using (bucket_id in ('vehicle-images', 'showroom-gallery', 'site-assets') and public.is_admin())
with check (bucket_id in ('vehicle-images', 'showroom-gallery', 'site-assets') and public.is_admin());

insert into public.site_settings (key, value) values
  ('storeName', '"Kinetic Green Shahdol"'::jsonb),
  ('managedBy', '"Om Associates"'::jsonb),
  ('address', '"Om Associate, Kotma Tiraha, Badhganga Road, Shahdol (M.P)"'::jsonb),
  ('phones', '["9243016493","8349290500"]'::jsonb),
  ('whatsappNumber', '"919243016493"'::jsonb),
  ('whatsappUrl', '"https://www.whatsapp.com/catalog/919243016493/?app_absent=0&utm_source=ig"'::jsonb),
  ('instagramUrl', '"https://www.instagram.com/kinetic_green_shahdol/"'::jsonb),
  ('facebookUrl', '""'::jsonb),
  ('googleMapsEmbed', '""'::jsonb),
  ('googleMapsUrl', '""'::jsonb),
  ('storeHours', '"10:00 AM - 8:00 PM"'::jsonb),
  ('heroHeadline', '"बिना लाइसेंस, बिना RTO — शाहडोल की स्मार्ट इलेक्ट्रिक राइड"'::jsonb),
  ('heroSubheadline', '"Eligible low-speed Kinetic Green EVs for students, daily riders and local commuters."'::jsonb),
  ('heroImageUrl', '""'::jsonb),
  ('brandLine', '"Planet @ Our Heart"'::jsonb),
  ('footerCopy', '"Kinetic Green Shahdol by Om Associates. Official products, local enquiry, test ride and showroom support."'::jsonb),
  ('seoTitle', '"Kinetic Green Shahdol | No Licence EV Options"'::jsonb),
  ('seoDescription', '"Official Kinetic Green product-led showroom website for Shahdol enquiries, no-licence eligible low-speed EVs, test rides and WhatsApp contact."'::jsonb)
on conflict (key) do update set value = excluded.value;

insert into public.faqs (question, answer, category, sort_order) values
  ('क्या बिना licence के EV चला सकते हैं?', 'Selected low-speed EV models पर यह सुविधा लागू हो सकती है. Model, speed category, motor power और current government rules के अनुसार showroom से confirm करें.', 'No Licence', 1),
  ('क्या RTO registration जरूरी है?', 'हर model के लिए rule अलग हो सकता है. No RTO badge केवल उन products पर दिखाया गया है जहां admin ने eligibility enable की है.', 'No Licence', 2),
  ('कौनसे models no licence category में आते हैं?', 'No Licence EV page पर केवल वही models दिखेंगे जिनमें no_licence_required और no_rto_required दोनों true हैं.', 'Products', 3),
  ('Students के लिए कौनसा model best है?', 'Students के लिए low-speed, easy handling और local commute वाली requirements के हिसाब से showroom team model suggest करेगी.', 'Students', 4),
  ('Test ride कैसे book करें?', 'Call, WhatsApp या enquiry form से test ride request भेजें. Showroom team slot confirm करेगी.', 'Enquiry', 5),
  ('Price कैसे पता करें?', 'Product page पर Get Price या WhatsApp button दबाएं. Final price, offer और availability showroom से confirm होगी.', 'Enquiry', 6),
  ('Warranty क्या मिलेगी?', 'Warranty details model और current company policy पर depend करती हैं. Purchase से पहले showroom से written details confirm करें.', 'Warranty', 7),
  ('Battery कितने समय चलेगी?', 'Range, battery life और charging usage model, riding pattern और maintenance पर depend करते हैं.', 'Battery', 8),
  ('Showroom कहाँ है?', 'Om Associate, Kotma Tiraha, Badhganga Road, Shahdol (M.P).', 'Store', 9)
on conflict do nothing;

insert into public.policies (title, slug, content, official_reference_url) values
  ('No Online Payment', 'no-online-payment', 'This website does not collect online payments. All booking, price, finance, delivery, warranty, refund and cancellation details must be confirmed directly with Kinetic Green Shahdol.', ''),
  ('Licence / RTO Eligibility Disclaimer', 'licence-rto-disclaimer', 'यह सुविधा केवल selected low-speed EV models पर लागू हो सकती है. Model, speed category, motor power और current government rules के अनुसार eligibility बदल सकती है. Purchase से पहले showroom से confirm करें.', ''),
  ('Enquiry Policy', 'enquiry-policy', 'Submitted enquiry details are used by Kinetic Green Shahdol to contact you for price, test ride, finance, availability and product information.', '')
on conflict (slug) do nothing;

insert into public.gallery (image_url, caption, type, is_featured, sort_order) values
  ('', 'Showroom photo will be uploaded from admin', 'showroom', true, 1),
  ('', 'Kinetic Green Shahdol delivery and display photos', 'showroom', true, 2)
on conflict do nothing;

-- Product data import:
-- Run `npm run import:kinetic` locally to refresh src/lib/data/official-products.json.
-- After Supabase is connected, import that normalized JSON into public.products via the admin import flow or SQL upsert.
-- After creating an admin user in Supabase Auth, run:
-- insert into public.admin_users (user_id) values ('AUTH_USER_UUID_HERE');
