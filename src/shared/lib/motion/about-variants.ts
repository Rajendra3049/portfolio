import type { Variants } from "framer-motion";
import {
  motionEase,
  motionReducedTransition,
  motionTransition,
} from "@/shared/lib/motion/shared-motion";

export const aboutEase = motionEase;

export const aboutRevealTransition = {
  duration: 0.52,
  ease: aboutEase,
};

export const aboutReducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: motionReducedTransition },
};

export const aboutSectionContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.04 },
  },
};

export const aboutRevealVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: aboutRevealTransition,
  },
};

export const aboutGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.06 },
  },
};

export const aboutCardVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: motionTransition,
  },
};

export const aboutTimelineStepVariants: Variants = {
  hidden: { opacity: 0, x: -16, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.48, ease: aboutEase },
  },
};
