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
  experienceDetailSectionItemVariants,
  experienceDetailSectionVariants,
  experienceDetailSummaryVariants,
  experienceDetailTitleVariants,
  experienceImpactItemVariants,
  experienceImpactListVariants,
  experienceLayoutSpring,
  experienceMetricGridVariants,
  experienceMetricItemVariants,
  experienceRailContainerVariants,
  experienceRailItemVariants,
  experienceRailReducedVariants,
  experienceReducedChildVariants,
  experienceShellReducedVariants,
  experienceShellVariants,
  experienceSpring,
  experienceTechItemVariants,
  experienceTechListVariants,
  getExperienceDetailPanelVariants,
} from "@/shared/lib/motion/experience-variants";
import { cn } from "@/shared/lib/utils";
import { Pill } from "@/shared/ui/pill";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useRef, useState, type ReactNode } from "react";

type ExperienceCardProps = {
  experiences: Experience[];
};

type FlattenedRole = ExperiencePosition & {
  id: string;
  company: string;
  companySummary: string;
  companyDuration: string;
  roleSummary: string;
  parentExperience: Experience;
};

const getLineFillScale = (activeIndex: number, total: number) => {
  if (total <= 1) {
    return 1;
  }
  return activeIndex / (total - 1);
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
      parentExperience: experience,
    })),
  );

type DetailSectionProps = {
  title: string;
  children: ReactNode;
  shouldReduceMotion: boolean;
};

const DetailSection = ({ title, children, shouldReduceMotion }: DetailSectionProps) => {
  const sectionVariants = shouldReduceMotion
    ? experienceReducedChildVariants
    : experienceDetailSectionVariants;
  const itemVariants = shouldReduceMotion
    ? experienceReducedChildVariants
    : experienceDetailSectionItemVariants;

  return (
    <motion.section variants={sectionVariants} initial="hidden" animate="visible">
      <motion.h5
        className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500"
        variants={itemVariants}
      >
        {title}
      </motion.h5>
      <motion.div variants={itemVariants}>{children}</motion.div>
    </motion.section>
  );
};

type ResponsibilityListProps = {
  points: string[];
  shouldReduceMotion: boolean;
};

const ResponsibilityList = ({ points, shouldReduceMotion }: ResponsibilityListProps) => {
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
        <motion.li key={point} variants={itemVariants} className="flex gap-2.5">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-500/80" aria-hidden />
          <span>{point}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
};

type RoleDetailPanelProps = {
  role: FlattenedRole;
  transitionDirection: number;
  shouldReduceMotion: boolean;
  selectedLocation?: string;
};

