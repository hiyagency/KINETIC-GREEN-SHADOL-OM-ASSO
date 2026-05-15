import type { Metadata } from "next";
import { ContactActions } from "@/components/showroom/ContactActions";
import { ProductCard } from "@/components/showroom/ProductCard";
import { FAQAccordion } from "@/components/public/FAQAccordion";
import { HINGLISH_DISCLAIMER, LOW_SPEED_RULE_HINGLISH } from "@/lib/constants";
import { getEligibleProducts, getFaqs, getStoreSettings } from "@/lib/data/queries";

export const metadata: Metadata = {
  title: "No-Licence Electric Two-Wheelers in Shahdol",
  description:
    "Learn about no-licence, non-registration electric two-wheelers for students and daily local rides at Kinetic Green Shahdol by Om Associates.",
  alternates: {
    canonical: "/no-licence-ev",
  },
};

export default async function NoLicenceEvPage() {
  const [settings, products, faqs] = await Promise.all([
    getStoreSettings(),
    getEligibleProducts(),
    getFaqs(8),
  ]);

  return (
    <div>
      <section className="bg-[#0b100c] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#80f39a]">Non-registration electric two-wheelers</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black leading-tight sm:text-6xl">
            Electric two-wheelers for students, daily rides and easy Shahdol travel.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">
            Non-registration electric two-wheelers available at our Shahdol showroom. Visit or enquire and our team will help you choose the right model.
          </p>
          <div className="mt-7">
            <ContactActions settings={settings} context="licence" />
          </div>
          <p className="mt-6 max-w-3xl text-xs font-semibold leading-5 text-white/55">{HINGLISH_DISCLAIMER}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.85fr_1fr]">
        <div>
          <h2 className="text-4xl font-black text-[#101510]">Why Shahdol riders choose these EVs</h2>
          <p className="mt-4 text-base leading-7 text-[#526057]">{LOW_SPEED_RULE_HINGLISH}</p>
          <p className="mt-4 rounded-2xl bg-white p-5 text-sm font-semibold leading-6 text-[#526057]">
            Enquire now and our team will help you choose the right non-registration electric two-wheeler for your route, rider and budget.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {["Student-friendly use", "Daily local rides", "Easy ownership", "Battery warranty support", "Finance options", "Showroom support"].map((item) => (
            <div key={item} className="rounded-2xl border border-[#dbe8db] bg-white p-5 text-lg font-black text-[#101510]">{item}</div>
          ))}
        </div>
      </section>

      <section className="bg-[#eef8ef] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-4xl font-black text-[#101510]">Available non-registration two-wheelers</h2>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-[#526057]">
            Perfect for students and everyday local rides.
          </p>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} settings={settings} />
            ))}
          </div>
          {!products.length ? (
            <div className="mt-7 rounded-2xl border border-[#dbe8db] bg-white p-6 font-bold">
              Please call or WhatsApp the showroom for current vehicle availability.
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <h2 className="text-3xl font-black text-[#101510]">Customer FAQs</h2>
        <div className="mt-5"><FAQAccordion faqs={faqs} /></div>
      </section>
    </div>
  );
}
