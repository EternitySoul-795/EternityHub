import Link from "next/link";
import { ArrowUpRight, InstagramLogo, LinkedinLogo, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { SITE } from "@/data/site";
import { FooterDivider } from "@/components/ui/FooterDivider";

const SOCIAL_ICONS: Record<string, typeof InstagramLogo> = {
  Instagram: InstagramLogo,
  LinkedIn: LinkedinLogo,
  Email: EnvelopeSimple,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-[#050505] pt-20">
      <div className="relative mx-auto max-w-[1200px] px-6 md:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-[#d90429] opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d90429]" />
              </span>
              <span className="font-sans text-sm font-semibold tracking-tight text-white">
                {SITE.brand}
                <span className="text-[#ff5c74]">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-[32ch] font-sans text-sm text-white/40">{SITE.tagline}</p>
          </div>

          <nav className="flex flex-wrap gap-6">
            {SITE.nav.map((l) => (
              <a key={l.label} href={l.href} className="font-sans text-sm text-white/50 transition-colors duration-200 hover:text-white">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-4">
            <a
              href={`mailto:${SITE.email}`}
              className="group inline-flex items-center gap-1.5 font-sans text-sm text-white/60 transition-colors duration-200 hover:text-white"
            >
              {SITE.email}
              <ArrowUpRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <div className="flex items-center gap-3">
              {SITE.socials
                .filter((s) => s.label !== "Email")
                .map((s) => {
                  const Icon = SOCIAL_ICONS[s.label] ?? EnvelopeSimple;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-200 hover:border-[#d90429]/40 hover:text-white"
                      aria-label={s.label}
                    >
                      <Icon size={15} />
                    </a>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="my-12">
          <FooterDivider />
        </div>

        <div className="flex flex-col gap-2 pb-8 md:flex-row md:items-center md:justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/25">
            &copy; {year} {SITE.brand} &mdash; All rights reserved
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/25">
            {SITE.roles.join(" / ")}
          </span>
        </div>
      </div>

      <div className="pointer-events-none relative flex justify-center overflow-hidden pb-4 select-none" aria-hidden="true">
        <span className="font-sans text-[18vw] font-bold leading-none tracking-tighter text-white/[0.04]">
          {SITE.brand.toUpperCase()}
        </span>
      </div>
    </footer>
  );
}
