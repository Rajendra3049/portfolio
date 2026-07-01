"use client";

import { motion, useReducedMotion } from "framer-motion";
import { footerContent } from "@/content/footer/footer";
import { footerRevealVariants } from "@/shared/lib/motion/footer-variants";

export const FooterBrand = () => {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : footerRevealVariants;

  return (
    <motion.div variants={variants} className="min-w-0">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl lg:text-[2rem] lg:leading-tight">
        {footerContent.name}
      </h2>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-400 sm:text-[15px] sm:leading-7">
        {footerContent.intro}
      </p>

      <motion.div
        className="relative mt-5 inline-flex w-fit items-center gap-2.5 overflow-hidden rounded-full border border-emerald-500/25 bg-emerald-500/8 px-3.5 py-2"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                boxShadow: [
                  "0 0 0 0 rgba(16,185,129,0)",
                  "0 0 22px 0 rgba(16,185,129,0.14)",
                  "0 0 0 0 rgba(16,185,129,0)",
                ],
              }
        }
        transition={{
          duration: 4.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <span className="relative flex size-2 shrink-0" aria-hidden>
          {!shouldReduceMotion ? (
            <motion.span
              className="absolute inline-flex size-full rounded-full bg-emerald-400/50"
              animate={{ scale: [1, 1.55, 1], opacity: [0.4, 0, 0.4] }}
              transition={{
                duration: 3.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ) : null}
          <motion.span
            className="relative inline-flex size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.55)]"
            animate={
              shouldReduceMotion
                ? undefined
                : { opacity: [0.85, 1, 0.85], scale: [1, 1.05, 1] }
            }
            transition={{
              duration: 3.2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </span>
        <span className="text-sm font-medium text-emerald-100">{footerContent.status}</span>
      </motion.div>
    </motion.div>
  );
};
