import { CapabilitiesSectionContent } from "@/sections/engineering-focus/capabilities-section-content";
import { SectionShell } from "@/shared/ui/section-shell";

export const EngineeringFocusSection = () => {
  return (
    <SectionShell id="capabilities" className="relative overflow-hidden bg-zinc-900/70">
      <CapabilitiesSectionContent />
    </SectionShell>
  );
};
