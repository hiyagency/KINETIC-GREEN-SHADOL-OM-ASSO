import type { Metadata } from "next";
import { ProductFilters } from "@/components/showroom/ProductFilters";
import { getProducts, getStoreSettings } from "@/lib/data/queries";

export const metadata: Metadata = {
  title: "Electric Two-Wheelers in Shahdol",
  description:
    "Browse Kinetic Green non-registration electric two-wheelers in Shahdol, including student-friendly low-speed EV options with test ride, finance and warranty support.",
  alternates: {
    canonical: "/vehicles",
  },
};

export default async function VehiclesPage() {
  const [settings, products] = await Promise.all([getStoreSettings(), getProducts()]);
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-8 max-w-4xl">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-[#119c3a]">Non-registration electric two-wheelers</p>
        <h1 className="mt-3 text-5xl font-black leading-tight text-[#101510]">Student-friendly electric two-wheelers available in Shahdol.</h1>
        <p className="mt-4 text-base font-semibold leading-7 text-[#526057]">
          Explore non-registration electric two-wheelers for daily local rides. Visit the showroom or enquire to confirm the best model for your need.
        </p>
      </div>
      <ProductFilters products={products} settings={settings} />
    </section>
  );
}
