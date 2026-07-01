"use client";

import { useEffect, useState } from "react";

export const usePointerFine = () => {
  const [isPointerFine, setIsPointerFine] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");

    const update = () => {
      setIsPointerFine(mediaQuery.matches);
    };

    update();
    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  return isPointerFine;
};
