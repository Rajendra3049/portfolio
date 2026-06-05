import { cn } from "@/shared/lib/utils";

type PillProps = {
  children: React.ReactNode;
  className?: string;
};

export const Pill = ({ children, className }: PillProps) => {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-300",
        className,
      )}
    >
      {children}
    </span>
  );
};
