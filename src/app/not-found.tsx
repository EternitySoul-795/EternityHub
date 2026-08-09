import Link from "next/link";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-[#050505] px-6 pt-32 text-center">
      <GrainOverlay />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: 700, height: 700, background: "radial-gradient(circle, rgba(217,4,41,0.14) 0%, transparent 65%)" }}
      />

      <span className="eyebrow relative mb-6">Lost in Space</span>
      <h1 className="relative font-sans text-[clamp(4rem,16vw,11rem)] font-semibold leading-none tracking-tighter text-white">
        404
      </h1>
      <h2 className="relative mt-4 font-sans text-2xl font-semibold tracking-tight text-white md:text-3xl">
        Page not found
      </h2>
      <p className="relative mt-4 max-w-[46ch] font-sans text-sm leading-relaxed text-white/45">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved. Let&rsquo;s get you back on track.
      </p>

      <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          data-magnetic
          className="rounded-full bg-[#d90429] px-7 py-3.5 font-sans text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-[0_0_36px_rgba(217,4,41,0.55)]"
        >
          Go Home
        </Link>
        <Link
          href="/#work"
          data-magnetic
          className="rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 font-sans text-sm font-semibold text-white/80 transition-colors duration-300 hover:border-white/30 hover:text-white"
        >
          Explore Work
        </Link>
      </div>
    </div>
  );
}
