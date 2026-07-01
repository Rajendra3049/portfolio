"use client";

import { useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { RefObject } from "react";

export const useCapabilitiesParallax = (
  sectionRef: RefObject<HTMLDivElement | null>,
) => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const techY = useTransform(scrollYProgress, [0, 1], [16, -12]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [20, -16]);

  return {
    backgroundY,
    techY,
    cardsY,
    disabled: Boolean(shouldReduceMotion),
  };
};
