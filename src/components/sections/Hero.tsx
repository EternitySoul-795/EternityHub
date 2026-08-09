"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown } from "@phosphor-icons/react";
import { gsap, ScrollTrigger, SplitText, registerGsap } from "@/lib/gsap";
import { useSiteReady } from "@/components/providers/SiteReadyProvider";
import { SITE } from "@/data/site";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

const HeroOrb = dynamic(() => import("@/components/three/HeroOrb"), { ssr: false });

export function Hero() {
  const { ready } = useSiteReady();
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const orbColRef = useRef<HTMLDivElement>(null);

  // Cursor-reactive ambient red glow, eased toward the pointer.
  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const pointer = { x: 0.5, y: 0.4 };
    const target = { x: 0.5, y: 0.4 };
    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      target.x = (e.clientX - rect.left) / rect.width;
      target.y = (e.clientY - rect.top) / rect.height;
    };
    section.addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    const tick = () => {
      pointer.x += (target.x - pointer.x) * 0.05;
      pointer.y += (target.y - pointer.y) * 0.05;
      glow.style.background = `radial-gradient(640px circle at ${pointer.x * 100}% ${pointer.y * 100}%, rgba(217,4,41,0.18), transparent 65%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Parallax as the visitor scrolls past — no pin, just depth: text drifts up and fades
  // faster than the orb, which drifts slower and holds, reading as "further back".
  useEffect(() => {
    registerGsap();
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
        .to(textColRef.current, { y: -90, opacity: 0.15, ease: "none", duration: 1 }, 0)
        // The orb grows continuously across the whole scroll-past, filling more of the
        // frame — clipped by the section's own overflow-hidden, so it never spills
        // into the next section — then only fades out right at the end.
        .to(orbColRef.current, { scale: 2.6, y: -30, ease: "none", duration: 1 }, 0)
        .to(orbColRef.current, { opacity: 0, ease: "none", duration: 0.45 }, 0.55);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Entrance: split-text mask reveal on the heading + staggered fade-in for the rest,
  // released once the loading screen finishes.
  useEffect(() => {
    if (!ready || !headingRef.current) return;
    registerGsap();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const split = new SplitText(headingRef.current, { type: "words", mask: "words" });

    const tl = gsap.timeline({ delay: 0.1 });
    tl.from(eyebrowRef.current, { opacity: 0, y: 12, duration: reduced ? 0.2 : 0.6, ease: "power3.out" })
      .from(
        split.words,
        { yPercent: 110, opacity: 0, duration: reduced ? 0.2 : 0.9, stagger: reduced ? 0 : 0.035, ease: "power4.out" },
        "-=0.25"
      )
      .from(descRef.current, { opacity: 0, y: 16, duration: reduced ? 0.2 : 0.7, ease: "power3.out" }, "-=0.5")
      .from(ctaRef.current, { opacity: 0, y: 16, duration: reduced ? 0.2 : 0.7, ease: "power3.out" }, "-=0.5")
      .from(orbColRef.current, { opacity: 0, scale: 0.85, duration: reduced ? 0.3 : 1.3, ease: "power3.out" }, "-=1");

    return () => {
      tl.kill();
      split.revert();
    };
  }, [ready]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#050505] py-32"
    >
      <GrainOverlay />
      <div ref={glowRef} className="pointer-events-none absolute inset-0 z-[1]" />

      <div className="relative z-[3] mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-16 px-6 md:px-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div ref={textColRef}>
          <div ref={eyebrowRef} className="eyebrow mb-7 flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d90429]" style={{ boxShadow: "0 0 10px rgba(217,4,41,0.9)" }} />
            {SITE.heroEyebrow}
          </div>

          <h1
            ref={headingRef}
            className="max-w-[16ch] font-sans text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[1.05] tracking-tighter text-white"
          >
            {SITE.heroHeadingLines[0]}
            <br />
            <span className="text-[#d90429]">{SITE.heroHeadingLines[1]}</span>
          </h1>

          <p ref={descRef} className="mt-7 max-w-[56ch] font-sans text-base leading-relaxed text-white/55 md:text-lg">
            {SITE.heroDescription}
          </p>

          <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              data-magnetic
              className="rounded-full bg-[#d90429] px-7 py-3.5 font-sans text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-[0_0_36px_rgba(217,4,41,0.55)]"
            >
              Explore My Work
            </a>
            <a
              href={SITE.resumeUrl ?? "#contact"}
              download={Boolean(SITE.resumeUrl)}
              data-magnetic
              className="rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 font-sans text-sm font-semibold text-white/80 transition-colors duration-300 hover:border-white/30 hover:text-white"
            >
              Download Resume
            </a>
          </div>
        </div>

        <div ref={orbColRef} className="relative h-[380px] md:h-[460px] lg:h-[560px]">
          <HeroOrb />
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-8 left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
        <ArrowDown size={16} className="text-white/30" />
      </motion.div>
    </section>
  );
}
