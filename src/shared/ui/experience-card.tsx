"use client";

import {
  type Experience,
  type ExperiencePosition,
} from "@/entities/experience";
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

const ImpactPointList = ({ points }: { points: string[] }) => (
  <ul className="space-y-2 text-sm leading-6 text-zinc-300">
    {points.map((point) => (
      <li key={point} className="flex gap-2">
        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-500/80" aria-hidden />
        <span>{point}</span>
      </li>
    ))}
  </ul>
);

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
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      ref={itemRef}
      type="button"
      onClick={onSelect}
      onKeyDown={onKeyDown}
      aria-pressed={isActive}
      aria-label={`${position.role} at ${company}, ${position.duration}`}
      animate={
        shouldReduceMotion
          ? undefined
          : isActive
            ? { scale: 1.01, boxShadow: "0 0 0 1px rgba(16,185,129,0.35)" }
            : { scale: 1, boxShadow: "0 0 0 0px rgba(16,185,129,0)" }
      }
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`relative z-10 w-full cursor-pointer rounded-lg border px-3 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 ${
        isActive
          ? "border-emerald-500/50 bg-emerald-500/10 text-zinc-100"
          : "border-zinc-800 bg-zinc-950/40 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/80"
      }`}
    >
      <div className="flex flex-col gap-1.5">
        <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">{position.duration}</p>
        <p className="text-[15px] font-semibold leading-tight">{position.role}</p>
        <p className="text-sm leading-tight text-zinc-400">{company}</p>
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

  const selectedRole = roles[selectedRoleIndex];
  const showCompanyGroups = experiences.length > 1;
  const selectedLocation = selectedRole
    ? getDurationParts(selectedRole.companyDuration).location
    : undefined;

  const handleRoleKeyDown =
    (index: number) => (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
        return;
      }

      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex = (index + direction + roles.length) % roles.length;
      setSelectedRoleIndex(nextIndex);
      roleRefs.current[nextIndex]?.focus();
    };

  const detailTransition = shouldReduceMotion
    ? { duration: 0.15, ease: "easeOut" as const }
    : { duration: 0.28, ease: "easeOut" as const };

  const detailInitial = shouldReduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 10, scale: 0.995 };

  const detailAnimate = shouldReduceMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, scale: 1 };

  const detailExit = shouldReduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y: -8, scale: 0.995 };

  if (roles.length === 0) {
    const fallbackExperience = experiences[0];
    if (!fallbackExperience) {
      return null;
    }

    return (
      <article className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-5 sm:p-6">
        <ImpactPointList points={fallbackExperience.impactPoints ?? []} />
      </article>
    );
  }

  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-5 sm:p-6">
      <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="min-w-0">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Timeline
          </p>
          <div className="space-y-4">
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
                    <span
                      className="pointer-events-none absolute bottom-3 left-[11px] top-3 hidden w-px bg-linear-to-b from-zinc-700 via-zinc-800 to-zinc-700 lg:block"
                      aria-hidden
                    />
                    {companyRoles.map((role) => {
                      const currentIndex = roles.findIndex((item) => item.id === role.id);
                      const isActive = currentIndex === selectedRoleIndex;

                      return (
                        <li
                          key={role.id}
                          className="relative min-w-[220px] lg:min-w-0 lg:pl-6"
                        >
                          <span
                            className={`absolute left-[7px] top-1/2 z-20 hidden size-2.5 -translate-y-1/2 rounded-full border-2 lg:block ${
                              isActive
                                ? "border-emerald-400 bg-emerald-400"
                                : "border-zinc-600 bg-zinc-900"
                            }`}
                            aria-hidden
                          />
                          <RoleRailItem
                            position={role}
                            company={experience.company}
                            isActive={isActive}
                            onSelect={() => setSelectedRoleIndex(currentIndex)}
                            onKeyDown={handleRoleKeyDown(currentIndex)}
                            itemRef={(node) => {
                              roleRefs.current[currentIndex] = node;
                            }}
                          />
                        </li>
                      );
                    })}
                  </ol>
                </div>
              );
            })}
          </div>
        </aside>

        <AnimatePresence mode="wait" initial={false}>
          {selectedRole ? (
            <motion.section
              key={selectedRole.id}
              className="min-w-0 rounded-xl border border-zinc-800 bg-zinc-950/45 p-4 sm:p-5"
              initial={detailInitial}
              animate={detailAnimate}
              exit={detailExit}
              transition={detailTransition}
            >
              <header className="border-b border-zinc-800 pb-4">
                <div className="flex flex-wrap items-center gap-2">
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
                </div>
                <p className="mt-1 text-sm text-zinc-500">
                  {selectedRole.duration} · {selectedRole.company}
                  {selectedLocation ? ` · ${selectedLocation}` : ""}
                </p>
                <p className="mt-2 text-sm text-zinc-300">{selectedRole.roleSummary}</p>
                {selectedRole.headline ? (
                  <p className="mt-2 text-sm font-medium text-emerald-200/90">
                    {selectedRole.headline}
                  </p>
                ) : selectedRole.scope ? (
                  <p className="mt-2 text-xs uppercase tracking-wide text-zinc-500">
                    Responsibility Area · {selectedRole.scope}
                  </p>
                ) : null}
              </header>

              <div className="mt-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  Responsibilities
                </p>
                <ImpactPointList points={selectedRole.impactPoints} />
              </div>
            </motion.section>
          ) : null}
        </AnimatePresence>
      </div>
    </article>
  );
};
