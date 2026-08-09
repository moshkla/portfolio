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
  accent: string;
};

/** Every entry is drawn from the résumé skills list. */
export const skillCategories: SkillCategory[] = [
  {
    id: "mobile",
    title: "Mobile",
    description: "Cross-platform and native, shipped to both stores.",
    icon: Smartphone,
    accent: "from-blue-500/20 to-cyan-400/10",
    skills: ["Flutter", "Dart", "Android", "iOS", "Java", "Publish on all stores"],
  },
  {
    id: "architecture",
    title: "Architecture",
    description: "Structure that survives the second year of a codebase.",
    icon: Layers,
    accent: "from-violet-500/20 to-blue-400/10",
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
    accent: "from-sky-500/20 to-indigo-400/10",
    skills: ["Bloc", "Cubit", "Provider", "GetX", "Error Handling (dartz)"],
  },
  {
    id: "backend",
    title: "Backend & Data",
    description: "Everything behind the interface.",
    icon: Server,
    accent: "from-emerald-500/20 to-teal-400/10",
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
    accent: "from-blue-500/25 to-violet-400/10",
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
    accent: "from-orange-500/20 to-amber-400/10",
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
    accent: "from-pink-500/20 to-rose-400/10",
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
    accent: "from-fuchsia-500/20 to-purple-400/10",
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
