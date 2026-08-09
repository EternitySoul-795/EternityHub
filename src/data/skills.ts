export type Skill = { name: string; level: number };
export type SkillCategory = {
  id: string;
  label: string;
  /** The real timeline chapter this category grew out of — shown as "Since 20XX" on hover, not a fabricated year-count. */
  since: string;
  skills: Skill[];
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    since: "2022",
    skills: [
      { name: "React / Next.js", level: 80 },
      { name: "TypeScript", level: 82 },
      { name: "HTML & CSS", level: 95 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Framer Motion", level: 78 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    since: "2022",
    skills: [
      { name: "Node.js", level: 75 },
      { name: "MongoDB", level: 65 },
      { name: "REST APIs", level: 80 },
      { name: "Next.js API Routes", level: 82 },
    ],
  },
  {
    id: "design",
    label: "Design",
    since: "2023",
    skills: [
      { name: "UI/UX Design", level: 78 },
      { name: "Photoshop", level: 95 },
      { name: "Figma", level: 90 },
      { name: "Motion Design", level: 76 },
      { name: "Typography", level: 84 },
    ],
  },
  {
    id: "ai-tools",
    label: "Tools & AI",
    since: "2024",
    skills: [
      { name: "Gemini", level: 95 },
      { name: "Claude / GPT", level: 85 },
      { name: "Adobe Suite", level: 80 },
      { name: "Git", level: 85 },
    ],
  },
];
