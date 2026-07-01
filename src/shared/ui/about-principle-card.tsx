import { Compass, Rocket, Target } from "lucide-react";
import {
  type AboutPrinciple,
  type AboutPrincipleAccent,
} from "@/content/about/about";
import { cn } from "@/shared/lib/utils";

type AboutPrincipleCardProps = {
  principle: AboutPrinciple;
};

const accentStyles: Record<
  AboutPrincipleAccent,
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
  amber: {
    border: "border-t-amber-500/70",
    icon: "text-amber-400",
    dot: "bg-amber-500",
  },
  zinc: {
    border: "border-t-zinc-500/70",
    icon: "text-zinc-400",
    dot: "bg-zinc-500",
  },
};

const PrincipleIcon = ({ title, className }: { title: string; className?: string }) => {
  const iconProps = { className: cn("size-4 shrink-0", className), "aria-hidden": true as const };

  switch (title) {
    case "How I work":
      return <Compass {...iconProps} />;
    case "What I optimize for":
      return <Target {...iconProps} />;
    case "What I'm building toward":
      return <Rocket {...iconProps} />;
    default:
      return <Compass {...iconProps} />;
  }
};

export const AboutPrincipleCard = ({ principle }: AboutPrincipleCardProps) => {
  const styles = accentStyles[principle.accent];

  return (
    <article
      className={cn(
        "interactive-surface group flex h-full flex-col rounded-xl border border-zinc-800 border-t-2 bg-zinc-900/90 p-5 sm:p-6",
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
          <PrincipleIcon title={principle.title} className={styles.icon} />
        </span>
        <div>
          <h3 className="text-base font-semibold text-zinc-50 sm:text-lg">{principle.title}</h3>
          <p className="mt-1 text-sm leading-6 text-zinc-400">{principle.tagline}</p>
        </div>
      </div>

      <ul className="mt-5 space-y-3">
        {principle.points.map((point) => (
          <li key={point} className="flex gap-3 text-sm leading-6 text-zinc-300">
            <span className={cn("mt-2 size-1.5 shrink-0 rounded-full", styles.dot)} aria-hidden />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};
