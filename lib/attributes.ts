import { Locale } from "@/i18n.config";

/**
 * 属性キーの定義
 * 新しい属性を追加する場合はここに追加してください
 */
export const ATTRIBUTE_KEYS = [
  "cute",
  "cool",
  "energetic",
  "calm",
  "funny",
  "mysterious",
] as const;

export type AttributeKey = (typeof ATTRIBUTE_KEYS)[number];

/**
 * 属性の表示ラベル（日/韓/英）
 */
export const ATTRIBUTE_LABELS: Record<
  AttributeKey,
  { ja: string; ko: string; en: string }
> = {
  cute: {
    ja: "可愛い",
    ko: "귀여운",
    en: "Cute",
  },
  cool: {
    ja: "クール",
    ko: "쿨한",
    en: "Cool",
  },
  energetic: {
    ja: "元気",
    ko: "활발한",
    en: "Energetic",
  },
  calm: {
    ja: "落ち着いた",
    ko: "차분한",
    en: "Calm",
  },
  funny: {
    ja: "おもしろい",
    ko: "재미있는",
    en: "Funny",
  },
  mysterious: {
    ja: "ミステリアス",
    ko: "미스터리한",
    en: "Mysterious",
  },
};

/**
 * 属性のカラー（UI表示用）
 */
export const ATTRIBUTE_COLORS: Record<AttributeKey, string> = {
  cute: "#f472b6",      // ピンク
  cool: "#60a5fa",      // ブルー
  energetic: "#fbbf24", // イエロー
  calm: "#a78bfa",      // パープル
  funny: "#34d399",     // グリーン
  mysterious: "#818cf8", // インディゴ
};

/**
 * ロケールに応じた属性ラベルを取得
 */
export function getAttributeLabel(key: AttributeKey, locale: Locale): string {
  const labels = ATTRIBUTE_LABELS[key];
  if (!labels) return key;
  return labels[locale] || labels.ja;
}

/**
 * 属性キーが有効かどうかを判定
 */
export function isValidAttributeKey(key: string): key is AttributeKey {
  return ATTRIBUTE_KEYS.includes(key as AttributeKey);
}

/**
 * 属性のカラーを取得
 */
export function getAttributeColor(key: AttributeKey): string {
  return ATTRIBUTE_COLORS[key] || "#9ca3af";
}
