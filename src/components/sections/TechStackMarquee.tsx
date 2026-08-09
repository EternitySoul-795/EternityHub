"use client";

import { useState } from "react";
import { TECH_STACK } from "@/data/techstack";

export function TechStackMarquee() {
  const [paused, setPaused] = useState(false);
  const loop = [...TECH_STACK, ...TECH_STACK];

  return (
    <section className="relative overflow-hidden border-y border-white/8 bg-[#050505] py-14">
      <div
        className="overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="marquee-track gap-16" data-paused={paused}>
          {loop.map(({ name, Icon }, i) => (
            <div
              key={`${name}-${i}`}
              data-hover
              className="group flex shrink-0 items-center gap-3 px-4 opacity-40 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            >
              <Icon size={28} className="text-white transition-colors duration-300 group-hover:text-[#ff5c74]" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50 group-hover:text-white">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
