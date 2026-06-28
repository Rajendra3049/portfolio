import { experiences } from "@/content";
import { ExperienceCard } from "@/shared/ui/experience-card";
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
    <SectionShell id="experience" className="bg-zinc-900/70">
      <SectionHeading
        eyebrow="Experience"
        title="Role timeline and responsibilities."
        description="A simple role-by-role timeline showing company, duration, and core responsibilities."
      />

      <FadeIn>
        <div
          className="mb-6 flex flex-wrap gap-2 sm:mb-8"
          aria-label="Experience highlights"
        >
          {experienceProofItems.map((item) => (
            <span
              key={item}
              className="inline-flex items-center rounded-full border border-emerald-500/25 bg-emerald-500/8 px-3 py-1.5 text-xs font-medium text-emerald-200/90"
            >
              {item}
            </span>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.06}>
        <ExperienceCard experiences={experiences} />
      </FadeIn>
    </SectionShell>
  );
};
