import { AboutSectionContent } from "@/sections/about/about-section-content";
import { SectionShell } from "@/shared/ui/section-shell";

export const AboutSection = () => {
  return (
    <SectionShell id="about" className="relative overflow-hidden bg-zinc-950/90">
      <AboutSectionContent />
    </SectionShell>
  );
};
