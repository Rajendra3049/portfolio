"use client";

import {
  type Experience,
  type ExperiencePosition,
} from "@/entities/experience";
import {
  experienceDetailContainerVariants,
  experienceDetailHeadlineVariants,
  experienceDetailMetaVariants,
  experienceDetailPanelReducedVariants,
  experienceDetailSummaryVariants,
  experienceDetailTitleVariants,
  experienceImpactItemVariants,
  experienceImpactListVariants,
  experienceRailContainerVariants,
  experienceRailItemVariants,
  experienceRailReducedVariants,
  experienceReducedChildVariants,
  experienceResponsibilitiesLabelVariants,
  experienceShellReducedVariants,
  experienceShellVariants,
  getExperienceDetailPanelVariants,
} from "@/shared/lib/motion/experience-variants";
import { cn } from "@/shared/lib/utils";
import { Pill } from "@/shared/ui/pill";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

type ExperienceCardProps = {
  experiences: Experience[];
};

type FlattenedRole = ExperiencePosition & {
  id: string;
  company: string;
  companySummary: string;
  companyDuration: string;
  roleSummary: string;
};

const getLineFillScale = (activeIndex: number, total: number) => {
  if (total <= 1) {
    return 1;
  }
  return activeIndex / (total - 1);
};

const ImpactPointList = ({
  points,
  shouldReduceMotion,
}: {
  points: string[];
  shouldReduceMotion: boolean;
}) => {
  const listVariants = shouldReduceMotion
    ? experienceReducedChildVariants
    : experienceImpactListVariants;
  const itemVariants = shouldReduceMotion
    ? experienceReducedChildVariants
    : experienceImpactItemVariants;

  return (
    <motion.ul
      className="space-y-3 text-sm leading-7 text-zinc-300 sm:text-[15px]"
      initial="hidden"
      animate="visible"
      variants={listVariants}
    >
      {points.map((point) => (
        <motion.li key={point} variants={itemVariants} className="flex gap-2">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-500/80" aria-hidden />
          <span>{point}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
};

type RoleRailItemProps = {
  position: ExperiencePosition;
  company: string;
  isActive: boolean;
  onSelect: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  itemRef: (node: HTMLButtonElement | null) => void;
};

const RoleRailItem = ({
  position,
  company,
  isActive,
  onSelect,
  onKeyDown,
  itemRef,
}: RoleRailItemProps) => {
  return (
    <motion.button
      ref={itemRef}
      type="button"
      onClick={onSelect}
      onKeyDown={onKeyDown}
      aria-pressed={isActive}
      aria-label={`${position.role} at ${company}, ${position.duration}`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        "relative z-10 w-full cursor-pointer rounded-lg border px-3 py-3.5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400",
        isActive
          ? "border-emerald-500/50 text-zinc-100"
          : "border-zinc-800 bg-zinc-950/40 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/80",
      )}
    >
      {isActive ? (
        <motion.span
          layoutId="experience-active-role"
          className="absolute inset-0 rounded-lg border border-emerald-500/45 bg-emerald-500/10"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          aria-hidden
        />
      ) : null}

      <div className="relative flex flex-col gap-1.5">
        <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">{position.duration}</p>
        <p className="text-[15px] font-semibold leading-snug">{position.role}</p>
        <p className="text-sm leading-snug text-zinc-400">{company}</p>
      </div>
    </motion.button>
  );
};

const getDurationParts = (duration: string) => {
  const [, location] = duration.split("·").map((part) => part.trim());
  return { location };
};

const flattenExperiences = (experiences: Experience[]): FlattenedRole[] =>
  experiences.flatMap((experience) =>
    (experience.positions ?? []).map((position) => ({
      ...position,
      id: `${experience.company}-${position.role}-${position.duration}`,
      company: experience.company,
      companySummary: experience.summary,
      companyDuration: experience.duration,
      roleSummary: position.summary ?? experience.summary,
    })),
  );

export const ExperienceCard = ({ experiences }: ExperienceCardProps) => {
  const shouldReduceMotion = useReducedMotion();
  const roleRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const roles = flattenExperiences(experiences);
  const initialRoleIndex = roles.findIndex((role) => role.isCurrent);
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(() =>
    initialRoleIndex >= 0 ? initialRoleIndex : 0,
  );
  const [transitionDirection, setTransitionDirection] = useState(0);

  const selectedRole = roles[selectedRoleIndex];
  const showCompanyGroups = experiences.length > 1;
  const selectedLocation = selectedRole
    ? getDurationParts(selectedRole.companyDuration).location
    : undefined;
  const lineFillScale = getLineFillScale(selectedRoleIndex, roles.length);

  const shellVariants = shouldReduceMotion
    ? experienceShellReducedVariants
    : experienceShellVariants;
  const railContainerVariants = shouldReduceMotion
    ? experienceReducedChildVariants
    : experienceRailContainerVariants;
  const railItemVariants = shouldReduceMotion
    ? experienceRailReducedVariants
    : experienceRailItemVariants;
  const detailContainerVariants = shouldReduceMotion
    ? experienceReducedChildVariants
    : experienceDetailContainerVariants;
  const childVariants = shouldReduceMotion ? experienceReducedChildVariants : undefined;
  const detailPanelVariants = shouldReduceMotion
    ? experienceDetailPanelReducedVariants
    : getExperienceDetailPanelVariants(transitionDirection);

  const selectRole = (index: number) => {
    setTransitionDirection(index > selectedRoleIndex ? 1 : index < selectedRoleIndex ? -1 : 0);
    setSelectedRoleIndex(index);
  };

  const handleRoleKeyDown =
    (index: number) => (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
        return;
      }

      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex = (index + direction + roles.length) % roles.length;
      selectRole(nextIndex);
      roleRefs.current[nextIndex]?.focus();
    };

  if (roles.length === 0) {
    const fallbackExperience = experiences[0];
    if (!fallbackExperience) {
      return null;
    }

    return (
      <article className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-5 sm:p-6">
        <ImpactPointList
          points={fallbackExperience.impactPoints ?? []}
          shouldReduceMotion={shouldReduceMotion ?? false}
        />
      </article>
    );
  }

  return (
    <motion.article
      className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-5 sm:p-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={shellVariants}
    >
      <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="min-w-0">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Timeline
          </p>
          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={railContainerVariants}
          >
            {experiences.map((experience) => {
              const companyRoles = roles.filter((role) => role.company === experience.company);
              if (companyRoles.length === 0) {
                return null;
              }

              return (
                <div key={experience.company}>
                  {showCompanyGroups ? (
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                      {experience.company}
                    </p>
                  ) : null}
                  <ol className="relative flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
                    <div
                      className="pointer-events-none absolute bottom-3 left-[11px] top-3 hidden w-px overflow-hidden lg:block"
                      aria-hidden
                    >
                      <div className="h-full w-full bg-zinc-800" />
                      <motion.div
                        className="absolute inset-0 origin-top bg-emerald-500/75"
                        animate={{ scaleY: lineFillScale }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>

                    {companyRoles.map((role) => {
                      const currentIndex = roles.findIndex((item) => item.id === role.id);
                      const isActive = currentIndex === selectedRoleIndex;

                      return (
                        <motion.li
                          key={role.id}
                          variants={railItemVariants}
                          className="relative min-w-[220px] lg:min-w-0 lg:pl-6"
                        >
                          <motion.span
                            className={cn(
                              "absolute left-[7px] top-1/2 z-20 hidden size-2.5 -translate-y-1/2 rounded-full border-2 lg:block",
                              isActive
                                ? "border-emerald-400 bg-emerald-400"
                                : "border-zinc-600 bg-zinc-900",
                            )}
                            animate={
                              shouldReduceMotion
                                ? undefined
                                : isActive
                                  ? { scale: 1.15, boxShadow: "0 0 0 4px rgba(16,185,129,0.15)" }
                                  : { scale: 1, boxShadow: "0 0 0 0px rgba(16,185,129,0)" }
                            }
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            aria-hidden
                          />
                          <RoleRailItem
                            position={role}
                            company={experience.company}
                            isActive={isActive}
                            onSelect={() => selectRole(currentIndex)}
                            onKeyDown={handleRoleKeyDown(currentIndex)}
                            itemRef={(node) => {
                              roleRefs.current[currentIndex] = node;
                            }}
                          />
                        </motion.li>
                      );
                    })}
                  </ol>
                </div>
              );
            })}
          </motion.div>
        </aside>

        <div className="relative min-h-[280px] min-w-0 sm:min-h-[320px]">
          <AnimatePresence mode="wait" custom={transitionDirection} initial={false}>
            {selectedRole ? (
              <motion.section
                key={selectedRole.id}
                custom={transitionDirection}
                className="absolute inset-0 overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-950/45 p-4 sm:p-5"
                variants={detailPanelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={detailContainerVariants}
                >
                  <header className="border-b border-zinc-800 pb-5">
                    <motion.div
                      className="flex flex-wrap items-center gap-2"
                      variants={childVariants ?? experienceDetailTitleVariants}
                    >
                      <h4 className="text-base font-semibold text-zinc-50 sm:text-lg">
                        {selectedRole.role}
                      </h4>
                      {selectedRole.isCurrent ? (
                        <Pill className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                          Current
                        </Pill>
                      ) : null}
                      {selectedRole.isPromotion ? (
                        <Pill className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                          Promotion
                        </Pill>
                      ) : null}
                    </motion.div>

                    <div className="mt-3 space-y-3">
                      <motion.p
                        className="text-sm text-zinc-500"
                        variants={childVariants ?? experienceDetailMetaVariants}
                      >
                        {selectedRole.duration} · {selectedRole.company}
                        {selectedLocation ? ` · ${selectedLocation}` : ""}
                      </motion.p>

                      {selectedRole.headline ? (
                        <motion.p
                          className="border-l-2 border-emerald-500/50 pl-3 text-base font-medium leading-snug text-emerald-200/90"
                          variants={childVariants ?? experienceDetailHeadlineVariants}
                        >
                          {selectedRole.headline}
                        </motion.p>
                      ) : selectedRole.scope ? (
                        <motion.p
                          className="text-xs uppercase tracking-wide text-zinc-500"
                          variants={childVariants ?? experienceDetailHeadlineVariants}
                        >
                          Responsibility Area · {selectedRole.scope}
                        </motion.p>
                      ) : null}

                      <motion.p
                        className="text-sm leading-relaxed text-zinc-400"
                        variants={childVariants ?? experienceDetailSummaryVariants}
                      >
                        {selectedRole.roleSummary}
                      </motion.p>
                    </div>
                  </header>

                  <div className="mt-5">
                    <motion.p
                      className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500"
                      variants={childVariants ?? experienceResponsibilitiesLabelVariants}
                    >
                      Responsibilities
                    </motion.p>
                    <ImpactPointList
                      points={selectedRole.impactPoints}
                      shouldReduceMotion={shouldReduceMotion ?? false}
                    />
                  </div>
                </motion.div>
              </motion.section>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
};
