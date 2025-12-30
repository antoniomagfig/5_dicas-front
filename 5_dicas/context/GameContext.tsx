"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Jogador = {
  id: number;
  username: string;
  vitorias: number;
  derrotas: number;
  email: string;
};

export type Dica = {
  id: number;
  numero: number;
  texto: string;
};

export type Carta = {
  id: number;
  tipo: string;
  resposta: string;
  dicas: Dica[];
};

type JogadorSala = {
  id: number;
  username: string;
  pontos: number;
};

type GameState = {
  fase: "escolha_dica" | "palpite" | "fim_rodada";
  turnoJogadorId: number | null;
  dicasReveladas: number[];
  palpites: { jogadorId: number; texto: string }[];
  mensagemFim: string | null;
  pontos: Record<number, number>;
};

type Sala = {
  codigo: string;
  jogadores: {
    id: number;
    username: string;
  }[];
  status: "aguardando" | "em_jogo";
  totalRodadas: 5 | 10 | 15;
  rodadaAtual: number;
  cartas: Carta[];

  // ✅ ESSENCIAL
  gameState: GameState;
};

type GameContextType = {
  jogador: Jogador | null;
  sala: Sala | null;
  setJogador: (j: Jogador | null) => void;
  setSala: (s: Sala | null) => void;
  logout: () => void;
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [jogador, setJogadorState] = useState<Jogador | null>(null);
  const [sala, setSala] = useState<Sala | null>(null);

  // 🔁 Carrega do localStorage ao iniciar
  useEffect(() => {
    const stored = localStorage.getItem("jogador");
    if (stored) {
      setJogadorState(JSON.parse(stored));
    }
  }, []);

  // 💾 Salva sempre que mudar
  function setJogador(j: Jogador | null) {
    if (j) {
      localStorage.setItem("jogador", JSON.stringify(j));
    } else {
      localStorage.removeItem("jogador");
    }
    setJogadorState(j);
  }

  function logout() {
    localStorage.removeItem("jogador");
    setJogadorState(null);
    setSala(null);
  }

  return (
    <GameContext.Provider
      value={{ jogador, sala, setJogador, setSala, logout }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame deve ser usado dentro de GameProvider");
  }
  return context;
}