import { skillCapabilities } from "@/content/skills/skills";
import { FadeIn } from "@/shared/ui/fade-in";
import { Pill } from "@/shared/ui/pill";
import { SectionHeading } from "@/shared/ui/section-heading";
import { SectionShell } from "@/shared/ui/section-shell";

export const EngineeringFocusSection = () => {
  return (
    <SectionShell className="bg-zinc-900/70">
      <SectionHeading
        eyebrow="Engineering Focus"
        title="Systems-level capabilities applied to modern SaaS products."
        description="Skills are shown contextually through project and experience outcomes, with this section acting as a concise capability map."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {skillCapabilities.map((capability, index) => (
          <FadeIn
            key={capability.title}
            delay={index * 0.07}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6"
          >
            <h3 className="text-base font-semibold text-zinc-100">{capability.title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {capability.skills.map((skill) => (
                <li key={skill}>
                  <Pill>{skill}</Pill>
                </li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>
    </SectionShell>
  );
};
