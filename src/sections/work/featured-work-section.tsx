import { getFeaturedProjects, projects } from "@/content";
import { FadeIn } from "@/shared/ui/fade-in";
import { ProjectCard } from "@/shared/ui/project-card";
import { SectionHeading } from "@/shared/ui/section-heading";
import { SectionShell } from "@/shared/ui/section-shell";

export const FeaturedWorkSection = () => {
  const featuredProjects = getFeaturedProjects();
  const moreProjects = projects.filter((project) => !project.featured);

  return (
    <SectionShell id="work" className="bg-zinc-950/90">
      <SectionHeading
        eyebrow="Featured Work"
        title="Products I shipped — not tutorials."
        description="Case studies on real problems, technical decisions, and outcomes across SaaS productivity, personal finance, and real-time systems."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <FadeIn key={project.slug} delay={index * 0.08}>
            <ProjectCard project={project} featured />
          </FadeIn>
        ))}
      </div>

      {moreProjects.length > 0 ? (
        <div className="mt-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
            More work
          </p>
          <div className="grid gap-4">
            {moreProjects.map((project, index) => (
              <FadeIn key={project.slug} delay={0.16 + index * 0.08}>
                <ProjectCard project={project} />
              </FadeIn>
            ))}
          </div>
        </div>
      ) : null}
    </SectionShell>
  );
};
