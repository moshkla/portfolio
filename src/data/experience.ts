export type Experience = {
  id: string;
  company: string;
  role: string;
  location: string;
  /** Employment arrangement, e.g. "Full-time · Remote". Omitted when unknown. */
  type?: string;
  start: string;
  end: string;
  /** Rendered as "start — end"; when false the range is hidden entirely. */
  showDates: boolean;
  current?: boolean;
  description: string;
  highlights: string[];
};

/**
 * Positions exactly as listed on the résumé, newest first.
 * Where the résumé carries no dates, `showDates` is false rather than guessed.
 */
export const experiences: Experience[] = [
  {
    id: "tiebah-tech",
    company: "Tiebah Tech",
    role: "Senior Flutter Developer · AI Native Engineer",
    location: "Saudi Arabia",
    start: "2025",
    end: "Present",
    showDates: true,
    current: true,
    description:
      "Leading Flutter delivery on government-adjacent products while embedding AI directly into the engineering workflow — from architecture and code review to documentation and release automation.",
    highlights: [
      "Shipped Kanaf, a Saudi Ministry of Justice–affiliated custody visitation platform",
      "Integrated AI document parsing, face-recognition identity checks and geofenced handover verification",
      "Set architecture standards and reviewed code across the mobile team",
      "Runs an AI-native workflow: LLM-assisted development, review and documentation",
    ],
  },
  {
    id: "it-cores",
    company: "IT Cores",
    role: "Senior Flutter Developer",
    location: "Remote",
    start: "",
    end: "",
    showDates: false,
    description:
      "Senior-level Flutter delivery across client mobile products, owning feature architecture and release quality end to end.",
    highlights: [
      "Owned feature architecture on cross-platform client applications",
      "Applied clean architecture, SOLID and a feature-first project structure",
      "Mentored developers through structured code review",
    ],
  },
  {
    id: "code-link",
    company: "Code Link",
    role: "Flutter Developer (Mid-level → Senior)",
    location: "Saudi Arabia",
    type: "Full-time · Remote",
    start: "08/2022",
    end: "04/2024",
    showDates: true,
    description:
      "Nearly two years building and scaling production Flutter applications for the Saudi market, growing from mid-level into a senior role on the team.",
    highlights: [
      "Delivered multiple production apps published to the App Store and Google Play",
      "Built payment flows across MyFatoorah, Amazon Payfort, PayTabs, Apple Pay and Google Pay",
      "Implemented Bloc/Cubit state management on a clean architecture foundation",
      "Set up CI/CD with CodeMagic and over-the-air updates via Shorebird",
    ],
  },
  {
    id: "tcl",
    company: "TCL — Technical Chemical Laboratories",
    role: "Flutter Developer (Mid-level)",
    location: "United Arab Emirates",
    type: "Part-time · Remote",
    start: "01/2022",
    end: "08/2022",
    showDates: true,
    description:
      "Part-time cross-platform development for a UAE laboratory services company, delivering features alongside a distributed team.",
    highlights: [
      "Built and maintained Flutter features against RESTful backends",
      "Worked asynchronously across time zones with a remote team",
      "Integrated Firebase services including messaging and analytics",
    ],
  },
  {
    id: "metwereen",
    company: "Metwereen",
    role: "Flutter Developer (Junior)",
    location: "Egypt",
    start: "02/2021",
    end: "10/2022",
    showDates: true,
    description:
      "Built cross-platform mobile applications from design handoff through store release, developing depth in state management and responsive UI.",
    highlights: [
      "Translated designs into pixel-accurate, responsive Flutter interfaces",
      "Worked across Provider, Bloc and GetX state management",
      "Shipped applications to both app stores",
    ],
  },
  {
    id: "technoraft",
    company: "Technoraft",
    role: "Flutter Developer (Intern → Junior)",
    location: "Egypt",
    start: "08/2020",
    end: "01/2021",
    showDates: true,
    description:
      "First professional Flutter role, progressing from intern to junior developer while contributing to client mobile products.",
    highlights: [
      "Contributed production features to client applications including Banhawy ENT",
      "Learned testing, Git workflow and code review in a team setting",
    ],
  },
  {
    id: "freelance-android",
    company: "Freelance",
    role: "Android Developer",
    location: "Remote",
    start: "06/2019",
    end: "06/2020",
    showDates: true,
    description:
      "A year of native Android development for independent clients — the foundation beneath the cross-platform work that followed.",
    highlights: [
      "Built native Android applications in Java",
      "Handled client communication, scoping and delivery independently",
    ],
  },
  {
    id: "ibm",
    company: "IBM",
    role: "Trainee — Artificial Intelligence",
    location: "Egypt",
    start: "",
    end: "",
    showDates: false,
    description:
      "Formal training in artificial intelligence — the earliest thread of what is now an AI-native engineering practice.",
    highlights: ["Structured training in AI fundamentals and applied machine learning"],
  },
];
