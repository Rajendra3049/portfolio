import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/content";
import { siteConfig } from "@/content/config/site";
import { getLinkTargetProps } from "@/shared/lib/link";
import {
  CaseStudyList,
  CaseStudyProse,
  CaseStudySection,
} from "@/shared/ui/case-study-section";
import { Pill } from "@/shared/ui/pill";
import { ProjectCoverImage } from "@/shared/ui/project-cover-image";
import { ScreenshotGallery } from "@/shared/ui/screenshot-gallery";
import { SectionShell } from "@/shared/ui/section-shell";

type WorkDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const generateStaticParams = () =>
  projects.map((project) => ({
    slug: project.slug,
  }));

export const generateMetadata = async ({
  params,
}: WorkDetailPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  const title = `${project.title} Case Study`;

  return {
    title,
    description: project.heroTagline,
    openGraph: {
      title,
      description: project.heroTagline,
      url: `https://${siteConfig.domain}/work/${project.slug}`,
    },
  };
};

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { caseStudy } = project;

  return (
    <SectionShell className="border-t-0 bg-zinc-950 pt-12 sm:pt-16">
      <div className="max-w-4xl">
        <Link
          href="/#work"
          className="text-sm text-zinc-400 transition-colors hover:text-zinc-200"
        >
          ← Back to work
        </Link>

        <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800">
          <ProjectCoverImage
            slug={project.slug}
            title={project.title}
            category={project.categories[0]}
            coverImage={project.coverImage}
            variant="hero"
          />
        </div>

        <header className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
            Project Case Study
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 text-base leading-8 text-zinc-200 sm:text-lg">{project.heroTagline}</p>
          <p className="mt-3 text-sm leading-7 text-zinc-400">{project.longDescription}</p>

          <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400">
            <div>
              <dt className="sr-only">Role</dt>
              <dd>
                <span className="text-zinc-500">Role · </span>
                {project.role}
              </dd>
            </div>
            <div>
              <dt className="sr-only">Timeline</dt>
              <dd>
                <span className="text-zinc-500">Timeline · </span>
                {project.timeline}
              </dd>
            </div>
          </dl>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Pill key={tech}>{tech}</Pill>
            ))}
          </div>

          <dl className="mt-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-3"
              >
                <dt className="text-xs uppercase tracking-wide text-zinc-500">{metric.label}</dt>
                <dd className="mt-1 text-sm font-medium text-zinc-100">{metric.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
            <Link
              href={project.liveUrl}
              {...getLinkTargetProps(project.liveUrl)}
              className="inline-flex w-full items-center justify-center rounded-md bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 min-[420px]:w-auto"
            >
              Live Product
            </Link>
            <Link
              href={project.githubUrl}
              {...getLinkTargetProps(project.githubUrl)}
              className="inline-flex w-full items-center justify-center rounded-md border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800 min-[420px]:w-auto"
            >
              Source Code
            </Link>
          </div>
        </header>

        <div className="mt-12 space-y-12 sm:mt-16 sm:space-y-16">
          <CaseStudySection eyebrow="01 — Problem" title="What problem does it solve?">
            <CaseStudyProse paragraphs={[project.problem]} />
          </CaseStudySection>

          <CaseStudySection eyebrow="02 — Origin" title="How the idea took shape">
            <CaseStudyProse paragraphs={[project.originStory]} />
          </CaseStudySection>

          <CaseStudySection eyebrow="03 — Role" title="My role">
            <CaseStudyList items={caseStudy.myRole} />
          </CaseStudySection>

          <CaseStudySection eyebrow="04 — Challenge" title="The challenge">
            <CaseStudyList items={caseStudy.challenge} />
          </CaseStudySection>

          <CaseStudySection eyebrow="05 — Approach" title="The approach">
            <CaseStudyList items={caseStudy.approach} />
          </CaseStudySection>

          <CaseStudySection eyebrow="06 — Outcomes" title="Key outcomes">
            <CaseStudyList items={caseStudy.outcomes} />
          </CaseStudySection>

          <CaseStudySection eyebrow="07 — Differentiator" title="What makes this different">
            <CaseStudyList items={caseStudy.differentiator} />
          </CaseStudySection>

          <CaseStudySection eyebrow="08 — Gallery" title="Product screens">
            <ScreenshotGallery screenshots={project.screenshots} />
          </CaseStudySection>
        </div>

        <footer className="mt-12 flex flex-col gap-3 border-t border-zinc-800 pt-8 min-[420px]:flex-row min-[420px]:flex-wrap">
          <Link
            href={project.liveUrl}
            {...getLinkTargetProps(project.liveUrl)}
            className="inline-flex w-full items-center justify-center rounded-md bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 min-[420px]:w-auto"
          >
            Live Product
          </Link>
          <Link
            href={project.githubUrl}
            {...getLinkTargetProps(project.githubUrl)}
            className="inline-flex w-full items-center justify-center rounded-md border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800 min-[420px]:w-auto"
          >
            Source Code
          </Link>
          <Link
            href="/#work"
            className="inline-flex w-full items-center justify-center rounded-md border border-zinc-800 px-4 py-2 text-sm font-medium text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-200 min-[420px]:w-auto"
          >
            All projects
          </Link>
        </footer>
      </div>
    </SectionShell>
  );
}
