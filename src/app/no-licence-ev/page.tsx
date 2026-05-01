import { ContactActions } from "@/components/showroom/ContactActions";
import { ProductCard } from "@/components/showroom/ProductCard";
import { FAQAccordion } from "@/components/public/FAQAccordion";
import { HINGLISH_DISCLAIMER, LOW_SPEED_RULE_HINGLISH } from "@/lib/constants";
import { getEligibleProducts, getFaqs, getStoreSettings } from "@/lib/data/queries";

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
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#80f39a]">Main ad landing page</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black leading-tight sm:text-6xl">
            बिना Licence और बिना RTO वाले eligible EV models
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">
            Selected low-speed EV models may not require driving licence or RTO registration. Please confirm model eligibility with Kinetic Green Shahdol.
          </p>
          <div className="mt-7">
            <ContactActions settings={settings} context="licence" />
          </div>
          <p className="mt-6 max-w-3xl text-xs font-semibold leading-5 text-white/55">{HINGLISH_DISCLAIMER}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.85fr_1fr]">
        <div>
          <h2 className="text-4xl font-black text-[#101510]">Eligible low-speed EV कैसे identify करें?</h2>
          <p className="mt-4 text-base leading-7 text-[#526057]">{LOW_SPEED_RULE_HINGLISH}</p>
          <p className="mt-4 rounded-2xl bg-white p-5 text-sm font-semibold leading-6 text-[#526057]">
            Admin panel में No Licence Required और No RTO Required true होने पर ही product इस page पर दिखता है.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {["Low-speed category", "Speed category verified", "Motor power checked", "Student-friendly use", "No fuel cost", "Showroom confirmation"].map((item) => (
            <div key={item} className="rounded-2xl border border-[#dbe8db] bg-white p-5 text-lg font-black text-[#101510]">{item}</div>
          ))}
        </div>
      </section>

      <section className="bg-[#eef8ef] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-4xl font-black text-[#101510]">Admin-verified eligible products</h2>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-[#526057]">
            This grid only shows published products where no_licence_required and no_rto_required are true.
          </p>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} settings={settings} />
            ))}
          </div>
          {!products.length ? (
            <div className="mt-7 rounded-2xl border border-[#dbe8db] bg-white p-6 font-bold">
              No products are currently marked eligible. Admin must verify model eligibility first.
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <h2 className="text-3xl font-black text-[#101510]">No Licence EV FAQs</h2>
        <div className="mt-5"><FAQAccordion faqs={faqs} /></div>
      </section>
    </div>
  );
}
