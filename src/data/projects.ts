export type ProjectLinks = {
  ios?: string;
  android?: string;
  github?: string;
};

export type Project = {
  slug: string;
  name: string;
  nameAr?: string;
  category: string;
  tagline: string;
  description: string;
  role: string;
  /** Set when the employer is verifiable (e.g. from the app's bundle identifier). */
  company?: string;
  stack: string[];
  /** Only ever contains links verified live — dead store listings are omitted
   *  so the UI never renders a button that 404s. */
  links: ProjectLinks;
  /** Real store artwork in /public/apps, or null to fall back to generated art. */
  icon: string | null;
  /** Real App Store marketing screenshots. Already device-framed by the client,
   *  so they must never be wrapped in another phone mockup. */
  screenshots?: string[];
  /** Intrinsic size of this project's screenshots. Listings shot on older
   *  iPhones are 9:16 rather than 9:19.5, and getting this wrong reserves the
   *  wrong height and reintroduces layout shift. Defaults to 540x1173. */
  screenshotSize?: { w: number; h: number };
  featured: boolean;
  /** Tailwind gradient stops for the card's ambient glow + fallback art. */
  accent: [string, string];
};

export const projects: Project[] = [
  {
    slug: "kanaf",
    name: "Kanaf",
    nameAr: "كَنَف",
    category: "GovTech · AI",
    tagline: "Custody visitation, handled with dignity.",
    description:
      "A Saudi Ministry of Justice–affiliated platform that helps separated parents arrange child visitation and document handover transparently, in a neutral environment that puts the child first. AI reads the court visitation deed and builds the schedule automatically; face recognition verifies identity at handover; geolocation confirms it happened at the approved point.",
    role: "Senior Flutter Developer · AI Native Engineer",
    company: "Tiebah Tech",
    stack: ["Flutter", "Dart", "AI Document Parsing", "Face Recognition", "Geolocation", "Clean Architecture"],
    links: {
      ios: "https://apps.apple.com/eg/app/al-kanaf/id6760188754",
      android: "https://play.google.com/store/apps/details?id=com.taibahtech.kanaf",
    },
    icon: "/apps/kanaf.jpg",
    screenshots: [
      "/apps/screens/kanaf-1.webp",
      "/apps/screens/kanaf-2.webp",
      "/apps/screens/kanaf-3.webp",
    ],
    featured: true,
    accent: ["#3B82F6", "#8B5CF6"],
  },
  {
    slug: "finzey",
    name: "FinZey",
    nameAr: "فينزي",
    category: "Fintech",
    tagline: "Personal financing, end to end in-app.",
    description:
      "A consumer finance application for Finzey Finance Company. Users apply for personal financing and track approval entirely inside the app — a fully digital experience with no branch visit, built around secure document handling and a carefully staged application flow.",
    role: "Flutter Developer",
    stack: ["Flutter", "Dart", "Bloc", "REST APIs", "Secure Storage", "Firebase"],
    links: {
      ios: "https://apps.apple.com/eg/app/finzey-%D9%81%D9%8A%D9%86%D8%B2%D9%8A/id6741531857",
      android: "https://play.google.com/store/apps/details?id=com.finzey.app",
    },
    icon: "/apps/finzey.jpg",
    screenshots: [
      "/apps/screens/finzey-1.webp",
      "/apps/screens/finzey-2.webp",
      "/apps/screens/finzey-3.webp",
    ],
    featured: true,
    accent: ["#10B981", "#3B82F6"],
  },
  {
    slug: "winveston",
    name: "WinVeston",
    nameAr: "وينفستن المالية",
    category: "Investment",
    tagline: "An all-in-one investment platform.",
    description:
      "Winveston Capital's investment app, built to make investing approachable and secure. It spans real estate and other high-potential asset classes, giving users the tools and insight to evaluate opportunities and track a growing portfolio.",
    role: "Flutter Developer",
    stack: ["Flutter", "Dart", "Bloc", "REST APIs", "Charts", "Firebase"],
    links: {
      ios: "https://apps.apple.com/eg/app/winveston-%D9%88%D9%8A%D9%86%D9%81%D8%B3%D8%AA%D9%86-%D8%A7%D9%84%D9%85%D8%A7%D9%84%D9%8A%D8%A9/id6742107431",
      android: "https://play.google.com/store/apps/details?id=com.winveston.app",
    },
    icon: "/apps/winveston.jpg",
    screenshots: [
      "/apps/screens/winveston-1.webp",
      "/apps/screens/winveston-2.webp",
      "/apps/screens/winveston-3.webp",
    ],
    featured: true,
    accent: ["#6366F1", "#22D3EE"],
  },
  {
    slug: "rentop",
    name: "Rentop",
    category: "Marketplace",
    tagline: "Rent the exact car you see, in Dubai.",
    description:
      "A Dubai car rental app with real-time availability, built on a promise the category usually breaks: you get the exact car you booked, not an 'or similar'. Supports delivery to hotel or airport, pay-on-delivery, and an optional no-deposit rental to avoid card holds.",
    role: "Flutter Developer",
    stack: ["Flutter", "Dart", "Google Maps", "Payment Gateways", "REST APIs", "Push Notifications"],
    links: {
      ios: "https://apps.apple.com/eg/app/rentop-car-rental-dubai/id1661948480",
      android: "https://play.google.com/store/apps/details?id=kwayes.rentop.app",
    },
    icon: "/apps/rentop.jpg",
    screenshots: [
      "/apps/screens/rentop-1.webp",
      "/apps/screens/rentop-2.webp",
      "/apps/screens/rentop-3.webp",
    ],
    featured: true,
    accent: ["#F59E0B", "#EF4444"],
  },
  {
    slug: "diet-watchers",
    name: "Diet Watchers",
    category: "Food & Health",
    tagline: "Calorie-counted meals, delivered.",
    description:
      "A healthy meal subscription service that removes the daily question of what to eat. Members pick a meal package and it arrives at the office or at home, every portion calorie-counted against their goal — weight loss or muscle gain — so no one has to shop, cook or do the arithmetic.",
    role: "Flutter Developer",
    stack: ["Flutter", "Dart", "REST APIs", "Payment Gateways", "Push Notifications", "Localization"],
    links: {
      ios: "https://apps.apple.com/eg/app/diet-watchers-enjoy-it/id6460976436",
      android: "https://play.google.com/store/apps/details?id=com.diet.watchers.app",
    },
    icon: "/apps/diet-watchers.jpg",
    screenshots: [
      "/apps/screens/diet-watchers-1.webp",
      "/apps/screens/diet-watchers-2.webp",
      "/apps/screens/diet-watchers-3.webp",
    ],
    featured: true,
    accent: ["#22C55E", "#84CC16"],
  },
  {
    slug: "arco",
    name: "Arco Services",
    nameAr: "آركو للخدمات",
    category: "Services",
    tagline: "Booking manpower services across Saudi Arabia.",
    description:
      "The service booking platform for Arco, one of Saudi Arabia's leading manpower companies. Customers browse and book tailored service packages delivered by Arco's professionals.",
    role: "Flutter Developer",
    stack: ["Flutter", "Dart", "REST APIs", "Payment Gateways", "Localization"],
    links: {
      ios: "https://apps.apple.com/eg/app/arco-%D8%A2%D8%B1%D9%83%D9%88/id1639416031",
      android: "https://play.google.com/store/apps/details?id=sa.arco.services",
    },
    icon: "/apps/arco.jpg",
    screenshots: [
      "/apps/screens/arco-1.webp",
      "/apps/screens/arco-2.webp",
      "/apps/screens/arco-3.webp",
    ],
    // Older-generation iPhone assets — 9:16, not the 9:19.5 of the others.
    screenshotSize: { w: 540, h: 960 },
    featured: true,
    accent: ["#0EA5E9", "#6366F1"],
  },
  {
    slug: "hayatona",
    name: "Hayatona Clinics",
    nameAr: "عيادات حياتنا",
    category: "HealthTech",
    tagline: "Virtual clinics for healthier living.",
    description:
      "A telehealth app for Hayatona, a health-awareness association focused on preventing chronic disease through nutrition, fitness and health education. Patients book virtual appointments with practitioners over video, audio or chat.",
    role: "Flutter Developer",
    stack: ["Flutter", "Dart", "Video Calling", "REST APIs", "Firebase", "Localization"],
    links: {
      ios: "https://apps.apple.com/us/app/hayatona-clinics-%D8%B9%D9%8A%D8%A7%D8%AF%D8%A7%D8%AA-%D8%AD%D9%8A%D8%A7%D8%AA%D9%86%D8%A7/id1582945676",
    },
    icon: "/apps/hayatona.jpg",
    screenshots: [
      "/apps/screens/hayatona-1.webp",
      "/apps/screens/hayatona-2.webp",
      "/apps/screens/hayatona-3.webp",
    ],
    screenshotSize: { w: 540, h: 960 },
    featured: true,
    accent: ["#14B8A6", "#3B82F6"],
  },
  {
    slug: "siru",
    name: "Siru Map",
    nameAr: "خرائط سيروا",
    category: "Geospatial",
    tagline: "Mapping the links between civilizations.",
    description:
      "A geospatial application that aligns the places and events of human civilizations on a shared map and timeline, letting users trace the connections between their own history and the rest of the world.",
    role: "Flutter Developer",
    stack: ["Flutter", "Dart", "Maps & GIS", "REST APIs", "Custom Animation"],
    links: {
      ios: "https://apps.apple.com/us/app/siru-%D8%B3%D9%8A%D8%B1%D9%88%D8%A7/id1645884389",
    },
    icon: "/apps/siru.jpg",
    screenshots: [
      "/apps/screens/siru-1.webp",
      "/apps/screens/siru-2.webp",
      "/apps/screens/siru-3.webp",
    ],
    screenshotSize: { w: 540, h: 960 },
    featured: true,
    accent: ["#F97316", "#EAB308"],
  },
  {
    slug: "meer",
    name: "Meer",
    nameAr: "مير",
    category: "Marketplace",
    tagline: "Where advertising talent meets business.",
    description:
      "A two-sided marketplace connecting creative talent in advertising and marketing with business owners. Creatives build profiles and showcase past work; businesses post projects and receive offers, with direct messaging throughout.",
    role: "Flutter Developer",
    stack: ["Flutter", "Dart", "Real-time Chat", "REST APIs", "Firebase", "File Upload"],
    links: {
      ios: "https://apps.apple.com/us/app/meer/id1610110479",
    },
    icon: "/apps/meer.jpg",
    screenshots: [
      "/apps/screens/meer-1.webp",
      "/apps/screens/meer-2.webp",
      "/apps/screens/meer-3.webp",
    ],
    screenshotSize: { w: 540, h: 960 },
    featured: true,
    accent: ["#A855F7", "#3B82F6"],
  },
  {
    slug: "on-nota",
    name: "On Nota",
    nameAr: "عالحساب",
    category: "E-Commerce",
    tagline: "Grocery shopping, simplified.",
    description:
      "A grocery and everyday-essentials shopping app focused on making the weekly shop fast and frictionless, from browsing to checkout.",
    role: "Flutter Developer",
    stack: ["Flutter", "Dart", "REST APIs", "Payment Gateways", "Push Notifications"],
    links: {
      ios: "https://apps.apple.com/eg/app/%D8%B9%D8%A7%D9%84%D8%AD%D8%B3%D8%A7%D8%A8/id6462117195",
    },
    icon: "/apps/on-nota.jpg",
    screenshots: [
      "/apps/screens/on-nota-1.webp",
      "/apps/screens/on-nota-2.webp",
      "/apps/screens/on-nota-3.webp",
    ],
    screenshotSize: { w: 540, h: 960 },
    featured: true,
    accent: ["#EC4899", "#F43F5E"],
  },

  /* ---------------------------------------------------------------------- */
  /* Additional shipped work                                                */
  /* ---------------------------------------------------------------------- */
  {
    slug: "almajdyah-residence",
    name: "Almajdyah Residence",
    nameAr: "الماجدية ريزدنس",
    category: "PropTech",
    tagline: "A residential community in your pocket.",
    description:
      "A resident-facing application for the Almajdyah Residence community, bringing services, requests and community information into a single app. Published to both stores during its run; the listings have since been retired by the client.",
    role: "Flutter Developer",
    stack: ["Flutter", "Dart", "REST APIs", "Firebase", "Push Notifications", "Localization"],
    links: {},
    icon: null,
    featured: false,
    accent: ["#8B5CF6", "#EC4899"],
  },
  {
    slug: "banhawy-ent",
    name: "Banhawy ENT",
    nameAr: "دكتور بنهاوي",
    category: "HealthTech",
    tagline: "A specialist clinic, closer to its patients.",
    description:
      "A patient-facing application for an ENT specialist practice, covering appointments and clinic information. Built during the Technoraft engagement.",
    role: "Flutter Developer",
    company: "Technoraft",
    stack: ["Flutter", "Dart", "REST APIs", "Firebase", "Localization"],
    links: {
      android: "https://play.google.com/store/apps/details?id=com.banhawy.technoraft",
    },
    icon: "/apps/banhawy.jpg",
    featured: false,
    accent: ["#06B6D4", "#0EA5E9"],
  },

  /* ---------------------------------------------------------------------- */
  /* Open source                                                            */
  /* ---------------------------------------------------------------------- */
  {
    slug: "heraj",
    name: "Heraj",
    category: "Open Source",
    tagline: "An auction experience, built in the open.",
    description:
      "An auction application built as a public Flutter project, covering listings, bidding flow and state management end to end.",
    role: "Author",
    stack: ["Flutter", "Dart", "State Management", "REST APIs"],
    links: { github: "https://github.com/moshkla/herag" },
    icon: null,
    featured: false,
    accent: ["#64748B", "#3B82F6"],
  },
  {
    slug: "fruit-market",
    name: "Fruit Market",
    category: "Open Source",
    tagline: "A commerce UI study in Flutter.",
    description:
      "An open-source storefront application exploring product browsing, cart and checkout patterns with clean, reusable Flutter components.",
    role: "Author",
    stack: ["Flutter", "Dart", "State Management", "Responsive UI"],
    links: { github: "https://github.com/moshkla/fruit_market/tree/master" },
    icon: null,
    featured: false,
    accent: ["#22C55E", "#10B981"],
  },
  {
    slug: "mymall",
    name: "MyMall",
    category: "Open Source",
    tagline: "Native Android shopping app.",
    description:
      "A native Android shopping application written in Java, from the year of native development that preceded the move to Flutter.",
    role: "Author",
    stack: ["Android", "Java", "REST APIs"],
    links: { github: "https://github.com/moshkla/MyMall" },
    icon: null,
    featured: false,
    accent: ["#F59E0B", "#84CC16"],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

/** Apps shipped to at least one public store — used by the stats counter. */
export const shippedAppCount = 20;
