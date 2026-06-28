import { projectSchema, type Project } from "@/entities/project";

export const lintProject: Project = projectSchema.parse({
  title: "Lint",
  slug: "lint",
  shortDescription:
    "Full-stack e-commerce platform for apparel and lifestyle products with catalog browsing, authentication, cart, and checkout-oriented flows.",
  heroTagline:
    "Built and shipped a collaborative e-commerce product in a 5-day sprint, owning core product-listing and product-detail experiences.",
  longDescription:
    "Lint is a team-built full-stack e-commerce application inspired by large retail experiences, focused on product discovery, detail pages, authentication journeys, and cart workflows for apparel and lifestyle categories.",
  problem:
    "Shoppers need a responsive and intuitive catalog-to-cart journey, while engineering teams need modular frontend architecture and API-backed state that can be delivered quickly under strict deadlines.",
  originStory:
    "Lint was delivered during an intensive team sprint at Masai School. The goal was to collaboratively build a production-style commerce workflow in five days, splitting ownership across frontend, backend, and admin surfaces while maintaining delivery quality.",
  role: "Frontend engineer — all products page and product details page (team project)",
  timeline: "2022 · 5-day collaboration sprint",
  caseStudy: {
    myRole: [
      "Owned implementation of the all-products listing page with filtering and browsing flows.",
      "Built product detail experiences to improve product evaluation and conversion intent.",
      "Collaborated with teammates on integration boundaries across authentication, cart, and backend APIs.",
    ],
    challenge: [
      "Designing fast catalog browsing for many product cards while staying responsive across breakpoints.",
      "Coordinating page-level frontend ownership with backend and admin-panel deliverables in parallel.",
      "Maintaining clean UI-state transitions across listing, details, and cart journeys within a short sprint.",
    ],
    approach: [
      "Used React component composition to separate listing, filtering, and details concerns.",
      "Integrated API-driven product data and routed interactions through predictable page states.",
      "Applied Chakra UI patterns for rapid yet consistent UI delivery under timeline pressure.",
      "Focused on responsive layouts to preserve browsing usability on mobile and desktop.",
    ],
    outcomes: [
      "Shipped a deployed full-stack e-commerce product with end-to-end user flows.",
      "Delivered key customer-facing pages (products and product details) within the sprint window.",
      "Strengthened team execution skills across scoped ownership, integration, and deadline-driven delivery.",
    ],
    differentiator: [
      "Demonstrates collaboration and delivery pace in a constrained, real-world sprint setting.",
      "Shows frontend ownership on commerce-critical surfaces rather than isolated demo components.",
      "Combines responsive UX implementation with API-backed product experiences.",
    ],
  },
  techStack: ["React", "Redux", "JavaScript", "Chakra UI", "Node.js", "Express.js", "MongoDB"],
  coverImage: "/work/lint-cover.png",
  screenshots: [
    {
      src: "/work/lint-cover.png",
      caption:
        "Homepage merchandising with hero banners, category navigation, and top-level discovery workflow.",
      alt: "Lint e-commerce homepage with merchandising banners and category navigation",
    },
    {
      src: "/work/lint-footer.png",
      caption:
        "Footer and service-information architecture used for customer support, policy discovery, and trust cues.",
      alt: "Lint e-commerce footer with customer service and policy links",
    },
    {
      src: "/work/lint-category-empty.png",
      caption:
        "Category fallback state for unavailable inventory, with clear messaging and a return-to-browse action.",
      alt: "Lint category unavailable empty state screen with go back action",
    },
  ],
  liveUrl: "https://lint-ecommerce.netlify.app/",
  githubUrl: "https://github.com/RimRaider639/Lint",
  featured: false,
  categories: ["E-commerce", "Team Project", "Full Stack"],
  metrics: [
    { label: "Status", value: "Live" },
    { label: "Delivery", value: "Team sprint" },
    { label: "Timeline", value: "5 days" },
  ],
});
