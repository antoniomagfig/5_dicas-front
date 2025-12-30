"use client";

import { useState } from "react";

/* =======================
   TYPES
======================= */

type DicaUI = {
  numero: number;
  texto: string | null;
  revelada: boolean;
};

type Fase = "escolha_dica" | "palpite" | "fim_rodada";

type Props = {
  tipo: string;
  dicas: DicaUI[];
  fase: Fase;
  minhaVez: boolean;
  mensagemFim: string | null;

  onRevelarDica: (numero: number) => void;
  onPalpitar: (texto: string) => void;
  onPular: () => void;
  onAvancarRodada: () => void;
};

/* =======================
   COMPONENT
======================= */

export default function GameCard({
  tipo,
  dicas,
  fase,
  minhaVez,
  mensagemFim,
  onRevelarDica,
  onPalpitar,
  onPular,
  onAvancarRodada,
}: Props) {
  // ✅ ESTADO LOCAL DO INPUT
  const [palpiteTexto, setPalpiteTexto] = useState("");

  function handlePalpitar() {
    if (!palpiteTexto.trim()) return;
    onPalpitar(palpiteTexto);
    setPalpiteTexto(""); // limpa após enviar
  }

  return (
    <section className="bg-white rounded-3xl p-10 shadow-xl min-h-[80vh] flex flex-col gap-6">

      {/* Cabeçalho */}
      <div className="text-center">
        <span className="text-sm uppercase tracking-wide text-slate-500">
          Tipo da carta
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
          {tipo}
        </h2>
      </div>

      {/* Fim da rodada */}
      {fase === "fim_rodada" && mensagemFim ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
          <p className="text-2xl font-bold text-slate-900">
            {mensagemFim}
          </p>

          <button
            onClick={onAvancarRodada}
            className="px-8 py-3 rounded-2xl bg-blue-600 text-white
                       hover:bg-blue-500 transition font-semibold"
          >
            Próxima rodada
          </button>
        </div>
      ) : (
        <>
          {/* Dicas */}
          <div className="flex flex-col gap-3">
            {dicas.map((d) => (
              <button
                key={d.numero}
                onClick={() => onRevelarDica(d.numero)}
                disabled={!minhaVez || fase !== "escolha_dica" || d.revelada}
                className={`w-full text-left px-5 py-4 rounded-2xl border font-medium
                  ${
                    d.revelada
                      ? "bg-slate-50 text-slate-900"
                      : "bg-slate-100 hover:bg-slate-200"
                  }`}
              >
                <strong>Dica {d.numero}:</strong>{" "}
                {d.revelada ? d.texto : "?"}
              </button>
            ))}
          </div>

          {/* Palpite */}
          <div className="mt-auto flex gap-2">
            <input
              value={palpiteTexto}
              onChange={(e) => setPalpiteTexto(e.target.value)}
              disabled={!minhaVez || fase !== "palpite"}
              placeholder="Seu palpite"
              className="flex-1 border rounded-2xl px-4 py-3 outline-none disabled:bg-slate-100"
            />

            <button
              onClick={handlePalpitar}
              disabled={!minhaVez || fase !== "palpite"}
              className="px-6 py-3 rounded-2xl bg-blue-600 text-white
                         hover:bg-blue-500 transition font-semibold disabled:opacity-50"
            >
              Palpitar
            </button>

            <button
              onClick={onPular}
              disabled={!minhaVez || fase !== "palpite"}
              className="px-6 py-3 rounded-2xl bg-slate-700 text-white
                         hover:bg-slate-600 transition font-semibold disabled:opacity-50"
            >
              Pular
            </button>
          </div>
        </>
      )}
    </section>
  );
}