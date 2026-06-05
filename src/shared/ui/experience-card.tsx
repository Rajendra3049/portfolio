import { type Experience } from "@/entities/experience";
import { Pill } from "@/shared/ui/pill";

type ExperienceCardProps = {
  experience: Experience;
};

export const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-5 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-zinc-50">
          {experience.role} <span className="text-zinc-400">@ {experience.company}</span>
        </h3>
        <p className="text-sm text-zinc-400">{experience.duration}</p>
      </div>

      <p className="mt-3 text-sm leading-7 text-zinc-300">{experience.summary}</p>

      <ul className="mt-4 space-y-2 text-sm text-zinc-300">
        {experience.impactPoints.map((point) => (
          <li key={point} className="flex gap-2">
            <span className="mt-2 size-1.5 rounded-full bg-zinc-500" aria-hidden />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-5 flex flex-wrap gap-2">
        {experience.stack.map((item) => (
          <li key={item}>
            <Pill>{item}</Pill>
          </li>
        ))}
      </ul>
    </article>
  );
};
