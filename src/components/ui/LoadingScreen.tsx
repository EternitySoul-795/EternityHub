"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useSiteReady } from "@/components/providers/SiteReadyProvider";
import { SITE } from "@/data/site";

/**
 * Cinematic intro gate: wordmark + choreographed progress + a soft glitch
 * and a sweeping scan line, then fades into the homepage and releases
 * scroll (via SiteReadyProvider -> SmoothScrollProvider).
 */
export function LoadingScreen() {
  const { setReady } = useSiteReady();
  const rootRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const counter = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(rootRef.current, {
          opacity: 0,
          duration: reduced ? 0.2 : 0.9,
          delay: 0.3,
          ease: "power2.inOut",
          onComplete: () => {
            setDone(true);
            setReady(true);
          },
        });
      },
    });

    tl.to(counter, {
      value: 100,
      duration: reduced ? 0.25 : 2.2,
      ease: "power2.inOut",
      onUpdate: () => setProgress(Math.round(counter.value)),
    });

    // A few brief glitch hits on the wordmark while it loads.
    if (!reduced && wordmarkRef.current) {
      gsap
        .timeline({ repeat: 3, repeatDelay: 0.45, delay: 0.3 })
        .to(wordmarkRef.current, { skewX: 8, x: -3, duration: 0.04 })
        .to(wordmarkRef.current, { skewX: 0, x: 0, duration: 0.05 })
        .to(wordmarkRef.current, { opacity: 0.55, duration: 0.03 })
        .to(wordmarkRef.current, { opacity: 1, duration: 0.03 });
    }

    return () => {
      tl.kill();
    };
  }, [setReady]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9997] flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
    >
      <div className="grain" />
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff1f47] to-transparent [animation:scan_2.4s_ease-in-out_infinite]" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ width: 520, height: 520, background: "radial-gradient(circle, rgba(217,4,41,0.14) 0%, transparent 70%)" }}
      />

      <span className="eyebrow mb-6 relative">Loading Experience&hellip;</span>
      <h1
        ref={wordmarkRef}
        className="relative select-none font-sans text-[15vw] font-semibold leading-none tracking-tighter text-white md:text-[7vw]"
      >
        {SITE.brand.toUpperCase()}
      </h1>

      <div className="relative mt-10 flex w-[240px] flex-col gap-3">
        <div className="h-px w-full overflow-hidden bg-white/10">
          <div className="h-full bg-[#d90429]" style={{ width: `${progress}%` }} />
        </div>
        <span className="self-end font-mono text-[11px] tracking-wide text-white/40">
          {String(progress).padStart(2, "0")}%
        </span>
      </div>
    </div>
  );
}
