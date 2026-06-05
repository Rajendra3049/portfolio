import { SectionHeading } from "@/shared/ui/section-heading";
import { SectionShell } from "@/shared/ui/section-shell";

export const AboutSection = () => {
  return (
    <SectionShell id="about" className="bg-zinc-950/90">
      <SectionHeading
        eyebrow="About"
        title="Frontend engineer with product systems mindset."
        description="I focus on creating reliable frontend systems where architecture decisions improve speed, scalability, and team execution quality over time."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
          <h3 className="text-base font-semibold text-zinc-100">How I work</h3>
          <p className="mt-3 text-sm leading-7 text-zinc-300">
            I prioritize clear domain models, reusable component boundaries, and predictable
            data flows so products scale through iteration instead of rewrites.
          </p>
        </article>
        <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
          <h3 className="text-base font-semibold text-zinc-100">What I optimize for</h3>
          <p className="mt-3 text-sm leading-7 text-zinc-300">
            Product engineering velocity, recruiter-readability of impact, and sustainable
            frontend foundations for long-term SaaS growth.
          </p>
        </article>
      </div>
    </SectionShell>
  );
};
