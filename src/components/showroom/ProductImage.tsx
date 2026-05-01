import type { Product } from "@/lib/types";
import { officialAssetSrc } from "@/lib/utils";

export function ProductImage({
  product,
  priority = false,
  className = "",
}: {
  product: Product;
  priority?: boolean;
  className?: string;
}) {
  if (product.heroImageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={officialAssetSrc(product.heroImageUrl)}
        alt={product.name}
        loading={priority ? "eager" : "lazy"}
        className={`h-full w-full object-contain ${className}`}
      />
    );
  }
  return (
    <div className={`flex h-full min-h-64 items-center justify-center bg-[#f2f7f1] ${className}`}>
      <div className="text-center">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#119c3a]">Official image pending</p>
        <p className="mt-2 text-2xl font-black text-[#111611]">{product.name}</p>
      </div>
    </div>
  );
}
