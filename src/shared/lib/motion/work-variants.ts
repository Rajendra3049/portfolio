import type { Transition, Variants } from "framer-motion";

export const workEase = [0.22, 1, 0.36, 1] as const;

export const workTransition: Transition = {
  duration: 0.55,
  ease: workEase,
};

export const workReducedTransition: Transition = {
  duration: 0.15,
  ease: "easeOut",
};

export const chapterContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const chapterShellVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.96,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: workTransition,
  },
};

export const chapterShellReducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: workReducedTransition },
};

export const getChapterImageVariants = (imageOnLeft: boolean): Variants => ({
  hidden: {
    opacity: 0,
    x: imageOnLeft ? -24 : 24,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { ...workTransition, delay: 0.08 },
  },
});

export const chapterImageReducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: workReducedTransition },
};

export const chapterWatermarkVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 0.06,
    y: 0,
    transition: { ...workTransition, delay: 0.12 },
  },
};

export const chapterTitleVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...workTransition, delay: 0.16 },
  },
};

export const chapterTaglineVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...workTransition, delay: 0.2 },
  },
};

export const chapterMetricsVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...workTransition, delay: 0.24 },
  },
};

export const badgeContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.28 },
  },
};

export const badgeItemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: workEase },
  },
};

export const chapterCtaVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...workTransition, delay: 0.32 },
  },
};

export const chapterReducedChildVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: workReducedTransition },
};
