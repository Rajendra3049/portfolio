import Link from "next/link";
import { contactContent } from "@/content/contact/contact";
import { getLinkTargetProps } from "@/shared/lib/link";
import { Button } from "@/shared/ui/button";
import { CopyEmailButton } from "@/shared/ui/copy-email-button";
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

      <p className="-mt-2 mb-6 max-w-3xl text-sm leading-7 text-zinc-400">
        {contactContent.credibility}
      </p>

      <ul className="mb-8 flex flex-wrap gap-2" aria-label="Availability details">
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
        <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
          <h3 className="text-base font-semibold text-zinc-100">{hiringCard.title}</h3>

          <div className="mt-5 space-y-4">
            <div>
              <Button asChild className="w-full sm:w-auto">
                <Link
                  href={hiringCard.primaryCta.href}
                  {...getLinkTargetProps(hiringCard.primaryCta.href)}
                >
                  {hiringCard.primaryCta.label}
                </Link>
              </Button>
              <p className="mt-2 text-xs text-zinc-500">{hiringCard.primaryCta.bestFor}</p>
            </div>

            <div>
              <Button asChild className="w-full sm:w-auto">
                <Link
                  href={hiringCard.secondaryCta.href}
                  {...getLinkTargetProps(hiringCard.secondaryCta.href)}
                >
                  {hiringCard.secondaryCta.label}
                </Link>
              </Button>
              <p className="mt-2 text-xs text-zinc-500">{hiringCard.secondaryCta.bestFor}</p>
            </div>
          </div>
        </article>

        <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
          <h3 className="text-base font-semibold text-zinc-100">{directCard.title}</h3>

          <div className="mt-5 space-y-4">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="text-xs uppercase tracking-wide text-zinc-500">Email</p>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href={`mailto:${directCard.email}`}
                  {...getLinkTargetProps(`mailto:${directCard.email}`)}
                  className="text-sm font-medium text-zinc-100 transition-colors hover:text-zinc-50"
                >
                  {directCard.email}
                </a>
                <CopyEmailButton email={directCard.email} />
              </div>
              <p className="mt-2 text-xs text-zinc-500">{directCard.emailBestFor}</p>
            </div>

            <div>
              <Button asChild className="w-full sm:w-auto">
                <Link
                  href={directCard.github.href}
                  {...getLinkTargetProps(directCard.github.href)}
                >
                  {directCard.github.label}
                </Link>
              </Button>
              <p className="mt-2 text-xs text-zinc-500">{directCard.github.bestFor}</p>
            </div>
          </div>
        </article>
      </div>
    </SectionShell>
  );
};
