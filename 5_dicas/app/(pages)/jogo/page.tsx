"use client";

import { useEffect, useMemo } from "react";
import { useGame } from "@/context/GameContext";
import { socket } from "@/services/socket";

import PlayerPanel from "../../../components/PlayerPanel";
import GameCard from "../../../components/GameCard";

type DicaUI = {
  numero: number;
  texto: string | null;
  revelada: boolean;
};

export default function Jogo() {
  const { sala, jogador, setSala } = useGame();

  // WebSocket: join + recebe estado autoritativo
  useEffect(() => {
    if (!sala?.codigo || !jogador?.id) return;

    socket.emit("sala:join", { codigo: sala.codigo, jogadorId: jogador.id });

    const handler = (novaSala: typeof sala) => {
      setSala(novaSala as any);
    };

    socket.on("sala:state", handler);

    return () => {
      socket.off("sala:state", handler);
    };
  }, [sala?.codigo, jogador?.id, setSala]);

  // Guards
  if (!sala || !jogador) return null;

  if (sala.jogadores.length < 2) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <p>Aguardando adversário...</p>
      </main>
    );
  }

  const cartaAtual = sala.cartas[sala.rodadaAtual - 1];
  const state = sala.gameState;

  if (!cartaAtual || !state) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <p>Carregando carta...</p>
      </main>
    );
  }

  // Derivados do state (100% servidor)
  const minhaVez = state.turnoJogadorId === jogador.id;

  const dicasUI: DicaUI[] = useMemo(() => {
    return cartaAtual.dicas
      .slice()
      .sort((a, b) => a.numero - b.numero)
      .map((d) => {
        const revelada = state.dicasReveladas.includes(d.numero);
        return {
          numero: d.numero,
          revelada,
          texto: revelada ? d.texto : null,
        };
      });
  }, [cartaAtual.dicas, state.dicasReveladas]);

  // Actions (socket)
  function revelarDica(numero: number) {
    socket.emit("jogo:revelarDica", {
      codigo: sala!.codigo,
      jogadorId: jogador!.id,
      numero,
    });
  }

  function palpitar(texto: string) {
    socket.emit("jogo:palpitar", {
      codigo: sala!.codigo,
      jogadorId: jogador!.id,
      texto,
    });
  }

  function pular() {
    socket.emit("jogo:pular", {
      codigo: sala!.codigo,
      jogadorId: jogador!.id,
    });
  }

  function avancarRodada() {
    socket.emit("jogo:proximaRodada", { codigo: sala!.codigo });
  }

  // Render
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-full max-w-7xl px-6 py-10 grid grid-cols-1 md:grid-cols-[1fr_1.35fr_1fr] gap-6">
        <PlayerPanel
          username={sala.jogadores[0].username}
          pontos={state.pontos[sala.jogadores[0].id] ?? 0}
          palpites={state.palpites.filter((p) => p.jogadorId === sala.jogadores[0].id)}
          estaNaVez={state.turnoJogadorId === sala.jogadores[0].id}
        />

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
        />

        <PlayerPanel
          username={sala.jogadores[1].username}
          pontos={state.pontos[sala.jogadores[1].id] ?? 0}
          palpites={state.palpites.filter((p) => p.jogadorId === sala.jogadores[1].id)}
          estaNaVez={state.turnoJogadorId === sala.jogadores[1].id}
        />
      </div>
    </main>
  );
}