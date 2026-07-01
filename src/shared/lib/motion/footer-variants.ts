import type { Variants } from "framer-motion";
import {
  motionEase,
  motionReducedTransition,
} from "@/shared/lib/motion/shared-motion";

export const footerEase = motionEase;

export const footerSpring = {
  type: "spring" as const,
  stiffness: 380,
  damping: 30,
};

export const footerReducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: motionReducedTransition },
};

export const footerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

export const footerRevealVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.52, ease: footerEase },
  },
};

export const footerSocialStaggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
};

export const footerSocialItemVariants: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.42, ease: footerEase },
  },
};
