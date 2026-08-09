export type Stat = {
  id: string;
  /** Numeric target for the animated counter. `null` renders `display` as text. */
  value: number | null;
  display?: string;
  suffix?: string;
  label: string;
  hint: string;
};

export const stats: Stat[] = [
  {
    id: "years",
    value: 5,
    suffix: "+",
    label: "Years Experience",
    hint: "Building cross-platform mobile since 2019",
  },
  {
    id: "projects",
    value: 20,
    suffix: "+",
    label: "Projects Shipped",
    hint: "Published to the App Store and Google Play",
  },
  {
    id: "users",
    value: null,
    display: "Millions",
    suffix: "+",
    label: "Users Reached",
    hint: "Across fintech, govtech, health and commerce",
  },
  {
    id: "remote",
    value: 100,
    suffix: "%",
    label: "Remote Experience",
    hint: "Delivered across Saudi Arabia, the UAE and Egypt",
  },
];
