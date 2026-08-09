"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

type Ripple = { id: number; x: number; y: number };

/**
 * Brand cursor: a snapping dot + a lagging ring that stretches along its
 * direction of travel, glows crimson on interactive hover, ripples on
 * click, and pulls toward any `[data-magnetic]` element it passes over.
 * Bails out entirely on touch devices and prefers-reduced-motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const lastRef = useRef({ x: 0, y: 0, t: 0 });
  const magnetElRef = useRef<HTMLElement | null>(null);

  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [magnetic, setMagnetic] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const isTouch = "ontouchstart" in window;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reducedMotion) return;
    setHidden(false);

    let raf: number;
    let rippleId = 0;

    const releaseMagnet = () => {
      if (!magnetElRef.current) return;
      gsap.to(magnetElRef.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)", overwrite: true });
      magnetElRef.current = null;
      setMagnetic(false);
    };

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      const magnetTarget = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (magnetTarget) {
        if (magnetElRef.current && magnetElRef.current !== magnetTarget) releaseMagnet();
        magnetElRef.current = magnetTarget;
        const rect = magnetTarget.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        gsap.to(magnetTarget, { x: relX * 0.35, y: relY * 0.35, duration: 0.5, ease: "power3.out", overwrite: true });
        setMagnetic(true);
      } else if (magnetElRef.current) {
        releaseMagnet();
      }
    };

    const onDown = (e: MouseEvent) => {
      setClicked(true);
      const id = ++rippleId;
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
    };
    const onUp = () => setClicked(false);
    const onEnter = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a,button,[data-hover]")) setHovered(true);
    };
    const onLeave = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a,button,[data-hover]")) setHovered(false);
    };

    const animate = () => {
      const { x, y } = posRef.current;
      const lerp = 0.16;
      ringPos.current.x += (x - ringPos.current.x) * lerp;
      ringPos.current.y += (y - ringPos.current.y) * lerp;

      // Velocity-based stretch: direction of travel + speed magnitude.
      const now = performance.now();
      const dt = Math.max(now - lastRef.current.t, 1);
      const dx = x - lastRef.current.x;
      const dy = y - lastRef.current.y;
      const speed = Math.min(Math.hypot(dx, dy) / dt, 1.8);
      const angle = speed > 0.02 ? (Math.atan2(dy, dx) * 180) / Math.PI : 0;
      const stretch = 1 + speed * 0.55;
      const squeeze = Math.max(1 - speed * 0.18, 0.72);
      lastRef.current = { x, y, t: now };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px, 0) rotate(${angle}deg) scaleX(${stretch}) scaleY(${squeeze})`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onEnter);
    window.addEventListener("mouseout", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onEnter);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  if (hidden) return null;

  const ringSize = clicked ? 26 : hovered ? 58 : magnetic ? 14 : 38;

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] will-change-transform rounded-full"
        style={{
          width: ringSize,
          height: ringSize,
          border: `1px solid ${hovered ? "rgba(217,4,41,0.85)" : "rgba(217,4,41,0.4)"}`,
          background: hovered ? "rgba(217,4,41,0.1)" : "transparent",
          opacity: magnetic ? 0.25 : 1,
          boxShadow: hovered ? "0 0 24px rgba(217,4,41,0.45)" : "0 0 10px rgba(217,4,41,0.15)",
          transition: "border-color 200ms, background 200ms, width 220ms, height 220ms, opacity 220ms, box-shadow 220ms",
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] will-change-transform rounded-full"
        style={{
          width: clicked ? 10 : hovered ? 5 : 8,
          height: clicked ? 10 : hovered ? 5 : 8,
          background: "#ff1f47",
          boxShadow: "0 0 14px rgba(217,4,41,0.9)",
          transition: "width 150ms, height 150ms",
        }}
      />
      {ripples.map((r) => (
        <div
          key={r.id}
          className="pointer-events-none fixed z-[9998] rounded-full"
          style={{
            left: r.x,
            top: r.y,
            width: 8,
            height: 8,
            marginLeft: -4,
            marginTop: -4,
            border: "1px solid rgba(217,4,41,0.7)",
            animation: "cursor-ripple 640ms cubic-bezier(0.16,1,0.3,1) forwards",
          }}
        />
      ))}
    </>
  );
}
