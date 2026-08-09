/**
 * Single source of truth for identity/nav/social content — consumed by
 * sections, the footer, and the AI assistant's system prompt so nothing
 * drifts out of sync.
 */
export const SITE = {
  name: "Khileshwar Dewangan",
  brand: "Eternityhub",
  roles: ["Full Stack Developer", "UI/UX Designer", "AI Engineer", "Creative Technologist"],
  tagline: "Building immersive digital experiences & AI-powered products.",
  heroWords: ["BUILDING", "DIGITAL", "EXPERIENCES", "THAT", "PEOPLE", "REMEMBER"],
  heroEyebrow: "FULL STACK DEVELOPER • UI/UX DESIGNER • AI ENGINEER",
  heroHeadingLines: ["Crafting Digital Experiences", "Beyond Code."],
  heroDescription:
    "Hi, I'm Khileshwar Dewangan — a Full Stack Developer, UI/UX Designer, and AI Enthusiast who transforms ideas into fast, immersive, and visually striking digital products. I combine thoughtful design, modern engineering, and intelligent systems to create experiences people genuinely enjoy using.",
  bioShort:
    "From writing my first line of HTML to shipping AI-powered 3D experiences — every chapter has been about building things that feel alive.",
  email: "khileshwar.uiux@gmail.com",
  yearsBuilding: "3+",
  projectsShipped: "15+",
  availableForWork: true,
  /** Drop the real file at public/resume.pdf — the Hero's "Download Resume" CTA links here. */
  resumeUrl: "/resume.pdf" as string | null,
  domain: "eternitysoul.me",
  socials: [
    { label: "Instagram", href: "https://instagram.com/eternity.soul_795" },
    { label: "LinkedIn", href: "https://linkedin.com/in/khileshwar-dewangan-795official" },
    { label: "Email", href: "mailto:khileshwar.uiux@gmail.com" },
  ],
  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Playground", href: "#playground" },
    { label: "Contact", href: "#contact" },
  ],
} as const;
