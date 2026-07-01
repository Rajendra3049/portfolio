"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { AboutWorkflowStep } from "@/content/about/about";
import { aboutAccentStyles } from "@/shared/lib/about-accents";
import {
  aboutGridVariants,
  aboutReducedVariants,
  aboutTimelineStepVariants,
} from "@/shared/lib/motion/about-variants";
import { cn } from "@/shared/lib/utils";

type AboutWorkflowTimelineProps = {
  title: string;
  tagline: string;
  steps: readonly AboutWorkflowStep[];
};

export const AboutWorkflowTimeline = memo(
  ({ title, tagline, steps }: AboutWorkflowTimelineProps) => {
    const shouldReduceMotion = useReducedMotion();
    const containerVariants = shouldReduceMotion ? aboutReducedVariants : aboutGridVariants;
    const stepVariants = shouldReduceMotion ? aboutReducedVariants : aboutTimelineStepVariants;

    return (
      <section aria-labelledby="about-workflow-title">
        <div className="mb-5">
          <h3 id="about-workflow-title" className="text-base font-semibold text-zinc-50 sm:text-lg">
            {title}
          </h3>
          <p className="mt-1 text-sm text-zinc-400">{tagline}</p>
        </div>

        <motion.ol
          className="relative space-y-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
        >
          <div
            className="absolute bottom-2 left-[15px] top-2 w-px bg-gradient-to-b from-indigo-500/40 via-emerald-500/30 to-zinc-500/20"
            aria-hidden
          />

          {steps.map((step, index) => {
            const accent = aboutAccentStyles[step.accent];

            return (
              <motion.li
                key={step.step}
                className="relative flex gap-4 pb-6 last:pb-0"
                variants={stepVariants}
              >
                <div className="relative z-10 flex flex-col items-center">
                  <motion.span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full border bg-zinc-950 text-[11px] font-semibold",
                      accent.border,
                      accent.label,
                    )}
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 380, damping: 22 }}
                  >
                    {step.step}
                  </motion.span>
                  {!shouldReduceMotion && (
                    <motion.span
                      className={cn("mt-1 size-1.5 rounded-full", accent.dot)}
                      animate={{ opacity: [0.4, 0.9, 0.4] }}
                      transition={{
                        duration: 3.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: index * 0.3,
                      }}
                      aria-hidden
                    />
                  )}
                </div>

                <div className="min-w-0 flex-1 pt-0.5">
                  <h4 className="text-sm font-semibold text-zinc-100">{step.title}</h4>
                  <p className="mt-1 text-sm leading-6 text-zinc-400">{step.summary}</p>
                </div>
              </motion.li>
            );
          })}
        </motion.ol>
      </section>
    );
  },
);

AboutWorkflowTimeline.displayName = "AboutWorkflowTimeline";
