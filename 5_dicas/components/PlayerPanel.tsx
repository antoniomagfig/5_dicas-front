type Palpite = {
  jogadorId: number;
  texto: string;
};

type Fase = "escolha_dica" | "palpite" | "fim_rodada";

type Props = {
  username: string;
  pontos: number;
  palpites: Palpite[];
  estaNaVez: boolean;
  fase: Fase;
};

export default function PlayerPanel({
  username,
  pontos,
  palpites,
  estaNaVez,
  fase,
}: Props) {
  function textoStatus() {
    if (!estaNaVez) return "⚪ Aguardando o outro jogador";

    if (fase === "escolha_dica")
      return "🟢 Sua vez: escolha uma dica";

    if (fase === "palpite")
      return "🟢 Sua vez: dê um palpite";

    return "🏁 Rodada encerrada";
  }

  return (
    <aside className="bg-slate-900 text-white rounded-2xl p-6 shadow-lg min-h-[80vh] flex flex-col">

      {/* Username */}
      <h3 className="font-extrabold text-2xl text-center mb-10">
        {username}
      </h3>

      {/* Pontuação */}
      <div className="text-center mb-12">
        <p className="text-slate-400 text-sm uppercase tracking-wide mb-2">
          Pontuação
        </p>
        <p className="text-4xl font-bold">
          {pontos}
        </p>
      </div>

      {/* Palpites errados */}
      <div className="flex-1 mb-10">
        <p className="text-slate-400 text-sm uppercase tracking-wide mb-4">
          Palpites errados
        </p>

        {palpites.length === 0 ? (
          <p className="text-slate-500 text-sm italic">
            Nenhum ainda
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {palpites.map((p, i) => (
              <div
                key={i}
                className="bg-slate-800 rounded-xl px-4 py-2 text-sm text-red-300"
              >
                ❌ {p.texto}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status do turno */}
      <div className="pt-6 border-t border-slate-800 text-sm text-center">
        <span
          className={
            estaNaVez
              ? "text-green-400 font-semibold"
              : "text-slate-400"
          }
        >
          {textoStatus()}
        </span>
      </div>
    </aside>
  );
}