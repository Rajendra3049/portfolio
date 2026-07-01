"use client";

import { useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { RefObject } from "react";

export const useHeroParallax = (sectionRef: RefObject<HTMLElement | null>) => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const backgroundDarken = useTransform(scrollYProgress, [0, 1], [0, 0.22]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.55]);
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -32]);
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.65]);

  return {
    backgroundScale,
    backgroundDarken,
    glowScale,
    glowOpacity,
    headingY,
    ctaOpacity,
    disabled: Boolean(shouldReduceMotion),
  };
};

export type HeroParallaxValues = ReturnType<typeof useHeroParallax>;
