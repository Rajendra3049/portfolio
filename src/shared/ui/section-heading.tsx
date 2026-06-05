type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export const SectionHeading = ({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) => {
  return (
    <header className="mb-8 max-w-3xl sm:mb-10">
      <p className="inline-flex items-center gap-2 rounded-full border border-zinc-700/90 bg-zinc-900/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-300">
        <span className="size-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden />
        {eyebrow}
      </p>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-7 text-zinc-300 sm:text-base">{description}</p>
    </header>
  );
};
