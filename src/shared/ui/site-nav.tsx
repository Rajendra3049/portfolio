"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/content/config/site";
import { getLinkTargetProps } from "@/shared/lib/link";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

const SCROLL_OFFSET = 96;

const linkedInLink = siteConfig.socialLinks.find((link) => link.label === "LinkedIn");

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

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

type NavLinkProps = {
  href: string;
  label: string;
  pathname: string;
  activeSection: string;
  onNavigate?: () => void;
  className?: string;
};

const NavLink = ({
  href,
  label,
  pathname,
  activeSection,
  onNavigate,
  className,
}: NavLinkProps) => {
  const isActive = isNavItemActive(href, pathname, activeSection);
  const resolvedHref = resolveNavHref(href, pathname);

  const handleClick = () => {
    if (href.startsWith("#")) {
      onNavigate?.();
    }
  };

  return (
    <Link
      href={resolvedHref}
      {...getLinkTargetProps(href)}
      onClick={handleClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200",
        isActive
          ? "border border-zinc-700/90 bg-zinc-800 text-zinc-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          : "border border-transparent text-zinc-400 hover:bg-zinc-900/70 hover:text-zinc-200",
        className,
      )}
    >
      <span className="flex items-center gap-2">
        <span
          className={cn(
            "size-1.5 rounded-full transition-colors duration-200",
            isActive ? "bg-emerald-400" : "bg-transparent",
          )}
          aria-hidden
        />
        {label}
      </span>
    </Link>
  );
};

export const SiteNav = () => {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (pathname !== "/") return;

    let observer: IntersectionObserver | undefined;
    let setupFrameId = 0;
    let scrollFrameId = 0;

    const syncActiveSection = () => {
      setActiveSection(getActiveSectionFromViewport());
    };

    const syncScrollState = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      setIsScrolled(scrollTop > 8);
      setScrollProgress(scrollHeight > 0 ? Math.min(100, (scrollTop / scrollHeight) * 100) : 0);
      syncActiveSection();
    };

    const syncFromHash = () => {
      const hash = window.location.hash.slice(1);

      if (hash && getSectionIds().includes(hash)) {
        setActiveSection(hash);
        return;
      }

      syncScrollState();
    };

    const scheduleSync = () => {
      window.cancelAnimationFrame(scrollFrameId);
      scrollFrameId = window.requestAnimationFrame(syncScrollState);
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

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      setActiveSection(href.slice(1));
    }
    setIsMenuOpen(false);
  };

  const isResumeActive = pathname === siteConfig.navCta.href;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur transition-shadow",
        isScrolled && "shadow-[0_8px_24px_rgba(0,0,0,0.35)]",
      )}
    >
      {pathname === "/" ? (
        <div
          className="absolute inset-x-0 bottom-0 h-0.5 bg-zinc-800"
          aria-hidden
        >
          <div
            className="h-full bg-emerald-500 transition-[width] duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      ) : null}

      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3"
          aria-label="Go to homepage"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-xs font-semibold text-emerald-300 transition-colors group-hover:border-emerald-500/50">
            {siteConfig.navBrand.monogram}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold tracking-wide text-zinc-50">
              {siteConfig.name}
            </span>
            <span className="hidden text-[11px] text-zinc-500 sm:block">
              {siteConfig.navBrand.tagline}
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-2 rounded-xl  bg-zinc-900/50 p-1 md:flex"
          aria-label="Primary navigation"
        >
          {siteConfig.navItems.map((item) => (
            <NavLink
              key={item.label}
              href={item.href}
              label={item.label}
              pathname={pathname}
              activeSection={activeSection}
              onNavigate={() => handleNavClick(item.href)}
            />
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {linkedInLink ? (
            <Link
              href={linkedInLink.href}
              {...getLinkTargetProps(linkedInLink.href)}
              aria-label={linkedInLink.label}
              className="rounded-md p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
            >
              <LinkedInIcon className="size-4" />
            </Link>
          ) : null}
          <Button
            asChild
            size="sm"
            className={cn(isResumeActive && "ring-2 ring-emerald-500/40 ring-offset-2 ring-offset-zinc-950")}
          >
            <Link
              href={siteConfig.navCta.href}
              {...getLinkTargetProps(siteConfig.navCta.href)}
            >
              {siteConfig.navCta.label}
            </Link>
          </Button>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-50 md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </div>

      {isMenuOpen ? (
        <div className="md:hidden">
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[1px]"
            aria-label="Close menu overlay"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed inset-x-0 top-16 z-50 border-b border-zinc-800 bg-zinc-950/95 px-4 py-5 shadow-2xl sm:px-6">
            <nav aria-label="Mobile navigation">
              <ul className="space-y-1">
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
                          "flex items-center gap-3 rounded-lg border px-3 py-3 text-base font-medium transition-colors",
                          isActive
                            ? "border-zinc-700 bg-zinc-800 text-zinc-50"
                            : "border-transparent text-zinc-300 hover:border-zinc-800 hover:bg-zinc-900 hover:text-zinc-50",
                        )}
                      >
                        <span
                          className={cn(
                            "size-1.5 shrink-0 rounded-full",
                            isActive ? "bg-emerald-400" : "bg-zinc-600",
                          )}
                          aria-hidden
                        />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-5 space-y-3 border-t border-zinc-800 pt-5">
              {linkedInLink ? (
                <Link
                  href={linkedInLink.href}
                  {...getLinkTargetProps(linkedInLink.href)}
                  className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-zinc-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LinkedInIcon className="size-4" />
                  {linkedInLink.label}
                </Link>
              ) : null}
              <Button asChild className="w-full">
                <Link
                  href={siteConfig.navCta.href}
                  {...getLinkTargetProps(siteConfig.navCta.href)}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {siteConfig.navCta.label}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
};
