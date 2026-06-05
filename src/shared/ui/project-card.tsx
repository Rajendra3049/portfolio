import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type Project } from "@/entities/project";
import { Pill } from "@/shared/ui/pill";
import { ProjectCoverImage } from "@/shared/ui/project-cover-image";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

export const ProjectCard = ({ project, featured = false }: ProjectCardProps) => {
  const primaryCategory = project.categories[0];

  return (
    <article
      className={`group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/90 transition-all hover:-translate-y-0.5 hover:border-zinc-600 hover:shadow-[0_12px_28px_rgba(0,0,0,0.3)] ${
        featured ? "md:col-span-1" : ""
      }`}
    >
      <Link href={`/work/${project.slug}`} className="block" tabIndex={0}>
        <div className="relative">
          <ProjectCoverImage
            slug={project.slug}
            title={project.title}
            category={primaryCategory}
          />
          <span className="absolute left-4 top-14 rounded-full border border-zinc-700/80 bg-zinc-950/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-300">
            Case Study
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-zinc-50 transition-colors group-hover:text-white">
              {project.title}
            </h3>
            <ArrowRight
              className="size-4 shrink-0 text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-200"
              aria-hidden
            />
          </div>

          <p className="mt-2 text-sm font-medium leading-6 text-zinc-200">{project.heroTagline}</p>
          <p className="mt-2 text-sm leading-7 text-zinc-400">{project.shortDescription}</p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {project.categories.map((category) => (
              <li key={category}>
                <Pill>{category}</Pill>
              </li>
            ))}
          </ul>

          <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-3"
              >
                <dt className="text-xs uppercase tracking-wide text-zinc-500">{metric.label}</dt>
                <dd className="mt-1 text-sm font-medium text-zinc-100">{metric.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-200 transition-colors group-hover:text-white">
            View case study
            <ArrowRight className="size-3.5" aria-hidden />
          </p>
        </div>
      </Link>
    </article>
  );
};
