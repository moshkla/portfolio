"use client";

import { useCallback } from "react";
import { useTheme } from "next-themes";
import {
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Moon,
  Phone,
  Sun,
  Smartphone,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { navItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export function CommandMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { setTheme, resolvedTheme } = useTheme();

  // The ⌘K shortcut lives in <SiteShell> — this component is lazy-loaded, so a
  // listener here wouldn't exist until after the first open.

  const run = useCallback(
    (action: () => void) => {
      onOpenChange(false);
      // Let the dialog finish closing before we scroll or navigate.
      requestAnimationFrame(action);
    },
    [onOpenChange]
  );

  const goTo = (href: string) =>
    run(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }));

  const openUrl = (url: string) => run(() => window.open(url, "_blank", "noopener,noreferrer"));

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Jump to a section, project or contact…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigate">
          {navItems.map((item) => (
            <CommandItem key={item.id} value={`go ${item.label}`} onSelect={() => goTo(item.href)}>
              <ArrowUpRight />
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Projects">
          {projects
            .filter((p) => p.links.ios || p.links.android || p.links.github)
            .map((project) => {
              const url = project.links.ios ?? project.links.android ?? project.links.github!;
              return (
                <CommandItem
                  key={project.slug}
                  value={`project ${project.name} ${project.category}`}
                  onSelect={() => openUrl(url)}
                >
                  <Smartphone />
                  <span>{project.name}</span>
                  <CommandShortcut>{project.category}</CommandShortcut>
                </CommandItem>
              );
            })}
        </CommandGroup>

        <CommandGroup heading="Contact">
          <CommandItem value="email" onSelect={() => run(() => (window.location.href = profile.links.email))}>
            <Mail />
            <span>Email</span>
            <CommandShortcut>{profile.email}</CommandShortcut>
          </CommandItem>
          <CommandItem value="whatsapp" onSelect={() => openUrl(profile.links.whatsapp)}>
            <MessageCircle />
            <span>WhatsApp</span>
          </CommandItem>
          <CommandItem value="phone call" onSelect={() => run(() => (window.location.href = profile.links.phone))}>
            <Phone />
            <span>Call</span>
            <CommandShortcut>{profile.phoneDisplay}</CommandShortcut>
          </CommandItem>
          <CommandItem value="linkedin" onSelect={() => openUrl(profile.links.linkedin)}>
            <Linkedin />
            <span>LinkedIn</span>
          </CommandItem>
          <CommandItem value="github" onSelect={() => openUrl(profile.links.github)}>
            <Github />
            <span>GitHub</span>
          </CommandItem>
          <CommandItem
            value="download resume cv"
            onSelect={() => run(() => window.open(profile.links.resume, "_blank"))}
          >
            <Download />
            <span>Download résumé</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Theme">
          <CommandItem
            value="toggle theme dark light"
            onSelect={() => run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}
          >
            {resolvedTheme === "dark" ? <Sun /> : <Moon />}
            <span>Switch to {resolvedTheme === "dark" ? "light" : "dark"} theme</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
