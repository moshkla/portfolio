import type { LucideIcon } from "lucide-react";
import {
  Smartphone,
  Layers,
  Boxes,
  Server,
  Sparkles,
  Rocket,
  CreditCard,
  Palette,
} from "lucide-react";

export type SkillCategory = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  skills: string[];
  /** Drives the per-card accent gradient. */
  /** Gradient stops for the card's hover wash. Every category carries the
   *  same value: these were eight different Tailwind hues (blue, violet, sky,
   *  emerald, orange, pink, fuchsia), which put a rainbow behind a list of
   *  engineering skills and competed with the real app artwork further down
   *  the page. The colour on this site belongs to the shipped work. */
  accent: string;
};

/** Every entry is drawn from the résumé skills list. */
export const skillCategories: SkillCategory[] = [
  {
    id: "mobile",
    title: "Mobile",
    description: "Cross-platform and native, shipped to both stores.",
    icon: Smartphone,
    accent: "from-primary/[0.10] to-transparent",
    skills: ["Flutter", "Dart", "Android", "iOS", "Java", "Publish on all stores"],
  },
  {
    id: "architecture",
    title: "Architecture",
    description: "Structure that survives the second year of a codebase.",
    icon: Layers,
    accent: "from-primary/[0.10] to-transparent",
    skills: [
      "Clean Architecture",
      "SOLID Principles",
      "Repository Pattern",
      "MVVM",
      "Feature-First",
      "Dependency Injection (GetIt)",
    ],
  },
  {
    id: "state",
    title: "State Management",
    description: "Predictable state at every scale of app.",
    icon: Boxes,
    accent: "from-primary/[0.10] to-transparent",
    skills: ["Bloc", "Cubit", "Provider", "GetX", "Error Handling (dartz)"],
  },
  {
    id: "backend",
    title: "Backend & Data",
    description: "Everything behind the interface.",
    icon: Server,
    accent: "from-primary/[0.10] to-transparent",
    skills: [
      "Firebase",
      "REST APIs",
      "GraphQL",
      "SQFlite",
      "Hive",
      "SharedPreferences",
      "GetStorage",
      "Streaming (Pusher & Firebase)",
    ],
  },
  {
    id: "ai",
    title: "AI",
    description: "Not a buzzword — a daily engineering tool.",
    icon: Sparkles,
    accent: "from-primary/[0.10] to-transparent",
    skills: [
      "Large Language Models",
      "Prompt Engineering",
      "AI Integration",
      "AI-Assisted Development",
      "AI Code Review",
    ],
  },
  {
    id: "devops",
    title: "DevOps & Quality",
    description: "Ship fast without shipping regressions.",
    icon: Rocket,
    accent: "from-primary/[0.10] to-transparent",
    skills: [
      "GitHub Actions",
      "CodeMagic",
      "Shorebird (Code Push)",
      "Unit & Widget Testing",
      "TDD",
      "Crashlytics",
      "Git",
      "Code Review",
    ],
  },
  {
    id: "integrations",
    title: "Integrations",
    description: "The plumbing real products need.",
    icon: CreditCard,
    accent: "from-primary/[0.10] to-transparent",
    skills: [
      "MyFatoorah",
      "Amazon Payfort",
      "PayTabs",
      "Apple Pay",
      "Google Pay",
      "In-App Purchase",
      "Google Maps & Flutter Map",
      "Agora & Zoom",
      "Firebase Messaging",
      "Dynamic Links (Branch & Firebase)",
    ],
  },
  {
    id: "craft",
    title: "UI & Craft",
    description: "Interfaces that feel considered on every screen size.",
    icon: Palette,
    accent: "from-primary/[0.10] to-transparent",
    skills: [
      "UI/UX Design",
      "Implicit & Explicit Animation",
      "Responsive (MediaQuery & ScreenUtil)",
      "Responsive Framework",
      "Multi-Theming",
      "Localization",
    ],
  },
];

/** Flattened marquee strip under the hero. */
export const marqueeSkills = [
  "Flutter",
  "Dart",
  "Bloc",
  "Clean Architecture",
  "Firebase",
  "GraphQL",
  "iOS",
  "Android",
  "LLMs",
  "Prompt Engineering",
  "CodeMagic",
  "Shorebird",
  "GetX",
  "Provider",
  "REST APIs",
  "TDD",
  "SOLID",
  "Crashlytics",
];
