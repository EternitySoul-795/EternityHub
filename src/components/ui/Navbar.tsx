"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, List } from "@phosphor-icons/react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SITE } from "@/data/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "border-b border-white/8 bg-[#050505]/85 backdrop-blur-2xl" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10 md:py-5">
        <Link href="/" data-magnetic className="group flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-[#d90429] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d90429]" />
          </span>
          <span className="font-sans text-sm font-semibold tracking-tight text-white">
            {SITE.brand}
            <span className="text-[#ff5c74]">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {SITE.nav.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-sans text-sm text-white/55 transition-colors duration-200 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          data-magnetic
          className="group hidden items-center gap-1.5 rounded-full border border-[#d90429]/30 bg-[#d90429]/[0.08] px-4 py-2 font-sans text-xs font-medium text-[#ff5c74] backdrop-blur-sm transition-all duration-200 hover:border-[#d90429]/55 hover:bg-[#d90429]/15 md:inline-flex"
        >
          Let&rsquo;s Talk
          <ArrowUpRight size={12} weight="bold" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
            aria-label="Open menu"
          >
            <List size={18} />
          </button>
          <SheetContent side="right" className="border-white/10 bg-[#0a0a0a]">
            <SheetHeader>
              <SheetTitle className="text-white">{SITE.brand}</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {SITE.nav.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 font-sans text-base text-white/70 transition-colors hover:bg-white/[0.04] hover:text-white"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
