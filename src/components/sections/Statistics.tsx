import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { PROJECTS } from "@/data/projects";
import { SITE } from "@/data/site";
import { SKILL_CATEGORIES } from "@/data/skills";
import { StatsGrid } from "./StatsGrid";

export async function Statistics() {
  const technologiesCount = SKILL_CATEGORIES.reduce((sum, c) => sum + c.skills.length, 0);

  const stats = [
    { n: SITE.projectsShipped, label: "Projects Shipped" },
    { n: `${technologiesCount}+`, label: "Technologies" },
    { n: `${PROJECTS.length}`, label: "Case Studies" },
    { n: SITE.yearsBuilding, label: "Years Learning" },
  ];

  return (
    <section id="statistics" className="relative overflow-hidden bg-[#050505] py-32 md:py-44">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: 900, height: 500, background: "radial-gradient(ellipse, rgba(217,4,41,0.08) 0%, transparent 65%)" }}
      />
      <div className="relative mx-auto max-w-[1200px] px-6 md:px-12">
        <div className="mb-16">
          <EyebrowBadge>By the Numbers</EyebrowBadge>
          <h2 className="mt-5 font-sans text-[clamp(2.4rem,6.5vw,5.5rem)] font-semibold leading-[0.92] tracking-tighter text-white">
            Statistics.
          </h2>
        </div>
        <StatsGrid stats={stats} />
      </div>
    </section>
  );
}
