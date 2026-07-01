"use client";

import { memo, type RefObject } from "react";
import { motion, useMotionTemplate } from "framer-motion";
import { useMousePosition } from "@/shared/hooks/use-mouse-position";
import { cn } from "@/shared/lib/utils";

type HeroMouseSpotlightProps = {
  sectionRef: RefObject<HTMLElement | null>;
  className?: string;
};

const SPOTLIGHT_SIZE = 680;
const SPOTLIGHT_OPACITY = 0.1;

export const HeroMouseSpotlight = memo(({ sectionRef, className }: HeroMouseSpotlightProps) => {
  const { x, y, disabled } = useMousePosition(sectionRef);

  const spotlight = useMotionTemplate`radial-gradient(${SPOTLIGHT_SIZE}px circle at ${x}% ${y}%, rgba(16,185,129,${SPOTLIGHT_OPACITY}), transparent 70%)`;

  if (disabled) {
    return null;
  }

  return (
    <motion.div
      className={cn("pointer-events-none absolute inset-0 z-[1]", className)}
      style={{ background: spotlight }}
      aria-hidden
    />
  );
});

HeroMouseSpotlight.displayName = "HeroMouseSpotlight";
