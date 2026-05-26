import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection id="about" />
      <SkillsSection id="skills" />
      <ProjectsSection id="projects" limit={4} heading="Projects" showViewAll />
      <ContactSection id="contact" />
    </>
  );
}
