type Palpite = {
  jogadorId: number;
  texto: string;
};

type Props = {
  username: string;
  pontos: number;
  palpites: Palpite[];
  estaNaVez: boolean;
};

export default function PlayerPanel({
  username,
  pontos,
  palpites,
  estaNaVez,
}: Props) {
  return (
    <aside className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg min-h-[80vh] flex flex-col">
      <h3 className="font-bold text-lg">{username}</h3>

      <div>
        <p className="text-slate-400 text-sm">Pontuação</p>
        <p className="text-2xl font-bold mb-4">{pontos}</p>
      </div>

      <div>
        <p className="text-slate-400 text-sm mb-2">Palpites errados</p>

        {palpites.length === 0 ? (
          <p className="text-slate-500 text-sm">Nenhum ainda</p>
        ) : (
          <div className="flex flex-col gap-2">
            {palpites.map((p, i) => (
              <div
                key={i}
                className="bg-slate-800 rounded-xl px-3 py-2 text-sm text-red-300"
              >
                ❌ {p.texto}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto pt-6 text-sm text-slate-400">
        {estaNaVez ? "🟢 Na vez" : "⚪ Aguardando"}
      </div>
    </aside>
  );
}