"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { heroContent } from "@/content/hero/hero";
import {
  heroIntroContainerVariants,
  heroReducedChildVariants,
  heroRoleContainerVariants,
  heroRoleWordVariants,
} from "@/shared/lib/motion/hero-variants";
import { HeroNameReveal } from "@/shared/ui/hero/hero-name-reveal";
import { cn } from "@/shared/lib/utils";

type HeroIntroProps = {
  className?: string;
};

const roleParts = heroContent.role.split(" ");
const roleLead = roleParts[0] ?? heroContent.role;
const roleAccent = roleParts.slice(1).join(" ");

export const HeroIntro = memo(({ className }: HeroIntroProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={cn("flex flex-col items-center gap-2 text-center", className)}>
        <p className="text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
          {heroContent.name}
        </p>
        <p className="text-sm font-medium text-zinc-400 sm:text-base">{heroContent.role}</p>
        <p className="max-w-md text-sm leading-6 text-zinc-500">{heroContent.tagline}</p>
      </div>
    );
  }

  return (
    <motion.div
      className={cn("flex flex-col items-center gap-2 text-center", className)}
      variants={heroIntroContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <HeroNameReveal />

      <motion.p
        className="flex items-center justify-center gap-1.5 text-sm font-medium tracking-wide sm:text-base"
        variants={heroRoleContainerVariants}
      >
        <motion.span className="text-zinc-400" variants={heroRoleWordVariants}>
          {roleLead}
        </motion.span>
        {roleAccent ? (
          <motion.span className="text-emerald-400/90" variants={heroRoleWordVariants}>
            {roleAccent}
          </motion.span>
        ) : null}
      </motion.p>

      <motion.p
        variants={heroReducedChildVariants}
        className="max-w-md text-sm leading-6 text-zinc-500"
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.15, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {heroContent.tagline}
      </motion.p>
    </motion.div>
  );
});

HeroIntro.displayName = "HeroIntro";
