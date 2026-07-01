"use client";

import { type RefObject, useEffect } from "react";

type UseScrollPanelChainOptions = {
  edgeThreshold?: number;
  minWidthPx?: number;
};

export const useScrollPanelChain = (
  containerRef: RefObject<HTMLElement | null>,
  { edgeThreshold = 16, minWidthPx = 1024 }: UseScrollPanelChainOptions = {},
) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const mediaQuery = window.matchMedia(`(min-width: ${minWidthPx}px)`);

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

      // Transformed card surfaces block native wheel scroll on the panel; drive it explicitly.
      event.preventDefault();
      container.scrollBy({
        top: event.deltaY,
        left: event.deltaX,
        behavior: "auto",
      });
    };

    document.addEventListener("wheel", handleWheel, { passive: false, capture: true });

    return () => {
      document.removeEventListener("wheel", handleWheel, { capture: true });
    };
  }, [containerRef, edgeThreshold, minWidthPx]);
};
