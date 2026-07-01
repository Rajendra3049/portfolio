import type { SkillCapabilityAccent } from "@/content/skills/skills";

type TechAccentStyle = {
  label: string;
  dot: string;
  cardBorder: string;
  cardHoverBorder: string;
  cardShadow: string;
  cardGlow: string;
  chipBorder: string;
  chipBg: string;
  chipText: string;
  chipHoverBorder: string;
  chipHoverShadow: string;
};

export const techAccentStyles: Record<SkillCapabilityAccent, TechAccentStyle> = {
  indigo: {
    label: "text-indigo-300",
    dot: "bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.55)]",
    cardBorder: "border-indigo-500/25",
    cardHoverBorder: "hover:border-indigo-400/40",
    cardShadow:
      "shadow-[inset_0_1px_0_0_rgba(129,140,248,0.08),0_0_0_1px_rgba(129,140,248,0.06)]",
    cardGlow:
      "linear-gradient(135deg, rgba(99,102,241,0.12), transparent 58%, rgba(99,102,241,0.05))",
    chipBorder: "border-indigo-400/30",
    chipBg: "bg-indigo-500/12",
    chipText: "text-indigo-100",
    chipHoverBorder: "hover:border-indigo-300/45",
    chipHoverShadow: "hover:shadow-[0_0_16px_rgba(99,102,241,0.22)]",
  },
  emerald: {
    label: "text-emerald-300",
    dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.55)]",
    cardBorder: "border-emerald-500/25",
    cardHoverBorder: "hover:border-emerald-400/40",
    cardShadow:
      "shadow-[inset_0_1px_0_0_rgba(52,211,153,0.08),0_0_0_1px_rgba(52,211,153,0.06)]",
    cardGlow:
      "linear-gradient(135deg, rgba(16,185,129,0.12), transparent 58%, rgba(16,185,129,0.05))",
    chipBorder: "border-emerald-400/30",
    chipBg: "bg-emerald-500/12",
    chipText: "text-emerald-50",
    chipHoverBorder: "hover:border-emerald-300/45",
    chipHoverShadow: "hover:shadow-[0_0_16px_rgba(16,185,129,0.22)]",
  },
  zinc: {
    label: "text-zinc-200",
    dot: "bg-zinc-300 shadow-[0_0_8px_rgba(212,212,216,0.35)]",
    cardBorder: "border-zinc-500/30",
    cardHoverBorder: "hover:border-zinc-300/35",
    cardShadow:
      "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_0_0_1px_rgba(255,255,255,0.04)]",
    cardGlow:
      "linear-gradient(135deg, rgba(255,255,255,0.06), transparent 58%, rgba(255,255,255,0.03))",
    chipBorder: "border-zinc-400/28",
    chipBg: "bg-zinc-500/14",
    chipText: "text-zinc-100",
    chipHoverBorder: "hover:border-zinc-200/40",
    chipHoverShadow: "hover:shadow-[0_0_16px_rgba(255,255,255,0.08)]",
  },
  amber: {
    label: "text-amber-300",
    dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]",
    cardBorder: "border-amber-500/25",
    cardHoverBorder: "hover:border-amber-400/40",
    cardShadow:
      "shadow-[inset_0_1px_0_0_rgba(251,191,36,0.08),0_0_0_1px_rgba(251,191,36,0.06)]",
    cardGlow:
      "linear-gradient(135deg, rgba(245,158,11,0.12), transparent 58%, rgba(245,158,11,0.05))",
    chipBorder: "border-amber-400/30",
    chipBg: "bg-amber-500/12",
    chipText: "text-amber-50",
    chipHoverBorder: "hover:border-amber-300/45",
    chipHoverShadow: "hover:shadow-[0_0_16px_rgba(245,158,11,0.2)]",
  },
};
