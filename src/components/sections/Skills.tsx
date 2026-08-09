"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { SKILL_CATEGORIES } from "@/data/skills";
import { projectsUsingTech } from "@/data/projects";

type FlatSkill = { name: string; level: number; category: string; since: string };

const ALL_SKILLS: FlatSkill[] = SKILL_CATEGORIES.flatMap((cat) =>
  cat.skills.map((s) => ({ ...s, category: cat.label, since: cat.since }))
);

function Capsule({ skill, index }: { skill: FlatSkill; index: number }) {
  const [active, setActive] = useState(false);
  const usedIn = projectsUsingTech(skill.name);
  const related = ALL_SKILLS.filter((s) => s.category === skill.category && s.name !== skill.name)
    .slice(0, 3)
    .map((s) => s.name);

  const glow = 0.15 + (skill.level / 100) * 0.35;

  return (
    <div
      className="float"
      style={{ animationDelay: `${(index % 6) * 0.6}s`, animationDuration: `${6 + (index % 4)}s` }}
    >
      <motion.button
        layout
        data-hover
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onClick={() => setActive((a) => !a)}
        transition={{ layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
        className="flex flex-col items-start rounded-[20px] border px-5 py-3 text-left"
        style={{
          borderColor: active ? "rgba(217,4,41,0.55)" : `rgba(217,4,41,${glow * 0.4})`,
          background: active ? "rgba(217,4,41,0.08)" : "rgba(255,255,255,0.02)",
          boxShadow: active ? "0 0 30px -6px rgba(217,4,41,0.4)" : "none",
        }}
      >
        <motion.div layout="position" className="flex items-center gap-2 whitespace-nowrap">
          <span className="font-sans text-sm font-medium text-white">{skill.name}</span>
          <span className="font-mono text-[10px] text-white/35">{skill.level}%</span>
        </motion.div>

        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-2.5 flex flex-col gap-1 overflow-hidden font-mono text-[10.5px] text-white/45"
            >
              <span>Since {skill.since} &middot; {skill.category}</span>
              {usedIn.length > 0 && <span>Used in: {usedIn.map((p) => p.title).join(", ")}</span>}
              {related.length > 0 && <span>Related: {related.join(", ")}</span>}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-[#050505] py-32 md:py-44">
      <div
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"
        style={{ width: 700, height: 700, background: "radial-gradient(circle, rgba(217,4,41,0.08) 0%, transparent 60%)" }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <EyebrowBadge>Skills</EyebrowBadge>
          <h2 className="mt-5 font-sans text-[clamp(2.4rem,6.5vw,5.5rem)] font-semibold leading-[0.92] tracking-tighter text-white">
            Tools of the trade.
          </h2>
          <p className="mt-4 max-w-[48ch] font-sans text-sm text-white/40">
            Hover a capsule &mdash; or tap it &mdash; for the story behind it.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-4">
          {ALL_SKILLS.map((skill, i) => (
            <Capsule key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
