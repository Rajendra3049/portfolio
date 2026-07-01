"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, FileText, Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { heroContent } from "@/content/hero/hero";
import { siteConfig } from "@/content/config/site";
import type { HeroParallaxValues } from "@/shared/hooks/use-hero-parallax";
import { getLinkTargetProps } from "@/shared/lib/link";
import {
  heroCopyContainerVariants,
  heroCtaContainerVariants,
  heroCtaItemVariants,
  heroReducedChildVariants,
  heroScrollCueVariants,
  heroSublineVariants,
} from "@/shared/lib/motion/hero-variants";
import { HeroHeading } from "@/shared/ui/hero/hero-heading";
import { HeroIntro } from "@/shared/ui/hero/hero-intro";
import { RotatingMetrics } from "@/shared/ui/hero/rotating-metrics";
import { Magnetic } from "@/shared/ui/magnetic";
import { cn } from "@/shared/lib/utils";

type HeroSectionContentProps = {
  parallax: HeroParallaxValues;
};

export const HeroSectionContent = ({ parallax }: HeroSectionContentProps) => {
  const shouldReduceMotion = useReducedMotion();
  const copyVariants = shouldReduceMotion ? heroReducedChildVariants : heroCopyContainerVariants;
  const childVariants = shouldReduceMotion ? heroReducedChildVariants : undefined;

  return (
    <div className="relative flex min-h-[calc(100dvh-4rem)] flex-col text-center">
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-5 sm:px-6 sm:py-6 [@media(max-height:780px)]:py-3"
        initial="hidden"
        animate="visible"
        variants={copyVariants}
        style={parallax.disabled ? undefined : { y: parallax.headingY }}
      >
        <motion.div variants={childVariants ?? heroSublineVariants}>
          <HeroIntro />
        </motion.div>

        <motion.div className="mt-5 sm:mt-6 [@media(max-height:780px)]:mt-3" variants={childVariants ?? heroSublineVariants}>
          <HeroHeading />
        </motion.div>

        <motion.div
          className="mt-4 flex w-full justify-center sm:mt-5 [@media(max-height:780px)]:mt-3"
          variants={childVariants ?? heroSublineVariants}
        >
          <RotatingMetrics />
        </motion.div>

        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-7 sm:gap-4 [@media(max-height:780px)]:mt-4"
          variants={shouldReduceMotion ? heroReducedChildVariants : heroCtaContainerVariants}
          style={parallax.disabled ? undefined : { opacity: parallax.ctaOpacity }}
        >
          <motion.div variants={childVariants ?? heroCtaItemVariants}>
            <Magnetic>
              <Link
                href={siteConfig.primaryCta.href}
                className={cn(
                  "interactive-press inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold",
                  "bg-emerald-500 text-zinc-950 transition-colors hover:bg-emerald-400",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400",
                )}
              >
                {siteConfig.primaryCta.label}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Magnetic>
          </motion.div>
          <motion.div variants={childVariants ?? heroCtaItemVariants}>
            <Magnetic>
              <Link
                href={siteConfig.secondaryCta.href}
                className={cn(
                  "interactive-press inline-flex h-11 items-center justify-center gap-2 rounded-full border border-zinc-600/90 px-6 text-sm font-semibold",
                  "bg-transparent text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-900/60",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400",
                )}
              >
                <Mail className="size-4 text-zinc-400" aria-hidden />
                {siteConfig.secondaryCta.label}
              </Link>
            </Magnetic>
          </motion.div>
          <motion.div variants={childVariants ?? heroCtaItemVariants}>
            <Magnetic>
              <Link
                href={siteConfig.navCta.href}
                {...getLinkTargetProps(siteConfig.navCta.href)}
                className={cn(
                  "interactive-press inline-flex h-11 items-center justify-center gap-2 rounded-full border border-zinc-600/90 px-6 text-sm font-semibold",
                  "bg-transparent text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-900/60",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400",
                )}
              >
                <FileText className="size-4 text-zinc-400" aria-hidden />
                {siteConfig.navCta.label}
              </Link>
            </Magnetic>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#experience"
        className="interactive-link group relative z-10 mx-auto inline-flex cursor-pointer items-center gap-1.5 pb-5 pt-2 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
        initial="hidden"
        animate="visible"
        variants={childVariants ?? heroScrollCueVariants}
      >
        {heroContent.scrollCue}
        <ChevronDown
          className="size-4 transition-transform group-hover:translate-y-0.5 motion-safe:animate-[hero-float_1.6s_ease-in-out_infinite]"
          aria-hidden
        />
      </motion.a>
    </div>
  );
};
