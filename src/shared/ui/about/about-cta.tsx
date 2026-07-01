"use client";

import Link from "next/link";
import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "@/shared/ui/magnetic";
import { SpotlightSurface } from "@/shared/ui/capabilities/spotlight-surface";
import { cn } from "@/shared/lib/utils";

type AboutCtaProps = {
  label: string;
  description: string;
  cta: { label: string; href: string };
};

export const AboutCta = memo(({ label, description, cta }: AboutCtaProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <article className="flex flex-col gap-4 rounded-xl border border-emerald-500/25 bg-zinc-900/60 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{label}</p>
          <p className="mt-2 text-sm leading-7 text-zinc-300 sm:text-base">{description}</p>
        </div>
        <Link
          href={cta.href}
          className="inline-flex w-full shrink-0 cursor-pointer items-center justify-center rounded-md bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 sm:w-auto"
        >
          {cta.label}
        </Link>
      </article>
    );
  }

  return (
    <SpotlightSurface
      tilt={false}
      className={cn(
        "rounded-xl border border-emerald-500/25 bg-zinc-900/60 p-5 sm:p-6",
        "transition-[border-color,box-shadow] duration-300",
        "hover:border-emerald-400/35 hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)]",
      )}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl"
        animate={{ opacity: [0.15, 0.28, 0.15] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{
          background:
            "linear-gradient(135deg, rgba(16,185,129,0.08), transparent 55%, rgba(16,185,129,0.04))",
        }}
        aria-hidden
      />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{label}</p>
          <p className="mt-2 text-sm leading-7 text-zinc-300 sm:text-base">{description}</p>
        </div>

        <Magnetic strength={8}>
          <Link
            href={cta.href}
            className="group inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 sm:w-auto"
          >
            {cta.label}
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </Magnetic>
      </div>
    </SpotlightSurface>
  );
});

AboutCta.displayName = "AboutCta";
