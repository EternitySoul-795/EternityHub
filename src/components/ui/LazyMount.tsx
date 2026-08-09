"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "framer-motion";

/**
 * Defers mounting expensive children (R3F canvases, particle systems)
 * until the wrapper actually scrolls near the viewport.
 */
export function LazyMount({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "200px" });

  return (
    <div ref={ref} className={className}>
      {inView ? children : null}
    </div>
  );
}
