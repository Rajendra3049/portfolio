import Link from "next/link";
import { siteConfig } from "@/content/config/site";
import { Button } from "@/shared/ui/button";
import { SectionHeading } from "@/shared/ui/section-heading";
import { SectionShell } from "@/shared/ui/section-shell";

export const ContactSection = () => {
  return (
    <SectionShell id="contact" className="bg-zinc-900/70">
      <SectionHeading
        eyebrow="Contact"
        title="Open to frontend and product engineering opportunities."
        description="For hiring discussions, technical collaboration, or referrals, reach out through any channel below."
      />

      <div className="flex flex-wrap gap-3">
        {siteConfig.socialLinks.map((link) => (
          <Button key={link.label} asChild variant="ghost">
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ))}
        <Button asChild>
          <Link href="/resume">Resume</Link>
        </Button>
      </div>
    </SectionShell>
  );
};
