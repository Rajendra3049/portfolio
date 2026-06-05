export type AboutPrincipleAccent = "indigo" | "emerald" | "amber" | "zinc";

export type AboutHighlight = {
  label: string;
  value: string;
};

export type AboutPrinciple = {
  title: string;
  tagline: string;
  points: readonly string[];
  accent: AboutPrincipleAccent;
};

export const aboutContent = {
  eyebrow: "About",
  title: "Product-minded engineer who ships in production.",
  description:
    "I build frontend systems for real operations — order management, sales channels, and shipment workflows at scale — and I care as much about delivery outcomes as clean code.",
  story:
    "I started at Omniful as a Software Engineer Intern and grew into an Associate Team Lead within two years. Along the way I've shipped production UIs, owned OMS modules, led sprint delivery, and built side projects like TaskOrbit and Hisab Diary to keep pushing on full-stack product thinking.",
  highlights: [
    { label: "Experience", value: "2+ years" },
    { label: "Current Role", value: "Associate Team Lead" },
    { label: "Domain", value: "Logistics SaaS" },
    { label: "Location", value: "Gurugram, India" },
  ],
  focusAreas: ["React.js", "Next.js", "TypeScript", "Real-Time Systems", "SaaS"],
  principles: [
    {
      title: "How I work",
      tagline: "Structured delivery with room for speed when the product needs it.",
      points: [
        "Start with clear component boundaries, predictable data flows, and reusable patterns.",
        "Validate decisions through performance, maintainability, and team delivery outcomes.",
        "Collaborate closely with product, backend, and QA — especially on cross-functional launches.",
      ],
      accent: "indigo",
    },
    {
      title: "What I optimize for",
      tagline: "Outcomes that compound — not one-off feature patches.",
      points: [
        "Load-time efficiency and responsive UX on data-heavy operational screens.",
        "Real-time user feedback where operations depend on live order and inventory state.",
        "Frontend foundations that scale with tenant complexity, RBAC, and product growth.",
      ],
      accent: "emerald",
    },
    {
      title: "What I'm building toward",
      tagline: "Stronger product engineering with full-stack and AI-assisted velocity.",
      points: [
        "Deepening ownership across frontend architecture, system design, and team leadership.",
        "Shipping personal products end-to-end — TaskOrbit, Hisab Diary, and what comes next.",
        "Using modern tooling and AI workflows to move faster without sacrificing quality.",
      ],
      accent: "amber",
    },
  ],
  openTo:
    "Frontend engineering and SaaS product roles where I can own meaningful product surfaces and grow with the team.",
} as const;
