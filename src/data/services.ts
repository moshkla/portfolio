import type { LucideIcon } from "lucide-react";
import {
  Smartphone,
  Blocks,
  SearchCheck,
  Gauge,
  Users,
  BrainCircuit,
} from "lucide-react";

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  points: string[];
};

export const services: Service[] = [
  {
    id: "flutter-development",
    title: "Flutter Development",
    description:
      "End-to-end cross-platform apps for iOS and Android — from an empty repository to a live store listing.",
    icon: Smartphone,
    points: ["iOS & Android from one codebase", "Store submission and release", "Pixel-accurate UI"],
  },
  {
    id: "architecture-consulting",
    title: "Architecture Consulting",
    description:
      "Clean architecture, SOLID and feature-first structure — designed so the codebase is still pleasant to work in two years from now.",
    icon: Blocks,
    points: ["Clean architecture & SOLID", "State management strategy", "Scalable project structure"],
  },
  {
    id: "code-review",
    title: "Code Review",
    description:
      "Structured review that raises the floor of a whole team, not just one pull request.",
    icon: SearchCheck,
    points: ["Actionable, specific feedback", "Team conventions and standards", "AI-assisted review passes"],
  },
  {
    id: "performance",
    title: "Performance Optimization",
    description:
      "Diagnose and fix the jank — rebuild storms, oversized frames, slow startup and memory pressure.",
    icon: Gauge,
    points: ["Frame and rebuild profiling", "Startup time reduction", "Memory and asset optimization"],
  },
  {
    id: "technical-leadership",
    title: "Technical Leadership",
    description:
      "Owning delivery across a mobile team — technical direction, mentoring and release quality.",
    icon: Users,
    points: ["Technical direction & planning", "Mentoring developers", "Release and CI/CD ownership"],
  },
  {
    id: "ai-integration",
    title: "AI Integration",
    description:
      "Putting LLMs inside the product and inside the workflow, with the judgement to know where they don't belong.",
    icon: BrainCircuit,
    points: ["LLM features in production apps", "Prompt engineering", "AI-native team workflows"],
  },
];
