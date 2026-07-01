import { projects } from "@/content";
import { WorkAmbientScene } from "@/sections/work/work-ambient-scene";
import { WorkProjectsShowcase } from "@/sections/work/work-projects-showcase";
import { FadeIn } from "@/shared/ui/fade-in";
import { SectionHeading } from "@/shared/ui/section-heading";
import { SectionShell } from "@/shared/ui/section-shell";

const workProofItems = [
  "4 shipped products",
  "SaaS",
  "Finance",
  "Real-time",
  "E-commerce",
];

export const FeaturedWorkSection = () => {
  return (
    <SectionShell
      id="work"
      className="relative overflow-hidden bg-zinc-950/90 pb-10 sm:pb-12 lg:pb-14"
    >
      <WorkAmbientScene />

      <div className="relative z-10">
        <SectionHeading
          eyebrow="Featured Work"
          title="Products I shipped — not tutorials."
          description="Four products, four problems solved — scroll the reel or jump by number."
        />

        <FadeIn>
          <div
            className="mb-5 flex flex-wrap gap-2 sm:mb-6"
            aria-label="Project highlights"
          >
            {workProofItems.map((item) => (
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
          <WorkProjectsShowcase projects={projects} />
        </FadeIn>
      </div>
    </SectionShell>
  );
};
