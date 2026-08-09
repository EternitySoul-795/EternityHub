export type TimelineMilestone = {
  year: string;
  tag: string;
  title: string;
  body: string;
};

/** Real milestones — the only three chapters that actually happened so far. */
export const TIMELINE: TimelineMilestone[] = [
  {
    year: "2022",
    tag: "Origin",
    title: "Full-Stack Development",
    body: "Started with HTML & CSS, dove into React, then Next.js. Built production-ready apps with Node.js backends — learning everything by shipping real things.",
  },
  {
    year: "2023",
    tag: "Creative",
    title: "Graphic Design & Branding",
    body: "Took on freelance design work — logo systems, social media branding, UI/UX mockups — sharpening a design-led approach to product work.",
  },
  {
    year: "2024",
    tag: "AI Builder",
    title: "From Code to Intelligence",
    body: "Expanded beyond traditional web development into AI, automation, and intelligent applications — building tools that think, adapt, and solve real problems.",
  },
];
