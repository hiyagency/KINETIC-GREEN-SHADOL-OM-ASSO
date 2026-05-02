import { ProductFilters } from "@/components/showroom/ProductFilters";
import { getProducts, getStoreSettings } from "@/lib/data/queries";

export default async function VehiclesPage() {
  const [settings, products] = await Promise.all([getStoreSettings(), getProducts()]);
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-8 max-w-4xl">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-[#119c3a]">AVAILABLE AT OM ASSOCIATE SHAHDOL</p>
        <h1 className="mt-3 text-5xl font-black leading-tight text-[#101510]">Student-Friendly Non-RTO Electric Scooters</h1>
        <p className="mt-4 text-base font-semibold leading-7 text-[#526057]">Explore non-RTO electric two-wheelers made for everyday use. Call or WhatsApp to check today’s colours, stock, and latest price.</p>
      </div>
      <ProductFilters products={products} settings={settings} />
    </section>
  );
}
