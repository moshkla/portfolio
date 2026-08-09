/**
 * i18n groundwork. Copy already lives outside JSX (see `src/data/*` and the
 * dictionaries beside this file), so adding a locale means adding a dictionary
 * and wrapping routes in `app/[locale]` — no component rewrites.
 */
export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

/** Arabic is RTL — drives `dir` on <html> once locale routing is enabled. */
export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  ar: () => import("./dictionaries/ar.json").then((m) => m.default),
} as const;

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
