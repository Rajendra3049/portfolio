"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Magnetic } from "@/shared/ui/magnetic";
import { cn } from "@/shared/lib/utils";

type ProjectCaseStudyButtonProps = {
  href: string;
  className?: string;
};

export const ProjectCaseStudyButton = ({ href, className }: ProjectCaseStudyButtonProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Magnetic strength={10}>
      <motion.div
        className={cn("group/btn relative inline-flex", className)}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
        transition={{ type: "spring", stiffness: 340, damping: 22 }}
      >
        <span
          className="pointer-events-none absolute -inset-px rounded-full opacity-0 blur-sm transition-opacity duration-300 group-hover/btn:opacity-100"
          aria-hidden
        >
          <span className="block size-full animate-spin rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(16,185,129,0.55),transparent)] [animation-duration:3s]" />
        </span>

        <Link
          href={href}
          className="relative inline-flex cursor-pointer items-center gap-2 rounded-full border border-zinc-700/90 bg-zinc-900/90 px-5 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:border-emerald-500/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
        >
          View case study
          <motion.span
            className="inline-flex"
            initial={false}
            whileHover={shouldReduceMotion ? undefined : { x: 4, rotate: -6 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <ArrowRight className="size-4" aria-hidden />
          </motion.span>
        </Link>
      </motion.div>
    </Magnetic>
  );
};
