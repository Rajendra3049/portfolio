"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { SkillCapabilityAccent } from "@/content/skills/skills";
import { techAccentStyles } from "@/shared/lib/capability-tech-accents";
import { Magnetic } from "@/shared/ui/magnetic";
import { cn } from "@/shared/lib/utils";

type SkillChipProps = {
  label: string;
  index: number;
  accent?: SkillCapabilityAccent;
  className?: string;
};

export const SkillChip = memo(({ label, index, accent = "emerald", className }: SkillChipProps) => {
  const shouldReduceMotion = useReducedMotion();
  const styles = techAccentStyles[accent];
  const floatDuration = 4.5 + (index % 4) * 0.6;
  const shimmerDelay = (index % 5) * 1.4;

  if (shouldReduceMotion) {
    return (
      <span
        className={cn(
          "inline-flex rounded-full border px-2.5 py-1 text-xs font-medium",
          styles.chipBorder,
          styles.chipBg,
          styles.chipText,
          className,
        )}
      >
        {label}
      </span>
    );
  }

  return (
    <Magnetic strength={6}>
      <motion.span
        className={cn(
          "relative inline-flex overflow-hidden rounded-full border px-2.5 py-1 text-xs font-medium",
          styles.chipBorder,
          styles.chipBg,
          styles.chipText,
          styles.chipHoverBorder,
          styles.chipHoverShadow,
          "transition-[box-shadow,border-color] duration-300",
          className,
        )}
        animate={{ y: [0, -3, 1, -2, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: index * 0.12,
        }}
        whileHover={{ scale: 1.06 }}
      >
        <motion.span
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ["-100%", "120%"] }}
          transition={{
            duration: 2.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: shimmerDelay,
            repeatDelay: 4.5,
          }}
          aria-hidden
        />
        {label}
      </motion.span>
    </Magnetic>
  );
});

SkillChip.displayName = "SkillChip";
