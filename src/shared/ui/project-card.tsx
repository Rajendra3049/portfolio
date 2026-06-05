import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { type Project } from "@/entities/project";
import { Pill } from "@/shared/ui/pill";

type ProjectCardProps = {
  project: Project;
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <article className="group rounded-xl border border-zinc-800 bg-zinc-900/90 p-5 transition-all hover:-translate-y-0.5 hover:border-zinc-600 hover:shadow-[0_12px_28px_rgba(0,0,0,0.3)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-zinc-50">{project.title}</h3>
        <Link
          href={`/work/${project.slug}`}
          className="rounded-md p-2 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-50"
          aria-label={`Open ${project.title} project details`}
        >
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </div>
      <p className="mt-3 text-sm leading-7 text-zinc-300">{project.shortDescription}</p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.categories.map((category) => (
          <li key={category}>
            <Pill>{category}</Pill>
          </li>
        ))}
      </ul>

      <dl className="mt-5 grid grid-cols-2 gap-3">
        {project.metrics.map((metric) => (
          <div key={metric.label} className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-3">
            <dt className="text-xs uppercase tracking-wide text-zinc-500">{metric.label}</dt>
            <dd className="mt-1 text-sm font-medium text-zinc-100">{metric.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
};
