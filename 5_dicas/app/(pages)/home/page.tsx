"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/services/axios";
import { useGame } from "@/context/GameContext";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const router = useRouter();

  // 🔑 AuthContext → jogador atual
  const { user, logout } = useAuth();

  // 🎮 GameContext → estado do jogo
  const { setSala } = useGame();

  const [codigoSala, setCodigoSala] = useState("");
  const [totalRodadas, setTotalRodadas] = useState<5 | 10 | 15>(5);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  /* ======================
     GUARD
  ====================== */
  if (!user) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p>Nenhum jogador selecionado.</p>
      </main>
    );
  }

  const usuario = user; // 🔒 garantido

  function sair() {
    logout();
    router.push("/");
  }

  async function criarSala() {
    setErro("");
    setLoading(true);

    try {
      const res = await api.post("/sala/criar", {
        jogadorId: usuario.id,
        totalRodadas,
      });

      const salaHidratada = await hidratarSala(res.data);
      setSala(salaHidratada);
      router.push("/sala");
    } catch {
      setErro("Erro ao criar sala");
    } finally {
      setLoading(false);
    }
  }

  async function entrarSala() {
    if (!codigoSala) return;

    setErro("");
    setLoading(true);

    try {
      const res = await api.post("/sala/entrar", {
        codigo: codigoSala,
        jogadorId: usuario.id,
      });

      const salaHidratada = await hidratarSala(res.data);
      setSala(salaHidratada);
      router.push("/sala");
    } catch (err: any) {
      if (err.response?.status === 404) setErro("Sala não encontrada");
      else if (err.response?.status === 400) setErro("Sala cheia");
      else setErro("Erro ao entrar na sala");
    } finally {
      setLoading(false);
    }
  }

  async function hidratarSala(salaBruta: any) {
    const ids: number[] = salaBruta.jogadores;

    const jogadoresInfo = await Promise.all(
      ids.map(async (id) => {
        const { data } = await api.get(`/jogador/${id}`);
        return { id: data.id, username: data.username };
      })
    );

    return {
      ...salaBruta,
      jogadores: jogadoresInfo,
    };
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="w-full max-w-lg bg-slate-900 rounded-2xl p-8 flex flex-col gap-6 shadow-lg relative">

        {/* Sair */}
        <button
          onClick={sair}
          className="absolute top-4 right-4 text-sm text-slate-400
                     hover:text-red-400 transition"
        >
          Sair
        </button>

        {/* Bem-vindo */}
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Bem-vindo, {usuario.username}
          </h1>
        </div>

        {/* Estatísticas */}
        <div className="flex justify-center gap-10 text-center">
          <div>
            <p className="text-sm text-slate-400">Vitórias</p>
            <p className="text-2xl font-bold text-green-400">
              {usuario.vitorias}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">Derrotas</p>
            <p className="text-2xl font-bold text-red-400">
              {usuario.derrotas}
            </p>
          </div>
        </div>

        {/* Seleção de rodadas */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-slate-400">
            Número de rodadas
          </label>

          <select
            value={totalRodadas}
            onChange={(e) =>
              setTotalRodadas(Number(e.target.value) as 5 | 10 | 15)
            }
            className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white"
          >
            <option value={5}>5 rodadas</option>
            <option value={10}>10 rodadas</option>
            <option value={15}>15 rodadas</option>
          </select>
        </div>

        {/* Ações */}
        <div className="flex flex-col gap-4 mt-2">
          <button
            onClick={criarSala}
            disabled={loading}
            className="py-3 rounded-xl bg-blue-600 hover:bg-blue-500
                       transition font-semibold disabled:opacity-50"
          >
            {loading ? "Criando sala..." : "Criar sala"}
          </button>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Código da sala"
              value={codigoSala}
              onChange={(e) => setCodigoSala(e.target.value.toUpperCase())}
              className="flex-1 px-4 py-3 rounded-xl bg-slate-800 text-white"
            />

            <button
              onClick={entrarSala}
              disabled={loading}
              className="px-5 py-3 rounded-xl bg-slate-700 hover:bg-slate-600
                         transition disabled:opacity-50"
            >
              Entrar
            </button>
          </div>

          {erro && (
            <p className="text-sm text-red-500 text-center">
              {erro}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}