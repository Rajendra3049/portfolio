import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/content";
import { siteConfig } from "@/content/config/site";
import { Pill } from "@/shared/ui/pill";
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
    description: project.shortDescription,
    openGraph: {
      title,
      description: project.shortDescription,
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

  return (
    <SectionShell className="border-t-0 bg-zinc-950 pt-12 sm:pt-16">
      <div className="max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
          Project Case Study
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 text-base leading-8 text-zinc-300">{project.longDescription}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Pill key={tech}>{tech}</Pill>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="text-base font-semibold text-zinc-100">Architecture Notes</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              {project.architectureNotes.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 size-1.5 rounded-full bg-zinc-500" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="text-base font-semibold text-zinc-100">Engineering Highlights</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              {project.engineeringHighlights.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 size-1.5 rounded-full bg-zinc-500" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="text-base font-semibold text-zinc-100">Challenges</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              {project.challenges.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 size-1.5 rounded-full bg-zinc-500" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="text-base font-semibold text-zinc-100">Outcomes</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              {project.outcomes.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 size-1.5 rounded-full bg-zinc-500" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={project.liveUrl}
            className="rounded-md bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200"
          >
            Live Product
          </Link>
          <Link
            href={project.githubUrl}
            className="rounded-md border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800"
          >
            Source Code
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}
