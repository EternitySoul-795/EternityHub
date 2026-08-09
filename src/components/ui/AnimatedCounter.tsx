"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

type Props = { value: string; duration?: number; className?: string };

/**
 * Counts up from 0 to the numeric portion of `value` once it scrolls into
 * view, preserving any suffix ("+", "%") and non-numeric values ("∞") as-is.
 */
export function AnimatedCounter({ value, duration = 1.6, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    registerGsap();
    const match = value.match(/^([0-9]+(?:\.[0-9]+)?)(.*)$/);
    const el = ref.current;
    if (!match || !el) {
      setDisplay(value);
      return;
    }

    const target = parseFloat(match[1]);
    const suffix = match[2];
    const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
    const counter = { v: 0 };
    setDisplay(`0${suffix}`);

    let tween: gsap.core.Tween | null = null;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        tween = gsap.to(counter, {
          v: target,
          duration,
          ease: "power2.out",
          onUpdate: () => setDisplay(`${counter.v.toFixed(decimals)}${suffix}`),
        });
      },
    });

    return () => {
      trigger.kill();
      tween?.kill();
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
