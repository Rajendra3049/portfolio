"use client";

import { motion, useReducedMotion } from "framer-motion";
import { footerContent } from "@/content/footer/footer";
import { BackToTop } from "@/components/footer/back-to-top";
import { FooterAmbientScene } from "@/components/footer/footer-ambient-scene";
import { FooterBrand } from "@/components/footer/footer-brand";
import { FooterLinks } from "@/components/footer/footer-links";
import { FooterSocials } from "@/components/footer/footer-socials";
import {
  footerContainerVariants,
  footerReducedVariants,
  footerRevealVariants,
} from "@/shared/lib/motion/footer-variants";

export const Footer = () => {
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = shouldReduceMotion ? footerReducedVariants : footerContainerVariants;
  const revealVariants = shouldReduceMotion ? footerReducedVariants : footerRevealVariants;

  return (
    <footer className="relative overflow-hidden border-t border-zinc-800/70 bg-zinc-950">
      <FooterAmbientScene />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10">
        <motion.div
          className="py-14 sm:py-16 lg:py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={containerVariants}
        >
          <motion.p
            className="inline-flex items-center gap-2 rounded-full border border-zinc-700/90 bg-zinc-900/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-300"
            variants={revealVariants}
          >
            <span className="size-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden />
            {footerContent.eyebrow}
          </motion.p>

          <motion.h2
            className="sr-only"
            variants={revealVariants}
          >
            Site footer
          </motion.h2>

          <motion.p
            className="mt-5 max-w-xl text-sm text-zinc-500 sm:text-base"
            variants={revealVariants}
          >
            {footerContent.signatureClosing}
          </motion.p>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.7fr)_minmax(0,0.8fr)] lg:gap-12">
            <FooterBrand />
            <FooterLinks />
            <FooterSocials />
          </div>

          <motion.div
            className="mt-12 flex flex-col gap-6 border-t border-zinc-800/80 pt-6 sm:flex-row sm:items-center sm:justify-between"
            variants={revealVariants}
          >
            <div className="space-y-2">
              <p className="text-sm text-zinc-500">{footerContent.copyright}</p>
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-600">
                <span>Built with</span>
                {footerContent.builtWith.map((tech, index) => (
                  <span key={tech} className="inline-flex items-center gap-2">
                    {index > 0 ? (
                      <span className="text-zinc-700" aria-hidden>
                        ·
                      </span>
                    ) : null}
                    <span className="text-zinc-500">{tech}</span>
                  </span>
                ))}
              </p>
            </div>

            <BackToTop />
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};
