import { type Experience, type ExperiencePosition } from "@/entities/experience";
import { Pill } from "@/shared/ui/pill";

type ExperienceCardProps = {
  experience: Experience;
};

const VISIBLE_BULLET_COUNT = 3;

const ImpactPointList = ({ points }: { points: string[] }) => (
  <ul className="space-y-2 text-sm leading-6 text-zinc-300">
    {points.map((point) => (
      <li key={point} className="flex gap-2">
        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-500" aria-hidden />
        <span>{point}</span>
      </li>
    ))}
  </ul>
);

const ExperienceMetrics = ({ experience }: { experience: Experience }) => (
  <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
    {experience.metrics.map((metric) => (
      <div
        key={metric.label}
        className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-3"
      >
        <dt className="text-xs uppercase tracking-wide text-zinc-500">{metric.label}</dt>
        <dd className="mt-1 text-sm font-medium text-zinc-100">{metric.value}</dd>
      </div>
    ))}
  </dl>
);

const TimelineNode = ({
  position,
  isLast,
}: {
  position: ExperiencePosition;
  isLast: boolean;
}) => {
  const visiblePoints = position.impactPoints.slice(0, VISIBLE_BULLET_COUNT);
  const hiddenPoints = position.impactPoints.slice(VISIBLE_BULLET_COUNT);
  const isHighlighted = position.isCurrent || position.isPromotion;

  return (
    <li className={`relative pl-8 ${isLast ? "pb-0" : "pb-8"}`}>
      <span
        className={`absolute left-0 top-1.5 size-3 -translate-x-1/2 rounded-full ring-4 ring-zinc-900/90 ${
          isHighlighted ? "bg-emerald-500" : "bg-zinc-500"
        }`}
        aria-hidden
      />

      <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/40 p-4 sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-sm font-semibold text-zinc-50 sm:text-base">
                {position.role}
              </h4>
              {position.isPromotion ? (
                <Pill className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                  Promotion
                </Pill>
              ) : null}
            </div>
            {position.scope ? (
              <p className="text-xs text-zinc-400">{position.scope}</p>
            ) : null}
          </div>
          <p className="shrink-0 text-xs text-zinc-500 sm:text-sm">{position.duration}</p>
        </div>

        <div className="mt-3">
          <ImpactPointList points={visiblePoints} />
        </div>

        {hiddenPoints.length > 0 ? (
          <details className="mt-3 group">
            <summary className="cursor-pointer text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-200">
              Show full responsibilities
            </summary>
            <div className="mt-3 border-t border-zinc-800 pt-3">
              <ImpactPointList points={hiddenPoints} />
            </div>
          </details>
        ) : null}
      </div>
    </li>
  );
};

export const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  const hasPositions = (experience.positions?.length ?? 0) > 0;

  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-5 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-zinc-50">{experience.company}</h3>
          <p className="mt-1 text-sm text-zinc-400">{experience.duration}</p>
        </div>
        <p className="text-sm font-medium text-zinc-300">{experience.role}</p>
      </div>

      <p className="mt-4 text-sm leading-7 text-zinc-300">{experience.summary}</p>

      <div className="mt-5">
        <ExperienceMetrics experience={experience} />
      </div>

      {hasPositions ? (
        <ol className="relative mt-8 border-l border-zinc-700 pl-0">
          {experience.positions?.map((position, index) => (
            <TimelineNode
              key={`${position.role}-${position.duration}`}
              position={position}
              isLast={index === (experience.positions?.length ?? 0) - 1}
            />
          ))}
        </ol>
      ) : (
        <div className="mt-5">
          <ImpactPointList points={experience.impactPoints ?? []} />
        </div>
      )}

      <ul className="mt-6 space-y-2 border-t border-zinc-800 pt-5">
        {experience.achievements.map((achievement) => (
          <li key={achievement} className="flex gap-2 text-sm text-zinc-400">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-500/70" aria-hidden />
            <span>{achievement}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-xs leading-6 text-zinc-500">
        <span className="font-semibold uppercase tracking-wide text-zinc-400">Stack · </span>
        {experience.stack.join(" · ")}
      </p>
    </article>
  );
};
