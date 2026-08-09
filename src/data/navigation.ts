export type NavItem = {
  id: string;
  label: string;
  href: string;
};

/** Order here drives the navbar, the mobile sheet and the ⌘K menu. */
export const navItems: NavItem[] = [
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "ai-native", label: "AI Native", href: "#ai-native" },
  { id: "services", label: "Services", href: "#services" },
  { id: "contact", label: "Contact", href: "#contact" },
];

/** Every section id observed for scroll-spy, including the hero. */
export const sectionIds = ["hero", ...navItems.map((i) => i.id)];
