import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Timeline } from "@/components/sections/Timeline";
import { TechStackMarquee } from "@/components/sections/TechStackMarquee";
import { Statistics } from "@/components/sections/Statistics";
import { Playground } from "@/components/sections/Playground";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Skills />
      <Timeline />
      <TechStackMarquee />
      <Statistics />
      <Playground />
      <Contact />
    </>
  );
}
