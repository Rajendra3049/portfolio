"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Magnetic } from "@/shared/ui/magnetic";
import { cn } from "@/shared/lib/utils";

const ACTION_HEIGHT = "h-11";

type ProjectCaseStudyButtonProps = {
  href: string;
  className?: string;
  label?: string;
};

export const ProjectCaseStudyButton = ({
  href,
  className,
  label = "View case study",
}: ProjectCaseStudyButtonProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Magnetic strength={10} className={cn("w-full", className)}>
      <motion.div
        className="group/btn relative w-full"
        whileHover={
          shouldReduceMotion
            ? undefined
            : { y: -2, scale: 1.01, transition: { type: "spring", stiffness: 380, damping: 26 } }
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
            "relative flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-5",
            ACTION_HEIGHT,
            "bg-emerald-500 text-sm font-semibold text-zinc-950",
            "shadow-[0_0_0_1px_rgba(16,185,129,0.2),0_8px_24px_rgba(16,185,129,0.18)]",
            "transition-[background-color,box-shadow] duration-300",
            "hover:bg-emerald-400 hover:shadow-[0_0_0_1px_rgba(16,185,129,0.35),0_12px_32px_rgba(16,185,129,0.28)]",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400",
          )}
        >
          {label}
          <motion.span
            className="inline-flex"
            initial={false}
            whileHover={shouldReduceMotion ? undefined : { x: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            <ArrowRight className="size-4" aria-hidden />
          </motion.span>
        </Link>
      </motion.div>
    </Magnetic>
  );
};
