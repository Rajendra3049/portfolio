import type { Transition, Variants } from "framer-motion";
import { workEase, workReducedTransition, workTransition } from "@/shared/lib/motion/work-variants";

export const experienceEase = workEase;

export const experienceTransition: Transition = workTransition;

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
    x: direction >= 0 ? 28 : -28,
    scale: 0.98,
    filter: "blur(6px)",
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: experienceTransition,
  },
  exit: {
    opacity: 0,
    x: direction >= 0 ? -20 : 20,
    scale: 0.99,
    filter: "blur(4px)",
    transition: { duration: 0.22, ease: experienceEase },
  },
});

export const experienceDetailPanelReducedVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: workReducedTransition },
  exit: { opacity: 0, transition: workReducedTransition },
};
