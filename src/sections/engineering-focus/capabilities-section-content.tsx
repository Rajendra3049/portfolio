"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CapabilitiesLivingBackground } from "@/sections/engineering-focus/capabilities-living-background";
import { CapabilitiesShowcase } from "@/sections/engineering-focus/capabilities-showcase";
import { CapabilitiesSkillsMatrix } from "@/shared/ui/capabilities/capabilities-skills-matrix";
import { useCapabilitiesParallax } from "@/shared/hooks/use-capabilities-parallax";
import {
  capabilityReducedVariants,
  capabilityRevealVariants,
  capabilitySectionContainerVariants,
} from "@/shared/lib/motion/capability-variants";

const EYEBROW = "Capabilities";
const TITLE = "How I solve product problems in production.";
const DESCRIPTION =
  "Not a tool list — the engineering problems I own and the outcomes they produced.";

export const CapabilitiesSectionContent = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const parallax = useCapabilitiesParallax(sectionRef);
  const containerVariants = shouldReduceMotion
    ? capabilityReducedVariants
    : capabilitySectionContainerVariants;
  const revealVariants = shouldReduceMotion ? capabilityReducedVariants : capabilityRevealVariants;

  return (
    <>
      <CapabilitiesLivingBackground
        parallaxY={parallax.disabled ? undefined : parallax.backgroundY}
      />

      <motion.div
        ref={sectionRef}
        className="relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.p
          className="inline-flex items-center gap-2 rounded-full border border-zinc-700/90 bg-zinc-900/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-300"
          variants={revealVariants}
        >
          <span className="size-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden />
          {EYEBROW}
        </motion.p>

        <motion.h2
          className="mt-4 max-w-3xl text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
          variants={revealVariants}
        >
          {TITLE}
        </motion.h2>

        <motion.p
          className="mt-3 mb-8 max-w-3xl text-sm leading-7 text-zinc-300 sm:mb-10 sm:text-base"
          variants={revealVariants}
        >
          {DESCRIPTION}
        </motion.p>

        <motion.p
          className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-300"
          variants={revealVariants}
        >
          <span className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-emerald-500/40" aria-hidden />
            Core technologies
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-emerald-500/40" aria-hidden />
          </span>
        </motion.p>

        <CapabilitiesSkillsMatrix
          className="mb-8 sm:mb-9"
          parallaxY={parallax.disabled ? undefined : parallax.techY}
        />

        <CapabilitiesShowcase parallaxY={parallax.disabled ? undefined : parallax.cardsY} />
      </motion.div>
    </>
  );
};
