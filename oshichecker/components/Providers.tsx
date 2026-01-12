"use client";

import { ReactNode } from "react";
import { DiagnosisProvider } from "@/context/DiagnosisContext";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <DiagnosisProvider>
      {children}
    </DiagnosisProvider>
  );
}
