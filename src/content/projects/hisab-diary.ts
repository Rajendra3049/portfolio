import { projectSchema, type Project } from "@/entities/project";

export const hisabDiaryProject: Project = projectSchema.parse({
  title: "Hisab Diary",
  slug: "hisab-diary",
  shortDescription:
    "Modern personal finance platform for expense tracking, budgeting, analytics, and recurring transactions.",
  heroTagline:
    "Built a fast expense diary with categorization and analytics — so spending patterns are visible at a glance, not buried in spreadsheets.",
  longDescription:
    "Hisab Diary is a full-stack expense management product for tracking spending, organizing categories, reviewing financial patterns, and managing budgets through a clean, mobile-friendly interface.",
  problem:
    "Most expense apps force a trade-off: either too complex for quick daily entry, or too bare to surface meaningful spending insights. People need fast capture and clear analytics in one place.",
  originStory:
    "Growing up, 'hisab' (accounting) was how we tracked money informally — notebook entries and mental math. I wanted a digital version that respected that simplicity but added categorization, trends, and reporting so users could actually understand where their money goes.",
  role: "Solo builder — product, frontend, backend, and deployment",
  timeline: "2024 · full-stack product build",
  caseStudy: {
    myRole: [
      "Designed and built the full expense tracking experience — entry, categories, analytics, and auth.",
      "Implemented scalable state management and API integrations for user-specific financial data.",
      "Owned responsive UI for fast mobile entry and desktop-friendly reporting views.",
    ],
    challenge: [
      "Balancing one-tap expense entry with accurate categorization and validation rules.",
      "Keeping analytics dashboards responsive while aggregating growing transaction history.",
      "Protecting user financial data with secure authentication and authorization patterns.",
    ],
    approach: [
      "Structured Redux-style predictable state for expenses, categories, and filter views.",
      "Built REST API consumption with optimized rendering for list-heavy transaction screens.",
      "Migrated toward Next.js + Supabase + PostgreSQL for a modern, maintainable full-stack foundation.",
      "Prioritized mobile-first flows for daily capture, with analytics optimized for review sessions.",
    ],
    outcomes: [
      "Live expense management product with authentication, categorization, and reporting capabilities.",
      "Maintainable architecture ready for budgeting, recurring transactions, and deeper insights.",
      "Open-source repo demonstrating full-stack ownership beyond frontend-only portfolio pieces.",
    ],
    differentiator: [
      "Finance UX rooted in real 'hisab' habits — fast entry first, insights second.",
      "Not a CRUD demo: includes analytics views, auth, and production deployment.",
      "Showcases product thinking for data-heavy SaaS — validation, aggregation, and responsive dashboards.",
    ],
  },
  techStack: [
    "Next.js",
    "TypeScript",
    "Supabase",
    "PostgreSQL",
    "Tailwind CSS",
    "TanStack Query",
  ],
  coverImage: "/work/hisab-diary-cover.png",
  screenshots: [
    {
      src: "/work/hisab-diary-1.png",
      caption: "Expense dashboard with category breakdown and spending overview.",
      alt: "Hisab Diary expense dashboard with analytics",
    },
    {
      src: "/work/hisab-diary-2.png",
      caption: "Quick expense entry flow optimized for mobile daily use.",
      alt: "Hisab Diary expense entry form",
    },
  ],
  liveUrl: "https://expense-manager-smoky.vercel.app/",
  githubUrl: "https://github.com/Rajendra3049/hisab-diary",
  featured: true,
  categories: ["FinTech", "SaaS", "Full Stack"],
  metrics: [
    { label: "Core Journeys", value: "5+" },
    { label: "Analytics Views", value: "3+" },
    { label: "Stack", value: "Next.js + Supabase" },
  ],
});
