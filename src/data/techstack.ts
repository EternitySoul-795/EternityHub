import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiFigma,
  SiDocker,
  SiPython,
  SiThreedotjs,
  SiOpencv,
  SiTensorflow,
  SiArduino,
  SiFramer,
  SiGit,
} from "react-icons/si";
import type { IconType } from "react-icons";

export type TechLogo = { name: string; Icon: IconType };

/** Real stack, pulled straight from the skills + shipped-project tech tags. */
export const TECH_STACK: TechLogo[] = [
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "Three.js", Icon: SiThreedotjs },
  { name: "Figma", Icon: SiFigma },
  { name: "Docker", Icon: SiDocker },
  { name: "Python", Icon: SiPython },
  { name: "OpenCV", Icon: SiOpencv },
  { name: "TensorFlow", Icon: SiTensorflow },
  { name: "Arduino", Icon: SiArduino },
  { name: "Framer Motion", Icon: SiFramer },
  { name: "Git", Icon: SiGit },
];
