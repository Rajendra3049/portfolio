"use client";

import { useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { RefObject } from "react";

export const useContactParallax = (sectionRef: RefObject<HTMLDivElement | null>) => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const contentY = useTransform(scrollYProgress, [0, 1], [12, -10]);

  return {
    backgroundY,
    contentY,
    disabled: Boolean(shouldReduceMotion),
  };
};
