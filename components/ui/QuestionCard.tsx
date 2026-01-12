"use client";

import { Question, QuestionOption } from "@/lib/types";
import { Locale } from "@/i18n.config";
import { getLocalizedText } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  locale: Locale;
  onAnswer: (option: QuestionOption) => void;
  questionNumber: number;
  totalQuestions: number;
}

export default function QuestionCard({
  question,
  locale,
  onAnswer,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) {
  const questionText = getLocalizedText(question, locale);

  return (
    <div className="card p-6 w-full animate-scale-in">
      {/* 質問番号 */}
      <div className="text-center mb-4">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-600">
          Q{questionNumber} / {totalQuestions}
        </span>
      </div>

      {/* 質問文 */}
      <h2 className="text-lg font-bold text-gray-800 text-center mb-6 leading-relaxed">
        {questionText}
      </h2>

      {/* 選択肢 */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const optionText = getLocalizedText(option, locale);
          return (
            <button
              key={index}
              onClick={() => onAnswer(option)}
              className="w-full p-4 rounded-2xl text-left transition-all duration-200
                bg-white/60 border border-gray-200
                hover:bg-white hover:border-orange-300 hover:shadow-md
                active:scale-[0.98] active:bg-orange-50
                text-gray-700 font-medium"
            >
              <span className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-100 to-pink-100 
                  flex items-center justify-center text-sm font-semibold text-orange-500">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{optionText}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
