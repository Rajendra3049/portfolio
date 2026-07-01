"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { footerContent } from "@/content/footer/footer";
import { useMagnetic } from "@/shared/hooks/use-magnetic";
import { footerRevealVariants, footerSpring } from "@/shared/lib/motion/footer-variants";
import { cn } from "@/shared/lib/utils";

export const BackToTop = () => {
  const shouldReduceMotion = useReducedMotion();
  const magnetic = useMagnetic({ strength: 14 });
  const [rippleKey, setRippleKey] = useState(0);

  const scrollToTop = () => {
    setRippleKey((current) => current + 1);
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <motion.div variants={shouldReduceMotion ? undefined : footerRevealVariants}>
      <motion.button
        type="button"
        onClick={scrollToTop}
        aria-label={footerContent.backToTopLabel}
        className={cn(
          "group/top relative flex size-11 cursor-pointer items-center justify-center overflow-hidden rounded-full",
          "border border-emerald-500/30 bg-zinc-950/60 text-emerald-300 backdrop-blur-md",
          "shadow-[0_0_0_1px_rgba(16,185,129,0.12),0_8px_28px_rgba(16,185,129,0.14)]",
          "transition-[border-color,box-shadow] duration-300",
          "hover:border-emerald-400/50 hover:shadow-[0_0_0_1px_rgba(16,185,129,0.25),0_12px_36px_rgba(16,185,129,0.22)]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400",
        )}
        style={magnetic.style}
        onMouseMove={magnetic.onMouseMove}
        onMouseLeave={magnetic.onMouseLeave}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
        transition={footerSpring}
      >
        {!shouldReduceMotion ? (
          <motion.span
            key={rippleKey}
            className="pointer-events-none absolute inset-0 rounded-full bg-emerald-400/20"
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            aria-hidden
          />
        ) : null}

        <motion.span
          className="relative inline-flex"
          whileHover={shouldReduceMotion ? undefined : { y: -2, rotate: -8 }}
          transition={footerSpring}
        >
          <ArrowUp className="size-4" aria-hidden />
        </motion.span>
      </motion.button>
    </motion.div>
  );
};
