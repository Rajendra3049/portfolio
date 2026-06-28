import Link from "next/link";
import { aboutContent } from "@/content/about/about";
import { AboutPrincipleCard } from "@/shared/ui/about-principle-card";
import { FadeIn } from "@/shared/ui/fade-in";
import { Pill } from "@/shared/ui/pill";
import { SectionHeading } from "@/shared/ui/section-heading";
import { SectionShell } from "@/shared/ui/section-shell";

export const AboutSection = () => {
  return (
    <SectionShell id="about" className="bg-zinc-950/90">
      <SectionHeading
        eyebrow={aboutContent.eyebrow}
        title={aboutContent.title}
        description={aboutContent.description}
      />

      <FadeIn>
        <article className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-5 sm:p-6">
          <p className="text-sm leading-8 text-zinc-300 sm:text-base">{aboutContent.story}</p>

          <dl className="mt-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:grid-cols-4">
            {aboutContent.highlights.map((highlight) => (
              <div
                key={highlight.label}
                className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-3"
              >
                <dt className="text-xs uppercase tracking-wide text-zinc-500">{highlight.label}</dt>
                <dd className="mt-1 text-sm font-medium text-zinc-100">{highlight.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Core focus areas">
            {aboutContent.focusAreas.map((area) => (
              <li key={area}>
                <Pill>{area}</Pill>
              </li>
            ))}
          </ul>
        </article>
      </FadeIn>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {aboutContent.principles.map((principle, index) => (
          <FadeIn
            key={principle.title}
            delay={0.06 + index * 0.07}
            className={index === aboutContent.principles.length - 1 ? "lg:col-span-2" : undefined}
          >
            <AboutPrincipleCard principle={principle} />
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.28}>
        <article className="mt-4 flex flex-col gap-4 rounded-xl border border-zinc-800 border-t-2 border-t-emerald-500/50 bg-zinc-900/90 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Open to</p>
            <p className="mt-2 text-sm leading-7 text-zinc-300 sm:text-base">{aboutContent.openTo}</p>
          </div>
          <Link
            href="#contact"
            className="inline-flex w-full shrink-0 items-center justify-center rounded-md bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 sm:w-auto"
          >
            Get in touch
          </Link>
        </article>
      </FadeIn>
    </SectionShell>
  );
};
