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
    icon: Smartphone,
    accent: "from-primary/[0.10] to-transparent",
    skills: ["Flutter", "Dart", "Android", "iOS", "Java", "Store releases"],
  },
  {
    id: "architecture",
    title: "Architecture",
    icon: Layers,
    accent: "from-primary/[0.10] to-transparent",
    skills: [
      "Clean Architecture",
      "SOLID Principles",
      "Repository Pattern",
      "MVVM",
      "Feature-First",
      "DI (GetIt)",
    ],
  },
  {
    id: "state",
    title: "State Management",
    icon: Boxes,
    accent: "from-primary/[0.10] to-transparent",
    skills: ["Bloc", "Cubit", "Provider", "GetX", "dartz"],
  },
  {
    id: "backend",
    title: "Backend & Data",
    icon: Server,
    accent: "from-primary/[0.10] to-transparent",
    skills: [
      "Firebase",
      "REST APIs",
      "GraphQL",
      "SQFlite",
      "Hive",
      "Local storage",
      "Pusher",
    ],
  },
  {
    id: "ai",
    title: "AI",
    icon: Sparkles,
    accent: "from-primary/[0.10] to-transparent",
    skills: [
      "Large Language Models",
      "Prompt Engineering",
      "AI Integration",
      "AI-assisted development & review",
    ],
  },
  {
    id: "devops",
    title: "DevOps & Quality",
    icon: Rocket,
    accent: "from-primary/[0.10] to-transparent",
    skills: [
      "GitHub Actions",
      "CodeMagic",
      "Shorebird",
      "Unit & Widget Testing",
      "TDD",
      "Crashlytics",
      "Code Review",
    ],
  },
  {
    id: "integrations",
    title: "Integrations",
    icon: CreditCard,
    accent: "from-primary/[0.10] to-transparent",
    skills: [
      "MyFatoorah",
      "Amazon Payfort",
      "PayTabs",
      "Apple Pay",
      "Google Pay",
      "In-App Purchase",
      "Google Maps",
      "Agora & Zoom",
      "Push & Dynamic Links",
    ],
  },
  {
    id: "craft",
    title: "UI & Craft",
    icon: Palette,
    accent: "from-primary/[0.10] to-transparent",
    skills: [
      "UI/UX Design",
      "Animation",
      "Responsive UI",
      "Multi-Theming",
      "Localization & RTL",
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
