"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { heroContent } from "@/content/hero/hero";
import {
  heroHeadlineContainerVariants,
  heroHeadlineLineVariants,
  heroReducedChildVariants,
} from "@/shared/lib/motion/hero-variants";
import { cn } from "@/shared/lib/utils";

type HeroHeadingProps = {
  className?: string;
};

const [lineOne, lineTwo, lineThree] = heroContent.headlineLines;

export const HeroHeading = memo(({ className }: HeroHeadingProps) => {
  const shouldReduceMotion = useReducedMotion();
  const lineVariants = shouldReduceMotion ? heroReducedChildVariants : heroHeadlineLineVariants;
  const containerVariants = shouldReduceMotion
    ? heroReducedChildVariants
    : heroHeadlineContainerVariants;

  const ariaLabel = heroContent.headlineLines.join(" ");

  if (shouldReduceMotion) {
    return (
      <h1
        className={cn(
          "text-[2rem] font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl",
          className,
        )}
      >
        <span className="block text-zinc-50">{lineOne}</span>
        <span className="block text-zinc-50">{lineTwo}</span>
        <span className="block text-emerald-400">{lineThree}</span>
      </h1>
    );
  }

  return (
    <motion.h1
      className={cn(
        "text-[2rem] font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl",
        className,
      )}
      aria-label={ariaLabel}
      variants={containerVariants}
    >
      <motion.span className="block text-zinc-50" variants={lineVariants}>
        {lineOne}
      </motion.span>
      <motion.span className="mt-0.5 block text-zinc-50 sm:mt-1" variants={lineVariants}>
        {lineTwo}
      </motion.span>
      <motion.span className="mt-0.5 block text-emerald-400 sm:mt-1" variants={lineVariants}>
        {lineThree}
      </motion.span>
    </motion.h1>
  );
});

HeroHeading.displayName = "HeroHeading";
