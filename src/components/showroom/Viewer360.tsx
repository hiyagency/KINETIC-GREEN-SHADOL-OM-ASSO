"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import type { Product } from "@/lib/types";
import { officialAssetSrc } from "@/lib/utils";

export function Viewer360({ product, framesOverride }: { product: Product; framesOverride?: string[] }) {
  const frames = useMemo(() => (framesOverride?.length ? framesOverride : product.viewer360Images) || [], [framesOverride, product.viewer360Images]);
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [ready, setReady] = useState(false);
  const lastX = useRef<number | null>(null);
  const velocity = useRef(0);
  const inertia = useRef<number | null>(null);

  useEffect(() => {
    if (frames.length < 2) return;
    Promise.all(frames.map((frame) => new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = officialAssetSrc(frame);
    }))).then(() => setReady(true));
  }, [frames]);

  useEffect(() => () => { if (inertia.current) cancelAnimationFrame(inertia.current); }, []);

  if (product.viewer360Type === "embed" && product.viewer360EmbedUrl) {
    return <div className="overflow-hidden rounded-[20px] border border-[#dce8dc] bg-white"><iframe src={product.viewer360EmbedUrl} title={`${product.name} 360 view`} className="h-[420px] w-full" loading="lazy" /></div>;
  }

  if (frames.length < 2) {
    return <div className="flex min-h-[320px] items-center justify-center rounded-[20px] border border-dashed border-[#b8d8bc] bg-[linear-gradient(135deg,#f8fff8,#eaf8ec)] p-8 text-center"><div><RotateCcw className="mx-auto text-[#119c3a]" size={42} /><h3 className="mt-4 text-3xl font-black text-[#101510]">360° Preview</h3><p className="mt-2 text-sm font-semibold text-[#5f6b62]">Single image available right now. Visit showroom for full walkaround.</p></div></div>;
  }

  const step = (delta:number) => setIndex((c) => (c + (delta > 0 ? 1 : -1) + frames.length) % frames.length);
  const onMove = (clientX:number) => {
    if (lastX.current === null) return;
    const delta = clientX - lastX.current;
    if (Math.abs(delta) < 6) return;
    step(delta);
    velocity.current = delta;
    lastX.current = clientX;
  };
  const startInertia = () => {
    const tick = () => {
      velocity.current *= 0.92;
      if (Math.abs(velocity.current) < 0.2) return;
      step(velocity.current);
      inertia.current = requestAnimationFrame(tick);
    };
    inertia.current = requestAnimationFrame(tick);
  };

  return (
    <div className={`select-none overflow-hidden rounded-[20px] border border-[#dce8dc] bg-[radial-gradient(circle_at_center,#fff_0,#edf8ee_100%)] p-4 ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
      onMouseDown={(e)=>{setDragging(true);lastX.current=e.clientX;}}
      onMouseMove={(e)=>onMove(e.clientX)}
      onMouseUp={()=>{setDragging(false);lastX.current=null;startInertia();}}
      onMouseLeave={()=>{setDragging(false);lastX.current=null;}}
      onTouchStart={(e)=>{setDragging(true);lastX.current=e.touches[0].clientX;}}
      onTouchMove={(e)=>onMove(e.touches[0].clientX)}
      onTouchEnd={()=>{setDragging(false);lastX.current=null;startInertia();}}
    >
      <div className="flex items-center justify-between gap-4 px-2 pb-3"><h3 className="text-2xl font-black text-[#101510]">Drag / swipe to rotate</h3><div className="rounded-full bg-[#101510] px-3 py-1 text-xs font-black text-white">360°</div></div>
      <div className="aspect-[4/3]">{ready ? <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={officialAssetSrc(frames[index])} alt={`${product.name} frame ${index + 1}`} className="h-full w-full object-contain" draggable={false} />
      </> : <div className="flex h-full items-center justify-center text-sm font-semibold text-[#526057]">Loading 360 frames…</div>}</div>
    </div>
  );
}
