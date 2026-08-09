import type Lenis from "lenis";

/**
 * Module-level singleton so any client component (nav anchor links, the
 * loading screen, magnetic cursor) can reach the active Lenis instance
 * without prop-drilling. Set once by SmoothScrollProvider on mount.
 */
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = (): Lenis | null => instance;
