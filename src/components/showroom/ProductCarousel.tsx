import { ProductCard } from "@/components/showroom/ProductCard";
import type { Product, StoreSettings } from "@/lib/types";

export function ProductCarousel({
  products,
  settings,
}: {
  products: Product[];
  settings: StoreSettings;
}) {
  return (
    <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
      {products.map((product, index) => (
        <div key={product.id} className="snap-start sm:min-w-0">
          <ProductCard product={product} settings={settings} priority={index === 0} />
        </div>
      ))}
    </div>
  );
}
