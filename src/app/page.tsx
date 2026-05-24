import type { Metadata } from "next";
import { BatteryCharging, BadgeIndianRupee, HandCoins, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { ContactActions } from "@/components/showroom/ContactActions";
import { ProductCarousel } from "@/components/showroom/ProductCarousel";
import { ProductLeadCard } from "@/components/showroom/ProductCard";
import { FAQAccordion } from "@/components/public/FAQAccordion";
import { GallerySection } from "@/components/public/GallerySection";
import { MapPlaceholder } from "@/components/public/MapPlaceholder";
import { Reveal } from "@/components/public/Motion";
import { ButtonLink } from "@/components/ui/Button";
import {
  HINGLISH_DISCLAIMER,
  LOCAL_SERVICE_AREAS,
  LOW_SPEED_RULE_HINGLISH,
  PUBLIC_HERO_TITLE,
  PUBLIC_POSITIONING,
} from "@/lib/constants";
import { getEligibleProducts, getFaqs, getGallery, getProducts, getStoreSettings } from "@/lib/data/queries";
import { emailHref, whatsappHref, whatsappMessage } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Kinetic Green Shahdol | No-Licence EV Showroom",
  description:
    "Visit Kinetic Green Shahdol by Om Associates for non-registration electric two-wheelers, student-friendly EVs, test rides, price details, finance and battery warranty support.",
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const [settings, products, eligibleProducts, faqs, gallery] = await Promise.all([
    getStoreSettings(),
    getProducts(),
    getEligibleProducts(),
    getFaqs(5),
    getGallery(),
  ]);
  const leadProduct = eligibleProducts[0] || products[0];
  const featured = products.filter((product) => product.isFeatured).slice(0, 6);
  const categories = Array.from(new Set(products.map((product) => product.category))).filter(Boolean);

  return (
    <>
      <section className="relative overflow-hidden bg-[#0b100c] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(33,196,77,0.28),transparent_32rem)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.86fr] lg:py-16">
          <Reveal className="flex flex-col justify-center">
            <p className="w-fit rounded-full border border-[#21c44d]/30 bg-[#21c44d]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#80f39a]">
              Kinetic Green Shahdol • Om Associates
            </p>
            <h1 className="mt-6 max-w-[22rem] break-words text-[2.55rem] font-black leading-[1.04] tracking-tight sm:max-w-4xl sm:text-6xl lg:text-7xl">
              {PUBLIC_HERO_TITLE}
            </h1>
            <p className="mt-5 max-w-[22rem] text-lg leading-8 text-white/72 sm:max-w-2xl">{PUBLIC_POSITIONING}</p>
            <div className="mt-7">
              <ContactActions settings={settings} context="licence" />
            </div>
            <div className="mt-8 grid max-w-[22rem] grid-cols-2 gap-3 sm:max-w-none sm:grid-cols-4">
              {[
                "100% non-registration",
                "Perfect for students",
                "Daily local rides",
                "Finance and cash",
              ].map((item) => (
                <div key={item} className="min-w-0 break-words rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm font-black leading-5">
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-2xl text-xs font-semibold leading-5 text-white/55">{HINGLISH_DISCLAIMER}</p>
          </Reveal>
          {leadProduct ? (
            <Reveal delay={0.08}>
              <ProductLeadCard product={leadProduct} settings={settings} />
            </Reveal>
          ) : null}
        </div>
      </section>

      <section className="border-y border-[#dbe8db] bg-white">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 py-4 text-sm font-black sm:px-6 md:grid-cols-5">
          <span>Call: {settings.phones.join(" / ")}</span>
          <a className="text-[#119c3a]" href={emailHref(settings.email)}>{settings.email}</a>
          <a className="text-[#119c3a]" href={whatsappHref(settings, whatsappMessage("general"))}>WhatsApp</a>
          <a href={settings.instagramUrl}>Instagram</a>
          <span>Kotma Tiraha, Shahdol</span>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#119c3a]">Non-registration two-wheelers</p>
            <h2 className="mt-2 text-4xl font-black text-[#101510]">Electric two-wheelers for students and daily Shahdol rides.</h2>
          </div>
          <ButtonLink href="/vehicles" variant="dark">View two-wheelers</ButtonLink>
        </div>
        <ProductCarousel products={featured.length ? featured : products} settings={settings} />
      </section>

      <section className="bg-[#eef8ef] py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1fr]">
          <Reveal>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#119c3a]">Built for simple ownership</p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-[#101510]">No-registration electric two-wheelers for easy local travel.</h2>
            <p className="mt-4 text-base leading-7 text-[#526057]">{LOW_SPEED_RULE_HINGLISH}</p>
            <p className="mt-5 rounded-2xl bg-white p-5 text-sm font-semibold leading-6 text-[#526057]">{HINGLISH_DISCLAIMER}</p>
            <div className="mt-6">
              <ButtonLink href="/no-licence-ev">Explore student-friendly EVs</ButtonLink>
            </div>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              [ShieldCheck, "No-registration rides", "Electric two-wheelers available for hassle-free local mobility."],
              [UsersRound, "Students & daily riders", "Short city travel, tuition, college and local commute use cases."],
              [BatteryCharging, "Battery warranty support", "Ride with confidence with support for up to 3 years."],
              [BadgeIndianRupee, "Easy ownership", "Finance and cash options available at the showroom."],
            ].map(([Icon, title, text]) => (
              <Reveal key={String(title)} className="rounded-2xl border border-[#dbe8db] bg-white p-5">
                <Icon className="text-[#119c3a]" />
                <h3 className="mt-4 text-xl font-black text-[#101510]">{String(title)}</h3>
                <p className="mt-2 text-sm leading-6 text-[#526057]">{String(text)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#119c3a]">Categories</p>
            <h2 className="mt-2 text-4xl font-black text-[#101510]">Customer-friendly choices at KINETIC GREEN Shahdol.</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {categories.map((category) => (
              <div key={category} className="rounded-2xl border border-[#dbe8db] bg-white p-5">
                <Sparkles className="text-[#119c3a]" />
                <h3 className="mt-4 text-2xl font-black">{category}</h3>
                <p className="mt-2 text-sm font-semibold text-[#526057]">Visit the showroom or enquire now.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#119c3a]">Warranty and finance</p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-[#101510]">Built for worry-free electric rides.</h2>
            <p className="mt-4 text-base leading-7 text-[#526057]">
              Get trusted non-registration electric two-wheelers with battery warranty, easy finance options, and simple ownership support from KINETIC GREEN Shahdol.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              [ShieldCheck, "3 Year Battery Warranty", "Ride with confidence with battery warranty support for up to 3 years."],
              [BadgeIndianRupee, "Downpayment from Rs 15,000", "Start your electric ride with easy downpayment options beginning from just Rs 15,000."],
              [HandCoins, "Booking Amount Rs 500", "Reserve your preferred electric vehicle at the showroom with a booking amount of just Rs 500."],
              [HandCoins, "Finance & Cash Available", "Choose what works best for you — easy financing or direct cash purchase."],
            ].map(([Icon, title, text]) => (
              <Reveal key={String(title)} className="rounded-2xl border border-[#dbe8db] bg-[#f8fbf5] p-6">
                <Icon className="text-[#119c3a]" />
                <h3 className="mt-5 text-2xl font-black text-[#101510]">{String(title)}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-[#526057]">{String(text)}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href="/book-enquiry" variant="dark">Visit showroom / enquire now</ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-y border-[#dbe8db] bg-[#f8fbf5] py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#119c3a]">Electric scooters near Shahdol</p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-[#101510]">Kinetic Green electric two-wheelers for Shahdol and nearby areas.</h2>
            <p className="mt-4 text-sm font-semibold leading-6 text-[#526057]">
              Enquire for E-Luna, E-Zulu and Zing models, non-RTO guidance, test rides, finance details and current showroom availability.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {LOCAL_SERVICE_AREAS.map((area) => (
              <span key={area} className="rounded-xl border border-[#dbe8db] bg-white px-4 py-3 text-sm font-black text-[#101510]">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b100c] py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#80f39a]">Book test ride / get price</p>
            <h2 className="mt-3 text-4xl font-black leading-tight">Get price, availability, finance and test ride details.</h2>
            <p className="mt-4 text-sm leading-7 text-white/68">Enquire now and our team will help you choose the right model.</p>
          </div>
          <div className="rounded-[22px] bg-white p-5 text-[#101510]">
            <ContactActions settings={settings} product={leadProduct} context="product" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-black text-[#101510]">Showroom gallery</h2>
          <p className="mt-2 text-sm font-semibold text-[#526057]">Real Shahdol showroom moments and delivery photos.</p>
          <div className="mt-5"><GallerySection items={gallery} /></div>
        </div>
        <div>
          <h2 className="text-3xl font-black text-[#101510]">Visit Kinetic Green Shahdol</h2>
          <p className="mt-2 text-sm font-semibold text-[#526057]">{settings.address}</p>
          <div className="mt-5"><MapPlaceholder settings={settings} /></div>
          <div className="mt-4">
            <ButtonLink href={whatsappHref(settings, whatsappMessage("general"))}>WhatsApp showroom</ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-14 sm:px-6">
        <h2 className="text-3xl font-black text-[#101510]">FAQs</h2>
        <div className="mt-5"><FAQAccordion faqs={faqs} /></div>
      </section>
    </>
  );
}
