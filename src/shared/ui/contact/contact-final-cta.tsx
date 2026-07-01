"use client";

import { ContactCtaButton } from "@/shared/ui/contact/contact-cta-button";

type ContactFinalCtaProps = {
  label: string;
  href: string;
  subtext: string;
};

export const ContactFinalCta = ({ label, href, subtext }: ContactFinalCtaProps) => {
  return <ContactCtaButton label={label} href={href} subtext={subtext} />;
};
