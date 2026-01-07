"use client";

import { useRouter, usePathname } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  // ❌ NÃO mostra na tela de jogo
  if (pathname.startsWith("/jogo") || pathname === "/home" || pathname === "/") {
    return null;
  }

  return (
    <button
      onClick={() => router.back()}
      className="
        fixed top-4 left-4 z-50
        text-slate-300 text-sm
        hover:text-white transition
        flex items-center gap-2
      "
    >
      ← Voltar
    </button>
  );
}