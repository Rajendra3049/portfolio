import { experienceSchema, type Experience } from "@/entities/experience";

export const omnifulExperience: Experience = experienceSchema.parse({
  role: "Associate Team Lead",
  company: "Omniful.ai",
  duration: "Sep 2023 – Present · Gurugram, India",
  summary:
    "Supply chain and logistics SaaS — joined as an intern, grew into full-time engineering, and now lead frontend delivery across OMS, sales channels, and shipment systems.",
  positions: [
    {
      role: "Associate Team Lead",
      duration: "Jul 2025 – Present",
      scope: "Leadership & delivery",
      isPromotion: true,
      isCurrent: true,
      impactPoints: [
        "Promoted to lead frontend delivery across OMS, sales channel, and shipment modules.",
        "Run feature planning, sprint delivery, system design reviews, and code reviews for scalability and performance.",
        "Mentor junior engineers and partner with product, backend, and QA on end-to-end launches.",
        "Foster team growth through knowledge sharing and engineering best practices.",
      ],
    },
    {
      role: "Software Engineer",
      duration: "Mar 2024 – Jun 2025",
      scope: "OMS & real-time systems",
      impactPoints: [
        "Engineered Order Management, Sales Channel Services, and Shipment Creation systems for 100+ enterprise tenants.",
        "Cut page load times by 30% with React Query caching and reduced code duplication by 40%.",
        "Built a centralized sales-channel dashboard and real-time order tracking with live notifications.",
        "Developed reusable components, custom hooks, and shared utilities across table-heavy product surfaces.",
      ],
    },
    {
      role: "Software Engineer Intern",
      duration: "Sep 2023 – Feb 2024",
      scope: "Internship · foundational product UI",
      impactPoints: [
        "Joined as an intern and shipped production React features in a fast-moving logistics SaaS team.",
        "Built responsive UIs, reusable components, and form flows with React Hook Form and Redux Toolkit.",
        "Improved UI performance and contributed to clean code, Git, and Agile practices.",
      ],
    },
  ],
  stack: [
    "React.js",
    "Next.js",
    "TypeScript",
    "React Query",
    "Redux Toolkit",
    "React Hook Form",
    "Bootstrap",
    "JavaScript",
    "SCSS",
  ],
  achievements: [
    "Grew from Software Engineer Intern to Associate Team Lead within two years.",
    "Owned core OMS, sales channel, and shipment modules in a high-scale logistics SaaS platform.",
    "Built an AI-assisted Cursor workflow adopted by the frontend team, cutting feature scaffolding time by ~50%.",
  ],
  metrics: [
    { label: "Tenure at Omniful", value: "2+ yrs" },
    { label: "Load Time Reduction", value: "30%" },
    { label: "Code Duplication Cut", value: "40%" },
  ],
});
