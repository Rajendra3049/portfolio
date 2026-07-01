import type { Transition } from "framer-motion";

export const motionEase = [0.22, 1, 0.36, 1] as const;

export const motionTransition: Transition = {
  duration: 0.55,
  ease: motionEase,
};

export const motionReducedTransition: Transition = {
  duration: 0.15,
  ease: "easeOut",
};
