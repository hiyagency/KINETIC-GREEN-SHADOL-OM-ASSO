"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { Viewer360 } from "@/components/showroom/Viewer360";
import { officialAssetSrc } from "@/lib/utils";

export function ProductExperience({ product }: { product: Product }) {
  const colorOptions = product.colors || [];
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]?.name ?? "");
  const selected = colorOptions.find((c) => c.name === selectedColor) ?? colorOptions[0];

  const variantFrames = useMemo(() => {
    const variant = product.variants.find((v) => v.name === selected?.name);
    if (variant?.imageUrls?.length) return variant.imageUrls;
    return product.viewer360Images;
  }, [product, selected]);
  const hasVariantAssets = useMemo(() => product.variants.some((variant) => variant.name === selected?.name && variant.imageUrls?.length), [product.variants, selected?.name]);

  const preview = variantFrames[0] || product.heroImageUrl;

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_0.7fr]">
      <Viewer360 product={product} framesOverride={variantFrames} />
      <div className="grid gap-4 rounded-[20px] border border-[#dbe8db] bg-white p-5">
        <h2 className="text-3xl font-black text-[#101510]">Colour & quick specs</h2>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#657067]">Select colour</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {colorOptions.length ? colorOptions.map((color) => (
              <button
                key={color.name}
                type="button"
                aria-label={`Select ${color.name} colour`}
                onClick={() => setSelectedColor(color.name)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-bold transition ${selected?.name === color.name ? "border-[#119c3a] ring-2 ring-[#b7e7c3]" : "border-[#dbe8db]"}`}
              >
                <span className="h-5 w-5 rounded-full border" style={{ background: color.value }} />
                {color.name}
                {selected?.name === color.name ? <span aria-hidden>✓</span> : null}
              </button>
            )) : <p className="text-sm font-semibold text-[#526057]">Colour options: Confirm at showroom.</p>}
          </div>
        </div>
        {preview ? <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={officialAssetSrc(preview)} alt={`${product.name} ${selected?.name ?? ""}`} className="h-44 w-full rounded-2xl object-contain bg-[#f3f8f3] p-2" />
        </> : null}
        {selected?.name && !hasVariantAssets ? <p className="text-xs font-semibold text-[#657067]">Selected colour preview may vary. Contact showroom for live stock photos.</p> : null}
        {[
          ["Starting price", product.priceLabel],
          ["Battery", product.batteryType || product.specifications["Battery Capacity"]],
          ["Range", product.rangeLabel],
          ["Motor power", product.motorPower],
          ["Charging", product.chargingTime],
          ["Warranty", product.warranty],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 border-b border-[#edf3ed] pb-3 text-sm">
            <span className="font-bold text-[#657067]">{label}</span>
            <span className="text-right font-black text-[#101510]">{value || "Confirm at showroom"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
