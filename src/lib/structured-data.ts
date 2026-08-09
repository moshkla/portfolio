import { profile, siteConfig } from "@/data/profile";
import { experiences } from "@/data/experience";
import { skillCategories } from "@/data/skills";

/**
 * JSON-LD for rich results. Person + WebSite + ProfilePage, all derived from
 * the same data the page renders so the markup can't drift from the content.
 */
export function buildStructuredData() {
  const allSkills = Array.from(new Set(skillCategories.flatMap((c) => c.skills)));
  const current = experiences.find((e) => e.current);

  const person = {
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: profile.name,
    jobTitle: profile.tagline,
    description: profile.shortBio,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    url: siteConfig.url,
    image: `${siteConfig.url}/opengraph-image`,
    knowsLanguage: profile.languages.map((l) => l.name),
    knowsAbout: allSkills,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.education.school,
    },
    sameAs: [profile.links.github, profile.links.linkedin],
    ...(current
      ? { worksFor: { "@type": "Organization", name: current.company } }
      : {}),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        publisher: { "@id": `${siteConfig.url}/#person` },
        inLanguage: "en",
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteConfig.url}/#profilepage`,
        url: siteConfig.url,
        name: siteConfig.title,
        about: { "@id": `${siteConfig.url}/#person` },
        isPartOf: { "@id": `${siteConfig.url}/#website` },
      },
    ],
  };
}
