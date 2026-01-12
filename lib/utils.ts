import { Locale } from "@/i18n.config";

/**
 * ロケールに応じた名前を取得
 */
export function getLocalizedName(
  item: { name: string; nameKo?: string; nameEn?: string },
  locale: Locale
): string {
  switch (locale) {
    case "ko":
      return item.nameKo || item.name;
    case "en":
      return item.nameEn || item.name;
    default:
      return item.name;
  }
}

/**
 * ロケールに応じたテキストを取得
 */
export function getLocalizedText(
  item: { text: string; textKo?: string; textEn?: string },
  locale: Locale
): string {
  switch (locale) {
    case "ko":
      return item.textKo || item.text;
    case "en":
      return item.textEn || item.text;
    default:
      return item.text;
  }
}

/**
 * 配列をシャッフル（Fisher-Yates）
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * 画像URLがローカルか外部かを判定
 */
export function isExternalUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}
