import Link from "next/link";
import { ArrowUpRight, Layers, Palette, Radio, Sparkles } from "lucide-react";
import { type SkillCapability, type SkillCapabilityAccent } from "@/content/skills/skills";
import { cn } from "@/shared/lib/utils";
import { Pill } from "@/shared/ui/pill";

type CapabilityCardProps = {
  capability: SkillCapability;
};

const accentStyles: Record<
  SkillCapabilityAccent,
  { border: string; icon: string; dot: string }
> = {
  indigo: {
    border: "border-t-indigo-500/70",
    icon: "text-indigo-400",
    dot: "bg-indigo-500",
  },
  emerald: {
    border: "border-t-emerald-500/70",
    icon: "text-emerald-400",
    dot: "bg-emerald-500",
  },
  zinc: {
    border: "border-t-zinc-500/70",
    icon: "text-zinc-400",
    dot: "bg-zinc-500",
  },
  amber: {
    border: "border-t-amber-500/70",
    icon: "text-amber-400",
    dot: "bg-amber-500",
  },
};

const CapabilityIcon = ({
  title,
  className,
}: {
  title: SkillCapability["title"];
  className?: string;
}) => {
  const iconProps = { className: cn("size-4 shrink-0", className), "aria-hidden": true as const };

  switch (title) {
    case "Application Engineering":
      return <Layers {...iconProps} />;
    case "Real-Time Product Systems":
      return <Radio {...iconProps} />;
    case "UI & Form Engineering":
      return <Palette {...iconProps} />;
    case "Engineering Tooling & AI Workflow":
      return <Sparkles {...iconProps} />;
    default:
      return <Layers {...iconProps} />;
  }
};

export const CapabilityCard = ({ capability }: CapabilityCardProps) => {
  const styles = accentStyles[capability.accent];
  const isExternalProof = capability.proofHref.startsWith("/");

  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-xl border border-zinc-800 border-t-2 bg-zinc-900/90 p-5 transition-all hover:-translate-y-0.5 hover:border-zinc-600 hover:shadow-[0_12px_28px_rgba(0,0,0,0.25)] sm:p-6",
        styles.border,
        capability.featured && "md:col-span-2",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span
            className={cn(
              "mt-0.5 flex size-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950/80",
              styles.icon,
            )}
          >
            <CapabilityIcon title={capability.title} />
          </span>
          <div>
            <h3 className="text-base font-semibold text-zinc-50 sm:text-lg">{capability.title}</h3>
            <p className="mt-1 text-sm leading-6 text-zinc-400">{capability.tagline}</p>
          </div>
        </div>
        <span className={cn("mt-2 size-2 shrink-0 rounded-full", styles.dot)} aria-hidden />
      </div>

      <ul className="mt-5 flex flex-wrap gap-2">
        {capability.skills.map((skill) => (
          <li key={skill}>
            <Pill>{skill}</Pill>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-4">
        <Link
          href={capability.proofHref}
          className="inline-flex items-start gap-1.5 text-sm leading-6 text-zinc-300 transition-colors hover:text-zinc-100"
        >
          <span className={cn("mt-2 size-1.5 shrink-0 rounded-full", styles.dot)} aria-hidden />
          <span>
            {capability.proof}
            <ArrowUpRight
              className="ml-1 inline size-3.5 text-zinc-500 transition-transform group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-zinc-300"
              aria-hidden
            />
          </span>
        </Link>
        <p className="mt-1 pl-3.5 text-xs text-zinc-500">
          {isExternalProof ? "See case study" : "See experience"}
        </p>
      </div>
    </article>
  );
};
