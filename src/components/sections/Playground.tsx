"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { LazyMount } from "@/components/ui/LazyMount";
import { FlowField } from "@/components/playground/FlowField";
import { CapsuleToy } from "@/components/playground/CapsuleToy";

const ParticleSwarm = dynamic(() => import("@/components/playground/ParticleSwarm"), { ssr: false });

const EXPERIMENTS = [
  { id: "swarm", title: "Reactive Swarm", caption: "R3F particle sphere, nudged by pointer position.", node: <ParticleSwarm /> },
  { id: "flow", title: "Flow Field", caption: "A hand-rolled canvas flow field — drag your cursor through it.", node: <FlowField /> },
  { id: "toy", title: "Capsule Toy", caption: "Drag, fling, let go. Momentum courtesy of Framer Motion.", node: <CapsuleToy /> },
];

export function Playground() {
  return (
    <section id="playground" className="relative overflow-hidden bg-[#050505] py-32 md:py-44">
      <div className="relative mx-auto max-w-[1200px] px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <EyebrowBadge>Playground</EyebrowBadge>
          <h2 className="mt-5 font-sans text-[clamp(2.4rem,6.5vw,5.5rem)] font-semibold leading-[0.92] tracking-tighter text-white">
            Just for fun.
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {EXPERIMENTS.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="panel overflow-hidden"
            >
              <LazyMount className="relative h-[360px] w-full bg-[#0a0a0a]">{exp.node}</LazyMount>
              <div className="border-t border-white/8 p-5">
                <h3 className="font-sans text-base font-semibold text-white">{exp.title}</h3>
                <p className="mt-1.5 font-sans text-xs leading-relaxed text-white/40">{exp.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
