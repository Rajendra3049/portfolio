import Link from "next/link";
import { Briefcase, Code2, Mail, MessageCircle } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { CopyEmailButton } from "@/shared/ui/copy-email-button";
import { getLinkTargetProps } from "@/shared/lib/link";
import { Button } from "@/shared/ui/button";

type ContactChannelCardProps = {
  title: string;
  proof: string;
  accent: "emerald" | "indigo";
  children: React.ReactNode;
};

const accentStyles = {
  emerald: {
    border: "border-t-emerald-500/70",
    icon: "text-emerald-400",
    dot: "bg-emerald-500",
  },
  indigo: {
    border: "border-t-indigo-500/70",
    icon: "text-indigo-400",
    dot: "bg-indigo-500",
  },
};

export const ContactChannelCard = ({
  title,
  proof,
  accent,
  children,
}: ContactChannelCardProps) => {
  const styles = accentStyles[accent];
  const HeaderIcon = accent === "emerald" ? Briefcase : MessageCircle;

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-xl border border-zinc-800 border-t-2 bg-zinc-900/90 p-5 transition-all hover:-translate-y-0.5 hover:border-zinc-600 hover:shadow-[0_12px_28px_rgba(0,0,0,0.25)] sm:p-6",
        styles.border,
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950/80",
            styles.icon,
          )}
        >
          <HeaderIcon className="size-4" aria-hidden />
        </span>
        <div>
          <h3 className="text-base font-semibold text-zinc-50 sm:text-lg">{title}</h3>
          <p className="mt-1 text-sm text-zinc-400">{proof}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-1 flex-col gap-4">{children}</div>
    </article>
  );
};

type ContactCtaBlockProps = {
  label: string;
  href: string;
  bestFor: string;
  variant?: "primary" | "secondary";
};

export const ContactCtaBlock = ({
  label,
  href,
  bestFor,
  variant = "primary",
}: ContactCtaBlockProps) => {
  const isPrimary = variant === "primary";

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4">
      <Button
        asChild
        variant={isPrimary ? "primary" : "ghost"}
        className={cn(
          "w-full",
          !isPrimary && "border border-zinc-600 text-zinc-100 hover:bg-zinc-800",
        )}
      >
        <Link href={href} {...getLinkTargetProps(href)}>
          {label}
        </Link>
      </Button>
      <p className="mt-2 text-xs text-zinc-500">{bestFor}</p>
    </div>
  );
};

type ContactEmailBlockProps = {
  email: string;
  bestFor: string;
};

export const ContactEmailBlock = ({ email, bestFor }: ContactEmailBlockProps) => {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4">
      <div className="flex items-center gap-2">
        <Mail className="size-3.5 text-zinc-500" aria-hidden />
        <p className="text-xs uppercase tracking-wide text-zinc-500">Email</p>
      </div>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={`mailto:${email}`}
          className="text-sm font-medium text-zinc-100 transition-colors hover:text-zinc-50"
        >
          {email}
        </a>
        <CopyEmailButton email={email} className="shrink-0" />
      </div>
      <p className="mt-2 text-xs text-zinc-500">{bestFor}</p>
    </div>
  );
};

type ContactGithubBlockProps = {
  label: string;
  href: string;
  handle: string;
  bestFor: string;
};

export const ContactGithubBlock = ({
  label,
  href,
  handle,
  bestFor,
}: ContactGithubBlockProps) => {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4">
      <div className="flex items-center gap-2">
        <Code2 className="size-3.5 text-zinc-500" aria-hidden />
        <p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p>
      </div>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={href}
          {...getLinkTargetProps(href)}
          className="text-sm font-medium text-zinc-100 transition-colors hover:text-zinc-50"
        >
          {handle}
        </Link>
        <Button asChild variant="ghost" size="sm" className="shrink-0">
          <Link href={href} {...getLinkTargetProps(href)}>
            View GitHub
          </Link>
        </Button>
      </div>
      <p className="mt-2 text-xs text-zinc-500">{bestFor}</p>
    </div>
  );
};
