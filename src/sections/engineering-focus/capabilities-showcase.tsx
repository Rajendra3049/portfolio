"use client";

import { skillCapabilities } from "@/content/skills/skills";
import {
  capabilityCardShellVariants,
  capabilityGridVariants,
  capabilityReducedVariants,
} from "@/shared/lib/motion/capability-variants";
import { CapabilityCard } from "@/shared/ui/capability-card";
import { motion, useReducedMotion, type MotionValue } from "framer-motion";

type CapabilitiesShowcaseProps = {
  parallaxY?: MotionValue<number>;
};

export const CapabilitiesShowcase = ({ parallaxY }: CapabilitiesShowcaseProps) => {
  const shouldReduceMotion = useReducedMotion();
  const gridVariants = shouldReduceMotion ? capabilityReducedVariants : capabilityGridVariants;
  const cardVariants = shouldReduceMotion ? capabilityReducedVariants : capabilityCardShellVariants;

  return (
    <motion.div
      className="mt-8 grid gap-4 sm:mt-9 lg:grid-cols-2 lg:gap-5"
      style={parallaxY ? { y: parallaxY } : undefined}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={gridVariants}
    >
      {skillCapabilities.map((capability) => (
        <CapabilityCard key={capability.title} capability={capability} variants={cardVariants} />
      ))}
    </motion.div>
  );
};
