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
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveFromRatios = useCallback(() => {
    if (itemCount === 0) {
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
    } else {
      const scrollBottom = window.scrollY + window.innerHeight;
      const pageBottom = document.documentElement.scrollHeight;
      if (scrollBottom >= pageBottom - 48) {
        setActiveIndex(itemCount - 1);
        return;
      }
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

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const node = itemRefs.current[index];
    if (!node) {
      return;
    }

    const container = scrollContainerRef.current;

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
    } else {
      node.scrollIntoView({ behavior, block: "start" });
    }

    setActiveIndex(index);
  }, [itemCount]);

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
    const handleContainerScroll = () => updateActiveFromRatios();
    const handleWindowScroll = () => updateActiveFromRatios();
    const handleResize = () => setupObserver();

    container?.addEventListener("scroll", handleContainerScroll, { passive: true });
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      container?.removeEventListener("scroll", handleContainerScroll);
      window.removeEventListener("scroll", handleWindowScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [itemCount, rootMargin, threshold, updateActiveFromRatios]);

  const progress = itemCount <= 1 ? 1 : activeIndex / Math.max(1, itemCount - 1);

  return {
    activeIndex,
    setActiveIndex,
    progress,
    scrollContainerRef,
    setItemRef,
    getItemNode,
    scrollToIndex,
  };
};
