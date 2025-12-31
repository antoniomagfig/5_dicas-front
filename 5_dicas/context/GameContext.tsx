"use client";

import { createContext, useContext, useState } from "react";

type Sala = {
  codigo: string;
  jogadores: {
    id: number;
    username: string;
  }[];
  status: "aguardando" | "em_jogo";
  totalRodadas: 5 | 10 | 15;
  rodadaAtual: number;
  cartas: any[];
  gameState: any;
};

type GameContextType = {
  sala: Sala | null;
  setSala: (s: Sala | null) => void;
  clearGame: () => void;
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [sala, setSala] = useState<Sala | null>(null);

  function clearGame() {
    setSala(null);
  }

  return (
    <GameContext.Provider value={{ sala, setSala, clearGame }}>
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