import { Locale, locales, defaultLocale } from "@/i18n.config";

// 翻訳ファイルを動的に読み込み
const dictionaries = {
  ja: () => import("@/messages/ja.json").then((module) => module.default),
  ko: () => import("@/messages/ko.json").then((module) => module.default),
  en: () => import("@/messages/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  if (!locales.includes(locale)) {
    return dictionaries[defaultLocale]();
  }
  return dictionaries[locale]();
};

// ロケールの検証
export const isValidLocale = (locale: string): locale is Locale => {
  return locales.includes(locale as Locale);
};
