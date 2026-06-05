"use client";

import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";
import { type Experience, type ExperiencePosition } from "@/entities/experience";
import { cn } from "@/shared/lib/utils";
import { Pill } from "@/shared/ui/pill";

type ExperienceCardProps = {
  experience: Experience;
};

const getPositionKey = (position: ExperiencePosition) =>
  `${position.role}-${position.duration}`;

const roleToggleButtonClassName =
  "inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-zinc-600 px-2.5 py-1 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400";

const roleToggleButtonGroupClassName =
  "inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-zinc-600 px-2.5 py-1 text-xs font-medium text-zinc-300 transition-colors group-hover:bg-zinc-800 group-hover:text-zinc-100";

const ImpactPointList = ({ points }: { points: string[] }) => (
  <ul className="space-y-1.5 text-sm leading-6 text-zinc-300">
    {points.map((point) => (
      <li key={point} className="flex gap-2">
        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-500" aria-hidden />
        <span>{point}</span>
      </li>
    ))}
  </ul>
);

const InlineMetrics = ({ experience }: { experience: Experience }) => (
  <ul className="mt-3 flex flex-wrap gap-2" aria-label="Key metrics">
    {experience.metrics.map((metric) => (
      <li key={metric.label}>
        <Pill className="px-3 py-1.5 text-xs font-medium text-zinc-300">
          {metric.value} {metric.label.toLowerCase()}
        </Pill>
      </li>
    ))}
  </ul>
);

type TimelineNodeProps = {
  position: ExperiencePosition;
  isLast: boolean;
  isExpanded: boolean;
  onToggle: () => void;
};

const TimelineNode = ({
  position,
  isLast,
  isExpanded,
  onToggle,
}: TimelineNodeProps) => {
  const isHighlighted = position.isCurrent || position.isPromotion;
  const summary =
    position.collapsedSummary ?? position.impactPoints[0] ?? position.scope ?? "";
  const canExpand = !position.isCompact && position.impactPoints.length > 0;

  return (
    <li className={cn("relative pl-7", isLast ? "pb-0" : "pb-4")}>
      <span
        className={cn(
          "absolute left-0 top-1.5 size-2.5 -translate-x-1/2 rounded-full ring-4 ring-zinc-900/90",
          isHighlighted ? "bg-emerald-500" : "bg-zinc-500",
        )}
        aria-hidden
      />

      {isExpanded && canExpand ? (
        <div>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-sm font-semibold text-zinc-50">{position.role}</h4>
              {position.isPromotion ? (
                <Pill className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                  Promotion
                </Pill>
              ) : null}
              {position.scope ? (
                <span className="text-xs text-zinc-500">· {position.scope}</span>
              ) : null}
            </div>
            <p className="shrink-0 text-xs text-zinc-500">{position.duration}</p>
          </div>

          <div className="mt-2">
            <ImpactPointList points={position.impactPoints} />
          </div>

          {!position.isCurrent ? (
            <button
              type="button"
              onClick={onToggle}
              aria-expanded
              className={cn("mt-3", roleToggleButtonClassName)}
            >
              Collapse role
              <ChevronUp className="size-3.5" aria-hidden />
            </button>
          ) : null}
        </div>
      ) : (
        <button
          type="button"
          onClick={canExpand ? onToggle : undefined}
          disabled={!canExpand}
          aria-expanded={false}
          className={cn(
            "group w-full text-left",
            canExpand && "cursor-pointer rounded-lg transition-colors",
            !canExpand && "cursor-default",
          )}
        >
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-200">{position.role}</p>
              <p className="mt-0.5 text-xs leading-5 text-zinc-500">{summary}</p>
            </div>
            <p className="shrink-0 text-xs text-zinc-500">{position.duration}</p>
          </div>
          {canExpand ? (
            <span className={cn("mt-3", roleToggleButtonGroupClassName)}>
              Expand role
              <ChevronDown className="size-3.5" aria-hidden />
            </span>
          ) : null}
        </button>
      )}
    </li>
  );
};

export const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  const positions = experience.positions ?? [];
  const defaultExpandedKeys = useMemo(
    () =>
      new Set(
        (experience.positions ?? [])
          .filter((position) => position.isCurrent)
          .map((position) => getPositionKey(position)),
      ),
    [experience.positions],
  );

  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(defaultExpandedKeys);
  const [showFullTimeline, setShowFullTimeline] = useState(false);

  const hasPositions = positions.length > 0;
  const collapsedCount = positions.filter((position) => {
    const key = getPositionKey(position);
    const isExpanded = showFullTimeline || expandedKeys.has(key);
    return !isExpanded || position.isCompact;
  }).length;

  const handleTogglePosition = (position: ExperiencePosition) => {
    const key = getPositionKey(position);

    setExpandedKeys((current) => {
      const next = new Set(current);

      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }

      return next;
    });
    setShowFullTimeline(false);
  };

  const handleExpandAll = () => {
    setShowFullTimeline(true);
    setExpandedKeys(new Set(positions.map((position) => getPositionKey(position))));
  };

  const handleCollapseAll = () => {
    setShowFullTimeline(false);
    setExpandedKeys(defaultExpandedKeys);
  };

  const isPositionExpanded = (position: ExperiencePosition) => {
    if (position.isCompact) {
      return false;
    }

    return showFullTimeline || expandedKeys.has(getPositionKey(position));
  };

  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-5 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-zinc-50">{experience.company}</h3>
          <p className="mt-1 text-sm text-zinc-400">{experience.duration}</p>
        </div>
        <p className="text-sm font-medium text-zinc-300">{experience.role}</p>
      </div>

      <p className="mt-3 text-sm leading-6 text-zinc-300">{experience.summary}</p>
      <InlineMetrics experience={experience} />

      {hasPositions ? (
        <div className="mt-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Career timeline
            </p>
            {collapsedCount > 0 ? (
              <button
                type="button"
                onClick={handleExpandAll}
                className="text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-200"
              >
                View full timeline
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCollapseAll}
                className="text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-200"
              >
                Show current role only
              </button>
            )}
          </div>

          <ol className="relative border-l border-zinc-700">
            {positions.map((position, index) => (
              <TimelineNode
                key={getPositionKey(position)}
                position={position}
                isLast={index === positions.length - 1}
                isExpanded={isPositionExpanded(position)}
                onToggle={() => handleTogglePosition(position)}
              />
            ))}
          </ol>
        </div>
      ) : (
        <div className="mt-5">
          <ImpactPointList points={experience.impactPoints ?? []} />
        </div>
      )}

      <p className="mt-5 text-xs text-zinc-500">
        Tech stack and proof points live in{" "}
        <Link
          href="#capabilities"
          className="font-medium text-zinc-300 underline-offset-2 transition-colors hover:text-zinc-100 hover:underline"
        >
          Capabilities
        </Link>
        .
      </p>
    </article>
  );
};