const RoleDetailPanel = ({
  role,
  transitionDirection,
  shouldReduceMotion,
  selectedLocation,
}: RoleDetailPanelProps) => {
  const childVariants = shouldReduceMotion ? experienceReducedChildVariants : undefined;
  const detailContainerVariants = shouldReduceMotion
    ? experienceReducedChildVariants
    : experienceDetailContainerVariants;
  const detailPanelVariants = shouldReduceMotion
    ? experienceDetailPanelReducedVariants
    : getExperienceDetailPanelVariants(transitionDirection);

  const metrics = role.metrics ?? [];
  const technologies = role.tools ?? role.parentExperience.stack.slice(0, 8);

  const metricVariants = shouldReduceMotion
    ? experienceReducedChildVariants
    : experienceMetricGridVariants;
  const metricItemVariants = shouldReduceMotion
    ? experienceReducedChildVariants
    : experienceMetricItemVariants;
  const techVariants = shouldReduceMotion
    ? experienceReducedChildVariants
    : experienceTechListVariants;
  const techItemVariants = shouldReduceMotion
    ? experienceReducedChildVariants
    : experienceTechItemVariants;

  return (
    <motion.section
      custom={transitionDirection}
      layout
      className="rounded-xl border border-zinc-800 bg-zinc-950/45 p-4 sm:p-5"
      variants={detailPanelVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      aria-live="polite"
      aria-atomic="true"
    >
      <motion.div initial="hidden" animate="visible" variants={detailContainerVariants}>
        <header className="border-b border-zinc-800 pb-5">
          <motion.div
            className="flex flex-wrap items-center gap-2"
            variants={childVariants ?? experienceDetailTitleVariants}
          >
            <h4 className="text-base font-semibold text-zinc-50 sm:text-lg">{role.role}</h4>
            {role.isCurrent ? (
              <Pill className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                Current
              </Pill>
            ) : null}
            {role.isPromotion ? (
              <Pill className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                Promotion
              </Pill>
            ) : null}
          </motion.div>

          <motion.p
            className="mt-3 text-sm text-zinc-500"
            variants={childVariants ?? experienceDetailMetaVariants}
          >
            {role.duration} · {role.company}
            {selectedLocation ? ` · ${selectedLocation}` : ""}
          </motion.p>
        </header>

        <div className="mt-6 flex flex-col gap-6 sm:gap-7">
          <DetailSection title="Role Summary" shouldReduceMotion={shouldReduceMotion ?? false}>
            {role.headline ? (
              <p className="border-l-2 border-emerald-500/50 pl-3 text-base font-medium leading-snug text-emerald-200/90">
                {role.headline}
              </p>
            ) : role.scope ? (
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Responsibility Area · {role.scope}
              </p>
            ) : null}
            <motion.p
              className={cn(
                "text-sm leading-relaxed text-zinc-400",
                role.headline || role.scope ? "mt-3" : undefined,
              )}
              variants={childVariants ?? experienceDetailSummaryVariants}
            >
              {role.roleSummary}
            </motion.p>
          </DetailSection>

          <DetailSection
            title="Key Responsibilities"
            shouldReduceMotion={shouldReduceMotion ?? false}
          >
            <ResponsibilityList
              points={role.impactPoints}
              shouldReduceMotion={shouldReduceMotion ?? false}
            />
          </DetailSection>

          {metrics.length > 0 ? (
            <DetailSection title="Impact Metrics" shouldReduceMotion={shouldReduceMotion ?? false}>
              <motion.dl
                className="grid gap-3 sm:grid-cols-3"
                initial="hidden"
                animate="visible"
                variants={metricVariants}
              >
                {metrics.map((metric) => (
                  <motion.div
                    key={metric.label}
                    variants={metricItemVariants}
                    className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-3"
                  >
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                      {metric.label}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-zinc-100">{metric.value}</dd>
                  </motion.div>
                ))}
              </motion.dl>
            </DetailSection>
          ) : null}

          {technologies.length > 0 ? (
            <DetailSection
              title="Technologies Used"
              shouldReduceMotion={shouldReduceMotion ?? false}
            >
              <motion.ul
                className="flex flex-wrap gap-2"
                initial="hidden"
                animate="visible"
                variants={techVariants}
              >
                {technologies.map((tech) => (
                  <motion.li key={tech} variants={techItemVariants}>
                    <Pill className="text-[11px]">{tech}</Pill>
                  </motion.li>
                ))}
              </motion.ul>
            </DetailSection>
          ) : null}
        </div>
      </motion.div>
    </motion.section>
  );
};

type RoleRailItemProps = {
  position: ExperiencePosition;
  company: string;
  isActive: boolean;
  onSelect: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  itemRef: (node: HTMLButtonElement | null) => void;
  shouldReduceMotion: boolean;
};

const RoleRailItem = ({
  position,
  company,
  isActive,
  onSelect,
  onKeyDown,
  itemRef,
  shouldReduceMotion,
}: RoleRailItemProps) => {
  return (
    <motion.button
      ref={itemRef}
      type="button"
      onClick={onSelect}
      onKeyDown={onKeyDown}
      aria-pressed={isActive}
      role="tab"
      aria-selected={isActive}
      aria-label={`${position.role} at ${company}, ${position.duration}`}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
      transition={experienceSpring}
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
          transition={experienceSpring}
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

  const selectRole = (index: number) => {
    setTransitionDirection(index > selectedRoleIndex ? 1 : index < selectedRoleIndex ? -1 : 0);
    setSelectedRoleIndex(index);
  };

  const handleRoleKeyDown =
    (index: number) => (event: React.KeyboardEvent<HTMLButtonElement>) => {
      let nextIndex: number | null = null;

      if (event.key === "ArrowDown") {
        nextIndex = (index + 1) % roles.length;
      } else if (event.key === "ArrowUp") {
        nextIndex = (index - 1 + roles.length) % roles.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = roles.length - 1;
      }

      if (nextIndex === null) {
        return;
      }

      event.preventDefault();
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
        <ResponsibilityList
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
      <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start lg:gap-8">
        <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
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
                  <ol
                    className="relative flex gap-2 overflow-x-auto pb-1 scrollbar-none lg:flex-col lg:overflow-visible"
                    role="tablist"
                    aria-label={`${experience.company} roles`}
                  >
                    <div
                      className="pointer-events-none absolute bottom-3 left-[11px] top-3 hidden w-px overflow-hidden lg:block"
                      aria-hidden
                    >
                      <div className="h-full w-full bg-zinc-800" />
                      <motion.div
                        className="absolute inset-0 origin-top bg-emerald-500/75"
                        animate={{ scaleY: lineFillScale }}
                        transition={shouldReduceMotion ? { duration: 0 } : experienceSpring}
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
                          role="presentation"
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
                                  ? { scale: 1.2, boxShadow: "0 0 0 4px rgba(16,185,129,0.18)" }
                                  : { scale: 1, boxShadow: "0 0 0 0px rgba(16,185,129,0)" }
                            }
                            transition={experienceSpring}
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
                            shouldReduceMotion={shouldReduceMotion ?? false}
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

        <LayoutGroup>
          <motion.div
            layout
            transition={shouldReduceMotion ? { duration: 0 } : experienceLayoutSpring}
            className="relative min-w-0"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {selectedRole ? (
                <RoleDetailPanel
                  key={selectedRole.id}
                  role={selectedRole}
                  transitionDirection={transitionDirection}
                  shouldReduceMotion={shouldReduceMotion ?? false}
                  selectedLocation={selectedLocation}
                />
              ) : null}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </motion.article>
  );
};
