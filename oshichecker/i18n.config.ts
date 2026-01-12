export const locales = ["ja", "ko", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ja";

export const localeNames: Record<Locale, string> = {
  ja: "JP",
  ko: "KR",
  en: "EN",
};

export const localeLabels: Record<Locale, string> = {
  ja: "日本語",
  ko: "한국어",
  en: "English",
};
