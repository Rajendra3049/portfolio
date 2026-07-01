import type { AboutAccent } from "@/content/about/about";

type AboutAccentStyle = {
  label: string;
  dot: string;
  border: string;
  hoverBorder: string;
  icon: string;
  glow: string;
  line: string;
  chip: string;
};

export const aboutAccentStyles: Record<AboutAccent, AboutAccentStyle> = {
  indigo: {
    label: "text-indigo-300",
    dot: "bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]",
    border: "border-indigo-500/25",
    hoverBorder: "hover:border-indigo-400/35",
    icon: "text-indigo-400",
    glow: "linear-gradient(135deg, rgba(99,102,241,0.1), transparent 60%)",
    line: "bg-indigo-500/40",
    chip: "bg-indigo-500/12 text-indigo-200",
  },
  emerald: {
    label: "text-emerald-300",
    dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]",
    border: "border-emerald-500/25",
    hoverBorder: "hover:border-emerald-400/35",
    icon: "text-emerald-400",
    glow: "linear-gradient(135deg, rgba(16,185,129,0.1), transparent 60%)",
    line: "bg-emerald-500/40",
    chip: "bg-emerald-500/12 text-emerald-200",
  },
  amber: {
    label: "text-amber-300",
    dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.45)]",
    border: "border-amber-500/25",
    hoverBorder: "hover:border-amber-400/35",
    icon: "text-amber-400",
    glow: "linear-gradient(135deg, rgba(245,158,11,0.1), transparent 60%)",
    line: "bg-amber-500/40",
    chip: "bg-amber-500/12 text-amber-200",
  },
  zinc: {
    label: "text-zinc-200",
    dot: "bg-zinc-300 shadow-[0_0_8px_rgba(212,212,216,0.3)]",
    border: "border-zinc-500/30",
    hoverBorder: "hover:border-zinc-300/35",
    icon: "text-zinc-300",
    glow: "linear-gradient(135deg, rgba(255,255,255,0.06), transparent 60%)",
    line: "bg-zinc-400/35",
    chip: "bg-zinc-500/14 text-zinc-200",
  },
};
