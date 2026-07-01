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
  title: "Software engineer who ships in production.",
  description:
    "I build web applications for real operations — order management, sales channels, and shipment workflows at scale. I care about maintainable architecture, delivery quality, and product outcomes, not just UI polish.",
  story:
    "Promoted from intern to Associate Team Lead in two years. I own OMS, sales channel, and shipment modules in production — and ship side projects end-to-end outside work.",
  highlights: [
    { label: "Experience", value: "~2.5 years" },
    { label: "Current Role", value: "Associate Team Lead" },
    { label: "Domain", value: "Logistics SaaS" },
    { label: "Location", value: "Gurugram, India" },
  ],
  focusAreas: [
    "React.js",
    "Next.js",
    "TypeScript",
    "Real-Time Systems",
    "Performance Optimization",
    "SaaS",
  ],
  principles: [
    {
      title: "How I work",
      tagline: "Structured delivery with clear ownership.",
      points: [
        "Start with clear module boundaries, predictable data flows, and reusable patterns.",
        "Validate through performance, maintainability, and delivery outcomes.",
        "Partner with product, backend, and QA on cross-functional launches.",
      ],
      accent: "indigo",
    },
    {
      title: "What I optimize for",
      tagline: "Outcomes that hold up in production.",
      points: [
        "Load-time efficiency on data-heavy operational screens.",
        "Real-time feedback where operations depend on live order and inventory state.",
        "Software foundations that scale with tenant complexity and product growth.",
      ],
      accent: "emerald",
    },
    {
      title: "What I'm building toward",
      tagline: "Deeper product engineering and team impact.",
      points: [
        "Stronger ownership across application architecture, system design, and delivery leadership.",
        "Shipping personal products end-to-end — TaskOrbit, Hisab Diary, and what comes next.",
        "Using modern tooling and AI-assisted workflows to move faster without sacrificing quality.",
      ],
      accent: "amber",
    },
  ],
  openTo:
    "Software engineering and SaaS product roles where I can own meaningful product surfaces, solve real workflow problems, and grow with the team.",
} as const;
