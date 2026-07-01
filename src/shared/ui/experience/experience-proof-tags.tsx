"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  experienceProofContainerVariants,
  experienceProofItemVariants,
  experienceReducedChildVariants,
} from "@/shared/lib/motion/experience-variants";

type ExperienceProofTagsProps = {
  items: string[];
};

export const ExperienceProofTags = ({ items }: ExperienceProofTagsProps) => {
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = shouldReduceMotion
    ? experienceReducedChildVariants
    : experienceProofContainerVariants;
  const itemVariants = shouldReduceMotion
    ? experienceReducedChildVariants
    : experienceProofItemVariants;

  return (
    <motion.div
      className="mb-6 flex flex-wrap gap-2 sm:mb-8"
      aria-label="Experience highlights"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={containerVariants}
    >
      {items.map((item) => (
        <motion.span
          key={item}
          variants={itemVariants}
          className="inline-flex items-center rounded-full border border-emerald-500/25 bg-emerald-500/8 px-3 py-1.5 text-xs font-medium text-emerald-200/90"
        >
          {item}
        </motion.span>
      ))}
    </motion.div>
  );
};
