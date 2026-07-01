"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { aboutContent } from "@/content/about/about";
import { AboutLivingBackground } from "@/sections/about/about-living-background";
import { useAboutParallax } from "@/shared/hooks/use-about-parallax";
import {
  aboutReducedVariants,
  aboutRevealVariants,
  aboutSectionContainerVariants,
} from "@/shared/lib/motion/about-variants";
import { AboutCta } from "@/shared/ui/about/about-cta";
import { AboutOptimizeCards } from "@/shared/ui/about/about-optimize-cards";
import { AboutWorkflowTimeline } from "@/shared/ui/about/about-workflow-timeline";

export const AboutSectionContent = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const parallax = useAboutParallax(sectionRef);
  const containerVariants = shouldReduceMotion
    ? aboutReducedVariants
    : aboutSectionContainerVariants;
  const revealVariants = shouldReduceMotion ? aboutReducedVariants : aboutRevealVariants;

  return (
    <>
      <AboutLivingBackground
        parallaxY={parallax.disabled ? undefined : parallax.backgroundY}
      />

      <motion.div
        ref={sectionRef}
        className="relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={containerVariants}
      >
        <motion.p
          className="inline-flex items-center gap-2 rounded-full border border-zinc-700/90 bg-zinc-900/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-300"
          variants={revealVariants}
        >
          <span className="size-1.5 shrink-0 rounded-full bg-indigo-400" aria-hidden />
          {aboutContent.eyebrow}
        </motion.p>

        <motion.h2
          className="mt-4 max-w-3xl text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
          variants={revealVariants}
        >
          {aboutContent.title}
        </motion.h2>

        <motion.ul
          className="mt-4 space-y-2 sm:mt-5"
          variants={revealVariants}
          aria-label="About summary"
        >
          {aboutContent.intro.map((line) => (
            <li
              key={line}
              className="flex items-start gap-2.5 text-sm leading-7 text-zinc-300 sm:text-base"
            >
              <span className="mt-2.5 size-1 shrink-0 rounded-full bg-emerald-500/70" aria-hidden />
              {line}
            </li>
          ))}
        </motion.ul>

        <motion.div
          className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-8 xl:gap-12"
          style={parallax.disabled ? undefined : { y: parallax.contentY }}
          variants={revealVariants}
        >
          <AboutWorkflowTimeline
            title={aboutContent.workflow.title}
            tagline={aboutContent.workflow.tagline}
            steps={aboutContent.workflow.steps}
          />

          <AboutOptimizeCards
            title={aboutContent.optimize.title}
            tagline={aboutContent.optimize.tagline}
            areas={aboutContent.optimize.areas}
          />
        </motion.div>

        <motion.div className="mt-8 sm:mt-10" variants={revealVariants}>
          <AboutCta
            label={aboutContent.openTo.label}
            description={aboutContent.openTo.description}
            cta={aboutContent.openTo.cta}
          />
        </motion.div>
      </motion.div>
    </>
  );
};
