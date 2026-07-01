"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type Project } from "@/entities/project";
import { AnimatedCounter } from "@/shared/ui/animated-counter";
import { Pill } from "@/shared/ui/pill";
import { ProjectCaseStudyButton } from "@/shared/ui/work/project-case-study-button";
import {
  badgeContainerVariants,
  badgeItemVariants,
  chapterCtaVariants,
  chapterMetricsVariants,
  chapterReducedChildVariants,
  chapterTaglineVariants,
  chapterTitleVariants,
} from "@/shared/lib/motion/work-variants";

type ProjectChapterContentProps = {
  project: Project;
  chapterNumber: string;
  titleId: string;
  isHovered: boolean;
};

const parseMetricNumber = (value: string): number | null => {
  const match = value.match(/(\d+)/);
  if (!match) {
    return null;
  }
  return Number.parseInt(match[1] ?? "", 10);
};

const getMetricSuffix = (value: string): string => {
  const match = value.match(/^\d+(.*)$/);
  return match?.[1] ?? "";
};

export const ProjectChapterContent = ({
  project,
  chapterNumber,
  titleId,
  isHovered,
}: ProjectChapterContentProps) => {
  const shouldReduceMotion = useReducedMotion();
  const childVariants = shouldReduceMotion ? chapterReducedChildVariants : undefined;
  const displayMetrics = project.metrics.slice(0, 2);
  const displayTech = project.techStack.slice(0, 4);
  const primaryCategory = project.categories[0];

  return (
    <div className="relative flex min-w-0 flex-col justify-center">
      <motion.span
        className="pointer-events-none absolute -left-2 top-0 select-none text-7xl font-bold tracking-tighter text-white sm:text-8xl"
        variants={childVariants}
        animate={isHovered && !shouldReduceMotion ? { opacity: 0.12 } : { opacity: 0.06 }}
        aria-hidden
      >
        {chapterNumber}
      </motion.span>

      <div className="relative z-10 space-y-4 sm:space-y-5">
        <motion.div variants={shouldReduceMotion ? childVariants : chapterTitleVariants}>
          {primaryCategory ? (
            <motion.div
              animate={isHovered && !shouldReduceMotion ? { y: [0, -2, 0] } : { y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Pill className="mb-3 text-[11px]">{primaryCategory}</Pill>
            </motion.div>
          ) : null}
          <h3 id={titleId} className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            {project.title}
          </h3>
          <motion.span
            className="mt-2 block h-px w-12 origin-left bg-emerald-500/70"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          />
        </motion.div>

        <motion.p
          className="max-w-lg text-sm leading-relaxed text-zinc-400 sm:text-base sm:leading-7"
          variants={shouldReduceMotion ? childVariants : chapterTaglineVariants}
        >
          {project.heroTagline}
        </motion.p>

        {displayMetrics.length > 0 ? (
          <motion.dl
            className="flex flex-wrap gap-4"
            variants={shouldReduceMotion ? childVariants : chapterMetricsVariants}
          >
            {displayMetrics.map((metric) => {
              const numericValue = parseMetricNumber(metric.value);
              return (
                <div key={metric.label}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                    {metric.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-zinc-100">
                    {numericValue !== null ? (
                      <AnimatedCounter
                        value={numericValue}
                        suffix={getMetricSuffix(metric.value)}
                      />
                    ) : (
                      metric.value
                    )}
                  </dd>
                </div>
              );
            })}
          </motion.dl>
        ) : null}

        <motion.ul
          className="flex flex-wrap gap-2"
          variants={shouldReduceMotion ? childVariants : badgeContainerVariants}
        >
          {displayTech.map((tech) => (
            <motion.li
              key={tech}
              variants={shouldReduceMotion ? childVariants : badgeItemVariants}
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            >
              <Pill className="text-[11px]">{tech}</Pill>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div variants={shouldReduceMotion ? childVariants : chapterCtaVariants}>
          <ProjectCaseStudyButton href={`/work/${project.slug}`} />
        </motion.div>
      </div>
    </div>
  );
};
