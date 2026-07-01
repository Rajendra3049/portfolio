import type { ContactAccent } from "@/content/contact/contact";

type ContactAccentStyle = {
  label: string;
  border: string;
  hoverBorder: string;
  icon: string;
  glow: string;
  arrow: string;
};

export const contactAccentStyles: Record<ContactAccent, ContactAccentStyle> = {
  emerald: {
    label: "text-emerald-300",
    border: "border-emerald-500/25",
    hoverBorder: "group-hover:border-emerald-400/40",
    icon: "text-emerald-400",
    glow: "linear-gradient(135deg, rgba(16,185,129,0.1), transparent 58%)",
    arrow: "text-emerald-400/80",
  },
  indigo: {
    label: "text-indigo-300",
    border: "border-indigo-500/25",
    hoverBorder: "group-hover:border-indigo-400/40",
    icon: "text-indigo-400",
    glow: "linear-gradient(135deg, rgba(99,102,241,0.1), transparent 58%)",
    arrow: "text-indigo-400/80",
  },
  amber: {
    label: "text-amber-300",
    border: "border-amber-500/25",
    hoverBorder: "group-hover:border-amber-400/40",
    icon: "text-amber-400",
    glow: "linear-gradient(135deg, rgba(245,158,11,0.1), transparent 58%)",
    arrow: "text-amber-400/80",
  },
  zinc: {
    label: "text-zinc-200",
    border: "border-zinc-500/30",
    hoverBorder: "group-hover:border-zinc-300/40",
    icon: "text-zinc-300",
    glow: "linear-gradient(135deg, rgba(255,255,255,0.06), transparent 58%)",
    arrow: "text-zinc-300/80",
  },
};
