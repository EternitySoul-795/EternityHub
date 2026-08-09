export type Service = {
  id: string;
  title: string;
  description: string;
  tags: string[];
};

export const SERVICES: Service[] = [
  {
    id: "fullstack",
    title: "Full Stack Development",
    description:
      "End-to-end products — from pixel-perfect interfaces to production APIs, databases, and deployment. Next.js, TypeScript, and Node.js, built to ship.",
    tags: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
  },
  {
    id: "ai",
    title: "AI Applications",
    description:
      "Interfaces and systems built around language models and computer vision — from conversational tools to real-time detection pipelines.",
    tags: ["LLM Integration", "Computer Vision", "YOLO", "OpenAI"],
  },
  {
    id: "uiux",
    title: "UI/UX Design",
    description:
      "Interfaces designed first, engineered second. Wireframes, design systems, and motion that make products feel considered.",
    tags: ["Figma", "Design Systems", "Motion", "Typography"],
  },
  {
    id: "automation",
    title: "Automation Systems",
    description:
      "Infrastructure and monitoring that run themselves — deployment pipelines, real-time alerts, and hardware-integrated systems.",
    tags: ["Docker", "Monitoring", "Arduino", "CI/CD"],
  },
  {
    id: "creative",
    title: "Creative Development",
    description:
      "Motion, 3D, and interaction design for products that are meant to be remembered — not just used.",
    tags: ["GSAP", "Three.js", "WebGL", "Framer Motion"],
  },
];
