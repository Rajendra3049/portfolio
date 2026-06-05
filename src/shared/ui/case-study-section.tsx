type CaseStudySectionProps = {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
};

export const CaseStudySection = ({ eyebrow, title, children }: CaseStudySectionProps) => {
  return (
    <section className="scroll-mt-24">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">{eyebrow}</p>
      <h2 className="mt-2 text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
};

type CaseStudyListProps = {
  items: string[];
};

export const CaseStudyList = ({ items }: CaseStudyListProps) => {
  return (
    <ul className="space-y-3 text-sm leading-7 text-zinc-300 sm:text-base">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-emerald-500/80" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};

type CaseStudyProseProps = {
  paragraphs: string[];
};

export const CaseStudyProse = ({ paragraphs }: CaseStudyProseProps) => {
  return (
    <div className="space-y-4 text-sm leading-8 text-zinc-300 sm:text-base">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
};
