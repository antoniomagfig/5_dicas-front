"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useGame } from "@/context/GameContext";
import api from "@/services/axios";

export default function Sala() {
  const router = useRouter();
  const { sala, jogador, setSala } = useGame();

  useEffect(() => {
    if (!sala || !jogador) {
      router.push("/home");
    }
  }, [sala, jogador, router]);

  // 🔁 Polling simples (a cada 3s)
  useEffect(() => {
    if (!sala) return;

    const interval = setInterval(async () => {
      try {
        const res = await api.get(`/sala/${sala.codigo}`);
        setSala(res.data);

        if (res.data.status === "em_jogo") {
          router.push("/jogo");
        }
      } catch {}
    }, 3000);

    return () => clearInterval(interval);
  }, [sala, router, setSala]);

  if (!sala) return null;

  function copiarCodigo() {
    navigator.clipboard.writeText(sala!.codigo);
    alert("Código copiado!");
  }

  function cancelarSala() {
    // opcional: chamar backend para remover sala
    setSala(null);
    router.push("/home");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl p-8 flex flex-col gap-6 shadow-lg text-center">

        <h1 className="text-2xl font-bold">Sala criada</h1>

        {/* Código */}
        <div>
          <p className="text-sm text-slate-400">Código da sala</p>
          <p className="text-3xl font-mono font-bold tracking-widest">
            {sala.codigo}
          </p>
        </div>

        {/* Informações */}
        <div className="flex justify-center gap-8">
          <div>
            <p className="text-sm text-slate-400">Rodadas</p>
            <p className="text-xl font-bold">{sala.totalRodadas}</p>
          </div>

          <div>
            <p className="text-sm text-slate-400">Jogadores</p>
            <p className="text-xl font-bold">
              {sala.jogadores.length} / 2
            </p>
          </div>
        </div>

        {/* Status */}
        <p className="text-slate-300">
          ⏳ Aguardando outro jogador…
        </p>

        {/* Ações */}
        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={copiarCodigo}
            className="py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition"
          >
            Copiar código
          </button>

          <button
            onClick={cancelarSala}
            className="py-3 rounded-xl bg-slate-700 hover:bg-slate-600 transition"
          >
            Cancelar sala
          </button>
        </div>
      </div>
    </main>
  );
}
