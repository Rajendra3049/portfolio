export type AboutAccent = "indigo" | "emerald" | "amber" | "zinc";

export type AboutWorkflowStep = {
  step: string;
  title: string;
  summary: string;
  accent: AboutAccent;
};

export type AboutOptimizeArea = {
  title: string;
  headline: string;
  detail: string;
  accent: AboutAccent;
};

export const aboutContent = {
  eyebrow: "About",
  title: "Software engineer who ships in production.",
  intro: [
    "Production SaaS for order management, sales channels, and shipments.",
    "Intern → Associate Team Lead in two years.",
    "Own modules in production. Ship side projects end-to-end.",
  ],
  workflow: {
    title: "How I work",
    tagline: "Structured delivery with clear ownership.",
    steps: [
      {
        step: "01",
        title: "Define",
        summary: "Module boundaries, predictable data flows, reusable patterns.",
        accent: "indigo",
      },
      {
        step: "02",
        title: "Build",
        summary: "Performance-minded implementation with maintainable foundations.",
        accent: "emerald",
      },
      {
        step: "03",
        title: "Validate",
        summary: "Measure outcomes through speed, stability, and delivery quality.",
        accent: "amber",
      },
      {
        step: "04",
        title: "Ship",
        summary: "Launch cross-functionally with product, backend, and QA.",
        accent: "zinc",
      },
    ],
  },
  optimize: {
    title: "What I optimize for",
    tagline: "Outcomes that hold up in production.",
    areas: [
      {
        title: "Performance",
        headline: "Fast on data-heavy screens.",
        detail: "Load-time efficiency across table-heavy operational UIs.",
        accent: "emerald",
      },
      {
        title: "Real-time",
        headline: "Live when operations depend on it.",
        detail: "Instant feedback for order tracking, inventory, and tenant workflows.",
        accent: "indigo",
      },
      {
        title: "Foundations",
        headline: "Built to scale with complexity.",
        detail: "Architecture that grows with tenant count and product surface area.",
        accent: "amber",
      },
    ],
  },
  openTo: {
    label: "Open to",
    description:
      "Software engineering and SaaS product roles with meaningful surface ownership.",
    cta: { label: "Get in touch", href: "#contact" },
  },
} as const;

// Legacy types kept for any external references
export type AboutPrincipleAccent = AboutAccent;
export type AboutHighlight = { label: string; value: string };
export type AboutPrinciple = {
  title: string;
  tagline: string;
  points: readonly string[];
  accent: AboutPrincipleAccent;
};
