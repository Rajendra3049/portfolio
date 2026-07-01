"use client";

import { type RefObject, useEffect, useState } from "react";

type ScrollPanelEdges = {
  atTop: boolean;
  atBottom: boolean;
};

const DEFAULT_EDGES: ScrollPanelEdges = {
  atTop: true,
  atBottom: false,
};

type UseScrollPanelEdgesOptions = {
  edgeThreshold?: number;
  minWidthPx?: number;
};

export const useScrollPanelEdges = (
  containerRef: RefObject<HTMLElement | null>,
  { edgeThreshold = 8, minWidthPx = 1024 }: UseScrollPanelEdgesOptions = {},
) => {
  const [edges, setEdges] = useState<ScrollPanelEdges>(DEFAULT_EDGES);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const mediaQuery = window.matchMedia(`(min-width: ${minWidthPx}px)`);

    const updateEdges = () => {
      if (!mediaQuery.matches) {
        setEdges(DEFAULT_EDGES);
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = container;
      setEdges({
        atTop: scrollTop <= edgeThreshold,
        atBottom: scrollTop + clientHeight >= scrollHeight - edgeThreshold,
      });
    };

    updateEdges();
    container.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);

    return () => {
      container.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [containerRef, edgeThreshold, minWidthPx]);

  return edges;
};
