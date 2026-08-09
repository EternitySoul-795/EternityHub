/**
 * Fixed, full-viewport film-grain texture. Pure CSS (SVG turbulence data
 * URI + stepped keyframe), so it costs nothing extra at runtime — no
 * canvas, no JS animation loop.
 */
export function GrainOverlay({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none fixed inset-0 z-[3] overflow-hidden ${className}`} aria-hidden="true">
      <div className="grain" />
    </div>
  );
}
