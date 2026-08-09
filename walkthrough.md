# Portfolio Project — Complete Scan & Analysis

## Overview

**Project Name:** `devfolio` (PORTFOLIO 11)  
**Framework:** Next.js 16.2.2 + React 19 + TypeScript  
**Styling:** Tailwind CSS v4 + custom CSS variables  
**Animations:** Framer Motion + scroll-driven video/canvas  
**Smooth Scroll:** Lenis  
**Icons:** Phosphor Icons  
**Font:** Geist Sans & Geist Mono (via `next/font/google`)  
**Theme:** Ultra-dark (#05050b) with violet/cyan/gold accent glows

---

## Architecture

```
src/
├── app/
│   ├── globals.css          — Design tokens, utility classes, keyframes
│   ├── layout.tsx           — Root layout (fonts, SmoothScroll, Cursor, Particles)
│   └── page.tsx             — Home page (Navbar → Hero → About → Skills → Projects → BusinessVision → CTA → Footer)
├── components/
│   ├── providers/
│   │   └── SmoothScrollProvider.tsx  — Lenis wrapper
│   ├── sections/            — Page sections (14 files, 7 used)
│   └── ui/                  — Reusable UI (7 files)
├── lib/
│   ├── hero.ts              — Frame sequence config + annotations
│   └── showcase.ts          — Tunnel frame config + project data
public/
├── hero.mp4                 — Scroll-scrubbed hero video (~1.1 MB)
├── frames/                  — 169 JPG frames for hero canvas fallback
└── tunnel-frames/           — 169 JPG frames for projects showcase canvas
```

---

## Active Page Flow (7 sections)

| # | Section | Component | Key Feature |
|---|---------|-----------|-------------|
| 1 | **Navbar** | `ui/Navbar.tsx` | Glassmorphic sticky header, "Let's Talk" CTA |
| 2 | **Hero** | `sections/Hero.tsx` | Scroll-scrubbed MP4 video, parallax text, role cycling, loading screen |
| 3 | **About** | `sections/About.tsx` | Timeline cards (2022–2024), stats strip |
| 4 | **Skills** | `sections/Skills.tsx` | Tabbed skill bars (Frontend/Backend/Design/Tools) |
| 5 | **Projects** | `sections/Projects.tsx` | Hover-glow project cards (EchoSpace, Robot, Design Portfolio) |
| 6 | **Business Vision** | `sections/BusinessVision.tsx` | Flow diagram (You → Studio → Ship), Discord community |
| 7 | **CTA** | `sections/CTA.tsx` | Email CTA with gradient button, copy-to-clipboard, social links |
| 8 | **Footer** | `sections/Footer.tsx` | Minimal footer with nav links |

---

## 7 Unused / Dormant Components

These exist in `sections/` but are **NOT imported in `page.tsx`**:

| File | Purpose | Notes |
|------|---------|-------|
| `BentoFeatures.tsx` | Bento grid with typewriter, 3D cube, orb, bar chart, clock | Uses `card-surface` class (light theme — not defined in current globals.css) |
| `ProjectsShowcase.tsx` | Canvas-based scroll tunnel with project card overlays | Heavy — preloads 169 tunnel frames |
| `CoreServices.tsx` | Service cards (Web Dev, UI/UX, Backend) | Light theme styling |
| `FAQ.tsx` | Accordion FAQ section | Light theme styling |
| `FinalCTA.tsx` | Alternative CTA with external button | Light theme styling |
| `ProcessMethodology.tsx` | 3-step process (Discover → Design → Launch) | Light theme styling |
| `TestimonialsStats.tsx` | Client testimonials + stats strip | Light theme, uses "Suraj" name |

> [!WARNING]
> The unused components (`BentoFeatures`, `CoreServices`, `FAQ`, `FinalCTA`, `ProcessMethodology`, `TestimonialsStats`) reference **light-theme** classes like `bg-background`, `text-foreground`, `card-surface`, `border-zinc-200` — these would look broken on the current dark theme without CSS adjustments.

---

## Global Effects (Always Running)

| Effect | Component | Details |
|--------|-----------|---------|
| **Custom Cursor** | `ui/CustomCursor.tsx` | Violet dot + ring, lerped follow, hover/click states, hidden on touch devices |
| **Particle Field** | `ui/ParticleField.tsx` | 38 floating particles on canvas (violet/cyan hues), fixed overlay |
| **Smooth Scroll** | `providers/SmoothScrollProvider.tsx` | Lenis with `lerp: 0.08`, RAF loop |

---

## Design System (globals.css)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#05050b` | Page background |
| `--bg-surface` | `#0d0d1a` | Surface background |
| `--bg-card` | `#111120` | Card background |
| `--fg` | `#eeeef5` | Primary text |
| `--fg-muted` | `#6b7080` | Muted text |
| `--violet` | `#7c3aed` | Primary accent |
| `--cyan` | `#06b6d4` | Secondary accent |
| `--gold` | `#f59e0b` | Tertiary accent |

**Utility classes:** `.card-dark`, `.card-glow-v/c/g`, `.grad-vc`, `.grad-vg`, `.ping-slow`, `.float`, `.float-slow`, `.scroll-animation`

---

## Potential Issues Found

> [!IMPORTANT]
> ### Name Inconsistencies
> - **Navbar** displays `Suraj.` — but **Hero**, **Footer**, **CTA**, and **metadata** all say **"Khileshwar Dewangan"**
> - **CTA socials** should be normalized to the current branding
> - **TestimonialsStats** (unused) references "Suraj" in testimonials
> - The email is `khileshwar.uiux@gmail.com` everywhere active, but `FinalCTA` (unused) uses `ssurajdewangan2244@gmail.com`

> [!NOTE]
> ### Other Observations
> - **`cursor: none`** is set globally — the custom cursor replaces the default one
> - **No mobile hamburger menu** — the nav links are hidden on mobile (`hidden md:flex`), only the CTA button remains
> - **Hero** uses `scroll-animation` class (450vh) for video scrubbing — this is a long scroll section
> - The `metadataBase` is set to `http://localhost:3000` — needs updating for production
> - `postcss.config.mjs` exists (94 bytes) — presumably for Tailwind v4 PostCSS integration
> - **338 frame images** total (~22 MB) in `/public` — significant bundle for deployment

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.2.2 | Framework |
| `react` / `react-dom` | 19.2.4 | UI library |
| `framer-motion` | ^12.38.0 | Animations |
| `lenis` | ^1.3.21 | Smooth scroll |
| `geist` | ^1.7.0 | Typography |
| `@phosphor-icons/react` | ^2.1.10 | Icons |
| `tailwindcss` | ^4 | Styling |
| `typescript` | ^5 | Type safety |

---

## Summary

This is a well-architected, dark-themed portfolio with premium visual effects (scroll-scrubbed video, particle field, custom cursor, glassmorphic cards). The active page has 8 sections with smooth animations. There are 7 additional dormant components from an earlier light-theme iteration that could be adapted. The main issue is the **name inconsistency** (Suraj vs. Khileshwar) across components, and the missing mobile navigation menu.

What would you like to do with this project?
