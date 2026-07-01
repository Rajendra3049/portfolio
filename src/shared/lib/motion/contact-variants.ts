import type { Variants } from "framer-motion";
import {
  motionEase,
  motionReducedTransition,
} from "@/shared/lib/motion/shared-motion";

export const contactEase = motionEase;

export const contactRevealTransition = {
  duration: 0.52,
  ease: contactEase,
};

export const contactReducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: motionReducedTransition },
};

export const contactSectionContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.04 },
  },
};

export const contactRevealVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: contactRevealTransition,
  },
};

export const contactHeadlineContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.02 },
  },
};

export const contactHeadlineLineVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.58, ease: contactEase },
  },
};

export const contactGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.04 },
  },
};

export const contactTileVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 28,
    },
  },
};
