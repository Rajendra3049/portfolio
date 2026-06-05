import { getFeaturedProjects } from "@/content";
import { FadeIn } from "@/shared/ui/fade-in";
import { ProjectCard } from "@/shared/ui/project-card";
import { SectionHeading } from "@/shared/ui/section-heading";
import { SectionShell } from "@/shared/ui/section-shell";

export const FeaturedWorkSection = () => {
  const featuredProjects = getFeaturedProjects();

  return (
    <SectionShell id="work" className="bg-zinc-950/90">
      <SectionHeading
        eyebrow="Featured Work"
        title="Selected projects from production and personal builds."
        description="Case studies spanning SaaS productivity, finance tracking, and real-time interactive systems."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <FadeIn key={project.slug} delay={index * 0.08}>
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>
    </SectionShell>
  );
};
