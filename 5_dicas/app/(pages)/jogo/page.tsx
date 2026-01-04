"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import { socket } from "@/services/socket";
import { useGame } from "@/context/GameContext";
import { useAuth } from "@/context/AuthContext";

import PlayerPanel from "@/components/PlayerPanel";
import GameCard from "@/components/GameCard";

/* ======================
   TYPES
====================== */

type Palpite = {
  jogadorId: number;
  texto: string;
};

type Dica = {
  numero: number;
  texto: string;
};

type DicaUI = {
  numero: number;
  texto: string | null;
  revelada: boolean;
};

type GameState = {
  fase: "escolha_dica" | "palpite" | "fim_rodada";
  turnoJogadorId: number;
  dicasReveladas: number[];
  palpites: Palpite[];
  mensagemFim: string | null;
  pontos: Record<number, number>;
};

/* ======================
   COMPONENT
====================== */

export default function Jogo() {
  const router = useRouter();

  const { sala, setSala } = useGame();
  const { user, refreshUser } = useAuth();

  /* ======================
     GUARDS
  ====================== */

  if (!user || !sala) return null;

  const usuario = user;
  const salaAtual = sala;
  const state: GameState = salaAtual.gameState;

  /* ======================
     SOCKET
  ====================== */

  useEffect(() => {
    socket.emit("sala:join", {
      codigo: salaAtual.codigo,
      jogadorId: usuario.id,
    });

    const handler = (novaSala: typeof salaAtual) => {
      setSala(novaSala);
    };

    socket.on("sala:state", handler);

    return () => {
      socket.off("sala:state", handler);
    };
  }, [salaAtual.codigo, usuario.id, setSala]);

  /* ======================
     ESTADOS DERIVADOS
  ====================== */

  if (salaAtual.jogadores.length < 2) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <p>Aguardando adversário...</p>
      </main>
    );
  }

  const cartaAtual = salaAtual.cartas[salaAtual.rodadaAtual - 1];

  if (!cartaAtual) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <p>Carregando carta...</p>
      </main>
    );
  }

  const minhaVez = state.turnoJogadorId === usuario.id;

  /* ======================
     DICAS UI
  ====================== */

  const dicasUI: DicaUI[] = useMemo(() => {
    return cartaAtual.dicas
      .slice()
      .sort((a: Dica, b: Dica) => a.numero - b.numero)
      .map((d: Dica) => ({
        numero: d.numero,
        revelada: state.dicasReveladas.includes(d.numero),
        texto: state.dicasReveladas.includes(d.numero) ? d.texto : null,
      }));
  }, [cartaAtual.dicas, state.dicasReveladas]);

  /* ======================
     ACTIONS
  ====================== */

  function revelarDica(numero: number) {
    socket.emit("jogo:revelarDica", {
      codigo: salaAtual.codigo,
      jogadorId: usuario.id,
      numero,
    });
  }

  function palpitar(texto: string) {
    socket.emit("jogo:palpitar", {
      codigo: salaAtual.codigo,
      jogadorId: usuario.id,
      texto,
    });
  }

  function pular() {
    socket.emit("jogo:pular", {
      codigo: salaAtual.codigo,
      jogadorId: usuario.id,
    });
  }

  function avancarRodada() {
    socket.emit("jogo:proximaRodada", {
      codigo: salaAtual.codigo,
    });
  }

  async function voltarMenu() {
    await refreshUser(); // 🔄 atualiza vitórias/derrotas
    setSala(null);
    router.push("/home");
  }

  /* ======================
     RENDER
  ====================== */

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center relative">

      {/* ⬅ SAIR DO JOGO */}
      <button
        onClick={voltarMenu}
        className="absolute top-4 left-4 text-slate-300 text-sm
                  hover:text-white transition flex items-center gap-2 z-10"
      >
        ← Sair do jogo
      </button>

      {/* 🔝 TOPO – RODADA */}
      <div className="mt-16 mb-4 text-slate-300 text-sm font-semibold tracking-wide">
        Rodada {salaAtual.rodadaAtual} / {salaAtual.totalRodadas}
      </div>

      {/* ======================
          📱 MOBILE
      ====================== */}
      <div className="md:hidden w-full max-w-md px-4 flex flex-col gap-4">

        {/* CARTA */}
        <GameCard
          tipo={cartaAtual.tipo}
          dicas={dicasUI}
          fase={state.fase}
          minhaVez={minhaVez}
          mensagemFim={state.mensagemFim}
          onRevelarDica={revelarDica}
          onPalpitar={palpitar}
          onPular={pular}
          onAvancarRodada={avancarRodada}
          onVoltarMenu={voltarMenu}
        />

        {/* JOGADOR ATUAL */}
        <PlayerPanel
          username={salaAtual.jogadores.find(j => j.id === state.turnoJogadorId)!.username}
          pontos={state.pontos[state.turnoJogadorId] ?? 0}
          palpites={state.palpites.filter(
            p => p.jogadorId === state.turnoJogadorId
          )}
          estaNaVez={true}
          fase={state.fase}
        />

        {/* ADVERSÁRIO */}
        <PlayerPanel
          username={salaAtual.jogadores.find(j => j.id !== state.turnoJogadorId)!.username}
          pontos={
            state.pontos[
              salaAtual.jogadores.find(j => j.id !== state.turnoJogadorId)!.id
            ] ?? 0
          }
          palpites={state.palpites.filter(
            p => p.jogadorId !== state.turnoJogadorId
          )}
          estaNaVez={false}
          fase={state.fase}
        />
      </div>

      {/* ======================
          💻 DESKTOP
      ====================== */}
      <div
        className="hidden md:grid w-full max-w-7xl px-6 py-10
                  grid-cols-[1fr_1.35fr_1fr] gap-6"
      >
        {/* Jogador 1 */}
        <PlayerPanel
          username={salaAtual.jogadores[0].username}
          pontos={state.pontos[salaAtual.jogadores[0].id] ?? 0}
          palpites={state.palpites.filter(
            p => p.jogadorId === salaAtual.jogadores[0].id
          )}
          estaNaVez={state.turnoJogadorId === salaAtual.jogadores[0].id}
          fase={state.fase}
        />

        {/* Carta */}
        <GameCard
          tipo={cartaAtual.tipo}
          dicas={dicasUI}
          fase={state.fase}
          minhaVez={minhaVez}
          mensagemFim={state.mensagemFim}
          onRevelarDica={revelarDica}
          onPalpitar={palpitar}
          onPular={pular}
          onAvancarRodada={avancarRodada}
          onVoltarMenu={voltarMenu}
        />

        {/* Jogador 2 */}
        <PlayerPanel
          username={salaAtual.jogadores[1].username}
          pontos={state.pontos[salaAtual.jogadores[1].id] ?? 0}
          palpites={state.palpites.filter(
            p => p.jogadorId === salaAtual.jogadores[1].id
          )}
          estaNaVez={state.turnoJogadorId === salaAtual.jogadores[1].id}
          fase={state.fase}
        />
      </div>
    </main>
  );
}