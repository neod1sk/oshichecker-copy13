import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n";
import StartButton from "@/components/StartButton";

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = dict.home;

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] text-center animate-fade-in">
      {/* ロゴ・タイトル */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-display mb-2">
          <span className="text-gradient">{t.title}</span>
        </h1>
        <p className="text-gray-500 text-sm font-medium">
          {t.subtitle}
        </p>
      </div>

      {/* 説明文カード */}
      <div className="card p-6 mb-8 w-full max-w-sm animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <p className="text-gray-700 text-sm leading-relaxed">
          {t.description}
          <span className="text-orange-500 font-semibold">{t.descriptionHighlight}</span>
          {t.descriptionEnd}
        </p>
        
        <div className="mt-5 pt-5 border-t border-gray-100">
          <div className="step-list">
            <div className="step-item">
              <span className="step-icon">📝</span>
              <span>{t.step1}</span>
            </div>
            <div className="step-item">
              <span className="step-icon">⚔️</span>
              <span>{t.step2}</span>
            </div>
            <div className="step-item">
              <span className="step-icon">🏆</span>
              <span>{t.step3}</span>
            </div>
          </div>
        </div>
      </div>

      {/* スタートボタン（クリック時にリセット） */}
      <StartButton locale={locale} label={t.startButton} />

      {/* フッター */}
      <p className="mt-16 text-gray-400 text-xs">
        {t.footer}
      </p>
    </div>
  );
}
