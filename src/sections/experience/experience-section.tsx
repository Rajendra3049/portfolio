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
        title="Engineering impact in real product environments."
        description="Focused on frontend ownership, scalable architecture decisions, and operational workflow improvements."
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
