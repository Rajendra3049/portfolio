"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { type Project } from "@/entities/project";
import { Pill } from "@/shared/ui/pill";
import { ProjectCoverImage } from "@/shared/ui/project-cover-image";

type ProjectCardProps = {
  project: Project;
};

const MAX_ROTATION_DEG = 4;

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const shouldReduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const primaryCategory = project.categories[0];

  return (
    <motion.article
      className="group h-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/90 transition-all hover:border-zinc-600 hover:shadow-[0_14px_36px_rgba(0,0,0,0.35)]"
      style={
        shouldReduceMotion
          ? undefined
          : {
              rotateX: tilt.rotateX,
              rotateY: tilt.rotateY,
              transformPerspective: 1200,
            }
      }
      transition={{ type: "spring", stiffness: 240, damping: 24 }}
      onMouseMove={(event) => {
        if (shouldReduceMotion) {
          return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        setTilt({
          rotateX: (0.5 - y) * (MAX_ROTATION_DEG * 2),
          rotateY: (x - 0.5) * (MAX_ROTATION_DEG * 2),
        });
      }}
      onMouseLeave={() => {
        setTilt({ rotateX: 0, rotateY: 0 });
      }}
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
    >
      <Link href={`/work/${project.slug}`} className="block h-full" tabIndex={0}>
        <div className="relative overflow-hidden">
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { scale: 1.035 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <ProjectCoverImage
              slug={project.slug}
              title={project.title}
              category={primaryCategory}
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950/55 via-zinc-900/10 to-transparent" />
          <span className="absolute left-4 top-14 rounded-full border border-zinc-700/80 bg-zinc-950/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-300">
            Case Study
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-zinc-50 transition-colors group-hover:text-white">
              {project.title}
            </h3>
            <motion.span
              className="inline-flex"
              whileHover={shouldReduceMotion ? undefined : { x: 2 }}
              transition={{ type: "spring", stiffness: 340, damping: 24 }}
            >
              <ArrowRight
                className="size-4 shrink-0 text-zinc-500 transition-colors group-hover:text-zinc-200"
                aria-hidden
              />
            </motion.span>
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

          <dl className="mt-5 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:grid-cols-3">
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
            <motion.span
              className="inline-flex"
              whileHover={shouldReduceMotion ? undefined : { x: 2 }}
              transition={{ type: "spring", stiffness: 340, damping: 24 }}
            >
              <ArrowRight className="size-3.5" aria-hidden />
            </motion.span>
          </p>
        </div>
      </Link>
    </motion.article>
  );
};
