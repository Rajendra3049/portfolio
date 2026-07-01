import { experiences } from "@/content";
import { ExperienceAmbientScene } from "@/sections/experience/experience-ambient-scene";
import { ExperienceCard } from "@/shared/ui/experience-card";
import { ExperienceProofTags } from "@/shared/ui/experience/experience-proof-tags";
import { FadeIn } from "@/shared/ui/fade-in";
import { SectionHeading } from "@/shared/ui/section-heading";
import { SectionShell } from "@/shared/ui/section-shell";

const experienceProofItems = [
  "3+ yrs frontend",
  "100+ tenants",
  "52K+ orders/day",
  "Intern → Team Lead",
];

export const ExperienceSection = () => {
  return (
    <SectionShell id="experience" className="relative overflow-hidden bg-zinc-900/70">
      <ExperienceAmbientScene />

      <div className="relative z-10">
        <SectionHeading
          eyebrow="Experience"
          title="Role timeline and responsibilities."
          description="A simple role-by-role timeline showing company, duration, and core responsibilities."
        />

        <ExperienceProofTags items={experienceProofItems} />

        <FadeIn delay={0.04}>
          <ExperienceCard experiences={experiences} />
        </FadeIn>
      </div>
    </SectionShell>
  );
};
