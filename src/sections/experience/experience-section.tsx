import { experiences } from "@/content";
import { ExperienceCard } from "@/shared/ui/experience-card";
import { FadeIn } from "@/shared/ui/fade-in";
import { SectionHeading } from "@/shared/ui/section-heading";
import { SectionShell } from "@/shared/ui/section-shell";

export const ExperienceSection = () => {
  return (
    <SectionShell id="experience" className="bg-zinc-900/70">
      <SectionHeading
        eyebrow="Experience"
        title="From intern to team lead in 2 years."
        description="Built and scaled frontend systems for order management, sales channels, and shipment workflows — now leading delivery across product, backend, and QA."
      />
      <div className="space-y-4">
        {experiences.map((experience, index) => (
          <FadeIn key={experience.company} delay={index * 0.06}>
            <ExperienceCard experience={experience} />
          </FadeIn>
        ))}
      </div>
    </SectionShell>
  );
};
