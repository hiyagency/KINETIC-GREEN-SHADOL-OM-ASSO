import { notFound } from "next/navigation";
import { ContactActions } from "@/components/showroom/ContactActions";
import { EligibilityPills } from "@/components/showroom/EligibilityPills";
import { ProductCard } from "@/components/showroom/ProductCard";
import { ProductImage } from "@/components/showroom/ProductImage";
import { ProductExperience } from "@/components/showroom/ProductExperience";
import { EnquiryForm } from "@/components/public/EnquiryForm";
import { HINGLISH_DISCLAIMER } from "@/lib/constants";
import { getProductBySlug, getProducts, getStoreSettings } from "@/lib/data/queries";
import { officialAssetSrc } from "@/lib/utils";

export default async function VehicleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [settings, allProducts, product] = await Promise.all([
    getStoreSettings(),
    getProducts(),
    getProductBySlug(slug),
  ]);
  if (!product) notFound();
  const similar = Array.from(new Map(allProducts.filter((item) => item.slug !== product.slug && item.category === product.category).map((item) => [item.slug, item])).values()).slice(0, 4);

  return (
    <div>
      <section className="bg-[#0b100c] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1fr]">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#80f39a]">{product.category}</p>
            <h1 className="mt-3 text-5xl font-black leading-tight sm:text-6xl">{product.name}</h1>
            <p className="mt-4 text-lg leading-8 text-white/72">{product.shortDescription}</p>
            <div className="mt-5"><EligibilityPills product={product} /></div>
            <div className="mt-7"><ContactActions settings={settings} product={product} context="product" /></div>
          </div>
          <div className="rounded-[24px] bg-white p-5">
            <div className="aspect-[4/3]"><ProductImage product={product} priority /></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <ProductExperience product={product} />
      </section>

      <section className="bg-[#eef8ef] py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <h2 className="text-4xl font-black text-[#101510]">No Licence / No RTO eligibility</h2>
            <p className="mt-4 text-base leading-7 text-[#526057]">All listed low-speed models shown on this page are No Licence / No RTO eligible. Final eligibility and model details will be confirmed at the showroom before purchase.</p>
            <p className="mt-4 rounded-2xl bg-white p-5 text-sm font-semibold leading-6 text-[#526057]">{product.disclaimerText || HINGLISH_DISCLAIMER}</p>
          </div>
          <div className="rounded-[20px] border border-[#dbe8db] bg-white p-5">
            <h3 className="text-2xl font-black text-[#101510]">Variants & colors</h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {product.colors.length ? product.colors.map((color) => (
                <span key={`${color.name}-${color.value}`} className="inline-flex items-center gap-2 rounded-full border border-[#dbe8db] px-3 py-2 text-sm font-black">
                  <span className="h-5 w-5 rounded-full border" style={{ background: color.value }} /> {color.name}
                </span>
              )) : <p className="text-sm font-semibold text-[#526057]">Color data needs admin review.</p>}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-black text-[#101510]">Highlights</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {product.highlights.length ? product.highlights.map((highlight) => (
              <div key={highlight.title} className="rounded-2xl border border-[#dbe8db] bg-white p-5">
                {highlight.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={officialAssetSrc(highlight.imageUrl)} alt={highlight.title} className="mb-4 h-32 w-full rounded-xl object-cover" />
                ) : null}
                <h3 className="text-lg font-black">{highlight.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#526057]">{highlight.description}</p>
              </div>
            )) : <p className="font-semibold text-[#526057]">Official highlights need admin review.</p>}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-black text-[#101510]">Full specifications</h2>
          <div className="mt-5 rounded-2xl border border-[#dbe8db] bg-white p-5">
            {Object.entries(product.specifications).map(([label, value]) => (
              <div key={label} className="grid grid-cols-2 gap-4 border-b border-[#edf3ed] py-3 text-sm">
                <span className="font-bold text-[#657067]">{label}</span>
                <span className="text-right font-black text-[#101510]">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b100c] py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <h2 className="text-4xl font-black">Get price, availability और test ride details.</h2>
            <p className="mt-4 text-sm leading-7 text-white/68">The enquiry is saved in Supabase after connection. No online payment is collected.</p>
          </div>
          <EnquiryForm vehicles={allProducts} selectedVehicle={product.name} />
        </div>
      </section>

      {similar.length ? (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <h2 className="text-3xl font-black text-[#101510]">Similar products</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {similar.map((item) => <ProductCard key={item.id} product={item} settings={settings} />)}
          </div>
        </section>
      ) : null}
    </div>
  );
}
