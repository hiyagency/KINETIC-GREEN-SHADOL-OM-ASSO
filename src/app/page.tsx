import { BatteryCharging, BadgeIndianRupee, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { ContactActions } from "@/components/showroom/ContactActions";
import { ProductCarousel } from "@/components/showroom/ProductCarousel";
import { ProductLeadCard } from "@/components/showroom/ProductCard";
import { FAQAccordion } from "@/components/public/FAQAccordion";
import { GallerySection } from "@/components/public/GallerySection";
import { MapPlaceholder } from "@/components/public/MapPlaceholder";
import { Reveal } from "@/components/public/Motion";
import { ButtonLink } from "@/components/ui/Button";
import { HINGLISH_DISCLAIMER, LOW_SPEED_RULE_HINGLISH } from "@/lib/constants";
import { getEligibleProducts, getFaqs, getGallery, getProducts, getStoreSettings } from "@/lib/data/queries";
import { whatsappHref, whatsappMessage } from "@/lib/utils";

export default async function HomePage() {
  const [settings, products, eligibleProducts, faqs, gallery] = await Promise.all([
    getStoreSettings(),
    getProducts(),
    getEligibleProducts(),
    getFaqs(5),
    getGallery(),
  ]);
  const leadProduct = eligibleProducts[0] || products.find((product) => product.name.toLowerCase().includes("zing")) || products[0];
  const featured = products.filter((product) => product.isFeatured).slice(0, 6);
  const categories = Array.from(new Set(products.map((product) => product.category)));

  return (
    <>
      <section className="relative overflow-hidden bg-[#0b100c] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(33,196,77,0.28),transparent_32rem)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.86fr] lg:py-16">
          <Reveal className="flex flex-col justify-center">
            <p className="w-fit rounded-full border border-[#21c44d]/30 bg-[#21c44d]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#80f39a]">
              Kinetic Green / Om Associate Shahdol
            </p>
            <h1 className="mt-6 max-w-[22rem] break-words text-[2.55rem] font-black leading-[1.04] tracking-tight sm:max-w-4xl sm:text-6xl lg:text-7xl">
              Shahdol’s Smart Electric Ride for Students & Daily Travel
            </h1>
            <p className="mt-5 max-w-[22rem] text-lg leading-8 text-white/72 sm:max-w-2xl">Lithium battery, warranty included, showroom support, and easy local service from Om Associate, Kotma Tiraha, Badhganga Road.</p>
            <div className="mt-7">
              <ContactActions settings={settings} context="licence" />
            </div>
            <div className="mt-8 grid max-w-[22rem] grid-cols-2 gap-3 sm:max-w-none sm:grid-cols-4">
              {[
                "Starting from ₹74,999",
                "No Licence",
                "No RTO",
                "Lithium + Warranty",
              ].map((item) => (
                <div key={item} className="min-w-0 break-words rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm font-black leading-5">
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-2xl text-xs font-semibold leading-5 text-white/55">{HINGLISH_DISCLAIMER}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <ProductLeadCard product={leadProduct} settings={settings} />
          </Reveal>
        </div>
      </section>

      <section className="border-y border-[#dbe8db] bg-white">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 py-4 text-sm font-black sm:px-6 md:grid-cols-4">
          <span>Call: {settings.phones.join(" / ")}</span>
          <a className="text-[#119c3a]" href={settings.whatsappUrl}>WhatsApp Catalog</a>
          <a href={settings.instagramUrl}>Instagram</a>
          <span>Kotma Tiraha, Shahdol</span>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#119c3a]">Top models for Shahdol riders</p>
            <h2 className="mt-2 text-4xl font-black text-[#101510]">College, tuition, market ya daily kaam — petrol ke kharche ke bina simple electric ride.</h2>
          </div>
          <ButtonLink href="/vehicles" variant="dark">View all products</ButtonLink>
        </div>
        <ProductCarousel products={featured} settings={settings} />
      </section>

      <section className="bg-[#eef8ef] py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1fr]">
          <Reveal>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#119c3a]">No Licence / No RTO explainer</p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-[#101510]">Claims are controlled model-wise from admin.</h2>
            <p className="mt-4 text-base leading-7 text-[#526057]">{LOW_SPEED_RULE_HINGLISH}</p>
            <p className="mt-5 rounded-2xl bg-white p-5 text-sm font-semibold leading-6 text-[#526057]">{HINGLISH_DISCLAIMER}</p>
            <div className="mt-6">
              <ButtonLink href="/no-licence-ev">Explore eligible EVs</ButtonLink>
            </div>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              [ShieldCheck, "Eligibility badges", "No Licence / No RTO badges appear only when enabled."],
              [UsersRound, "Students & daily riders", "Short city travel, tuition, college and local commute use cases."],
              [BatteryCharging, "Battery + warranty trust", "Range, charging and warranty remain official/editable fields."],
              [BadgeIndianRupee, "Get price directly", "No checkout. Price and finance confirmed by showroom."],
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
            <h2 className="mt-2 text-4xl font-black text-[#101510]">Official line-up, local purchase conversation.</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {categories.map((category) => (
              <div key={category} className="rounded-2xl border border-[#dbe8db] bg-white p-5">
                <Sparkles className="text-[#119c3a]" />
                <h3 className="mt-4 text-2xl font-black">{category}</h3>
                <p className="mt-2 text-sm font-semibold text-[#526057]">
                  {products.filter((product) => product.category === category).length} official products
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b100c] py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#80f39a]">Book test ride / get price</p>
            <h2 className="mt-3 text-4xl font-black leading-tight">Price और availability के लिए showroom से contact करें.</h2>
            <p className="mt-4 text-sm leading-7 text-white/68">No online payment. The showroom team handles final pricing, finance, delivery and eligibility confirmation.</p>
          </div>
          <div className="rounded-[22px] bg-white p-5 text-[#101510]">
            <ContactActions settings={settings} product={leadProduct} context="product" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-black text-[#101510]">Showroom gallery</h2>
          <p className="mt-2 text-sm font-semibold text-[#526057]">Admin can upload real Shahdol showroom photos later.</p>
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
        <h2 className="text-3xl font-black text-[#101510]">FAQ preview</h2>
        <div className="mt-5"><FAQAccordion faqs={faqs} /></div>
      </section>
    </>
  );
}
