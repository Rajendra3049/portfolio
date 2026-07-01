"use client";

import { type RefObject, useEffect, useRef } from "react";
import {
  getPanelScrollTopForIndex,
  isPanelAtBottom,
  resolvePanelIndex,
} from "@/shared/lib/work-scroll";

type UseScrollPanelChainOptions = {
  itemCount: number;
  getItemNode: (index: number) => HTMLElement | null;
  scrollToIndex: (index: number, behavior?: ScrollBehavior) => void;
  prefersReducedMotion?: boolean;
  edgeThreshold?: number;
  minWidthPx?: number;
  /** Accumulated wheel delta required before advancing one card. */
  stepThresholdPx?: number;
  /** Minimum time between card advances to absorb trackpad momentum. */
  navigationCooldownMs?: number;
};

const DEFAULT_STEP_THRESHOLD_PX = 72;
const DEFAULT_NAVIGATION_COOLDOWN_MS = 520;

const wheelDeltaToPixels = (event: WheelEvent, viewportHeight: number) => {
  switch (event.deltaMode) {
    case WheelEvent.DOM_DELTA_LINE:
      return event.deltaY * 16;
    case WheelEvent.DOM_DELTA_PAGE:
      return event.deltaY * viewportHeight;
    default:
      return event.deltaY;
  }
};

export const useScrollPanelChain = (
  containerRef: RefObject<HTMLElement | null>,
  {
    itemCount,
    getItemNode,
    scrollToIndex,
    prefersReducedMotion = false,
    edgeThreshold = 16,
    minWidthPx = 1024,
    stepThresholdPx = DEFAULT_STEP_THRESHOLD_PX,
    navigationCooldownMs = DEFAULT_NAVIGATION_COOLDOWN_MS,
  }: UseScrollPanelChainOptions,
) => {
  const getItemNodeRef = useRef(getItemNode);
  const scrollToIndexRef = useRef(scrollToIndex);
  const prefersReducedMotionRef = useRef(prefersReducedMotion);

  getItemNodeRef.current = getItemNode;
  scrollToIndexRef.current = scrollToIndex;
  prefersReducedMotionRef.current = prefersReducedMotion;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || itemCount === 0) {
      return;
    }

    const mediaQuery = window.matchMedia(`(min-width: ${minWidthPx}px)`);
    let accumulatedDelta = 0;
    let isNavigating = false;
    let cooldownUntil = 0;
    let cooldownTimer: ReturnType<typeof setTimeout> | undefined;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;

    const readItemNode = (index: number) => getItemNodeRef.current(index);

    const releaseNavigationLock = () => {
      isNavigating = false;
      accumulatedDelta = 0;
    };

    const scheduleCooldownRelease = () => {
      if (cooldownTimer) {
        clearTimeout(cooldownTimer);
      }
      cooldownTimer = setTimeout(releaseNavigationLock, navigationCooldownMs);
    };

    const alignToNearestPanel = (behavior: ScrollBehavior = "smooth") => {
      if (!mediaQuery.matches || isNavigating) {
        return;
      }

      const currentIndex = resolvePanelIndex(container, itemCount, readItemNode, edgeThreshold);

      scrollToIndexRef.current(
        currentIndex,
        prefersReducedMotionRef.current ? "auto" : behavior,
      );
    };

    const advancePanel = (direction: 1 | -1) => {
      const now = Date.now();
      if (isNavigating || now < cooldownUntil) {
        return;
      }

      const currentIndex = resolvePanelIndex(container, itemCount, readItemNode, edgeThreshold);
      const nextIndex = Math.min(itemCount - 1, Math.max(0, currentIndex + direction));

      if (nextIndex === currentIndex) {
        accumulatedDelta = 0;
        return;
      }

      isNavigating = true;
      cooldownUntil = now + navigationCooldownMs;
      accumulatedDelta = 0;

      scrollToIndexRef.current(
        nextIndex,
        prefersReducedMotionRef.current ? "auto" : "smooth",
      );

      scheduleCooldownRelease();
    };

    const handleWheel = (event: WheelEvent) => {
      if (!mediaQuery.matches) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Node) || !container.contains(target)) {
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = container;
      const atTop = scrollTop <= edgeThreshold;
      const atBottom = scrollTop + clientHeight >= scrollHeight - edgeThreshold;
      const scrollingUp = event.deltaY < 0;
      const scrollingDown = event.deltaY > 0;

      if ((scrollingUp && atTop) || (scrollingDown && atBottom)) {
        event.preventDefault();
        window.scrollBy({
          top: event.deltaY,
          left: event.deltaX,
          behavior: "auto",
        });
        return;
      }

      // Transformed card surfaces block native wheel scroll; drive one card per gesture.
      event.preventDefault();

      const deltaPx = wheelDeltaToPixels(event, clientHeight);

      if (
        accumulatedDelta !== 0 &&
        Math.sign(accumulatedDelta) !== Math.sign(deltaPx)
      ) {
        accumulatedDelta = 0;
      }

      accumulatedDelta += deltaPx;

      if (Math.abs(accumulatedDelta) < stepThresholdPx) {
        return;
      }

      advancePanel(accumulatedDelta > 0 ? 1 : -1);
    };

    const maybeAlignAfterSettle = () => {
      if (!mediaQuery.matches || isNavigating) {
        return;
      }

      // Bottom position is valid for the last card — never pull back to the previous one.
      if (isPanelAtBottom(container, edgeThreshold)) {
        return;
      }

      const currentIndex = resolvePanelIndex(container, itemCount, readItemNode, edgeThreshold);
      const targetTop = getPanelScrollTopForIndex(
        container,
        currentIndex,
        itemCount,
        readItemNode,
      );

      if (Math.abs(container.scrollTop - targetTop) > 6) {
        alignToNearestPanel(prefersReducedMotionRef.current ? "auto" : "smooth");
      }
    };

    const handleScrollEnd = () => {
      if (!mediaQuery.matches) {
        return;
      }

      if (isNavigating) {
        releaseNavigationLock();
        return;
      }

      maybeAlignAfterSettle();
    };

    const handleScrollSettle = () => {
      if (settleTimer) {
        clearTimeout(settleTimer);
      }

      settleTimer = setTimeout(maybeAlignAfterSettle, 140);
    };

    document.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    container.addEventListener("scrollend", handleScrollEnd);
    container.addEventListener("scroll", handleScrollSettle, { passive: true });

    return () => {
      document.removeEventListener("wheel", handleWheel, { capture: true });
      container.removeEventListener("scrollend", handleScrollEnd);
      container.removeEventListener("scroll", handleScrollSettle);
      if (cooldownTimer) {
        clearTimeout(cooldownTimer);
      }
      if (settleTimer) {
        clearTimeout(settleTimer);
      }
    };
  }, [
    containerRef,
    edgeThreshold,
    itemCount,
    minWidthPx,
    navigationCooldownMs,
    stepThresholdPx,
  ]);
};
