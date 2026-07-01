import { ContactSectionContent } from "@/sections/contact/contact-section-content";
import { SectionShell } from "@/shared/ui/section-shell";

export const ContactSection = () => {
  return (
    <SectionShell
      id="contact"
      className="relative overflow-hidden bg-zinc-950/90"
      containerClassName="max-w-7xl"
    >
      <ContactSectionContent />
    </SectionShell>
  );
};
