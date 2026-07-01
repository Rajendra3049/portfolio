import { cn } from "@/shared/lib/utils";

type SectionShellProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
};

export const SectionShell = ({
  id,
  children,
  className,
  containerClassName,
}: SectionShellProps) => {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 border-y border-zinc-800/70 bg-zinc-900/70 py-12 sm:py-16 lg:py-20",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10",
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
};
