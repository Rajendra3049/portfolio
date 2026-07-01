"use client";

import { memo } from "react";
import { motion, useReducedMotion, type MotionValue } from "framer-motion";
import { skillCapabilities } from "@/content/skills/skills";
import { techAccentStyles } from "@/shared/lib/capability-tech-accents";
import {
  capabilityReducedVariants,
  capabilitySkillsColumnVariants,
  capabilitySkillsMatrixVariants,
} from "@/shared/lib/motion/capability-variants";
import { SkillChip } from "@/shared/ui/capabilities/skill-chip";
import { SpotlightSurface } from "@/shared/ui/capabilities/spotlight-surface";
import { cn } from "@/shared/lib/utils";

type CapabilitiesSkillsMatrixProps = {
  className?: string;
  parallaxY?: MotionValue<number>;
};

const TechGroupLabel = ({
  label,
  accent,
  pulse = true,
}: {
  label: string;
  accent: (typeof techAccentStyles)[keyof typeof techAccentStyles];
  pulse?: boolean;
}) => (
  <div className="relative flex items-center gap-2">
    <span
      className={cn("size-1.5 shrink-0 rounded-full", accent.dot, pulse && "animate-pulse")}
      aria-hidden
    />
    <p className={cn("text-[11px] font-semibold uppercase tracking-[0.2em]", accent.label)}>
      {label}
    </p>
  </div>
);

export const CapabilitiesSkillsMatrix = memo(
  ({ className, parallaxY }: CapabilitiesSkillsMatrixProps) => {
    const shouldReduceMotion = useReducedMotion();
    const matrixVariants = shouldReduceMotion
      ? capabilityReducedVariants
      : capabilitySkillsMatrixVariants;
    const columnVariants = shouldReduceMotion
      ? capabilityReducedVariants
      : capabilitySkillsColumnVariants;

    if (shouldReduceMotion) {
      return (
        <div className={cn("w-full", className)} aria-label="Core technologies by area">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skillCapabilities.map((capability) => {
              const accent = techAccentStyles[capability.accent];

              return (
                <div
                  key={capability.title}
                  className={cn(
                    "flex min-h-[7.5rem] flex-col rounded-xl border bg-zinc-900/60 p-4",
                    accent.cardBorder,
                    accent.cardShadow,
                  )}
                >
                  <TechGroupLabel label={capability.groupLabel} accent={accent} pulse={false} />
                  <ul className="mt-3.5 flex flex-wrap gap-2">
                    {capability.skills.map((skill, index) => (
                      <li key={skill}>
                        <SkillChip label={skill} index={index} accent={capability.accent} />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <motion.div
        className={cn("w-full", className)}
        style={parallaxY ? { y: parallaxY } : undefined}
      >
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Core technologies by area"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={matrixVariants}
        >
          {skillCapabilities.map((capability, columnIndex) => {
            const accent = techAccentStyles[capability.accent];

            return (
              <motion.div key={capability.title} variants={columnVariants}>
                <SpotlightSurface
                  className={cn(
                    "flex min-h-[7.5rem] flex-col rounded-xl border bg-zinc-900/60 p-4",
                    accent.cardBorder,
                    accent.cardHoverBorder,
                    accent.cardShadow,
                    "transition-[border-color,box-shadow] duration-300",
                    "hover:shadow-[0_16px_40px_rgba(0,0,0,0.32)]",
                  )}
                >
                  <motion.div
                    className="pointer-events-none absolute inset-0 rounded-xl"
                    animate={{ opacity: [0.28, 0.42, 0.28] }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: columnIndex * 0.4,
                    }}
                    style={{ background: accent.cardGlow }}
                    aria-hidden
                  />
                  <TechGroupLabel label={capability.groupLabel} accent={accent} />
                  <ul className="relative mt-3.5 flex flex-wrap gap-2">
                    {capability.skills.map((skill, index) => (
                      <li key={skill}>
                        <SkillChip
                          label={skill}
                          index={columnIndex * 6 + index}
                          accent={capability.accent}
                        />
                      </li>
                    ))}
                  </ul>
                </SpotlightSurface>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    );
  },
);

CapabilitiesSkillsMatrix.displayName = "CapabilitiesSkillsMatrix";
