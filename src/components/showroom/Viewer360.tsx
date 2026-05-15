"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2, Pause, Play, RotateCcw } from "lucide-react";
import type { Product } from "@/lib/types";
import { officialAssetSrc } from "@/lib/utils";

const AUTO_FRAMES_PER_SECOND = 0.7;
const DRAG_PIXELS_PER_FRAME = 26;
const MIN_INTERACTIVE_FRAMES = 2;
const RESUME_DELAY_MS = 2400;

export function Viewer360({
  product,
  framesOverride,
}: {
  product: Product;
  framesOverride?: string[];
}) {
  const [selectedVariantName, setSelectedVariantName] = useState(product.variants[0]?.name || "");
  const selectedVariant = useMemo(
    () => product.variants.find((variant) => variant.name === selectedVariantName) || product.variants[0],
    [product.variants, selectedVariantName],
  );
  const frames = useMemo(
    () => (framesOverride?.length ? framesOverride : selectedVariant?.imageUrls?.length ? selectedVariant.imageUrls : product.viewer360Images) || [],
    [framesOverride, product.viewer360Images, selectedVariant],
  );
  const [index, setIndex] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const framePositionRef = useRef(0);
  const dragXRef = useRef<number | null>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);

  const visibleFrame = frames[index] || product.heroImageUrl;

  const setFramePosition = useCallback(
    (nextPosition: number) => {
      if (!frames.length) return;
      const wrapped = ((nextPosition % frames.length) + frames.length) % frames.length;
      framePositionRef.current = wrapped;
      setIndex(Math.round(wrapped) % frames.length);
    },
    [frames.length],
  );

  useEffect(() => {
    framePositionRef.current = index;
  }, [index]);

  useEffect(() => {
    if (frames.length < MIN_INTERACTIVE_FRAMES) return;

    let cancelled = false;
    let completed = 0;

    frames.forEach((frame) => {
      const image = new window.Image();
      image.onload = image.onerror = () => {
        if (cancelled) return;
        completed += 1;
        setLoadedCount(completed);
        if (completed === frames.length) setIsReady(true);
      };
      image.src = officialAssetSrc(frame);
    });

    return () => {
      cancelled = true;
    };
  }, [frames]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.18 },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoRotate || isDragging || !isVisible || !isReady || frames.length < MIN_INTERACTIVE_FRAMES) return;

    let animationId = 0;
    const tick = (time: number) => {
      const previousTime = lastFrameTimeRef.current ?? time;
      const deltaSeconds = Math.min((time - previousTime) / 1000, 0.08);
      lastFrameTimeRef.current = time;
      setFramePosition(framePositionRef.current + AUTO_FRAMES_PER_SECOND * deltaSeconds);
      animationId = window.requestAnimationFrame(tick);
    };

    animationId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationId);
      lastFrameTimeRef.current = null;
    };
  }, [autoRotate, frames.length, isDragging, isReady, isVisible, setFramePosition]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const pauseForInteraction = useCallback(() => {
    setAutoRotate(false);
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
  }, []);

  const scheduleGentleResume = useCallback(() => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      setAutoRotate(true);
    }, RESUME_DELAY_MS);
  }, []);

  const selectVariant = useCallback((variantName: string) => {
    setSelectedVariantName(variantName);
    framePositionRef.current = 0;
    lastFrameTimeRef.current = null;
    setIndex(0);
    setLoadedCount(0);
    setIsReady(false);
  }, []);

  const step = useCallback(
    (direction: number) => {
      pauseForInteraction();
      setFramePosition(framePositionRef.current + direction);
      scheduleGentleResume();
    },
    [pauseForInteraction, scheduleGentleResume, setFramePosition],
  );

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isReady || frames.length < MIN_INTERACTIVE_FRAMES) return;
    dragXRef.current = event.clientX;
    setIsDragging(true);
    pauseForInteraction();
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragXRef.current === null || frames.length < MIN_INTERACTIVE_FRAMES) return;
    const delta = event.clientX - dragXRef.current;
    if (Math.abs(delta) < 1) return;
    setFramePosition(framePositionRef.current + delta / DRAG_PIXELS_PER_FRAME);
    dragXRef.current = event.clientX;
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragXRef.current === null) return;
    dragXRef.current = null;
    setIsDragging(false);
    scheduleGentleResume();
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  if (product.viewer360Type === "embed" && product.viewer360EmbedUrl) {
    return (
      <div className="overflow-hidden rounded-[20px] border border-[#dce8dc] bg-white">
        <iframe
          src={product.viewer360EmbedUrl}
          title={`${product.name} 360 view`}
          className="h-[420px] w-full"
          loading="lazy"
        />
      </div>
    );
  }

  if (product.viewer360Type !== "images" || frames.length < MIN_INTERACTIVE_FRAMES) {
    return (
      <div className="flex min-h-[340px] items-center justify-center rounded-[22px] border border-dashed border-[#b8d8bc] bg-[linear-gradient(135deg,#fbfffb,#edf8ef)] p-8 text-center shadow-[0_18px_55px_rgba(16,21,16,0.07)]">
        <div>
          <RotateCcw className="mx-auto text-[#119c3a]" size={42} />
          <h3 className="mt-4 text-3xl font-black text-[#101510]">360° view coming soon for this model.</h3>
          <p className="mt-2 text-sm font-semibold text-[#5f6b62]">
            Visit the showroom to see available colours and display vehicles.
          </p>
        </div>
      </div>
    );
  }

  const progress = Math.round((loadedCount / frames.length) * 100);

  return (
    <div
      ref={containerRef}
      className={`touch-none select-none overflow-hidden rounded-[22px] border border-[#dce8dc] bg-[radial-gradient(circle_at_center,#fff_0,#edf8ee_100%)] p-4 shadow-[0_24px_70px_rgba(16,21,16,0.09)] ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onPointerLeave={handlePointerEnd}
    >
      <div className="flex flex-col gap-3 px-2 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#119c3a]">360° vehicle view</p>
          <h3 className="text-2xl font-black text-[#101510]">Drag or swipe to rotate</h3>
          {selectedVariant ? (
            <p className="mt-1 text-xs font-bold text-[#657067]">{selectedVariant.name}</p>
          ) : null}
        </div>
        <button
          type="button"
          aria-label={autoRotate ? "Pause 360 rotation" : "Play 360 rotation"}
          onClick={(event) => {
            event.stopPropagation();
            setAutoRotate((value) => !value);
          }}
          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#101510] px-3 py-2 text-xs font-black text-white"
        >
          {autoRotate ? <Pause size={14} /> : <Play size={14} />}
          {index + 1}/{frames.length}
        </button>
      </div>

      {product.variants.length ? (
        <div className="mb-4 flex gap-2 overflow-x-auto px-2 pb-1">
          {product.variants.map((variant) => (
            <button
              key={variant.name}
              type="button"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation();
                selectVariant(variant.name);
              }}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-black transition ${
                selectedVariant?.name === variant.name
                  ? "border-[#101510] bg-[#101510] text-white"
                  : "border-[#dce8dc] bg-white text-[#101510]"
              }`}
              aria-label={`Show ${variant.name}`}
            >
              <span className="size-4 rounded-full border border-black/15" style={{ background: variant.color }} />
              {variant.name}
            </button>
          ))}
        </div>
      ) : null}

      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/55">
        {isReady ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={officialAssetSrc(visibleFrame)}
            alt={`${product.name} 360 frame ${index + 1}`}
            className="h-full w-full object-contain"
            draggable={false}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <Loader2 className="mx-auto animate-spin text-[#119c3a]" size={34} />
              <p className="mt-3 text-sm font-black text-[#101510]">Loading 360° view</p>
              <p className="mt-1 text-xs font-semibold text-[#657067]">{progress}% ready</p>
            </div>
          </div>
        )}
        {isReady ? (
          <>
            <button
              type="button"
              aria-label="Rotate left"
              onClick={(event) => {
                event.stopPropagation();
                step(-1);
              }}
              className="absolute left-3 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#101510] shadow-lg backdrop-blur"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Rotate right"
              onClick={(event) => {
                event.stopPropagation();
                step(1);
              }}
              className="absolute right-3 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#101510] shadow-lg backdrop-blur"
            >
              <ChevronRight size={20} />
            </button>
          </>
        ) : null}
      </div>

      <div className="mt-3 h-1 rounded-full bg-[#dce8dc]">
        <div
          className="h-1 rounded-full bg-[#119c3a] transition-[width] duration-150"
          style={{ width: `${isReady ? ((index + 1) / frames.length) * 100 : progress}%` }}
        />
      </div>
    </div>
  );
}
