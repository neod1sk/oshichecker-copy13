"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, Locale } from "@/i18n.config";

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: Locale) => {
    // 現在のパスからロケールを置換
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <div className="lang-switcher">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleChange(locale)}
          className={
            locale === currentLocale ? "lang-btn-active" : "lang-btn"
          }
          aria-label={`Switch to ${locale}`}
        >
          {localeNames[locale]}
        </button>
      ))}
    </div>
  );
}
