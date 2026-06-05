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
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-7 text-zinc-300 sm:text-base">{description}</p>
    </header>
  );
};
