import Link from "next/link";
import { Github, Linkedin, Mail, MessageCircle, Phone } from "lucide-react";
import { profile } from "@/data/profile";
import { navItems } from "@/data/navigation";

const socials = [
  { label: "GitHub", href: profile.links.github, icon: Github, external: true },
  { label: "LinkedIn", href: profile.links.linkedin, icon: Linkedin, external: true },
  { label: "WhatsApp", href: profile.links.whatsapp, icon: MessageCircle, external: true },
  { label: "Email", href: profile.links.email, icon: Mail, external: false },
  { label: "Phone", href: profile.links.phone, icon: Phone, external: false },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border">
      <div className="container-page py-16">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Link href="#hero" className="flex items-center gap-2.5 text-sm font-semibold">
              <span className="grid size-8 place-items-center rounded-lg bg-primary-strong text-primary-foreground text-xs font-bold">
                AA
              </span>
              {profile.name}
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {profile.tagline}. {profile.availability}.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {year} {profile.name}. Built with Next.js, Tailwind CSS and Framer Motion.
          </p>

          <ul className="flex items-center gap-2">
            {socials.map(({ label, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
