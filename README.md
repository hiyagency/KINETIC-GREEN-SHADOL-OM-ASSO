# Kinetic Green Shahdol

Production-ready local showroom website for **Kinetic Green Shahdol**, managed by **Om Associates**. The site is built around the core Shahdol enquiry hook:

> बिना लाइसेंस, बिना RTO — शाहडोल की स्मार्ट इलेक्ट्रिक राइड

No Licence / No RTO claims are product-controlled and appear only when the admin marks a model eligible.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth, Database and Storage
- Framer Motion
- React Hook Form + Zod
- Server Actions and API routes
- Vercel-ready

## Product Import

Official Kinetic Green product data is imported from the current official React app API:

- List API discovered: `https://www.kineticgreen.com/api/admin/list_products.php`
- Detail API discovered: `https://www.kineticgreen.com/api/admin/manage_product.php?action=fetch&id=<id>`

Run:

```bash
npm run import:kinetic
```

This writes normalized data to:

- `src/lib/data/official-products.json`
- `scripts/official-products.snapshot.json`

Imported fields include product names, official URLs, images, gallery, brochure, variants/colors, specs, highlights and official 360 image sequences where available. If scraping/API access fails later, the script falls back to the snapshot and prints missing image/spec/360 fields.

Admin import route:

- `/admin/import`

It shows import status and can upsert bundled official products into Supabase after admin auth is configured.

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=
```

Use either `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Never expose the service role key in client code.

## Supabase Setup

1. Create the fresh Supabase project in the correct account.
2. Run `supabase/schema.sql` in the SQL editor.
3. Create an admin user in Supabase Auth.
4. Copy the user UUID.
5. Run:

```sql
insert into public.admin_users (user_id) values ('AUTH_USER_UUID_HERE');
```

Storage buckets:

- `vehicle-images`
- `showroom-gallery`
- `site-assets`

## Admin Routes

- `/admin/login`
- `/admin`
- `/admin/products`
- `/admin/products/new`
- `/admin/products/[id]/edit`
- `/admin/enquiries`
- `/admin/store`
- `/admin/homepage`
- `/admin/faqs`
- `/admin/policies`
- `/admin/gallery`
- `/admin/import`

## Admin Editable Fields

- Store name, managed by, address, timings
- Phone numbers, WhatsApp number/link, Instagram, Facebook
- Google Maps embed/link
- Homepage hero, banners, SEO metadata
- Product data, official URL, specs, badges
- Hero/gallery images
- 360 image sequence or embed URL
- No Licence / No RTO / Low Speed / Student Friendly flags
- Warranty, brochure, highlights
- FAQs, policies, gallery
- Enquiries and statuses

## Dynamic Contact Buttons

Major pages use dynamic store settings for:

- Call Now
- WhatsApp Now
- Book Test Ride
- Send Enquiry
- Get Price
- Get Directions
- Instagram
- Facebook placeholder through admin settings

WhatsApp messages change for product detail, no-licence landing and general enquiry.

## Vercel Deployment

1. Push to GitHub.
2. Import the repo in Vercel.
3. Add the env vars above.
4. Deploy.
5. Check `/`, `/no-licence-ev`, `/vehicles`, a product detail page, `/book-enquiry`, and `/admin/login`.

## GitHub Push

```bash
git status
git add .
git commit -m "Rebuild Kinetic Green Shahdol showroom website"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Manual Verification Still Needed

- Confirm which imported products are actually offered by the Shahdol branch.
- Verify no-licence/no-RTO eligibility model-wise with current government rules.
- Confirm warranty wording and official disclaimers.
- Add real showroom photos.
- Add final Google Maps embed/link.
- Add Facebook page URL.
- Confirm price display policy with the showroom.
