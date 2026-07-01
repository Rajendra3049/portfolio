import { projectSchema, type Project } from "@/entities/project";

export const hisabDiaryProject: Project = projectSchema.parse({
  title: "Hisab Diary",
  slug: "hisab-diary",
  shortDescription:
    "Personal finance app for tracking spending, categories, and trends — inspired by how families actually keep \"hisab.\"",
  heroTagline:
    "A live expense tracker with fast capture and clear spending insights — built solo on Next.js and Supabase.",
  longDescription:
    "Hisab Diary is an expense management product for tracking spending, organizing categories, reviewing financial patterns, and reporting through a clean, mobile-friendly interface.",
  problem:
    "Most trackers are either too bare or too heavy. People need quick entry and understandable patterns without spreadsheet friction.",
  originStory:
    "\"Hisab\" is how we tracked money informally growing up — notebook entries and mental math. I wanted that simplicity with categorization and trends.",
  role: "Solo builder — product, frontend, backend, deployment",
  timeline: "2024",
  caseStudy: {
    myRole: [
      "Designed and built the full expense tracking experience — entry, categories, analytics, and auth.",
      "Implemented API integrations and optimized rendering for user-specific financial data.",
      "Owned responsive UI for fast mobile entry and desktop-friendly reporting views.",
    ],
    challenge: [
      "Balancing one-tap expense entry with accurate categorization and validation rules.",
      "Keeping analytics dashboards responsive while aggregating growing transaction history.",
      "Protecting user financial data with secure authentication and authorization patterns.",
    ],
    approach: [
      "Used TanStack Query for server-state and React Hook Form for validated expense entry flows.",
      "Built on Next.js + Supabase with optimized rendering for list-heavy transaction screens.",
      "Prioritized mobile-first flows for daily capture, with analytics optimized for review sessions.",
    ],
    outcomes: [
      "Live expense management product with authentication, categorization, and reporting capabilities.",
      "Maintainable architecture ready for budgeting, recurring transactions, and deeper insights.",
      "Open-source repo demonstrating full product ownership beyond employer work.",
    ],
    differentiator: [
      "Finance UX rooted in real \"hisab\" habits — fast entry first, insights second.",
      "Not a CRUD demo: includes analytics views, auth, and production deployment.",
      "Showcases product thinking for data-heavy SaaS — validation, aggregation, and responsive dashboards.",
    ],
  },
  techStack: [
    "Next.js",
    "TypeScript",
    "Supabase",
    "PostgreSQL",
    "TanStack Query",
    "React Hook Form",
    "Tailwind CSS",
  ],
  coverImage: "/work/hisab-diary-cover.webp",
  screenshots: [
    {
      src: "/work/hisab-diary-1.webp",
      caption: "Sign-in flow with email authentication and protected routes.",
      alt: "Hisab Diary sign-in screen with email and password fields",
    },
    {
      src: "/work/hisab-diary-2.webp",
      caption: "Expense capture with categories, accounts, tags, and monthly spending summary.",
      alt: "Hisab Diary expenses page with add expense form and monthly total",
    },
  ],
  liveUrl: "https://expense-manager-smoky.vercel.app/",
  githubUrl: "https://github.com/Rajendra3049/hisab-diary",
  featured: true,
  categories: ["FinTech", "SaaS", "Full Stack"],
  metrics: [
    { label: "Status", value: "Live" },
    { label: "Build", value: "Solo" },
    { label: "Stack", value: "Next.js + Supabase" },
  ],
});
