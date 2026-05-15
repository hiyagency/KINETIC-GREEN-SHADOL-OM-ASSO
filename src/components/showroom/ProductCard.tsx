import Link from "next/link";
import { Battery, Clock, Gauge, Zap } from "lucide-react";
import { ContactActions } from "@/components/showroom/ContactActions";
import { EligibilityPills } from "@/components/showroom/EligibilityPills";
import { ProductImage } from "@/components/showroom/ProductImage";
import type { Product, StoreSettings } from "@/lib/types";

function cleanSpec(value: string) {
  const v = value?.trim();
  if (!v) return "Ask Us";
  if (/^0(\s|$)/.test(v) || v.toLowerCase() === "0 km") return "Ask Us";
  return v;
}


export function ProductCard({
  product,
  settings: _settings,
  priority = false,
}: {
  product: Product;
  settings: StoreSettings;
  priority?: boolean;
}) {
  void _settings;
  const stats = [
    [Gauge, "Top Speed", cleanSpec(product.topSpeed)],
    [Zap, "Range", cleanSpec(product.rangeLabel)],
    [Battery, "Battery Capacity", cleanSpec(product.specifications["Battery Capacity"] ? `${product.specifications["Battery Capacity"]} kWh` : product.batteryType)],
    [Clock, "Charging Time", cleanSpec(product.chargingTime)],
  ] as const;

  return (
    <article className="min-w-[82vw] overflow-hidden rounded-[18px] border border-[#e7e9ee] bg-white shadow-[0_22px_70px_rgba(12,18,13,0.08)] sm:min-w-0">
      <Link href={`/vehicles/${product.slug}`} className="block bg-[#f7f8fa] px-5 py-6">
        <div className="aspect-[16/7] sm:aspect-[16/6]">
          <ProductImage product={product} priority={priority} />
        </div>
      </Link>
      <div className="grid gap-4 p-5">
        <h3 className="text-2xl font-black text-[#111318]">{product.name}</h3>
        <div className="grid grid-cols-2 gap-3">
          {stats.map(([Icon, label, value]) => (
            <div key={label} className="flex min-h-14 items-center gap-3 rounded-xl bg-[#f5f7fb] p-3">
              <Icon className="shrink-0 text-[#5da342]" size={17} />
              <div>
                <span className="block text-xs font-bold uppercase tracking-[0.08em] text-[#9a9da4]">{label}</span>
                <span className="block text-sm font-black text-[#111318]">{value}</span>
              </div>
            </div>
          ))}
        </div>
        <Link href={`/vehicles/${product.slug}`} className="rounded-xl bg-[#f0f1f3] px-4 py-4 text-center text-lg font-black text-[#10121a] transition hover:bg-[#101510] hover:text-white">
          View Details
        </Link>
      </div>
    </article>
  );
}

export function ProductLeadCard({ product, settings }: { product: Product; settings: StoreSettings }) {
  return (
    <div className="rounded-[22px] border border-[#dce8dc] bg-white p-4 shadow-[0_28px_80px_rgba(12,18,13,0.12)]">
      <div className="rounded-[18px] bg-[#f7f8fa] p-5">
        <div className="aspect-[16/9]">
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
