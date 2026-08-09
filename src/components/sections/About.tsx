"use client";

import { motion } from "framer-motion";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SITE } from "@/data/site";

const STATS = [
  { n: SITE.yearsBuilding, label: "Years Building" },
  { n: SITE.projectsShipped, label: "Projects Shipped" },
  { n: "∞", label: "Things Learned" },
  { n: "1", label: "Obsession: Craft" },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#050505] py-32 md:py-44">
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: 900,
          height: 500,
          background: "radial-gradient(ellipse at 50% 0%, rgba(217,4,41,0.08) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-20"
        >
          <EyebrowBadge>About Me</EyebrowBadge>
          <h2 className="mt-5 font-sans text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[0.9] tracking-tighter text-white">
            Who I am.
          </h2>
          <p className="mt-5 max-w-[54ch] font-sans text-base leading-relaxed text-white/50">
            {SITE.bioShort}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 gap-4 border-t border-white/8 pt-12 md:grid-cols-4"
        >
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span className="font-sans text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-none tracking-tight text-white">
                <AnimatedCounter value={s.n} />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
