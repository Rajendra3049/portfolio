"use client";

import { type Project } from "@/entities/project";
import { useSpringTilt } from "@/shared/hooks/use-spring-tilt";
import {
    chapterContainerVariants,
    chapterImageReducedVariants,
    chapterReducedChildVariants,
    chapterShellReducedVariants,
    chapterShellVariants,
    getChapterImageVariants,
} from "@/shared/lib/motion/work-variants";
import { workChapterPanelMinClass } from "@/shared/lib/work-layout";
import { cn } from "@/shared/lib/utils";
import { ProjectChapterContent } from "@/shared/ui/work/project-chapter-content";
import { ProjectChapterImage } from "@/shared/ui/work/project-chapter-image";
import {
    motion,
    useMotionTemplate,
    useReducedMotion,
    useTransform,
} from "framer-motion";
import { useState } from "react";

type ProjectChapterProps = {
  project: Project;
  index: number;
  total: number;
  contained?: boolean;
  chapterRef?: (node: HTMLElement | null) => void;
  onActivate?: () => void;
};

const formatChapterNumber = (index: number) => String(index + 1).padStart(2, "0");

export const ProjectChapter = ({
  project,
  index,
  total,
  contained = false,
  chapterRef,
  onActivate,
}: ProjectChapterProps) => {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const isReversed = index % 2 === 1;
  const chapterNumber = formatChapterNumber(index);
  const titleId = `project-chapter-${project.slug}-title`;

  const {
    rotateX,
    rotateY,
    glareX,
    glareY,
    onMouseMove,
    onMouseLeave,
    disabled: tiltDisabled,
  } = useSpringTilt({ maxRotationDeg: 3 });

  const parallaxX = useTransform(rotateY, (value) => value * 0.6);
  const parallaxY = useTransform(rotateX, (value) => -value * 0.6);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.14), transparent 42%)`;

  const shellVariants = shouldReduceMotion ? chapterShellReducedVariants : chapterShellVariants;
  const imageVariants = shouldReduceMotion || contained
    ? chapterImageReducedVariants
    : getChapterImageVariants(!isReversed);

  return (
    <motion.article
      ref={chapterRef}
      id={`project-chapter-${project.slug}`}
      aria-labelledby={titleId}
      className={cn(
        contained
          ? cn(
              "box-border px-0 py-3 lg:shrink-0 lg:py-0 lg:pb-6 lg:last:pb-0",
              workChapterPanelMinClass,
            )
          : "scroll-mt-28 py-8 sm:py-10 lg:py-14",
      )}
      initial={contained ? "visible" : "hidden"}
      whileInView={contained ? undefined : "visible"}
      viewport={contained ? undefined : { once: true, amount: 0.25 }}
      variants={chapterContainerVariants}
      onMouseEnter={() => {
        setIsHovered(true);
        onActivate?.();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onMouseLeave();
      }}
    >
      <motion.div
        className={cn(
          "group/chapter relative isolate flex w-full min-w-0 flex-col rounded-3xl border border-zinc-800/90 bg-zinc-900/50 p-4 sm:p-5 lg:p-6",
          isHovered && "border-zinc-700/90",
        )}
        variants={shellVariants}
        style={
          tiltDisabled
            ? undefined
            : {
                rotateX,
                rotateY,
                transformPerspective: 1400,
                willChange: "transform",
              }
        }
        onMouseMove={onMouseMove}
      >
        {!tiltDisabled ? (
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 rounded-3xl opacity-0 transition-opacity duration-300 group-hover/chapter:opacity-100"
            style={{ background: glareBackground }}
            aria-hidden
          />
        ) : null}

        {!tiltDisabled && isHovered ? (
          <span
            className="pointer-events-none absolute -inset-px z-0 overflow-clip rounded-3xl opacity-70"
            aria-hidden
          >
            <span className="block size-full animate-spin rounded-3xl bg-[conic-gradient(from_0deg,transparent,rgba(16,185,129,0.35),transparent)] [animation-duration:4s]" />
          </span>
        ) : null}

        <div
          className={cn(
            "relative z-20 grid w-full min-w-0 items-start gap-6 lg:grid-cols-2 lg:gap-8",
            isReversed && "lg:[&>*:first-child]:order-2",
          )}
        >
          <motion.div className="min-w-0" variants={imageVariants}>
            <ProjectChapterImage
              title={project.title}
              coverImage={project.coverImage}
              isReversed={isReversed}
              isHovered={isHovered}
              contained={contained}
              parallaxX={tiltDisabled ? undefined : parallaxX}
              parallaxY={tiltDisabled ? undefined : parallaxY}
            />
          </motion.div>

          <motion.div
            className="min-w-0"
            variants={shouldReduceMotion ? chapterReducedChildVariants : undefined}
          >
            <ProjectChapterContent
              project={project}
              chapterNumber={chapterNumber}
              titleId={titleId}
              isHovered={isHovered}
            />
          </motion.div>
        </div>

        <p className="sr-only">
          Project {index + 1} of {total}: {project.title}
        </p>
      </motion.div>
    </motion.article>
  );
};
