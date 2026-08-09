import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Project } from "@/data/projects";

const SECTIONS: { label: string; key: keyof Project }[] = [
  { label: "Overview", key: "overview" },
  { label: "The Problem", key: "problem" },
  { label: "Research", key: "research" },
  { label: "Design", key: "design" },
  { label: "Development", key: "development" },
  { label: "Challenges", key: "challenges" },
  { label: "Architecture", key: "architecture" },
  { label: "Results", key: "results" },
  { label: "Lessons Learned", key: "lessons" },
];

export function CaseStudyTemplate({ project }: { project: Project }) {
  return (
    <article className="relative bg-[#050505] pb-32 pt-32 md:pt-40">
      <div className="mx-auto max-w-[860px] px-6 md:px-12">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white/40 transition-colors hover:text-white"
        >
          <ArrowLeft size={13} weight="bold" />
          Back to Work
        </Link>

        <div className="mt-10 flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.3em] text-white/25">{project.number}</span>
          <span className="rounded-full border border-[#d90429]/30 bg-[#d90429]/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[#ff5c74]">
            {project.status}
          </span>
        </div>

        <h1 className="mt-6 font-sans text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-[0.92] tracking-tighter text-white">
          {project.title}
        </h1>
        <p className="mt-3 font-sans text-lg text-white/45">{project.subtitle}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/8 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 font-sans text-sm font-semibold text-[#050505] transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(255,255,255,0.25)]"
          >
            Live Demo
            <ArrowUpRight size={14} weight="bold" />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-[860px] px-6 md:px-12">
        {SECTIONS.map((section) => (
          <section key={section.key} className="border-t border-white/8 py-12 first:border-t-0 first:pt-0">
            <div className="grid gap-4 md:grid-cols-[200px_1fr]">
              <h2 className="eyebrow pt-1">{section.label}</h2>
              <p className="max-w-[62ch] font-sans text-[1.05rem] leading-relaxed text-white/60">
                {project[section.key] as string}
              </p>
            </div>
          </section>
        ))}

        <section className="border-t border-white/8 py-12">
          <div className="grid gap-4 md:grid-cols-[200px_1fr]">
            <h2 className="eyebrow pt-1">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/8 bg-white/[0.03] px-3 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-white/55"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/8 py-12">
          <div className="grid gap-4 md:grid-cols-[200px_1fr]">
            <h2 className="eyebrow pt-1">Gallery</h2>
            {project.gallery.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {project.gallery.map((src) => (
                  <div key={src} className="aspect-video overflow-hidden rounded-xl border border-white/8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${project.title} screenshot`}
                      className="h-full w-full object-cover object-[30%_top]"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="flex aspect-video items-center justify-center rounded-xl border border-white/8"
                    style={{ background: "linear-gradient(145deg, #121212 0%, #0a0a0a 100%)" }}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                      Gallery coming soon
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </article>
  );
}
