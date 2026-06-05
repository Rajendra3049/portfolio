import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { experiences, getFeaturedProjects } from "@/content";
import { siteConfig } from "@/content/config/site";
import { heroContent } from "@/content/hero/hero";
import { getLinkTargetProps } from "@/shared/lib/link";
import { Button } from "@/shared/ui/button";
import { FadeIn } from "@/shared/ui/fade-in";
import { HeroSnapshotCard } from "@/shared/ui/hero-snapshot-card";
import { Pill } from "@/shared/ui/pill";
import { SectionShell } from "@/shared/ui/section-shell";

export const HeroSection = () => {
  const featuredProjects = getFeaturedProjects();
  const currentExperience = experiences[0];

  return (
    <SectionShell className="relative border-t-0 bg-zinc-950 pt-16 sm:pt-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_55%)]"
        aria-hidden
      />

      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-10">
        <div className="max-w-4xl">
          <FadeIn>
            <p className="inline-flex rounded-full border border-zinc-700/90 bg-zinc-900/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-300">
              {heroContent.badge}
            </p>
          </FadeIn>

          <FadeIn delay={0.04}>
            <p className="mt-5 text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
              {siteConfig.name}
            </p>
            <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-zinc-50 sm:text-5xl">
              {heroContent.headline}
            </h1>
          </FadeIn>

          <FadeIn delay={0.08}>
            <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-300 sm:text-lg">
              {heroContent.subheadline}
            </p>
          </FadeIn>

          <FadeIn delay={0.12}>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Core capability areas">
              {heroContent.focusPills.map((pill) => (
                <li key={pill}>
                  <Pill>{pill}</Pill>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.16}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href={heroContent.primaryCta.href}>{heroContent.primaryCta.label}</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="border border-zinc-600 text-zinc-100 hover:bg-zinc-800"
              >
                <Link href={heroContent.secondaryCta.href}>{heroContent.secondaryCta.label}</Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="text-zinc-400 hover:text-zinc-100">
                <Link href={heroContent.tertiaryCta.href} {...getLinkTargetProps(heroContent.tertiaryCta.href)}>
                  {heroContent.tertiaryCta.label}
                </Link>
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <a
              href="#experience"
              className="mt-8 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
            >
              {heroContent.scrollCue}
              <ChevronDown className="size-4" aria-hidden />
            </a>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <HeroSnapshotCard
            role={currentExperience?.role ?? "Software Engineer"}
            company={currentExperience?.company ?? "Omniful.ai"}
            metrics={heroContent.proofMetrics}
            featuredProjects={featuredProjects}
            openTo={heroContent.openTo}
          />
        </FadeIn>
      </div>
    </SectionShell>
  );
};
