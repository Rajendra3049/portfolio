"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { contactContent } from "@/content/contact/contact";
import { ContactLivingBackground } from "@/sections/contact/contact-living-background";
import { useContactParallax } from "@/shared/hooks/use-contact-parallax";
import {
  contactReducedVariants,
  contactRevealVariants,
  contactSectionContainerVariants,
} from "@/shared/lib/motion/contact-variants";
import { ContactActionTiles } from "@/shared/ui/contact/contact-action-tiles";
import { ContactAvailability } from "@/shared/ui/contact/contact-availability";
import { ContactFinalCta } from "@/shared/ui/contact/contact-final-cta";
import { ContactHeading } from "@/shared/ui/contact/contact-heading";

export const ContactSectionContent = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const parallax = useContactParallax(sectionRef);
  const containerVariants = shouldReduceMotion
    ? contactReducedVariants
    : contactSectionContainerVariants;
  const revealVariants = shouldReduceMotion ? contactReducedVariants : contactRevealVariants;

  return (
    <>
      <ContactLivingBackground
        parallaxY={parallax.disabled ? undefined : parallax.backgroundY}
      />

      <motion.div
        ref={sectionRef}
        className="relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={containerVariants}
      >
        <motion.p
          className="inline-flex items-center gap-2 rounded-full border border-zinc-700/90 bg-zinc-900/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-300"
          variants={revealVariants}
        >
          <span className="size-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden />
          {contactContent.eyebrow}
        </motion.p>

        <ContactHeading className="mt-5 sm:mt-6" />

        <motion.p
          className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:mt-5 sm:text-base"
          variants={revealVariants}
        >
          {contactContent.subtitle}
        </motion.p>

        <motion.div className="mt-6 sm:mt-8" variants={revealVariants}>
          <ContactAvailability
            status={contactContent.availability.status}
            joiner={contactContent.availability.joiner}
            responseTime={contactContent.availability.responseTime}
          />
        </motion.div>

        <ContactActionTiles actions={contactContent.actions} />

        <motion.div className="mt-8 sm:mt-9" variants={revealVariants}>
          <ContactFinalCta
            label={contactContent.finalCta.label}
            href={contactContent.finalCta.href}
            subtext={contactContent.finalCta.subtext}
          />
        </motion.div>
      </motion.div>
    </>
  );
};
