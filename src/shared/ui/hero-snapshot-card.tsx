import Link from "next/link";
import { ArrowUpRight, Briefcase } from "lucide-react";
import { type Project } from "@/entities/project";

type HeroSnapshotCardProps = {
  role: string;
  company: string;
  metrics: readonly { label: string; value: string }[];
  featuredProjects: Project[];
  openTo: string;
};

export const HeroSnapshotCard = ({
  role,
  company,
  metrics,
  featuredProjects,
  openTo,
}: HeroSnapshotCardProps) => {
  return (
    <article className="rounded-xl border border-zinc-800 border-t-2 border-t-emerald-500/70 bg-zinc-900/90 p-5 transition-all hover:border-zinc-600 hover:shadow-[0_12px_28px_rgba(0,0,0,0.25)] sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Snapshot</p>

      <div className="mt-4 flex items-start gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950/80 text-emerald-400">
          <Briefcase className="size-4" aria-hidden />
        </span>
        <div>
          <p className="text-xs uppercase tracking-wide text-zinc-500">Current Role</p>
          <p className="mt-1 text-sm font-medium text-zinc-100">
            {role} at {company}
          </p>
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-3 gap-2">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-2.5 sm:p-3"
          >
            <dt className="text-[10px] uppercase tracking-wide text-zinc-500 sm:text-xs">
              {metric.label}
            </dt>
            <dd className="mt-1 text-sm font-medium text-zinc-100">{metric.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 border-t border-zinc-800 pt-4">
        <p className="text-xs uppercase tracking-wide text-zinc-500">Featured Work</p>
        <ul className="mt-2 space-y-2">
          {featuredProjects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                className="group inline-flex items-center gap-1 text-sm font-medium text-zinc-200 transition-colors hover:text-zinc-50"
              >
                {project.title}
                <ArrowUpRight
                  className="size-3.5 text-zinc-500 transition-transform group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-zinc-300"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 border-t border-zinc-800 pt-4">
        <p className="text-xs uppercase tracking-wide text-zinc-500">Open To</p>
        <p className="mt-1 text-sm text-zinc-200">{openTo}</p>
      </div>
    </article>
  );
};
