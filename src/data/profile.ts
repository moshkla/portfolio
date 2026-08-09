/**
 * Single source of truth for identity + contact.
 * Every value here comes from the résumé — nothing is invented.
 */

export const profile = {
  name: "Anas Abd Elazim",
  firstName: "Anas",
  title: "Senior Flutter Developer",
  subtitle: "AI Native Engineer",
  tagline: "Senior Flutter Developer & AI Native Engineer",

  /** Hero paragraph — résumé summary, rewritten for the web. */
  intro:
    "I build cross-platform mobile products that ship to real users at scale. Five years in Flutter and Dart — one of them in native Android — spanning clean architecture, state management and pixel-accurate UI. Today I work AI-native: LLMs sit inside my daily workflow, from architecture and code review to documentation and automation.",

  shortBio:
    "Senior Flutter Developer and AI Native Engineer with 5+ years building cross-platform mobile applications for teams across Saudi Arabia, the UAE and Egypt.",

  location: "Egypt · Working with Saudi Arabia & UAE",
  availability: "Available for remote or on-site work",

  email: "anasabdelazim602@gmail.com",
  phone: "+201060736137",
  phoneDisplay: "+20 106 073 6137",

  links: {
    github: "https://github.com/moshkla",
    linkedin: "https://www.linkedin.com/in/anas-abd-elazim-b096b317b/",
    whatsapp: "https://wa.me/201060736137",
    email: "mailto:anasabdelazim602@gmail.com",
    phone: "tel:+201060736137",
    resume: "/resume/anas-abd-elazim-resume.pdf",
  },

  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Professional" },
  ],

  education: {
    degree: "Bachelor of Computers and Information",
    major: "Computer Science",
    school: "Mansoura University",
    year: "2020",
  },

  /** Positioning pillars rendered in the About section. */
  pillars: [
    "5+ Years Experience",
    "Flutter Expert",
    "AI Native Developer",
    "Cross-Platform Engineer",
    "Saudi Arabia Experience",
    "Remote Experience",
  ],
} as const;

export const siteConfig = {
  name: profile.name,
  title: `${profile.name} — ${profile.tagline}`,
  description: profile.shortBio,
  /** Override via NEXT_PUBLIC_SITE_URL at build time on Vercel. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://anasabdelazim.dev",
  locale: "en_US",
  keywords: [
    "Anas Abd Elazim",
    "Flutter Developer",
    "Senior Flutter Developer",
    "AI Native Engineer",
    "Dart Developer",
    "Mobile App Developer",
    "Cross-Platform Developer",
    "Clean Architecture",
    "Bloc",
    "Saudi Arabia",
    "Remote Flutter Developer",
  ],
} as const;
