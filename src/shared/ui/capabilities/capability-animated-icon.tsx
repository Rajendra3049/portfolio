"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Layers, Palette, Radio, Sparkles } from "lucide-react";
import type { SkillCapability } from "@/content/skills/skills";
import { cn } from "@/shared/lib/utils";

type CapabilityAnimatedIconProps = {
  title: SkillCapability["title"];
  className?: string;
};

const iconMap = {
  "Application Engineering": Layers,
  "Real-Time Product Systems": Radio,
  "UI & Form Engineering": Palette,
  "Engineering Tooling & AI Workflow": Sparkles,
} as const;

export const CapabilityAnimatedIcon = memo(
  ({ title, className }: CapabilityAnimatedIconProps) => {
    const Icon = iconMap[title as keyof typeof iconMap] ?? Layers;

    const hoverMotion =
      title === "Application Engineering"
        ? { rotate: 8, scale: 1.08 }
        : title === "Real-Time Product Systems"
          ? { scale: 1.14 }
          : title === "UI & Form Engineering"
            ? { rotate: -6, scale: 1.06 }
            : { scale: 1.12, rotate: 12 };

    return (
      <motion.span
        className={cn("inline-flex", className)}
        whileHover={hoverMotion}
        transition={{ type: "spring", stiffness: 380, damping: 18 }}
      >
        <Icon className="size-4 shrink-0" aria-hidden />
      </motion.span>
    );
  },
);

CapabilityAnimatedIcon.displayName = "CapabilityAnimatedIcon";
