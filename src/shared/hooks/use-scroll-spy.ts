"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  getPanelScrollTopForIndex,
  isPanelAtBottom,
  resolvePanelIndex,
} from "@/shared/lib/work-scroll";

type UseScrollSpyOptions = {
  itemCount: number;
  rootMargin?: string;
  threshold?: number | number[];
};

const DEFAULT_THRESHOLD: number[] = [0, 0.35, 0.5, 0.65, 1];
const NAVIGATION_LOCK_RELEASE_PX = 12;
const NAVIGATION_LOCK_TIMEOUT_MS = 900;

const isPanelScrollActive = (container: HTMLElement | null) => {
  if (!container) {
    return false;
  }
  return window.matchMedia("(min-width: 1024px)").matches;
};

export const useScrollSpy = ({
  itemCount,
  rootMargin = "0px",
  threshold = DEFAULT_THRESHOLD,
}: UseScrollSpyOptions) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const ratiosRef = useRef<number[]>([]);
  const navigationLockRef = useRef<number | null>(null);
  const navigationLockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const clearNavigationLockTimer = useCallback(() => {
    if (navigationLockTimerRef.current) {
      clearTimeout(navigationLockTimerRef.current);
      navigationLockTimerRef.current = null;
    }
  }, []);

  const releaseNavigationLock = useCallback(() => {
    navigationLockRef.current = null;
    clearNavigationLockTimer();
  }, [clearNavigationLockTimer]);

  const tryReleaseNavigationLock = useCallback(() => {
    const lockedIndex = navigationLockRef.current;
    const container = scrollContainerRef.current;

    if (lockedIndex === null || !container || !isPanelScrollActive(container)) {
      return false;
    }

    const targetTop = getPanelScrollTopForIndex(
      container,
      lockedIndex,
      itemCount,
      (index) => itemRefs.current[index] ?? null,
    );

    if (Math.abs(container.scrollTop - targetTop) <= NAVIGATION_LOCK_RELEASE_PX) {
      setActiveIndex(lockedIndex);
      releaseNavigationLock();
      return true;
    }

    return false;
  }, [itemCount, releaseNavigationLock]);

  const updateActiveFromRatios = useCallback(() => {
    if (itemCount === 0) {
      return;
    }

    if (navigationLockRef.current !== null) {
      return;
    }

    const container = scrollContainerRef.current;

    if (isPanelScrollActive(container) && container) {
      if (isPanelAtBottom(container)) {
        setActiveIndex(itemCount - 1);
        return;
      }

      const indexFromScroll = resolvePanelIndex(
        container,
        itemCount,
        (index) => itemRefs.current[index] ?? null,
      );
      setActiveIndex(indexFromScroll);
      return;
    }

    const scrollBottom = window.scrollY + window.innerHeight;
    const pageBottom = document.documentElement.scrollHeight;
    if (scrollBottom >= pageBottom - 48) {
      setActiveIndex(itemCount - 1);
      return;
    }

    let bestIndex = 0;
    let bestRatio = -1;

    ratiosRef.current.forEach((ratio, index) => {
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestIndex = index;
      }
    });

    if (bestRatio > 0) {
      setActiveIndex(bestIndex);
    }
  }, [itemCount]);

  const setActiveIndexIfUnlocked = useCallback((index: number) => {
    if (navigationLockRef.current !== null) {
      return;
    }
    setActiveIndex(index);
  }, []);

  const setItemRef = useCallback(
    (index: number) => (node: HTMLElement | null) => {
      const previous = itemRefs.current[index];
      if (previous && observerRef.current) {
        observerRef.current.unobserve(previous);
      }

      itemRefs.current[index] = node;

      if (node && observerRef.current) {
        observerRef.current.observe(node);
      }
    },
    [],
  );

  const getItemNode = useCallback(
    (index: number) => itemRefs.current[index] ?? null,
    [],
  );

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const node = itemRefs.current[index];
      if (!node) {
        return;
      }

      const container = scrollContainerRef.current;

      clearNavigationLockTimer();
      navigationLockRef.current = index;
      setActiveIndex(index);

      if (isPanelScrollActive(container) && container) {
        const top = getPanelScrollTopForIndex(
          container,
          index,
          itemCount,
          (i) => itemRefs.current[i] ?? null,
        );

        container.scrollTo({
          top,
          behavior,
        });

        if (behavior === "auto") {
          requestAnimationFrame(() => {
            tryReleaseNavigationLock();
          });
        } else {
          navigationLockTimerRef.current = setTimeout(() => {
            setActiveIndex(index);
            releaseNavigationLock();
          }, NAVIGATION_LOCK_TIMEOUT_MS);
        }
      } else {
        node.scrollIntoView({ behavior, block: "start" });
        releaseNavigationLock();
      }
    },
    [
      clearNavigationLockTimer,
      itemCount,
      releaseNavigationLock,
      tryReleaseNavigationLock,
    ],
  );

  useEffect(() => {
    if (itemCount === 0) {
      return;
    }

    ratiosRef.current = Array.from({ length: itemCount }, () => 0);

    const setupObserver = () => {
      observerRef.current?.disconnect();

      const container = scrollContainerRef.current;
      const usePanelRoot = isPanelScrollActive(container);

      const observer = new IntersectionObserver(
        (entries) => {
          if (navigationLockRef.current !== null) {
            return;
          }

          entries.forEach((entry) => {
            const index = itemRefs.current.findIndex((node) => node === entry.target);
            if (index < 0) {
              return;
            }
            ratiosRef.current[index] = entry.intersectionRatio;
          });
          updateActiveFromRatios();
        },
        {
          root: usePanelRoot ? container : null,
          rootMargin,
          threshold,
        },
      );

      observerRef.current = observer;
      itemRefs.current.forEach((node) => {
        if (node) {
          observer.observe(node);
        }
      });
    };

    setupObserver();

    const container = scrollContainerRef.current;

    const handleContainerScroll = () => {
      if (navigationLockRef.current !== null) {
        if (tryReleaseNavigationLock()) {
          return;
        }
        return;
      }
      updateActiveFromRatios();
    };

    const handleScrollEnd = () => {
      if (navigationLockRef.current !== null) {
        tryReleaseNavigationLock();
      }
    };

    const handleWindowScroll = () => updateActiveFromRatios();
    const handleResize = () => setupObserver();

    container?.addEventListener("scroll", handleContainerScroll, { passive: true });
    container?.addEventListener("scrollend", handleScrollEnd);
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      container?.removeEventListener("scroll", handleContainerScroll);
      container?.removeEventListener("scrollend", handleScrollEnd);
      window.removeEventListener("scroll", handleWindowScroll);
      window.removeEventListener("resize", handleResize);
      clearNavigationLockTimer();
    };
  }, [
    clearNavigationLockTimer,
    itemCount,
    rootMargin,
    threshold,
    tryReleaseNavigationLock,
    updateActiveFromRatios,
  ]);

  const progress = itemCount <= 1 ? 1 : activeIndex / Math.max(1, itemCount - 1);

  return {
    activeIndex,
    setActiveIndex: setActiveIndexIfUnlocked,
    progress,
    scrollContainerRef,
    setItemRef,
    getItemNode,
    scrollToIndex,
  };
};
