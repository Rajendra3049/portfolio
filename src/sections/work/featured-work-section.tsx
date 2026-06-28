import { projects } from "@/content";
import { FadeIn } from "@/shared/ui/fade-in";
import { ProjectCard } from "@/shared/ui/project-card";
import { SectionHeading } from "@/shared/ui/section-heading";
import { SectionShell } from "@/shared/ui/section-shell";

export const FeaturedWorkSection = () => {
  return (
    <SectionShell id="work" className="bg-zinc-950/90">
      <SectionHeading
        eyebrow="Featured Work"
        title="Products I shipped — not tutorials."
        description="Case studies on real problems, engineering decisions, and shipped outcomes across SaaS productivity, personal finance, and real-time systems."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {projects.map((project, index) => (
          <FadeIn key={project.slug} delay={index * 0.08}>
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>
    </SectionShell>
  );
};
