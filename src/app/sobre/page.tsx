import { PageHeroArt } from "@/components/page-hero-art";
import { seo } from "@/lib/site";
import { FinalCTA } from "@/components/ui";
export const metadata = seo(
  "Sobre a MOX. — tecnologia, design e estratégia",
  "Conheça a MOX., empresa de desenvolvimento web em Fortaleza. Soluções digitais sob medida, atendimento online em todo o Brasil e presencial mediante agendamento.",
  "/sobre",
);
export default function Sobre() {
  return (
    <main id="conteudo">
      <section className="wrap inner-hero about-hero illustrated-hero">
        <div className="page-hero-copy">
          <p className="eyebrow">SOBRE A MOX.</p>
          <h1>
            Tecnologia, design
            <br />e estratégia <span className="purple">no mesmo lugar.</span>
          </h1>
          <p className="lead">
            A MOX. nasceu de uma ideia simples: transformar boas ideias em
            experiências digitais que fazem a diferença.
          </p>
          <div className="about-location">
            <span className="status-dot" />
            <p>
              Fortaleza, Ceará · Atendimento online em todo o Brasil e
              presencial mediante agendamento.
            </p>
          </div>
        </div>
        <PageHeroArt src="/notebook-transparent.png" />
      </section>
      <section className="section wrap content-split about-story">
        <div>
          <p className="eyebrow">O QUE NOS MOVE</p>
          <h2>
            Boas ideias.
            <br />
            <span className="purple">Novas possibilidades.</span>
          </h2>
        </div>
        <div className="about-narrative">
          <p>
            Somos uma empresa de desenvolvimento web sediada em Fortaleza,
            Ceará, que une criatividade, tecnologia e visão estratégica para
            desenvolver soluções digitais sob medida.
          </p>
          <p>
            Acreditamos que um site não deve ser apenas bonito. Ele precisa ser
            rápido, intuitivo, funcional e, principalmente, fazer sentido para o
            negócio de quem está por trás dele.
          </p>
          <p>
            Por isso, cada projeto começa com uma conversa. Entendemos os
            desafios, identificamos oportunidades e desenvolvemos soluções que
            combinam identidade, experiência e desempenho.
          </p>
          <p>
            De uma landing page a um sistema web personalizado, nosso
            compromisso é o mesmo: entregar tecnologia com propósito, atenção
            aos detalhes e qualidade em cada etapa.
          </p>
          <p className="about-statement">
            Não criamos apenas sites. Criamos possibilidades para negócios
            evoluírem.
          </p>
        </div>
      </section>
      <FinalCTA />
    </main>
  );
}
