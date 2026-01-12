"use client";

import { useRouter } from "next/navigation";
import { useDiagnosis } from "@/context/DiagnosisContext";
import { Locale } from "@/i18n.config";

interface StartButtonProps {
  locale: Locale;
  label: string;
}

export default function StartButton({ locale, label }: StartButtonProps) {
  const router = useRouter();
  const { reset } = useDiagnosis();

  const handleClick = () => {
    // 前回の診断状態をリセット
    reset();
    
    // 状態更新とsessionStorageクリアが完了してから遷移
    // 遷移先のURLにresetパラメータを付けて、確実にリセットする
    setTimeout(() => {
      router.push(`/${locale}/survey?start=1`);
    }, 100);
  };

  return (
    <button
      onClick={handleClick}
      className="btn-primary text-lg px-12 py-4 animate-slide-up"
      style={{ animationDelay: "0.2s" }}
    >
      {label}
    </button>
  );
}
