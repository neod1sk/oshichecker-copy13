import { Locale, locales } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Providers from "@/components/Providers";
import Link from "next/link";

// 静的パラメータ生成
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <Providers>
      <main className="max-w-md mx-auto px-4 py-4 safe-top safe-bottom min-h-screen">
        {/* ヘッダー */}
        <header className="header">
          <Link 
            href={`/${locale}`}
            className="text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
          >
            {dict.common.appName}
          </Link>
          <LanguageSwitcher currentLocale={locale} />
        </header>
        
        {/* コンテンツ */}
        {children}
      </main>
    </Providers>
  );
}
