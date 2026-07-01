"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { AboutOptimizeArea } from "@/content/about/about";
import {
  aboutCardVariants,
  aboutGridVariants,
  aboutReducedVariants,
} from "@/shared/lib/motion/about-variants";
import { AboutOptimizeCard } from "@/shared/ui/about/about-optimize-card";

type AboutOptimizeCardsProps = {
  title: string;
  tagline: string;
  areas: readonly AboutOptimizeArea[];
};

export const AboutOptimizeCards = memo(({ title, tagline, areas }: AboutOptimizeCardsProps) => {
  const shouldReduceMotion = useReducedMotion();
  const gridVariants = shouldReduceMotion ? aboutReducedVariants : aboutGridVariants;
  const cardVariants = shouldReduceMotion ? aboutReducedVariants : aboutCardVariants;

  return (
    <section aria-labelledby="about-optimize-title">
      <div className="mb-5">
        <h3 id="about-optimize-title" className="text-base font-semibold text-zinc-50 sm:text-lg">
          {title}
        </h3>
        <p className="mt-1 text-sm text-zinc-400">{tagline}</p>
      </div>

      {shouldReduceMotion ? (
        <div className="grid gap-3">
          {areas.map((area, index) => (
            <AboutOptimizeCard key={area.title} area={area} index={index} />
          ))}
        </div>
      ) : (
        <motion.div
          className="grid gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={gridVariants}
        >
          {areas.map((area, index) => (
            <motion.div key={area.title} variants={cardVariants}>
              <AboutOptimizeCard area={area} index={index} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
});

AboutOptimizeCards.displayName = "AboutOptimizeCards";
