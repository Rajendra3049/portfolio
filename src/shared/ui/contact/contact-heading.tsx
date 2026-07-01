"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { contactContent } from "@/content/contact/contact";
import {
  contactHeadlineContainerVariants,
  contactHeadlineLineVariants,
  contactReducedVariants,
} from "@/shared/lib/motion/contact-variants";
import { cn } from "@/shared/lib/utils";

type ContactHeadingProps = {
  className?: string;
};

const [lineOne, lineTwo] = contactContent.headlineLines;

export const ContactHeading = memo(({ className }: ContactHeadingProps) => {
  const shouldReduceMotion = useReducedMotion();
  const lineVariants = shouldReduceMotion ? contactReducedVariants : contactHeadlineLineVariants;
  const containerVariants = shouldReduceMotion
    ? contactReducedVariants
    : contactHeadlineContainerVariants;

  if (shouldReduceMotion) {
    return (
      <h2
        className={cn(
          "max-w-3xl text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl",
          className,
        )}
      >
        <span className="block text-zinc-50">{lineOne}</span>
        <span className="mt-1 block text-emerald-400">{lineTwo}</span>
      </h2>
    );
  }

  return (
    <motion.h2
      className={cn(
        "max-w-3xl text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl",
        className,
      )}
      aria-label={contactContent.headlineLines.join(" ")}
      variants={containerVariants}
    >
      <motion.span className="block text-zinc-50" variants={lineVariants}>
        {lineOne}
      </motion.span>
      <motion.span className="mt-1 block text-emerald-400 sm:mt-1.5" variants={lineVariants}>
        {lineTwo}
      </motion.span>
    </motion.h2>
  );
});

ContactHeading.displayName = "ContactHeading";
