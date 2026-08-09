"use client";

import { useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { SERVICES } from "@/data/services";

function ServiceCard({
  service,
  index,
  spanFull,
}: {
  service: (typeof SERVICES)[number];
  index: number;
  spanFull?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -7, y: px * 9 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.07, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={`[perspective:1200px] ${spanFull ? "md:col-span-2" : ""}`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setTilt({ x: 0, y: 0 });
        }}
        className="group relative overflow-hidden rounded-[28px] border p-8 transition-[border-color,box-shadow] duration-500 md:p-10"
        style={{
          borderColor: hovered ? "rgba(217,4,41,0.5)" : "rgba(255,255,255,0.08)",
          background: "linear-gradient(155deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
          boxShadow: hovered ? "0 0 60px -12px rgba(217,4,41,0.35)" : "none",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 300ms ease-out, border-color 500ms, box-shadow 500ms",
        }}
      >
        <div className="flex items-start justify-between">
          <span className="font-mono text-[11px] tracking-[0.3em] text-white/25">0{index + 1}</span>
          <span
            className="h-2 w-2 shrink-0 rounded-full transition-colors duration-500"
            style={{ background: hovered ? "#d90429" : "rgba(255,255,255,0.15)", boxShadow: hovered ? "0 0 10px rgba(217,4,41,0.9)" : "none" }}
          />
        </div>

        <h3 className="mt-8 font-sans text-2xl font-semibold tracking-tight text-white md:text-[1.75rem]">
          {service.title}
        </h3>

        <p className="mt-4 max-w-[42ch] font-sans text-sm leading-relaxed text-white/50">
          {service.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/8 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#050505] py-32 md:py-44">
      <div className="relative mx-auto max-w-[1200px] px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-20"
        >
          <EyebrowBadge>What I Do</EyebrowBadge>
          <h2 className="mt-5 font-sans text-[clamp(2.4rem,6.5vw,5.5rem)] font-semibold leading-[0.92] tracking-tighter text-white">
            Services.
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} spanFull={i === SERVICES.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
