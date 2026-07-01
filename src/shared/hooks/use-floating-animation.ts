"use client";

import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";

type FloatingAnimationOptions = {
  index?: number;
  amplitude?: number;
  duration?: number;
};

export const useFloatingAnimation = ({
  index = 0,
  amplitude = 3,
  duration = 4.8,
}: FloatingAnimationOptions = {}) => {
  const shouldReduceMotion = useReducedMotion();

  return useMemo(() => {
    if (shouldReduceMotion) {
      return { animate: undefined, transition: undefined };
    }

    return {
      animate: { y: [0, -amplitude, 0] },
      transition: {
        duration: duration + index * 0.45,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut" as const,
        delay: index * 0.22,
      },
    };
  }, [amplitude, duration, index, shouldReduceMotion]);
};
