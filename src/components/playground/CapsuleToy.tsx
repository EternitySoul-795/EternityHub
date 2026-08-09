"use client";

import { motion } from "framer-motion";

const ITEMS = ["Drag Me", "Fling", "Play", "GSAP", "R3F", "Lenis"];

/** A drag-and-fling physics toy — momentum + elastic bounds via Framer Motion, no physics engine needed. */
export function CapsuleToy() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {ITEMS.map((label, i) => (
        <motion.div
          key={label}
          drag
          dragMomentum
          dragElastic={0.2}
          dragConstraints={{ left: -140, right: 140, top: -90, bottom: 90 }}
          whileDrag={{ scale: 1.08 }}
          data-hover
          className="absolute cursor-grab select-none rounded-full border border-[#d90429]/40 bg-[#d90429]/10 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-white/70 active:cursor-grabbing"
          style={{ left: `${16 + ((i * 37) % 58)}%`, top: `${18 + ((i * 53) % 55)}%` }}
        >
          {label}
        </motion.div>
      ))}
    </div>
  );
}
