import { ExperienceShowcase } from "@/components/experience-showcase";
import { HeroOrbit } from "@/components/hero-orbit";
import Image from "next/image";
import { FeaturedProjects } from "@/components/projects";
import Link from "next/link";
import { CTA, Arrow, FinalCTA } from "@/components/ui";
import { seo, services } from "@/lib/site";
export const metadata = seo(
  "Criação de sites e desenvolvimento web em Fortaleza",
  "A MOX. conecta estratégia, design e desenvolvimento para criar sites, landing pages e sistemas web com foco em SEO e conversão.",
);
export default function Home() {
  return (
    <main id="conteudo" className="edition-two">
      <section className="editorial-hero craft-hero">
        <div className="craft-universe" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <div className="universe-axis axis-horizontal" />
          <div className="universe-axis axis-vertical" />
        </div>
        <HeroOrbit />
        <div className="hero-ruler" aria-hidden="true">
          {[0, 25, 50, 75, 100].map((value) => (
            <span key={value} style={{ top: `${value}%` }}>
              {String(value).padStart(2, "0")}
            </span>
          ))}
        </div>
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> ESTÚDIO DIGITAL / FORTALEZA, BRASIL
          </p>
          <Image
            className="craft-signature"
            src="/logo.svg"
            alt="MOX."
            width={504}
            height={130}
            priority
          />
          <h1>
            <span className="hero-line">
              <span>Sites que impulsionam</span>
            </span>
            <span className="hero-line">
              <span className="purple">o seu próximo passo.</span>
            </span>
          </h1>
          <p className="hero-description">
            Design que aproxima. Tecnologia que faz acontecer.
            <br />
            Criamos experiências digitais para negócios em movimento.
          </p>
          <div className="hero-actions">
            <CTA>Começar meu projeto</CTA>
            <Link className="button secondary" href="#projetos">
              Explorar projetos <Arrow />
            </Link>
          </div>
          <div className="hero-signals">
            <span>Sites & landing pages</span>
            <span>Sistemas web</span>
            <span>SEO desde a base</span>
          </div>
        </div>
        <a className="craft-scroll" href="#experiencia">
          <span>EXPLORE O UNIVERSO MOX.</span>
          <span aria-hidden="true">↓</span>
        </a>
        <span className="craft-coordinate" aria-hidden="true">
          03°43′ S / 38°32′ W
        </span>
      </section>
      <nav className="capability-strip wrap" aria-label="Explore as soluções">
        <span className="capability-label">O QUE CONSTRUÍMOS</span>
        {services.map((service, index) => (
          <Link href={`/${service.slug}`} key={service.slug}>
            <span aria-hidden="true">0{index + 1}</span>
            {service.label}
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </nav>
      <ExperienceShowcase />
      <section id="solucoes" className="wrap editorial-services">
        <div className="section-line">
          <p className="eyebrow">02 / SOLUÇÕES</p>
          <span>ESCOLHA PELO SEU OBJETIVO</span>
        </div>
        <div className="services-title">
          <h2>
            O que vamos
            <br />
            <span className="serif-word">construir?</span>
          </h2>
          <p>
            Sites, aplicativos e sistemas.
            <br />
            Integrações que simplificam a rotina.
            <br />
            Cuidado contínuo com o que já está no ar.
          </p>
        </div>
        <div className="service-rows">
          {services.map((s, i) => (
            <Link key={s.slug} href={`/${s.slug}`} className="service-row">
              <span className="row-number">0{i + 1}</span>
              <h3>{s.label}</h3>
              <p>{s.description}</p>
              <span className="row-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
          <Link className="service-row service-diagnostic" href="/contato">
            <span className="row-number">VAMOS DESCOBRIR JUNTOS</span>
            <h3>Qual é o seu próximo passo?</h3>
            <p>
              Conte o contexto do seu negócio. A conversa inicial ajuda a
              identificar a solução e definir as prioridades.
            </p>
            <span className="row-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </section>
      <section className="method-section">
        <div className="wrap">
          <div className="section-line">
            <p className="eyebrow">03 / MÉTODO</p>
            <span>DO CONTEXTO AO CÓDIGO</span>
          </div>
          <div className="method-heading">
            <h2>
              Antes da primeira linha,
              <br />
              as perguntas certas.
            </h2>
            <p>
              Uma boa entrega começa com decisões claras.
              <br />
              Você acompanha o que está sendo construído e por quê.
            </p>
          </div>
          <div className="method-grid">
            {[
              [
                "Entender",
                "Qual problema estamos resolvendo?",
                "Mapeamos o negócio, o público e o objetivo. O escopo começa pelo que realmente precisa funcionar.",
              ],
              [
                "Desenhar",
                "Qual é o caminho mais claro?",
                "Organizamos o conteúdo e os fluxos antes de detalhar a interface. A experiência precisa fazer sentido no celular.",
              ],
              [
                "Desenvolver",
                "Como sustentar a experiência?",
                "Construímos com atenção à acessibilidade, à estrutura para busca e ao comportamento de cada interação.",
              ],
              [
                "Validar",
                "Está pronto para ser usado?",
                "Revisamos páginas, formulários e navegação. A entrega inclui os próximos passos para publicação e evolução.",
              ],
            ].map(([t, q, b], i) => (
              <article key={t}>
                <span className="method-number">
                  0{i + 1}
                  <span> /</span>
                </span>
                <h3>{t}</h3>
                <h4>{q}</h4>
                <p>{b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <FeaturedProjects />
      <section className="wrap editorial-faq">
        <div>
          <p className="eyebrow">ANTES DE COMEÇAR</p>
          <h2>
            Uma conversa
            <br />
            sem pontas soltas.
          </h2>
        </div>
        <div className="faq">
          {[
            [
              "Como vocês definem o orçamento?",
              "Primeiro entendemos o objetivo, o conteúdo, as funcionalidades e as integrações. A proposta apresenta escopo, etapas e prazo para que você saiba o que está contratando.",
            ],
            [
              "O site já vem preparado para SEO?",
              "A estrutura inclui páginas por intenção, títulos e descrições, links internos, sitemap e dados estruturados adequados. Posições no Google dependem também do conteúdo, da concorrência e da evolução contínua.",
            ],
            [
              "Podemos começar por uma entrega menor?",
              "Sim. Podemos definir uma primeira etapa com o essencial e planejar o restante conforme as prioridades do negócio.",
            ],
            [
              "Como funciona o atendimento?",
              "Os alinhamentos podem ser feitos online. A MOX. atua em Fortaleza e pode desenvolver projetos para empresas de outras cidades.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <FinalCTA />
    </main>
  );
}
