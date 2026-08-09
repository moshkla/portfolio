import dynamic from "next/dynamic";
import { SiteShell } from "@/components/layout/site-shell";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/features/hero/hero-section";
import { AboutSection } from "@/features/about/about-section";
import { StatsSection } from "@/features/stats/stats-section";

/**
 * Everything below the fold is code-split. The hero, about and stats sections
 * ship in the initial bundle; the rest arrives as the visitor scrolls, which
 * keeps the critical path small without any visible loading state.
 */
const SkillsSection = dynamic(() =>
  import("@/features/skills/skills-section").then((m) => m.SkillsSection)
);
const ExperienceSection = dynamic(() =>
  import("@/features/experience/experience-section").then((m) => m.ExperienceSection)
);
const ProjectsSection = dynamic(() =>
  import("@/features/projects/projects-section").then((m) => m.ProjectsSection)
);
const AiNativeSection = dynamic(() =>
  import("@/features/ai-native/ai-native-section").then((m) => m.AiNativeSection)
);
const ServicesSection = dynamic(() =>
  import("@/features/services/services-section").then((m) => m.ServicesSection)
);
const ContactSection = dynamic(() =>
  import("@/features/contact/contact-section").then((m) => m.ContactSection)
);

export default function HomePage() {
  return (
    <>
      <SiteShell>
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <AiNativeSection />
        <ServicesSection />
        <ContactSection />
      </SiteShell>
      <Footer />
    </>
  );
}
