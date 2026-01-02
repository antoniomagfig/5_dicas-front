"use client";

export default function Regras() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-10">
      <section className="bg-white max-w-3xl w-full rounded-3xl p-10 shadow-xl flex flex-col gap-6">
        
        {/* TÍTULO */}
        <h1 className="text-3xl font-extrabold text-slate-900 text-center">
          Regras
        </h1>

        {/* TEXTO */}
        <div className="text-slate-700 text-base leading-relaxed flex flex-col gap-4">

          <p>
            O jogo deve ser jogado com <strong>2 jogadores ou times</strong>, um contra o outro.
            Ele pode ter <strong>5, 10 ou 15 rodadas</strong>.
          </p>

          <p>
            A cada rodada, haverá uma <strong>carta</strong>, cujo tipo pode ser
            <strong> pessoa/personagem</strong>, <strong>lugar</strong> ou <strong>ano</strong>.
            Cada carta possui <strong>5 dicas</strong> que ajudam os jogadores a chegar
            à resposta correta.
          </p>

          <p>
            Em cada rodada, os jogadores deverão <strong>pedir dicas</strong> e
            <strong> dar palpites de forma alternada</strong>, até que alguém acerte a resposta.
            Caso ninguém acerte após o uso das 5 dicas, a rodada termina e
            <strong> nenhum jogador ganha pontos</strong>.
          </p>

          <p>
            A <strong>pontuação</strong> é proporcional ao número de dicas utilizadas para acertar
            a resposta:
          </p>

          {/* LISTA DE PONTOS */}
          <ul className="list-disc list-inside pl-2 space-y-1">
            <li>1 dica → <strong>5 pontos</strong></li>
            <li>2 dicas → <strong>4 pontos</strong></li>
            <li>3 dicas → <strong>3 pontos</strong></li>
            <li>4 dicas → <strong>2 pontos</strong></li>
            <li>5 dicas → <strong>1 ponto</strong></li>
          </ul>

          <p>
            A cada dica pedida, <strong>cada jogador tem direito a dar um palpite</strong>.
            O jogador que pediu a dica <strong>palpita primeiro</strong>.
          </p>

          {/* ATENÇÃO */}
          <div className="bg-yellow-50 border border-yellow-300 rounded-2xl p-4 text-yellow-900">
            <strong>Atenção:</strong> ao palpitar, não há diferença entre letras
            <strong> maiúsculas ou minúsculas</strong>.  
            Porém, é necessário o uso correto de
            <strong> acentos</strong>, <strong>til (˜)</strong> e
            <strong> cedilha (ç)</strong>.
          </div>
        </div>
      </section>
    </main>
  );
}