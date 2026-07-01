import { projectSchema, type Project } from "@/entities/project";

export const wingShooterProject: Project = projectSchema.parse({
  title: "WingShooter",
  slug: "wingshooter",
  shortDescription:
    "Real-time browser shooting game with responsive controls, collision detection, and score-driven gameplay.",
  heroTagline:
    "Real-time browser game shipped in 5 days — collision logic, game state, and performance under pressure.",
  longDescription:
    "WingShooter is a collaborative browser game where players shoot targets, dodge threats, and chase high scores through fast-paced, real-time interaction loops.",
  problem:
    "Browser games must handle continuous input, collision detection, and score updates without frame drops or unpredictable state — especially when multiple systems update in parallel.",
  originStory:
    "Built during an intensive team sprint at Masai School, WingShooter started as a construct-week challenge: clone real-time gameplay mechanics in the browser within days. The goal was to stress-test state management, event-driven updates, and performance under tight timelines — skills that translate directly to real-time product UIs.",
  role: "Software engineer — gameplay mechanics, state, and UI (team project)",
  timeline: "2022 · 5-day team sprint",
  caseStudy: {
    myRole: [
      "Implemented player controls, bullet mechanics, collision detection, scoring logic, and sound feedback.",
      "Managed gameplay state with Redux Thunk for predictable action-driven updates.",
      "Collaborated with teammates on API integration and delivery within a fixed sprint window.",
    ],
    challenge: [
      "Maintaining smooth real-time interactions while processing collision and score updates every frame.",
      "Coordinating frontend gameplay logic with team-owned backend APIs under a 5-day deadline.",
      "Preventing performance degradation as event listeners and state updates stacked during active play.",
    ],
    approach: [
      "Componentized game surfaces — controls, targets, scoreboard — for isolated render boundaries.",
      "Built an event-driven collision and scoring pipeline tuned for responsive feedback loops.",
      "Used Redux Thunk to orchestrate async gameplay actions without race conditions.",
      "Performance-conscious render updates to keep animation-heavy interactions smooth in the browser.",
    ],
    outcomes: [
      "Delivered a playable browser game with live deployment and collaborative team execution.",
      "Strengthened real-time state management skills applicable to live dashboards and notification systems.",
      "Demonstrated ability to ship under deadline — relevant to fast-moving SaaS product teams.",
    ],
    differentiator: [
      "Real-time systems proof — not a static landing page or form-based CRUD app.",
      "Team collaboration with clear ownership of gameplay frontend under production-like pressure.",
      "Early proof of real-time state instincts that carried over to Omniful's live order tracking work.",
    ],
  },
  techStack: ["TypeScript", "React", "Redux Thunk", "Node.js", "Express.js", "MongoDB"],
  coverImage: "/work/wingshooter-cover.webp",
  screenshots: [
    {
      src: "/work/wingshooter-1.webp",
      caption: "Avatar and level selection before entering live gameplay.",
      alt: "WingShooter avatar selection screen with level picker and play button",
    },
    {
      src: "/work/wingshooter-2.webp",
      caption: "Player onboarding flow with name entry and game start.",
      alt: "WingShooter start screen with name entry modal",
    },
  ],
  liveUrl: "https://wingshooter.vercel.app/",
  githubUrl: "https://github.com/DeshmukhMandar3/WingShooter",
  featured: false,
  categories: ["Real-Time Systems", "Game Dev", "Team Project"],
  metrics: [
    { label: "Status", value: "Live" },
    { label: "Delivery", value: "Team sprint" },
    { label: "Timeline", value: "5 days" },
  ],
});
