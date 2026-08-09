"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function StatsGrid({ stats }: { stats: { n: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="panel flex flex-col gap-2 p-7"
        >
          <span
            className="font-sans text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-none tracking-tight text-white"
            style={{ textShadow: "0 0 40px rgba(217,4,41,0.25)" }}
          >
            <AnimatedCounter value={s.n} />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{s.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
