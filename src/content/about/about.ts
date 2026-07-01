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
  title: "I grew into frontend by shipping in production.",
  intro: [
    "Started at Omniful as an intern on a live logistics SaaS platform — now Associate Team Lead on OMS, sales channels, and shipment.",
    "Came through Masai's full-stack program after a Civil Engineering degree; learned by building, not by collecting certificates.",
    "Still ship side products end-to-end — auth, data, UI, deployment — because ownership doesn't stop at the employer ticket.",
  ],
  workflow: {
    title: "How I work",
    tagline: "Ownership from problem to production.",
    steps: [
      {
        step: "01",
        title: "Define",
        summary: "Scope modules, data flows, and reuse boundaries before writing components.",
        accent: "indigo",
      },
      {
        step: "02",
        title: "Build",
        summary: "Performance and maintainability first on screens people use all day.",
        accent: "emerald",
      },
      {
        step: "03",
        title: "Validate",
        summary: "Measure load time, stability, and release quality — not just \"looks done.\"",
        accent: "amber",
      },
      {
        step: "04",
        title: "Ship",
        summary: "Coordinate with product, backend, and QA so releases land predictably.",
        accent: "zinc",
      },
    ],
  },
  optimize: {
    title: "What I optimize for",
    tagline: "What holds up when usage scales.",
    areas: [
      {
        title: "Performance",
        headline: "Fast on data-heavy screens.",
        detail: "Table-heavy operational UIs that stay responsive.",
        accent: "emerald",
      },
      {
        title: "Real-time",
        headline: "Live when ops depend on it.",
        detail: "Order tracking, inventory, and tenant workflows with instant feedback.",
        accent: "indigo",
      },
      {
        title: "Foundations",
        headline: "Built for growing complexity.",
        detail: "Architecture that survives more tenants and more modules.",
        accent: "amber",
      },
    ],
  },
  openTo: {
    label: "Open to",
    description:
      "Frontend and product engineering roles where I can own meaningful product surface — especially SaaS, fintech, and operations software.",
    cta: { label: "Start a conversation", href: "#contact" },
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
