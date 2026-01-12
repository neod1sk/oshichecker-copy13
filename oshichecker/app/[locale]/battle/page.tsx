import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n";
import BattleClient from "@/components/battle/BattleClient";

interface BattlePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function BattlePage({ params }: BattlePageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <BattleClient
      locale={locale}
      dict={{
        subtitle: dict.battle.subtitle,
        vs: dict.battle.vs,
        calculating: dict.battle.calculating,
        noCandidates: locale === "ko" 
          ? "후보가 없습니다. 설문조사를 먼저 완료해주세요." 
          : locale === "en" 
          ? "No candidates found. Please complete the survey first." 
          : "候補がありません。先にアンケートを完了してください。",
        restart: locale === "ko" 
          ? "처음부터 시작" 
          : locale === "en" 
          ? "Start Over" 
          : "最初から始める",
      }}
    />
  );
}
