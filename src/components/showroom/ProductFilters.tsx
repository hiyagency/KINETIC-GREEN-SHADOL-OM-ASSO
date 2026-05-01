"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/showroom/ProductCard";
import type { Product, StoreSettings } from "@/lib/types";

export function ProductFilters({
  products,
  settings,
}: {
  products: Product[];
  settings: StoreSettings;
}) {
  const categories = Array.from(new Set(products.map((product) => product.category)));
  const filters = ["All", ...categories, "No Licence", "No RTO", "Student Friendly", "Low Speed"];
  const [active, setActive] = useState("All");
  const filtered = useMemo(() => {
    return products.filter((product) => {
      if (active === "All") return true;
      if (active === "No Licence") return product.noLicenceRequired;
      if (active === "No RTO") return product.noRtoRequired;
      if (active === "Student Friendly") return product.studentFriendly;
      if (active === "Low Speed") return product.lowSpeedVehicle;
      return product.category === active;
    });
  }, [active, products]);

  return (
    <div>
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActive(filter)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-black transition ${
              active === filter
                ? "border-[#101510] bg-[#101510] text-white"
                : "border-[#dce8dc] bg-white text-[#1d271f]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} settings={settings} />
        ))}
      </div>
    </div>
  );
}
