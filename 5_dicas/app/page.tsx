import Link from "next/link";

export default function Welcome() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white relative">
      
      {/* CONTEÚDO CENTRAL */}
      <div className="flex flex-col items-center gap-8 text-center px-4">
        
        {/* Título */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Jogo das 5 Dicas
        </h1>

        {/* Texto */}
        <p className="max-w-xl text-base md:text-lg text-slate-300">
          Teste seu raciocínio e sua intuição. A cada rodada, você recebe até
          cinco dicas para descobrir a resposta correta. Quanto menos dicas
          usar, mais pontos você faz!
        </p>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          
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

      {/* 🔽 RODAPÉ FIXO */}
      <footer className="fixed bottom-4 left-4 text-sm text-slate-400 flex flex-row gap-3">
        
        <span>
          Contato:{" "}
          <a
            href="mailto:tomm agfig@icloud.com"
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