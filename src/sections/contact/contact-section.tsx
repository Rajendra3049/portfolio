import Link from "next/link";
import { siteConfig } from "@/content/config/site";
import { getLinkTargetProps } from "@/shared/lib/link";
import { Button } from "@/shared/ui/button";
import { SectionHeading } from "@/shared/ui/section-heading";
import { SectionShell } from "@/shared/ui/section-shell";

export const ContactSection = () => {
  return (
    <SectionShell id="contact" className="bg-zinc-900/70">
      <SectionHeading
        eyebrow="Contact"
        title="Open to frontend engineering opportunities."
        description="Based in Gurugram, India. Reach out for hiring conversations, collaboration, or referrals."
      />

      <div className="flex flex-wrap gap-3">
        {siteConfig.socialLinks.map((link) => (
          <Button key={link.label} asChild variant="ghost">
            <Link href={link.href} {...getLinkTargetProps(link.href)}>
              {link.label}
            </Link>
          </Button>
        ))}
        <Button asChild>
          <Link href="/resume" {...getLinkTargetProps("/resume")}>
            Resume
          </Link>
        </Button>
      </div>
    </SectionShell>
  );
};
