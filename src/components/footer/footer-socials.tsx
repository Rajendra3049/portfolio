"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { footerContent } from "@/content/footer/footer";
import { useMagnetic } from "@/shared/hooks/use-magnetic";
import { useMouseSpotlight } from "@/shared/hooks/use-mouse-spotlight";
import {
  footerRevealVariants,
  footerSocialItemVariants,
  footerSocialStaggerVariants,
  footerSpring,
} from "@/shared/lib/motion/footer-variants";
import { getLinkTargetProps } from "@/shared/lib/link";
import { cn } from "@/shared/lib/utils";
import { GitHubIcon, LinkedInIcon } from "@/shared/ui/icons/social-brand-icons";

type SocialId = (typeof footerContent.socials)[number]["id"];

type SocialIconProps = { className?: string };

const socialIcons: Record<SocialId, ComponentType<SocialIconProps>> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: Mail,
  resume: FileText,
};

type FooterSocialButtonProps = {
  id: SocialId;
  label: string;
  href: string;
};

const FooterSocialButton = ({ id, label, href }: FooterSocialButtonProps) => {
  const shouldReduceMotion = useReducedMotion();
  const magnetic = useMagnetic({ strength: 10 });
  const spotlight = useMouseSpotlight({ size: 180, color: "rgba(16,185,129,0.2)" });
  const Icon = socialIcons[id];
  const external = href.startsWith("http") || href.startsWith("mailto:");

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : footerSocialItemVariants}
      className="relative"
    >
      <motion.div
        className="group/social relative"
        style={magnetic.style}
        onMouseMove={(event) => {
          magnetic.onMouseMove(event);
          spotlight.onMouseMove(event);
        }}
        onMouseEnter={spotlight.onMouseEnter}
        onMouseLeave={() => {
          magnetic.onMouseLeave();
          spotlight.onMouseLeave();
        }}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
        transition={footerSpring}
      >
        {!spotlight.isDisabled && spotlight.isHovered ? (
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-xl opacity-100"
            style={{ background: spotlight.spotlight }}
            aria-hidden
          />
        ) : null}

        <Link
          href={href}
          {...(external ? getLinkTargetProps(href) : {})}
          aria-label={label}
          className={cn(
            "relative flex size-11 cursor-pointer items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950/70 text-zinc-300",
            "transition-[border-color,box-shadow,color] duration-300",
            "hover:border-emerald-500/40 hover:text-zinc-50 hover:shadow-[0_0_24px_rgba(16,185,129,0.12)]",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400",
          )}
        >
          <motion.span
            className="inline-flex"
            whileHover={
              shouldReduceMotion
                ? undefined
                : id === "github"
                  ? { rotate: 8 }
                  : id === "email"
                    ? { y: -2, rotate: -6 }
                    : id === "resume"
                      ? { x: 1 }
                      : { y: -2 }
            }
            transition={footerSpring}
          >
            {id === "resume" ? (
              <span className="inline-flex items-center gap-1">
                <Icon className="size-4" aria-hidden />
                <ArrowUpRight className="size-3 text-zinc-500" aria-hidden />
              </span>
            ) : (
              <Icon className="size-4" aria-hidden />
            )}
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export const FooterSocials = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : footerRevealVariants}
      className="min-w-0"
    >
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
        {footerContent.connectLabel}
      </p>
      <motion.div
        className="flex flex-wrap gap-2.5"
        variants={shouldReduceMotion ? undefined : footerSocialStaggerVariants}
      >
        {footerContent.socials.map((social) => (
          <FooterSocialButton
            key={social.id}
            id={social.id}
            label={social.label}
            href={social.href}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};
