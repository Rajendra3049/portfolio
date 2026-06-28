"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/shared/lib/utils";

type HeroHeadlineRevealProps = {
  text: string;
  className?: string;
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const HeroHeadlineReveal = ({ text, className }: HeroHeadlineRevealProps) => {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (shouldReduceMotion) {
    return <h1 className={cn(className)}>{text}</h1>;
  }

  return (
    <motion.h1
      className={cn("flex flex-wrap", className)}
      variants={containerVariants}
      initial="hidden"
      animate="show"
      aria-label={text}
    >
      {words.map((word, index) => (
        <motion.span key={`${word}-${index}`} className="inline-block pr-[0.3ch]" variants={wordVariants}>
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};
