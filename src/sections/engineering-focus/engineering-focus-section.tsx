import { skillCapabilities } from "@/content/skills/skills";
import { CapabilityCard } from "@/shared/ui/capability-card";
import { FadeIn } from "@/shared/ui/fade-in";
import { SectionHeading } from "@/shared/ui/section-heading";
import { SectionShell } from "@/shared/ui/section-shell";

export const EngineeringFocusSection = () => {
  return (
    <SectionShell id="capabilities" className="bg-zinc-900/70">
      <SectionHeading
        eyebrow="Capabilities"
        title="What I bring to a product team."
        description="Skills proven in production logistics SaaS and shipped side projects — application engineering, real-time systems, and delivery tooling."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {skillCapabilities.map((capability, index) => (
          <FadeIn key={capability.title} delay={index * 0.07}>
            <CapabilityCard capability={capability} />
          </FadeIn>
        ))}
      </div>
    </SectionShell>
  );
};
