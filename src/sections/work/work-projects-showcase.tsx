"use client";

import { useReducedMotion } from "framer-motion";
import { type Project } from "@/entities/project";
import { useScrollPanelChain } from "@/shared/hooks/use-scroll-panel-chain";
import { useScrollSpy } from "@/shared/hooks/use-scroll-spy";
import { workPanelViewportClasses } from "@/shared/lib/work-layout";
import { cn } from "@/shared/lib/utils";
import { ProjectChapter } from "@/shared/ui/work/project-chapter";
import { WorkProgressRail } from "@/shared/ui/work/work-progress-rail";

type WorkProjectsShowcaseProps = {
  projects: Project[];
};

export const WorkProjectsShowcase = ({ projects }: WorkProjectsShowcaseProps) => {
  const shouldReduceMotion = useReducedMotion();
  const { activeIndex, setActiveIndex, scrollContainerRef, setItemRef, getItemNode, scrollToIndex } =
    useScrollSpy({
      itemCount: projects.length,
    });

  const handleJump = (index: number) => {
    scrollToIndex(index, shouldReduceMotion ? "auto" : "smooth");
  };

  useScrollPanelChain(scrollContainerRef, {
    itemCount: projects.length,
    getItemNode,
    scrollToIndex,
    prefersReducedMotion: shouldReduceMotion ?? false,
  });

  return (
    <div className="relative">
      <WorkProgressRail
        projects={projects}
        activeIndex={activeIndex}
        onHighlight={setActiveIndex}
        onJump={handleJump}
        orientation="horizontal"
      />

      <p className="mb-5 hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 lg:block">
        Projects
      </p>

      <div className="lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:items-start lg:gap-8 xl:grid-cols-[14rem_minmax(0,1fr)] xl:gap-10">
        <aside
          className={cn(
            "hidden lg:sticky lg:top-28 lg:flex lg:min-h-0 lg:flex-col",
            workPanelViewportClasses,
          )}
        >
          <WorkProgressRail
            projects={projects}
            activeIndex={activeIndex}
            onHighlight={setActiveIndex}
            onJump={handleJump}
            orientation="vertical"
            fillHeight
          />
        </aside>

        <div
          ref={scrollContainerRef}
          className={cn(
            "work-panel-scroll min-w-0 overscroll-y-auto",
            "lg:overflow-y-auto",
            workPanelViewportClasses,
          )}
          aria-label="Project showcase scroll area"
        >
          {projects.map((project, index) => (
            <ProjectChapter
              key={project.slug}
              project={project}
              index={index}
              total={projects.length}
              contained
              chapterRef={setItemRef(index)}
              onActivate={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
