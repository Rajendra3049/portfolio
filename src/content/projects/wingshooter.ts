import { projectSchema, type Project } from "@/entities/project";

export const wingShooterProject: Project = projectSchema.parse({
  title: "WingShooter",
  slug: "wingshooter",
  shortDescription:
    "Browser-based real-time shooting game with responsive controls, collision detection, and score-driven gameplay.",
  longDescription:
    "WingShooter is a collaborative browser game focused on real-time interaction, where players navigate shooting mechanics, scoring logic, and responsive UI feedback in a fast-paced gameplay loop.",
  engineeringHighlights: [
    "Implemented player controls, bullet mechanics, collision detection, scoring logic, and sound effects.",
    "Managed gameplay state with Redux Thunk for smooth and predictable state transitions.",
    "Collaborated in a team environment to deliver real-time gameplay mechanics in the browser.",
    "Optimized rendering performance to keep interactions responsive during active gameplay.",
  ],
  architectureNotes: [
    "Redux Thunk-based game state orchestration for action-driven updates.",
    "Componentized game surfaces for controls, targets, and score feedback.",
    "Event-driven collision and scoring pipeline for real-time responsiveness.",
    "Performance-conscious render updates for animation-heavy interaction loops.",
  ],
  techStack: [
    "TypeScript",
    "React",
    "Redux Thunk",
    "Node.js",
    "Express.js",
    "MongoDB",
  ],
  screenshots: ["/work/wingshooter-1.png", "/work/wingshooter-2.png"],
  liveUrl: "https://wingshooter.vercel.app/",
  githubUrl: "https://github.com/DeshmukhMandar3/WingShooter",
  featured: false,
  categories: ["Real-Time Systems", "Game Dev", "Team Project"],
  metrics: [
    { label: "Gameplay Systems", value: "5+" },
    { label: "Team Size", value: "4" },
  ],
  challenges: [
    "Maintaining smooth real-time interactions while managing collision and score updates.",
    "Coordinating frontend gameplay logic with team-owned backend APIs under tight timelines.",
  ],
  outcomes: [
    "Delivered a playable browser game with live deployment and collaborative team execution.",
    "Strengthened real-time state management and performance tuning skills in a product-like setting.",
  ],
});
