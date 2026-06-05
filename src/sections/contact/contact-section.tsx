import { contactContent } from "@/content/contact/contact";
import {
  ContactChannelCard,
  ContactCtaBlock,
  ContactEmailBlock,
  ContactGithubBlock,
} from "@/shared/ui/contact-channel-card";
import { FadeIn } from "@/shared/ui/fade-in";
import { Pill } from "@/shared/ui/pill";
import { SectionHeading } from "@/shared/ui/section-heading";
import { SectionShell } from "@/shared/ui/section-shell";

export const ContactSection = () => {
  const { hiringCard, directCard } = contactContent;

  return (
    <SectionShell id="contact" className="bg-zinc-900/70">
      <SectionHeading
        eyebrow={contactContent.eyebrow}
        title={contactContent.title}
        description={contactContent.description}
      />

      <ul className="mb-6 flex flex-wrap gap-2" aria-label="Availability details">
        <li>
          <Pill>{contactContent.availability}</Pill>
        </li>
        <li>
          <Pill>{contactContent.location}</Pill>
        </li>
        <li>
          <Pill>{contactContent.responseTime}</Pill>
        </li>
      </ul>

      <div className="grid gap-4 md:grid-cols-2">
        <FadeIn delay={0.06}>
          <ContactChannelCard
            title={hiringCard.title}
            proof={hiringCard.proof}
            accent="emerald"
          >
            <ContactCtaBlock
              label={hiringCard.primaryCta.label}
              href={hiringCard.primaryCta.href}
              bestFor={hiringCard.primaryCta.bestFor}
              variant="primary"
            />
            <ContactCtaBlock
              label={hiringCard.secondaryCta.label}
              href={hiringCard.secondaryCta.href}
              bestFor={hiringCard.secondaryCta.bestFor}
              variant="secondary"
            />
          </ContactChannelCard>
        </FadeIn>

        <FadeIn delay={0.12}>
          <ContactChannelCard
            title={directCard.title}
            proof={directCard.proof}
            accent="indigo"
          >
            <ContactEmailBlock email={directCard.email} bestFor={directCard.emailBestFor} />
            <ContactGithubBlock
              label={directCard.github.label}
              href={directCard.github.href}
              handle={directCard.github.handle}
              bestFor={directCard.github.bestFor}
            />
          </ContactChannelCard>
        </FadeIn>
      </div>

      <FadeIn delay={0.18}>
        <p className="mt-6 text-center text-sm text-zinc-500">{contactContent.footerNote}</p>
      </FadeIn>
    </SectionShell>
  );
};
