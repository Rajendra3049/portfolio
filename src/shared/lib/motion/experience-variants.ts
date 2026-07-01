import type { Transition, Variants } from "framer-motion";
import { workEase, workReducedTransition, workTransition } from "@/shared/lib/motion/work-variants";

export const experienceEase = workEase;

export const experienceTransition: Transition = workTransition;

export const experienceSpring: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 32,
};

export const experienceLayoutSpring: Transition = {
  layout: {
    type: "spring",
    stiffness: 420,
    damping: 36,
  },
};

export const experienceShellVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.97,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: experienceTransition,
  },
};

export const experienceShellReducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: workReducedTransition },
};

export const experienceProofContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
  },
};

export const experienceProofItemVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: experienceEase },
  },
};

export const experienceRailContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.12 },
  },
};

export const experienceRailItemVariants: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: experienceTransition,
  },
};

export const experienceRailReducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: workReducedTransition },
};

export const experienceDetailContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

export const experienceDetailTitleVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...experienceTransition, delay: 0.02 },
  },
};

export const experienceDetailMetaVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...experienceTransition, delay: 0.06 },
  },
};

export const experienceDetailHeadlineVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...experienceTransition, delay: 0.1 },
  },
};

export const experienceDetailSummaryVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...experienceTransition, delay: 0.14 },
  },
};

export const experienceResponsibilitiesLabelVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...experienceTransition, delay: 0.18 },
  },
};

export const experienceImpactListVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.22 },
  },
};

export const experienceImpactItemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.38, ease: experienceEase },
  },
};

export const experienceReducedChildVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: workReducedTransition },
};

export const getExperienceDetailPanelVariants = (direction: number): Variants => ({
  initial: {
    opacity: 0,
    y: direction >= 0 ? 10 : -10,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      opacity: { duration: 0.32, ease: experienceEase },
      y: experienceSpring,
      filter: { duration: 0.28, ease: experienceEase },
    },
  },
  exit: {
    opacity: 0,
    y: direction >= 0 ? -8 : 8,
    filter: "blur(3px)",
    transition: { duration: 0.2, ease: experienceEase },
  },
});

export const experienceDetailSectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.06 },
  },
};

export const experienceDetailSectionItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: experienceTransition,
  },
};

export const experienceMetricGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

export const experienceMetricItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: experienceSpring,
  },
};

export const experienceTechListVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

export const experienceTechItemVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: experienceEase },
  },
};

export const experienceDetailPanelReducedVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: workReducedTransition },
  exit: { opacity: 0, transition: workReducedTransition },
};
