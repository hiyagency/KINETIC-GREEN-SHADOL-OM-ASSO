import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { ContactActions } from "@/components/showroom/ContactActions";
import { EligibilityPills } from "@/components/showroom/EligibilityPills";
import { ProductImage } from "@/components/showroom/ProductImage";
import type { Product, StoreSettings } from "@/lib/types";
import { whatsappHref, whatsappMessage } from "@/lib/utils";

function cleanSpec(value: string) {
  const v = value?.trim();
  if (!v) return "Ask Us";
  if (/^0(\s|$)/.test(v) || v.toLowerCase() === "0 km") return "Ask Us";
  return v;
}


export function ProductCard({
  product,
  settings,
  priority = false,
}: {
  product: Product;
  settings: StoreSettings;
  priority?: boolean;
}) {
  return (
    <article className="group min-w-[82vw] overflow-hidden rounded-[18px] border border-[#dde8dd] bg-white shadow-[0_22px_70px_rgba(12,18,13,0.08)] sm:min-w-0">
      <Link href={`/vehicles/${product.slug}`} className="block bg-[radial-gradient(circle_at_center,#ffffff_0,#ecf8ee_100%)] p-5">
        <div className="aspect-[4/3]">
          <ProductImage product={product} priority={priority} />
        </div>
      </Link>
      <div className="grid gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#119c3a]">{product.category}</p>
            <h3 className="mt-2 text-2xl font-black text-[#101510]">{product.name}</h3>
          </div>
          <Link href={`/vehicles/${product.slug}`} className="rounded-full bg-[#101510] p-2 text-white transition group-hover:bg-[#119c3a]">
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <EligibilityPills product={product} />
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-black">
          <div className="rounded-xl bg-[#f5f8f4] p-3"><span className="block text-[#687269]">Range</span>{cleanSpec(product.rangeLabel)}</div>
          <div className="rounded-xl bg-[#f5f8f4] p-3"><span className="block text-[#687269]">Speed</span>{cleanSpec(product.topSpeed)}</div>
          <div className="rounded-xl bg-[#f5f8f4] p-3"><span className="block text-[#687269]">Power</span>{cleanSpec(product.motorPower)}</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Link href={`/vehicles/${product.slug}`} className="rounded-xl bg-[#101510] px-4 py-3 text-center text-sm font-black text-white">
            View Details
          </Link>
          <a href={whatsappHref(settings, whatsappMessage("product", product))} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#14a83b] px-4 py-3 text-sm font-black text-white">
            <MessageCircle size={16} /> WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

export function ProductLeadCard({ product, settings }: { product: Product; settings: StoreSettings }) {
  return (
    <div className="rounded-[22px] border border-[#dce8dc] bg-white p-4 shadow-[0_28px_80px_rgba(12,18,13,0.12)]">
      <div className="rounded-[18px] bg-[radial-gradient(circle_at_center,#fff_0,#e8f8ea_100%)] p-5">
        <div className="aspect-[4/3]">
          <ProductImage product={product} priority />
        </div>
      </div>
      <div className="mt-4 grid gap-4">
        <EligibilityPills product={product} />
        <ContactActions settings={settings} product={product} context="product" compact />
      </div>
    </div>
  );
}
