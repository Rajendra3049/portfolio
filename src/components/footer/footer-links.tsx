"use client";

import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { footerContent } from "@/content/footer/footer";
import { footerRevealVariants } from "@/shared/lib/motion/footer-variants";
import { cn } from "@/shared/lib/utils";

const isExternalHref = (href: string) => href.startsWith("http") || href.startsWith("mailto:");

export const FooterLinks = () => {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : footerRevealVariants;

  return (
    <motion.nav variants={variants} aria-label="Footer navigation" className="min-w-0">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
        Navigate
      </p>
      <ul className="flex flex-col gap-1">
        {footerContent.navLinks.map((link) => {
          const external = isExternalHref(link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "group/link relative inline-flex cursor-pointer items-center gap-2 py-2 text-sm font-medium text-zinc-300 transition-colors hover:text-zinc-50",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400",
                )}
              >
                <span className="relative">
                  {link.label}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px w-0 bg-emerald-400 transition-[width] duration-300 ease-out group-hover/link:w-full group-focus-visible/link:w-full"
                    aria-hidden
                  />
                </span>
                {link.label === "Resume" ? (
                  <FileText
                    className="size-3.5 text-zinc-500 transition-transform duration-300 group-hover/link:-translate-y-px group-hover/link:translate-x-0.5 group-hover/link:text-emerald-400"
                    aria-hidden
                  />
                ) : (
                  <ArrowUpRight
                    className="size-3.5 text-zinc-500 transition-transform duration-300 group-hover/link:-translate-y-px group-hover/link:translate-x-0.5 group-hover/link:text-emerald-400"
                    aria-hidden
                  />
                )}
                {external ? <span className="sr-only">(opens in new tab)</span> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
};
