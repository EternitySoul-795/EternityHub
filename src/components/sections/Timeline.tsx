"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { TIMELINE } from "@/data/timeline";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

export function Timeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    registerGsap();
    if (!trackRef.current || !fillRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(fillRef.current, { scaleY: 1 });
      setProgress(1);
      return;
    }

    const st = ScrollTrigger.create({
      trigger: trackRef.current,
      start: "top 70%",
      end: "bottom 60%",
      scrub: true,
      onUpdate: (self) => {
        gsap.set(fillRef.current, { scaleY: self.progress });
        setProgress(self.progress);
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section id="timeline" className="relative overflow-hidden bg-[#050505] py-32 md:py-44">
      <div className="relative mx-auto max-w-[860px] px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <EyebrowBadge>Journey</EyebrowBadge>
          <h2 className="mt-5 font-sans text-[clamp(2.4rem,6.5vw,5.5rem)] font-semibold leading-[0.92] tracking-tighter text-white">
            How I got here.
          </h2>
        </motion.div>

        <div ref={trackRef} className="relative pl-10">
          <div className="absolute left-0 top-0 h-full w-px bg-white/10" />
          <div
            ref={fillRef}
            className="absolute left-0 top-0 h-full w-px origin-top bg-[#d90429]"
            style={{ transform: "scaleY(0)", boxShadow: "0 0 12px rgba(217,4,41,0.8)" }}
          />

          <div className="flex flex-col gap-16">
            {TIMELINE.map((item, i) => {
              const lit = progress > i / TIMELINE.length;
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <span
                    className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 transition-all duration-500"
                    style={{
                      borderColor: lit ? "#d90429" : "rgba(255,255,255,0.2)",
                      background: lit ? "#d90429" : "#050505",
                      boxShadow: lit ? "0 0 14px rgba(217,4,41,0.9)" : "none",
                    }}
                  />
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-[#d90429]/30 bg-[#d90429]/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.28em] text-[#ff5c74]">
                      {item.tag}
                    </span>
                    <span className="font-mono text-[11px] text-white/35">{item.year}</span>
                  </div>
                  <h3 className="mt-3 font-sans text-2xl font-semibold tracking-tight text-white">{item.title}</h3>
                  <p className="mt-2 max-w-[56ch] font-sans text-sm leading-relaxed text-white/50">{item.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
