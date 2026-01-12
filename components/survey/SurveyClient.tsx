"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDiagnosis } from "@/context/DiagnosisContext";
import { Question, QuestionOption, Member } from "@/lib/types";
import { Locale } from "@/i18n.config";
import { scoreMembersBySurvey, getTopCandidates } from "@/lib/scoring";
import { CANDIDATE_COUNT } from "@/lib/types";
import ProgressBar from "@/components/ui/ProgressBar";
import QuestionCard from "@/components/ui/QuestionCard";

interface SurveyClientProps {
  questions: Question[];
  members: Member[];
  locale: Locale;
  dict: {
    loading: string;
    calculating: string;
  };
}

export default function SurveyClient({
  questions,
  members,
  locale,
  dict,
}: SurveyClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, answerQuestion, setCandidates, reset } = useDiagnosis();
  const [isCalculating, setIsCalculating] = useState(false);
  const hasInitialized = useRef(false);

  // start=1 パラメータがある場合、または途中状態でない場合はリセット
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const isNewStart = searchParams.get("start") === "1";
    
    // 新規スタートの場合はリセット
    if (isNewStart) {
      reset();
      // URLからパラメータを削除
      router.replace(`/${locale}/survey`, { scroll: false });
    }
  }, [searchParams, reset, router, locale]);

  const currentQuestion = questions[state.currentQuestionIndex];
  const isComplete = state.currentQuestionIndex >= questions.length;

  // 質問に回答
  const handleAnswer = (option: QuestionOption) => {
    const scoreValue = option.scoreValue ?? 1;
    answerQuestion(option.scoreKey, scoreValue);
  };

  // アンケート完了時の処理
  useEffect(() => {
    if (isComplete && !isCalculating && state.candidates.length === 0) {
      setIsCalculating(true);

      // スコアリング実行
      const scored = scoreMembersBySurvey(members, state.surveyScores);
      const topCandidates = getTopCandidates(scored, CANDIDATE_COUNT);

      // 候補をセット
      setCandidates(topCandidates);

      // 少し待ってからバトルページへ遷移
      setTimeout(() => {
        router.push(`/${locale}/battle`);
      }, 800);
    }
  }, [isComplete, isCalculating, members, state.surveyScores, state.candidates.length, setCandidates, router, locale]);

  // 既にバトルに進んでいる場合はバトルページへリダイレクト
  useEffect(() => {
    if (state.candidates.length > 0 && state.currentBattleRound < 10) {
      router.push(`/${locale}/battle`);
    }
  }, [state.candidates.length, state.currentBattleRound, router, locale]);

  // 計算中の表示
  if (isCalculating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
        <div className="card p-8 w-full max-w-sm">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-100 to-pink-100 
            flex items-center justify-center animate-pulse">
            <span className="text-2xl">✨</span>
          </div>
          <p className="text-gray-600 font-medium">{dict.calculating}</p>
        </div>
      </div>
    );
  }

  // 質問がない場合
  if (!currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-gray-500">{dict.loading}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-[75vh] py-4">
      {/* プログレスバー */}
      <div className="w-full max-w-sm mb-6">
        <ProgressBar
          current={state.currentQuestionIndex + 1}
          total={questions.length}
        />
      </div>

      {/* 質問カード */}
      <div className="w-full max-w-sm" key={state.currentQuestionIndex}>
        <QuestionCard
          question={currentQuestion}
          locale={locale}
          onAnswer={handleAnswer}
          questionNumber={state.currentQuestionIndex + 1}
          totalQuestions={questions.length}
        />
      </div>

      {/* リセットボタン */}
      <button
        onClick={() => {
          reset();
          router.push(`/${locale}`);
        }}
        className="mt-8 text-sm text-gray-400 hover:text-gray-600 transition-colors"
      >
        最初からやり直す
      </button>
    </div>
  );
}
