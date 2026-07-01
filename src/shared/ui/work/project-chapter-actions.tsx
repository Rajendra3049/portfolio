"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Code2, Globe } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { type Project } from "@/entities/project";
import { getLinkTargetProps } from "@/shared/lib/link";
import { cn } from "@/shared/lib/utils";

const ACTION_HEIGHT = "h-11";

const actionSpring = { type: "spring" as const, stiffness: 380, damping: 26 };

type ProjectCardActionsProps = {
  project: Project;
  className?: string;
};

type PrimaryActionProps = {
  href: string;
  label: string;
};

const PrimaryAction = ({ href, label }: PrimaryActionProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="group/btn relative w-full min-w-0"
      whileHover={
        shouldReduceMotion
          ? undefined
          : { y: -2, transition: actionSpring }
      }
    >
      <span
        className="pointer-events-none absolute -inset-px rounded-full opacity-0 blur-sm transition-opacity duration-300 group-hover/btn:opacity-100"
        aria-hidden
      >
        <span className="block size-full animate-spin rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(16,185,129,0.55),transparent)] [animation-duration:3s]" />
      </span>

      <Link
        href={href}
        className={cn(
          "relative flex w-full min-w-0 cursor-pointer items-center justify-center gap-2 rounded-full px-5",
          ACTION_HEIGHT,
          "bg-emerald-500 text-sm font-semibold text-zinc-950",
          "shadow-[0_0_0_1px_rgba(16,185,129,0.2),0_8px_24px_rgba(16,185,129,0.18)]",
          "transition-[background-color,box-shadow,transform] duration-300",
          "hover:bg-emerald-400 hover:shadow-[0_0_0_1px_rgba(16,185,129,0.35),0_12px_32px_rgba(16,185,129,0.28)]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400",
        )}
      >
        {label}
        <motion.span
          className="inline-flex shrink-0"
          initial={false}
          whileHover={shouldReduceMotion ? undefined : { x: 4 }}
          transition={actionSpring}
        >
          <ArrowRight className="size-4" aria-hidden />
        </motion.span>
      </Link>
    </motion.div>
  );
};

type SecondaryActionProps = {
  href: string;
  label: string;
  icon: ReactNode;
  ariaLabel: string;
};

const SecondaryAction = ({ href, label, icon, ariaLabel }: SecondaryActionProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="group/btn relative w-full min-w-0"
      whileHover={
        shouldReduceMotion
          ? undefined
          : { y: -1, transition: actionSpring }
      }
    >
      <Link
        href={href}
        {...getLinkTargetProps(href)}
        aria-label={ariaLabel}
        className={cn(
          "relative flex w-full min-w-0 cursor-pointer items-center justify-center gap-1.5 rounded-full px-3 sm:gap-2 sm:px-4",
          ACTION_HEIGHT,
          "border border-zinc-700/90 bg-zinc-900/60 text-sm font-medium text-zinc-300",
          "transition-[border-color,background-color,color,box-shadow] duration-300",
          "hover:border-zinc-500 hover:bg-zinc-900/90 hover:text-zinc-100",
          "hover:shadow-[0_0_20px_rgba(16,185,129,0.08)]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400",
        )}
      >
        <motion.span
          className="inline-flex shrink-0"
          whileHover={shouldReduceMotion ? undefined : { y: -1 }}
          transition={actionSpring}
        >
          {icon}
        </motion.span>
        <span className="truncate">{label}</span>
        <ArrowUpRight
          className="size-3.5 shrink-0 text-zinc-500 transition-transform group-hover/btn:-translate-y-px group-hover/btn:translate-x-0.5 group-hover/btn:text-zinc-300"
          aria-hidden
        />
      </Link>
    </motion.div>
  );
};

export const ProjectCardActions = ({ project, className }: ProjectCardActionsProps) => {
  return (
    <div
      className={cn("flex w-full min-w-0 flex-col gap-2.5 sm:gap-3", className)}
      role="group"
      aria-label={`${project.title} actions`}
    >
      <PrimaryAction href={`/work/${project.slug}`} label="Case study" />

      <div className="grid w-full min-w-0 grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
        <SecondaryAction
          href={project.liveUrl}
          label="Live site"
          ariaLabel={`Open ${project.title} live site in a new tab`}
          icon={<Globe className="size-4 text-emerald-400/90" aria-hidden />}
        />
        <SecondaryAction
          href={project.githubUrl}
          label="GitHub"
          ariaLabel={`Open ${project.title} source code on GitHub in a new tab`}
          icon={<Code2 className="size-4 text-zinc-400" aria-hidden />}
        />
      </div>
    </div>
  );
};

/** @deprecated Use ProjectCardActions */
export const ProjectChapterActions = ProjectCardActions;
