"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import type { Product } from "@/lib/types";
import { officialAssetSrc } from "@/lib/utils";

export function Viewer360({ product }: { product: Product }) {
  const frames = useMemo(() => product.viewer360Images || [], [product.viewer360Images]);
  const [index, setIndex] = useState(0);
  const [start, setStart] = useState<number | null>(null);
  const visibleFrame = useMemo(() => frames[index] || product.heroImageUrl, [frames, index, product.heroImageUrl]);

  if (product.viewer360Type === "embed" && product.viewer360EmbedUrl) {
    return (
      <div className="overflow-hidden rounded-[20px] border border-[#dce8dc] bg-white">
        <iframe src={product.viewer360EmbedUrl} title={`${product.name} 360 view`} className="h-[420px] w-full" loading="lazy" />
      </div>
    );
  }

  if (product.viewer360Type !== "images" || frames.length < 2) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-[20px] border border-dashed border-[#b8d8bc] bg-[linear-gradient(135deg,#f8fff8,#eaf8ec)] p-8 text-center">
        <div>
          <RotateCcw className="mx-auto text-[#119c3a]" size={42} />
          <h3 className="mt-4 text-3xl font-black text-[#101510]">360° View Coming Soon</h3>
          <p className="mt-2 text-sm font-semibold text-[#5f6b62]">
            Admin can add an official iframe URL or official image sequence. We do not fake 360 from one image.
          </p>
        </div>
      </div>
    );
  }

  function move(clientX: number) {
    if (start === null) return;
    const delta = clientX - start;
    if (Math.abs(delta) < 8) return;
    setIndex((current) => (current + (delta > 0 ? 1 : -1) + frames.length) % frames.length);
    setStart(clientX);
  }

  return (
    <div
      className="select-none overflow-hidden rounded-[20px] border border-[#dce8dc] bg-[radial-gradient(circle_at_center,#fff_0,#edf8ee_100%)] p-4"
      onMouseDown={(event) => setStart(event.clientX)}
      onMouseMove={(event) => move(event.clientX)}
      onMouseUp={() => setStart(null)}
      onMouseLeave={() => setStart(null)}
      onTouchStart={(event) => setStart(event.touches[0].clientX)}
      onTouchMove={(event) => move(event.touches[0].clientX)}
      onTouchEnd={() => setStart(null)}
    >
      <div className="flex items-center justify-between gap-4 px-2 pb-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#119c3a]">Official 360 sequence</p>
          <h3 className="text-2xl font-black text-[#101510]">Drag / swipe to rotate</h3>
        </div>
        <div className="rounded-full bg-[#101510] px-3 py-1 text-xs font-black text-white">{index + 1}/{frames.length}</div>
      </div>
      <div className="aspect-[4/3]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={officialAssetSrc(visibleFrame)} alt={`${product.name} 360 frame ${index + 1}`} className="h-full w-full object-contain" draggable={false} />
      </div>
      <div className="h-1 rounded-full bg-[#dce8dc]">
        <div className="h-1 rounded-full bg-[#119c3a]" style={{ width: `${((index + 1) / frames.length) * 100}%` }} />
      </div>
    </div>
  );
}
