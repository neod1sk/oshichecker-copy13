import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n";
import { Question, Member } from "@/lib/types";
import SurveyClient from "@/components/survey/SurveyClient";

// データをインポート
import questionsData from "@/data/questions.json";
import membersData from "@/data/members.json";

interface SurveyPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function SurveyPage({ params }: SurveyPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  // 型アサーション
  const questions = questionsData as Question[];
  const members = membersData as Member[];

  return (
    <SurveyClient
      questions={questions}
      members={members}
      locale={locale}
      dict={{
        loading: locale === "ko" ? "로딩 중..." : locale === "en" ? "Loading..." : "読み込み中...",
        calculating: locale === "ko" 
          ? "당신의 최애를 찾고 있습니다..." 
          : locale === "en" 
          ? "Finding your perfect match..." 
          : "あなたの推しを探しています...",
      }}
    />
  );
}
