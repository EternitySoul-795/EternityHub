"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { PROJECTS } from "@/data/projects";

function ProjectRow({ project, index }: { project: (typeof PROJECTS)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative grid min-h-[70vh] grid-cols-1 items-center gap-10 border-t border-white/8 py-16 md:grid-cols-2 md:gap-16"
    >
      {/* Number placeholder by default; crossfades to the real screenshot on hover. */}
      <div
        data-hover
        className="relative order-1 aspect-[3/2] w-full overflow-hidden rounded-[24px] border border-white/8 md:order-none"
        style={{ background: "linear-gradient(145deg, #121212 0%, #0a0a0a 100%)" }}
      >
        <motion.div
          animate={{
            scale: hovered ? 1.06 : 1,
            opacity: project.gallery.length > 0 && hovered ? 0 : 1,
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(217,4,41,0.16) 0%, transparent 65%)" }}
        >
          <span className="font-sans text-[9rem] font-semibold tracking-tighter text-white/[0.06]">
            {project.number}
          </span>
        </motion.div>

        {project.gallery.length > 0 && (
          <>
            <motion.img
              src={project.gallery[0]}
              alt={`${project.title} screenshot`}
              initial={false}
              animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1.06 : 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-cover object-[30%_top]"
            />
            <motion.div
              initial={false}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(5,5,5,0.4) 0%, transparent 40%)" }}
            />
          </>
        )}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-0 border-2 border-[#d90429]/50"
            />
          )}
        </AnimatePresence>
      </div>

      <div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.3em] text-white/25">{project.number}</span>
          <span className="rounded-full border border-[#d90429]/30 bg-[#d90429]/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[#ff5c74]">
            {project.status}
          </span>
        </div>

        <h3 className="mt-5 font-sans text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.95] tracking-tighter text-white">
          {project.title}
        </h3>
        <p className="mt-2 font-sans text-base text-white/40">{project.subtitle}</p>

        <p className="mt-6 max-w-[52ch] font-sans text-sm leading-relaxed text-white/55">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/8 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="group/link inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 font-sans text-sm font-semibold text-[#050505] transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(255,255,255,0.25)]"
          >
            Live Demo
            <ArrowUpRight size={14} weight="bold" className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
          <Link
            href={`/projects/${project.slug}`}
            data-magnetic
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-5 py-2.5 font-sans text-sm font-medium text-white/80 transition-colors duration-300 hover:border-white/30 hover:text-white"
          >
            Case Study
            <ArrowUpRight size={14} weight="bold" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="work" className="relative overflow-hidden bg-[#050505] py-32 md:py-44">
      <div className="relative mx-auto max-w-[1200px] px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <EyebrowBadge>Work</EyebrowBadge>
            <h2 className="mt-5 font-sans text-[clamp(2.4rem,6.5vw,5.5rem)] font-semibold leading-[0.92] tracking-tighter text-white">
              Featured Projects.
            </h2>
          </div>
          <p className="max-w-[36ch] font-sans text-sm leading-relaxed text-white/40 md:text-right">
            Real things I&rsquo;m building — from AI systems to hardware to visual design.
          </p>
        </motion.div>

        <div>
          {PROJECTS.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
