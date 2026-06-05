import Link from "next/link";
import { experiences, getFeaturedProjects } from "@/content";
import { siteConfig } from "@/content/config/site";
import { Button } from "@/shared/ui/button";
import { FadeIn } from "@/shared/ui/fade-in";
import { Pill } from "@/shared/ui/pill";
import { SectionShell } from "@/shared/ui/section-shell";

export const HeroSection = () => {
  const featuredProjects = getFeaturedProjects();
  const currentExperience = experiences[0];

  return (
    <SectionShell className="border-t-0 bg-zinc-950 pt-16 sm:pt-24">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-10">
        <FadeIn className="max-w-4xl">
          <p className="inline-flex rounded-full border border-zinc-700/90 bg-zinc-900/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-300">
            Product-Focused Software Engineer
          </p>
          <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-zinc-50 sm:text-5xl">
            Building scalable SaaS applications and production-grade frontend architecture.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-300 sm:text-lg">
            I ship high-ownership product systems with React.js, Next.js, and TypeScript,
            focused on real-time workflows, maintainable architecture, and measurable product
            impact.
          </p>
          <div className="mt-6 flex flex-wrap gap-2" aria-label="Core capability areas">
            <Pill>Frontend Engineer</Pill>
            <Pill>Real-Time Systems</Pill>
            <Pill>Scalable SaaS Applications</Pill>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href={siteConfig.primaryCta.href}>{siteConfig.primaryCta.label}</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href={siteConfig.secondaryCta.href}>{siteConfig.secondaryCta.label}</Link>
            </Button>
          </div>
        </FadeIn>

        <FadeIn
          delay={0.08}
          className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-5 sm:p-6"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Snapshot
          </p>
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-zinc-500">Current Role</p>
              <p className="mt-1 text-sm font-medium text-zinc-100">
                {currentExperience
                  ? `${currentExperience.role} at ${currentExperience.company}`
                  : "Software Engineer"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-zinc-500">Featured Work</p>
              <p className="mt-1 text-sm font-medium text-zinc-100">
                {featuredProjects.length}+ architecture-led case studies
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-zinc-500">Core Stack</p>
              <p className="mt-1 text-sm font-medium text-zinc-100">React.js, Next.js, TypeScript</p>
            </div>
          </div>
          <div className="mt-5 border-t border-zinc-800 pt-4">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Open To</p>
            <p className="mt-1 text-sm text-zinc-200">
              Product engineering and frontend architecture roles.
            </p>
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  );
};
