import Link from "next/link";

export default function Welcome() {
  return (
    <main className="min-h-dvh bg-slate-950 text-white flex flex-col">
      
      {/* CONTEÚDO */}
      <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col gap-10">
        
        {/* TÍTULO */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center">
          Jogo das 5 Dicas
        </h1>

        {/* TEXTO */}
        <div className="flex flex-col gap-4 text-slate-300 text-base md:text-lg leading-relaxed text-left">
          <p>
            O <strong>Jogo das 5 Dicas</strong> é um jogo online de perguntas e respostas
            em que dois jogadores ou times se enfrentam tentando descobrir a
            resposta correta a partir de até cinco dicas progressivas.
          </p>

          <p>
            As cartas podem envolver pessoas, personagens famosos, lugares ou
            anos históricos. A cada dica revelada, os jogadores têm a chance de
            dar um palpite. Quanto menos dicas forem usadas para acertar, maior
            será a pontuação.
          </p>

          <p>
            Durante cada rodada, os jogadores alternam entre pedir dicas e
            arriscar palpites, criando uma dinâmica que envolve estratégia,
            atenção e tomada de decisão. O jogo estimula raciocínio lógico,
            memória e conhecimento geral.
          </p>

          <p>
            Para entender melhor todas as regras, fases do jogo e critérios de
            pontuação, recomendamos acessar a página de{" "}
            <span className="text-slate-200 font-semibold">Regras</span>.
          </p>
        </div>

        {/* BOTÕES */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/regras"
            className="px-6 py-3 rounded-xl border border-slate-400
                       text-slate-200 hover:bg-slate-800 transition text-center"
          >
            Regras
          </Link>

          <Link
            href="/criar-conta"
            className="px-6 py-3 rounded-xl bg-slate-700
                       hover:bg-slate-600 transition text-center"
          >
            Criar conta
          </Link>

          <Link
            href="/entrar"
            className="px-6 py-3 rounded-xl bg-blue-600
                       hover:bg-blue-500 text-white font-semibold transition text-center"
          >
            Entrar
          </Link>
        </div>
      </div>

      {/* RODAPÉ */}
      <footer className="mt-auto px-6 py-6 text-sm text-slate-400
                         flex flex-col sm:flex-row gap-3 items-center justify-center">
        <span>
          Contato:{" "}
          <a
            href="mailto:tommagfig@icloud.com"
            className="hover:text-slate-200 transition"
          >
            tommagfig@icloud.com
          </a>
        </span>

        <div className="flex gap-3">
          <Link
            href="/termos-de-uso"
            className="hover:text-slate-200 underline transition"
          >
            Termos de Uso
          </Link>

          <Link
            href="/politica-de-privacidade"
            className="hover:text-slate-200 underline transition"
          >
            Política de Privacidade
          </Link>
        </div>
      </footer>
    </main>
  );
}