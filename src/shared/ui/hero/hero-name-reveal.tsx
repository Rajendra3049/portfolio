"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { heroContent } from "@/content/hero/hero";
import {
  heroNameCharVariants,
  heroNameContainerVariants,
  heroNameUnderlineVariants,
  heroReducedChildVariants,
} from "@/shared/lib/motion/hero-variants";
import { cn } from "@/shared/lib/utils";

type HeroNameRevealProps = {
  className?: string;
};

export const HeroNameReveal = memo(({ className }: HeroNameRevealProps) => {
  const shouldReduceMotion = useReducedMotion();
  const characters = heroContent.name.split("");

  if (shouldReduceMotion) {
    return (
      <div className={cn("flex flex-col items-center gap-2", className)}>
        <p className="text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
          {heroContent.name}
        </p>
        <div className="h-px w-10 bg-emerald-500/40" aria-hidden />
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center gap-2.5", className)}>
      <motion.p
        className="text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl"
        variants={heroNameContainerVariants}
        initial="hidden"
        animate="visible"
        aria-label={heroContent.name}
      >
        {characters.map((character, index) => (
          <motion.span
            key={`${character}-${index}`}
            className="inline-block"
            variants={heroNameCharVariants}
            aria-hidden={character === " "}
          >
            {character === " " ? "\u00A0" : character}
          </motion.span>
        ))}
      </motion.p>

      <motion.div
        className="h-px w-12 origin-center bg-gradient-to-r from-transparent via-emerald-500/55 to-transparent sm:w-14"
        variants={heroNameUnderlineVariants}
        initial="hidden"
        animate="visible"
        aria-hidden
      />
    </div>
  );
});

HeroNameReveal.displayName = "HeroNameReveal";
