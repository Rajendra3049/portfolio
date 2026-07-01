"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Briefcase } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { type Project } from "@/entities/project";
import {
  heroPanelContentVariants,
  heroPanelMetricsVariants,
  heroPanelProjectVariants,
  heroPanelRoleVariants,
  heroPanelShellReducedVariants,
  heroPanelShellVariants,
  heroReducedChildVariants,
} from "@/shared/lib/motion/hero-variants";
import { AnimatedCounter } from "@/shared/ui/animated-counter";

type HeroStatusPanelProps = {
  role: string;
  company: string;
  metrics: readonly { label: string; value: string }[];
  featuredProject: Project;
  openTo: string;
};

const splitMetricValue = (value: string) => {
  const trimmed = value.trim();
  const match = trimmed.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);

  if (!match) {
    return null;
  }

  const [, prefix, numericPart, suffix] = match;
  const parsed = Number(numericPart);

  if (!Number.isFinite(parsed)) {
    return null;
  }

  return {
    prefix,
    value: Math.round(parsed),
    suffix,
  };
};

export const HeroStatusPanel = ({
  role,
  company,
  metrics,
  featuredProject,
  openTo,
}: HeroStatusPanelProps) => {
  const shouldReduceMotion = useReducedMotion();
  const shellVariants = shouldReduceMotion ? heroPanelShellReducedVariants : heroPanelShellVariants;
  const contentVariants = shouldReduceMotion ? heroReducedChildVariants : heroPanelContentVariants;
  const childVariants = shouldReduceMotion ? heroReducedChildVariants : undefined;

  return (
    <motion.div
      animate={shouldReduceMotion ? undefined : { y: [0, -5, 0] }}
      transition={{
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay: 1.2,
      }}
    >
      <motion.article
        className="relative rounded-2xl border border-zinc-800/90 border-t-2 border-t-emerald-500/60 bg-zinc-900/55 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-6"
        initial="hidden"
        animate="visible"
        variants={shellVariants}
      >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl bg-linear-to-br from-emerald-500/10 via-transparent to-transparent opacity-60"
        aria-hidden
      />

      <p className="relative text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
        Status
      </p>

      <motion.div className="relative mt-4" initial="hidden" animate="visible" variants={contentVariants}>
        <motion.div
          className="flex items-start gap-3"
          variants={childVariants ?? heroPanelRoleVariants}
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950/80 text-emerald-400">
            <Briefcase className="size-4" aria-hidden />
          </span>
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500">Current Role</p>
            <p className="mt-1 text-sm font-medium text-zinc-100">
              {role} · {company}
            </p>
          </div>
        </motion.div>

        <motion.dl
          className="mt-5 grid grid-cols-3 gap-2"
          variants={childVariants ?? heroPanelMetricsVariants}
        >
          {metrics.map((metric) => {
            const parsedMetric = splitMetricValue(metric.value);

            return (
              <div
                key={metric.label}
                className="rounded-lg border border-zinc-800/90 bg-zinc-950/60 p-2.5 text-center sm:p-3"
              >
                <dt className="text-[10px] uppercase tracking-wide text-zinc-500">{metric.label}</dt>
                <dd className="mt-1 text-sm font-semibold text-zinc-100">
                  {parsedMetric ? (
                    <AnimatedCounter
                      value={parsedMetric.value}
                      prefix={parsedMetric.prefix}
                      suffix={parsedMetric.suffix}
                    />
                  ) : (
                    metric.value
                  )}
                </dd>
              </div>
            );
          })}
        </motion.dl>

        <motion.div
          className="mt-5 border-t border-zinc-800/90 pt-4"
          variants={childVariants ?? heroPanelProjectVariants}
        >
          <p className="mb-3 text-xs uppercase tracking-wide text-zinc-500">Featured</p>
          <Link
            href={`/work/${featuredProject.slug}`}
            className="group block overflow-hidden rounded-xl border border-zinc-800/90 bg-zinc-950/80 transition-colors hover:border-zinc-700"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={featuredProject.coverImage}
                alt={`${featuredProject.title} product preview`}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                quality={95}
                priority
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-x-0 top-0 flex items-center gap-2 border-b border-white/10 bg-black/40 px-3 py-2 backdrop-blur-sm">
                <span className="size-2 rounded-full bg-red-400/80" />
                <span className="size-2 rounded-full bg-amber-400/80" />
                <span className="size-2 rounded-full bg-emerald-400/80" />
                <span className="ml-1 truncate text-[10px] text-zinc-300">
                  {featuredProject.title.toLowerCase().replace(/\s+/g, "-")}.app
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 px-3 py-2.5">
              <span className="text-sm font-medium text-zinc-200">{featuredProject.title}</span>
              <span className="inline-flex items-center gap-0.5 text-xs text-emerald-400/90">
                View case
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
              </span>
            </div>
          </Link>
        </motion.div>

        <motion.p
          className="relative mt-4 text-xs text-zinc-500"
          variants={childVariants ?? heroPanelProjectVariants}
        >
          {openTo}
        </motion.p>
      </motion.div>

      </motion.article>
    </motion.div>
  );
};
