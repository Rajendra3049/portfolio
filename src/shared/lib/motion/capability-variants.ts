import type { Variants } from "framer-motion";
import {
  motionEase,
  motionReducedTransition,
  motionTransition,
} from "@/shared/lib/motion/shared-motion";

export const capabilityEase = motionEase;

export const capabilityTransition = motionTransition;

export const capabilityReducedTransition = motionReducedTransition;

export const capabilityRevealTransition = {
  duration: 0.52,
  ease: capabilityEase,
};

export const capabilityReducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: capabilityReducedTransition },
};

export const capabilitySectionContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.04 },
  },
};

export const capabilityRevealVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: capabilityRevealTransition,
  },
};

export const capabilityGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.06 },
  },
};

export const capabilityCardShellVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.98,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: capabilityTransition,
  },
};

export const capabilitySkillsMatrixVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.04 },
  },
};

export const capabilitySkillsTitleVariants: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: capabilityRevealTransition,
  },
};

export const capabilitySkillsColumnVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: capabilityRevealTransition,
  },
};

export const capabilitySkillsGroupVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

export const capabilitySkillsPillVariants: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.38, ease: capabilityEase },
  },
};
