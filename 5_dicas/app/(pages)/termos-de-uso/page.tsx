export default function TermosDeUso() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 px-6 py-12 flex justify-center">
      <div className="w-full max-w-3xl space-y-8">

        <h1 className="text-3xl font-bold text-white">
          Termos de Uso
        </h1>

        <p>
          Ao acessar e utilizar este site, o usuário concorda com os termos e
          condições descritos abaixo.
        </p>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            1. Uso do Site
          </h2>
          <p>
            Este site tem finalidade recreativa, oferecendo um jogo online para
            entretenimento dos usuários. O uso deve ocorrer de forma lícita e
            respeitosa.
          </p>
          <p>É proibido:</p>
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            <li>tentar acessar áreas restritas do sistema</li>
            <li>explorar falhas ou vulnerabilidades</li>
            <li>interferir no funcionamento do jogo</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            2. Conta e Informações do Usuário
          </h2>
          <p>
            Para utilizar determinadas funcionalidades, o site pode solicitar
            apenas o endereço de e-mail do usuário.
          </p>
          <p>
            Não são exigidas senhas ou outras informações pessoais. O usuário é
            responsável por fornecer um e-mail válido.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            3. Disponibilidade do Serviço
          </h2>
          <p>O site é disponibilizado “como está” e pode:</p>
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            <li>sofrer alterações</li>
            <li>passar por manutenções</li>
            <li>ser temporariamente indisponível</li>
            <li>ser descontinuado a qualquer momento</li>
          </ul>
          <p>Não há garantia de disponibilidade contínua.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            4. Anúncios
          </h2>
          <p>
            O site pode exibir anúncios de terceiros, incluindo anúncios
            fornecidos pelo Google. Ao clicar em anúncios, o usuário poderá ser
            direcionado a sites externos, sobre os quais este site não possui
            controle ou responsabilidade.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            5. Limitação de Responsabilidade
          </h2>
          <p>O site não se responsabiliza por:</p>
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            <li>eventuais perdas ou danos decorrentes do uso do jogo</li>
            <li>conteúdo exibido em anúncios de terceiros</li>
            <li>interrupções ou falhas técnicas</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            6. Alterações dos Termos
          </h2>
          <p>
            Estes Termos de Uso podem ser alterados a qualquer momento, sem aviso
            prévio. O uso contínuo do site após alterações implica na aceitação
            dos novos termos.
          </p>
        </section>

      </div>
    </main>
  );
}