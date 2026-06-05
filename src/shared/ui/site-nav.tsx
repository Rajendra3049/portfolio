"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/content/config/site";
import { cn } from "@/shared/lib/utils";

const SCROLL_OFFSET = 96;

const getSectionIds = () =>
  siteConfig.navItems
    .filter((item) => item.href.startsWith("#"))
    .map((item) => item.href.slice(1));

const getSectionsInDocumentOrder = () =>
  getSectionIds()
    .map((id) => document.getElementById(id))
    .filter((element): element is HTMLElement => element !== null)
    .sort((a, b) => a.offsetTop - b.offsetTop);

const resolveNavHref = (href: string, pathname: string) => {
  if (href.startsWith("#")) {
    return pathname === "/" ? href : `/${href}`;
  }

  return href;
};

const getActiveSectionFromViewport = () => {
  const sections = getSectionsInDocumentOrder();
  let activeSection = "";

  for (const section of sections) {
    if (section.getBoundingClientRect().top <= SCROLL_OFFSET) {
      activeSection = section.id;
    }
  }

  return activeSection;
};

const isNavItemActive = (href: string, pathname: string, activeSection: string) => {
  if (href.startsWith("#")) {
    const sectionId = href.slice(1);

    if (pathname === "/") {
      return activeSection === sectionId;
    }

    if (sectionId === "work" && pathname.startsWith("/work")) {
      return true;
    }

    return false;
  }

  return pathname === href;
};

export const SiteNav = () => {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (pathname !== "/") return;

    let observer: IntersectionObserver | undefined;
    let setupFrameId = 0;
    let scrollFrameId = 0;

    const syncActiveSection = () => {
      setActiveSection(getActiveSectionFromViewport());
    };

    const syncFromHash = () => {
      const hash = window.location.hash.slice(1);

      if (hash && getSectionIds().includes(hash)) {
        setActiveSection(hash);
        return;
      }

      syncActiveSection();
    };

    const scheduleSync = () => {
      window.cancelAnimationFrame(scrollFrameId);
      scrollFrameId = window.requestAnimationFrame(syncActiveSection);
    };

    const setupObserver = () => {
      const sectionElements = getSectionsInDocumentOrder();

      if (sectionElements.length === 0) {
        setupFrameId = window.requestAnimationFrame(setupObserver);
        return;
      }

      observer?.disconnect();
      observer = new IntersectionObserver(scheduleSync, {
        root: null,
        rootMargin: `-${SCROLL_OFFSET}px 0px -55% 0px`,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      });

      sectionElements.forEach((element) => observer?.observe(element));
      syncFromHash();
    };

    setupObserver();

    const scrollTargets = [
      window,
      document,
      document.documentElement,
      document.body,
    ].filter(Boolean);

    scrollTargets.forEach((target) => {
      target.addEventListener("scroll", scheduleSync, { passive: true, capture: true });
    });
    window.addEventListener("resize", scheduleSync, { passive: true });
    window.addEventListener("hashchange", syncFromHash);

    return () => {
      window.cancelAnimationFrame(setupFrameId);
      window.cancelAnimationFrame(scrollFrameId);
      observer?.disconnect();
      scrollTargets.forEach((target) => {
        target.removeEventListener("scroll", scheduleSync, true);
      });
      window.removeEventListener("resize", scheduleSync);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, [pathname]);

  const handleNavClick = (href: string) => {
    if (!href.startsWith("#")) return;

    setActiveSection(href.slice(1));
  };

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="text-sm font-semibold tracking-wide text-zinc-50"
          aria-label="Go to homepage"
        >
          {siteConfig.name}
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-1 sm:gap-2">
            {siteConfig.navItems.map((item) => {
              const isActive = isNavItemActive(item.href, pathname, activeSection);
              const resolvedHref = resolveNavHref(item.href, pathname);

              return (
                <li key={item.label}>
                  <Link
                    href={resolvedHref}
                    onClick={() => handleNavClick(item.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "rounded-md px-3 py-2 text-xs font-medium transition-colors sm:text-sm",
                      isActive
                        ? "bg-zinc-800 text-zinc-50"
                        : "text-zinc-300 hover:bg-zinc-800 hover:text-zinc-50",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};
