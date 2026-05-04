"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import type { Product } from "@/lib/types";
import { officialAssetSrc } from "@/lib/utils";

const AUTO_FRAMES_PER_SECOND = 0.85;
const DRAG_PIXELS_PER_FRAME = 30;
const RESUME_DELAY_MS = 1800;

export function Viewer360({ product }: { product: Product }) {
  const frames = useMemo(() => product.viewer360Images || [], [product.viewer360Images]);
  const [index, setIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const framePositionRef = useRef(0);
  const dragXRef = useRef<number | null>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  const visibleFrame = useMemo(
    () => frames[index] || product.heroImageUrl,
    [frames, index, product.heroImageUrl],
  );

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
    if (!autoRotate || isDragging || !isVisible || frames.length < 2) return;

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
  }, [autoRotate, frames.length, isDragging, isVisible, setFramePosition]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const scheduleGentleResume = useCallback(() => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      setAutoRotate(true);
    }, RESUME_DELAY_MS);
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragXRef.current = event.clientX;
    setIsDragging(true);
    setAutoRotate(false);
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragXRef.current === null || frames.length < 2) return;
    const delta = event.clientX - dragXRef.current;
    if (Math.abs(delta) < 1) return;
    setFramePosition(framePositionRef.current + delta / DRAG_PIXELS_PER_FRAME);
    dragXRef.current = event.clientX;
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
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
            More showroom angles will be added when the full image set is ready.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="touch-none select-none overflow-hidden rounded-[20px] border border-[#dce8dc] bg-[radial-gradient(circle_at_center,#fff_0,#edf8ee_100%)] p-4"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onPointerLeave={() => {
        if (!isDragging) return;
        dragXRef.current = null;
        setIsDragging(false);
        scheduleGentleResume();
      }}
    >
      <div className="flex items-center justify-between gap-4 px-2 pb-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#119c3a]">360° showroom view</p>
          <h3 className="text-2xl font-black text-[#101510]">Drag or swipe to rotate</h3>
        </div>
        <button
          type="button"
          aria-label={autoRotate ? "Pause 360 auto rotation" : "Play 360 auto rotation"}
          onClick={(event) => {
            event.stopPropagation();
            setAutoRotate((value) => !value);
          }}
          className="inline-flex items-center gap-2 rounded-full bg-[#101510] px-3 py-2 text-xs font-black text-white"
        >
          {autoRotate ? <Pause size={14} /> : <Play size={14} />}
          {index + 1}/{frames.length}
        </button>
      </div>
      <div className="aspect-[4/3]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={officialAssetSrc(visibleFrame)} alt={`${product.name} 360 frame ${index + 1}`} className="h-full w-full object-contain" draggable={false} />
      </div>
      <div className="h-1 rounded-full bg-[#dce8dc]">
        <div className="h-1 rounded-full bg-[#119c3a] transition-[width] duration-150" style={{ width: `${((index + 1) / frames.length) * 100}%` }} />
      </div>
    </div>
  );
}
