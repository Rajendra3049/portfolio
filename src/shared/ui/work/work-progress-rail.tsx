"use client";

import { type Project } from "@/entities/project";
import { cn } from "@/shared/lib/utils";

type WorkProgressRailProps = {
  projects: Project[];
  activeIndex: number;
  onHighlight: (index: number) => void;
  onJump: (index: number) => void;
  orientation?: "vertical" | "horizontal";
  fillHeight?: boolean;
};

const formatChapterNumber = (index: number) => String(index + 1).padStart(2, "0");

const BUTTON_SIZE_PX = 40;
const BUTTON_GAP_PX = 20;

const getLineFillScale = (activeIndex: number, total: number) => {
  if (total <= 1) {
    return 1;
  }
  return activeIndex / (total - 1);
};

export const WorkProgressRail = ({
  projects,
  activeIndex,
  onHighlight,
  onJump,
  orientation = "vertical",
  fillHeight = false,
}: WorkProgressRailProps) => {
  const isVertical = orientation === "vertical";
  const fillScale = getLineFillScale(activeIndex, projects.length);

  if (!isVertical) {
    return (
      <nav aria-label="Project chapters" className="mb-6 lg:hidden">
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {projects.map((project, index) => (
            <ChapterButton
              key={project.slug}
              project={project}
              index={index}
              total={projects.length}
              isActive={index === activeIndex}
              onHighlight={onHighlight}
              onJump={onJump}
              layout="horizontal"
            />
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav
      aria-label="Project chapters"
      className={cn("hidden lg:block", fillHeight && "h-full min-h-0")}
    >
      <div className="pr-1">
        <div
          className={cn(
            "relative flex flex-col",
            fillHeight ? "h-full justify-between" : "",
          )}
          style={fillHeight ? undefined : { gap: `${BUTTON_GAP_PX}px` }}
        >
          <div
            className="pointer-events-none absolute left-5 overflow-hidden"
            style={{
              top: `${BUTTON_SIZE_PX / 2}px`,
              bottom: `${BUTTON_SIZE_PX / 2}px`,
              width: "1px",
            }}
            aria-hidden
          >
            <div className="h-full w-full bg-zinc-800" />
            <div
              className="absolute inset-0 origin-top bg-emerald-500/75 transition-transform duration-500 ease-out"
              style={{ transform: `scaleY(${fillScale})` }}
            />
          </div>

          {projects.map((project, index) => (
            <ChapterButton
              key={project.slug}
              project={project}
              index={index}
              total={projects.length}
              isActive={index === activeIndex}
              onHighlight={onHighlight}
              onJump={onJump}
              layout="vertical"
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

type ChapterButtonProps = {
  project: Project;
  index: number;
  total: number;
  isActive: boolean;
  onHighlight: (index: number) => void;
  onJump: (index: number) => void;
  layout: "vertical" | "horizontal";
};

const ChapterButton = ({
  project,
  index,
  total,
  isActive,
  onHighlight,
  onJump,
  layout,
}: ChapterButtonProps) => {
  const label = formatChapterNumber(index);

  if (layout === "horizontal") {
    return (
      <button
        type="button"
        onClick={() => onJump(index)}
        onMouseEnter={() => onHighlight(index)}
        onFocus={() => onHighlight(index)}
        aria-current={isActive ? "true" : undefined}
        aria-label={`Go to ${project.title}, project ${index + 1} of ${total}`}
        className={cn(
          "shrink-0 cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold tracking-widest transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400",
          isActive
            ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/40"
            : "bg-zinc-900/80 text-zinc-500 hover:text-zinc-300",
        )}
      >
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onJump(index)}
      onMouseEnter={() => onHighlight(index)}
      onFocus={() => onHighlight(index)}
      aria-current={isActive ? "true" : undefined}
      aria-label={`Go to ${project.title}, project ${index + 1} of ${total}`}
      className={cn(
        "group relative z-10 flex w-full cursor-pointer items-center gap-3 rounded-xl py-1 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400",
        isActive ? "opacity-100" : "opacity-80 hover:opacity-100",
      )}
    >
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold tracking-widest transition-colors",
          isActive
            ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/45"
            : "bg-zinc-950/90 text-zinc-500 ring-1 ring-zinc-800 group-hover:text-zinc-300",
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "min-w-0 text-sm font-medium leading-snug transition-colors",
          isActive ? "text-zinc-100" : "text-zinc-500 group-hover:text-zinc-300",
        )}
      >
        {project.title}
      </span>
    </button>
  );
};
