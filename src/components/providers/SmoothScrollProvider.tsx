"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { setLenis, getLenis } from "@/lib/lenis-instance";
import { useSiteReady } from "./SiteReadyProvider";

type Props = { children: React.ReactNode };

export function SmoothScrollProvider({ children }: Props) {
  const { ready } = useSiteReady();

  // Create Lenis once, drive it off GSAP's ticker so ScrollTrigger and
  // Lenis stay perfectly in sync (the standard Lenis + GSAP recipe).
  useEffect(() => {
    registerGsap();

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
    });
    setLenis(lenis);
    lenis.stop(); // locked until the loading screen releases it

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // Release scroll once the loading screen finishes.
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    if (ready) lenis.start();
    else lenis.stop();
  }, [ready]);

  return <>{children}</>;
}
