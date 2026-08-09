import type { LucideIcon } from "lucide-react";
import {
  Terminal,
  GitPullRequestArrow,
  FileText,
  Workflow,
  Blocks,
  MessageSquareCode,
} from "lucide-react";

export type AiPractice = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

/** The tools that are actually part of the daily workflow. */
export const aiTools = [
  "Claude Code",
  "OpenAI",
  "Cursor",
  "GitHub Copilot",
  "Large Language Models",
  "Prompt Engineering",
];

export const aiPractices: AiPractice[] = [
  {
    id: "development",
    title: "AI-Assisted Development",
    description:
      "Claude Code and Cursor sit in the editor, not on the side. Scaffolding, refactors and the tedious 80% move at a different speed — which leaves more attention for the 20% that actually needs judgement.",
    icon: Terminal,
  },
  {
    id: "review",
    title: "AI Code Reviews",
    description:
      "An LLM pass before the human pass. It catches the mechanical problems — null paths, missed error states, inconsistent conventions — so review conversations stay about design.",
    icon: GitPullRequestArrow,
  },
  {
    id: "architecture",
    title: "Architecture Generation",
    description:
      "Using models to pressure-test a structure before committing to it: generate the alternatives, argue against each, then build the one that survives.",
    icon: Blocks,
  },
  {
    id: "documentation",
    title: "Documentation",
    description:
      "Documentation that actually exists, because the cost of writing it collapsed. Onboarding guides, architecture notes and inline docs stay current instead of rotting.",
    icon: FileText,
  },
  {
    id: "automation",
    title: "Automation",
    description:
      "Release notes, changelogs, migration scripts and repetitive refactors — handed to a model with a tight spec and verified, not trusted blindly.",
    icon: Workflow,
  },
  {
    id: "product",
    title: "AI Inside the Product",
    description:
      "Shipped, not theoretical. Kanaf reads a court visitation deed with AI and builds the schedule from it — an LLM feature carrying real weight for real families.",
    icon: MessageSquareCode,
  },
];
