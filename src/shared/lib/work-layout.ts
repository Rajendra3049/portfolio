/** Shared viewport sizing for the desktop project scroll reel. */
export const workPanelViewportMinClass = "lg:min-h-[min(58vh,520px)]";
export const workPanelViewportMaxClass = "lg:max-h-[min(72vh,680px)]";
export const workPanelViewportClasses = `${workPanelViewportMinClass} ${workPanelViewportMaxClass}`;

/** Minimum snap-panel height — matches the scroll viewport min, not percentage-based. */
export const workChapterPanelMinClass = workPanelViewportMinClass;
