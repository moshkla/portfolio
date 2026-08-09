"use client";

import { Download, Github, Linkedin, Mail, MessageCircle, Phone } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { fadeUp, scaleIn } from "@/lib/motion";
import { ContactForm } from "./contact-form";

const channels = [
  {
    id: "email",
    label: "Email",
    value: profile.email,
    href: profile.links.email,
    icon: Mail,
    external: false,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: profile.phoneDisplay,
    href: profile.links.whatsapp,
    icon: MessageCircle,
    external: true,
  },
  {
    id: "phone",
    label: "Phone",
    value: profile.phoneDisplay,
    href: profile.links.phone,
    icon: Phone,
    external: false,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "in/anas-abd-elazim",
    href: profile.links.linkedin,
    icon: Linkedin,
    external: true,
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/moshkla",
    href: profile.links.github,
    icon: Github,
    external: true,
  },
  {
    id: "resume",
    label: "Résumé",
    value: "Download PDF",
    href: profile.links.resume,
    icon: Download,
    external: false,
    download: true,
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_50%_60%_at_50%_100%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_70%)]"
      />

      <div className="container-page relative">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something."
          description="Open to senior Flutter roles, consulting engagements and AI-native product work — remote or on-site."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          {/* Channels */}
          <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1" gap={0.06}>
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <StaggerItem key={channel.id} variants={scaleIn}>
                  <a
                    href={channel.href}
                    {...(channel.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    {...(channel.download ? { download: true } : {})}
                    className="group/link block"
                  >
                    <SpotlightCard className="flex items-center gap-4 p-5">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-foreground/[0.03] text-accent transition-transform duration-500 group-hover:scale-110">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium">{channel.label}</span>
                        <span className="block truncate text-sm text-muted-foreground">
                          {channel.value}
                        </span>
                      </span>
                    </SpotlightCard>
                  </a>
                </StaggerItem>
              );
            })}
          </StaggerGroup>

          {/* Form */}
          <Reveal variants={fadeUp} className="lg:col-span-7">
            <SpotlightCard className="h-full p-7 sm:p-9">
              <h3 className="text-xl font-semibold tracking-tight">Send a message</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Tell me what you&apos;re building. I usually reply within a day.
              </p>

              <div className="mt-7">
                <ContactForm />
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
