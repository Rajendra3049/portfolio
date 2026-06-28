import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { experiences, getFeaturedProjects } from "@/content";
import { siteConfig } from "@/content/config/site";
import { heroContent } from "@/content/hero/hero";
import { getLinkTargetProps } from "@/shared/lib/link";
import { Button } from "@/shared/ui/button";
import { FadeIn } from "@/shared/ui/fade-in";
import { HeroAmbientScene } from "@/shared/ui/hero-ambient-scene";
import { HeroHeadlineReveal } from "@/shared/ui/hero-headline-reveal";
import { HeroProofTicker } from "@/shared/ui/hero-proof-ticker";
import { HeroShowcaseVisual } from "@/shared/ui/hero-showcase-visual";
import { HeroSnapshotCard } from "@/shared/ui/hero-snapshot-card";
import { Magnetic } from "@/shared/ui/magnetic";
import { Pill } from "@/shared/ui/pill";
import { SectionShell } from "@/shared/ui/section-shell";

export const HeroSection = () => {
  const featuredProjects = getFeaturedProjects();
  const currentExperience = experiences[0];

  return (
    <SectionShell id="home" className="relative overflow-hidden border-t-0 bg-zinc-950 pt-16 sm:pt-24">
      <HeroAmbientScene />

      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start lg:gap-10">
        <div className="max-w-4xl min-w-0">
          <FadeIn>
            <p className="inline-flex rounded-full border border-zinc-700/90 bg-zinc-900/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-300">
              {heroContent.badge}
            </p>
          </FadeIn>

          <FadeIn delay={0.04}>
            <p className="mt-5 text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
              {siteConfig.name}
            </p>
            <HeroHeadlineReveal
              text={heroContent.headline}
              className="mt-2 w-full max-w-full text-3xl font-semibold leading-tight tracking-tight text-zinc-50 sm:max-w-3xl sm:text-5xl"
            />
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
              <Magnetic>
                <Button asChild>
                  <Link href={heroContent.primaryCta.href}>{heroContent.primaryCta.label}</Link>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button
                  asChild
                  variant="ghost"
                  className="border border-zinc-600 text-zinc-100 hover:bg-zinc-800"
                >
                  <Link href={heroContent.secondaryCta.href}>{heroContent.secondaryCta.label}</Link>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild variant="ghost" size="sm" className="text-zinc-400 hover:text-zinc-100">
                  <Link
                    href={heroContent.tertiaryCta.href}
                    {...getLinkTargetProps(heroContent.tertiaryCta.href)}
                  >
                    {heroContent.tertiaryCta.label}
                  </Link>
                </Button>
              </Magnetic>
            </div>
          </FadeIn>

          <FadeIn delay={0.22}>
            <HeroProofTicker metrics={heroContent.proofMetrics} />
          </FadeIn>

          <FadeIn delay={0.26}>
            <article className="mt-6 max-w-xl rounded-2xl border border-zinc-700/70 bg-zinc-900/45 p-4 backdrop-blur-md sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                Delivery Mindset
              </p>
              <p className="mt-2 text-sm leading-7 text-zinc-200 sm:text-base">
                I build interfaces that stay fast and predictable under real operational load, not just
                demo traffic.
              </p>
              <p className="mt-3 text-sm font-medium text-emerald-300/90">Associate Team Lead · Omniful.ai</p>
            </article>
          </FadeIn>

          <FadeIn delay={0.3}>
            <a
              href="#experience"
              className="group mt-8 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
            >
              {heroContent.scrollCue}
              <ChevronDown
                className="size-4 transition-transform group-hover:translate-y-0.5 motion-safe:animate-[hero-float_1.6s_ease-in-out_infinite]"
                aria-hidden
              />
            </a>
          </FadeIn>
        </div>

        <div className="relative min-w-0 space-y-5 lg:pl-2">
          <FadeIn delay={0.1}>
            <HeroShowcaseVisual monogram={siteConfig.navBrand.monogram} />
          </FadeIn>
          <div
            className="pointer-events-none absolute -inset-2 rounded-[1.1rem] bg-emerald-500/15 blur-xl motion-safe:animate-pulse"
            aria-hidden
          />
          <FadeIn delay={0.14} className="relative">
            <HeroSnapshotCard
              role={currentExperience?.role ?? "Software Engineer"}
              company={currentExperience?.company ?? "Omniful.ai"}
              metrics={heroContent.proofMetrics}
              featuredProjects={featuredProjects}
              openTo={heroContent.openTo}
            />
          </FadeIn>
        </div>
      </div>
    </SectionShell>
  );
};
