"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const experiences = [
  {
    id: "presenca",
    label: "Presença",
    title: "Sua marca, bem apresentada.",
    body: "Identidade, cardápio e informações do restaurante reunidos em uma experiência que apresenta a marca e facilita o contato.",
    project: "Zé Mexicano",
    image: "/projects/ze-mexicano-presenca.jpg",
    url: "https://zemexicano.vercel.app/",
    note: "SITE INSTITUCIONAL",
  },
  {
    id: "contato",
    label: "Contato",
    title: "Um próximo passo que faz sentido.",
    body: "Conteúdo e navegação que ajudam o visitante a entender a proposta e iniciar uma conversa sobre o que precisa.",
    project: "One Two Drink",
    image: "/projects/one-two.jpg",
    url: "https://onetwodrink.vercel.app/",
    note: "EXPERIÊNCIA COMERCIAL",
  },
  {
    id: "operacao",
    label: "Operação",
    title: "Tecnologia dentro do seu processo.",
    body: "Produtos, categorias e um fluxo para montar o próprio computador. Uma experiência que organiza a escolha e aproxima o cliente do atendimento.",
    project: "G3 Gamer Store",
    image: "/projects/g3.jpg",
    url: "https://g3-gamer-store.vercel.app/",
    note: "CATÁLOGO & MONTAGEM DE PC",
  },
];
export function ExperienceShowcase() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = experiences[active];
  return (
    <section
      id="experiencia"
      className="craft-showcase experience-section wrap"
    >
      <div className="section-line">
        <p className="eyebrow">01 / EXPERIÊNCIA DIGITAL</p>
        <span>ESTRATÉGIA QUE VOCÊ CONSEGUE VER</span>
      </div>
      <div className="experience-intro">
        <h2>
          O seu negócio no centro.
          <br />
          <span className="purple">Em cada interação.</span>
        </h2>
        <p>
          De quem descobre sua marca a quem usa sua solução todos os dias.
          Explore como isso ganha forma em projetos reais.
        </p>
      </div>
      <div className="experience-stage">
        <div className="experience-controls">
          <div
            className="experience-tabs"
            role="tablist"
            aria-label="Explore a experiência digital"
          >
            {experiences.map((item, index) => (
              <button
                key={item.id}
                id={`experience-tab-${item.id}`}
                role="tab"
                aria-selected={active === index}
                aria-controls={`experience-panel-${item.id}`}
                tabIndex={active === index ? 0 : -1}
                ref={(element) => {
                  tabs.current[index] = element;
                }}
                onClick={() => setActive(index)}
                onKeyDown={(event) => {
                  let next = index;
                  if (event.key === "ArrowRight" || event.key === "ArrowDown")
                    next = (index + 1) % experiences.length;
                  else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
                    next =
                      (index + experiences.length - 1) % experiences.length;
                  else if (event.key === "Home") next = 0;
                  else if (event.key === "End") next = experiences.length - 1;
                  else return;
                  event.preventDefault();
                  setActive(next);
                  tabs.current[next]?.focus();
                }}
              >
                <span>0{index + 1}</span>
                {item.label}
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          {experiences.map((item, index) => (
            <div
              key={item.id}
              id={`experience-panel-${item.id}`}
              className="experience-copy"
              role="tabpanel"
              aria-labelledby={`experience-tab-${item.id}`}
              tabIndex={0}
              hidden={active !== index}
            >
              <p className="eyebrow">{item.note}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <a
                className="text-link"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explorar {item.project} <span aria-hidden="true">↗</span>
              </a>
            </div>
          ))}
          <p className="experience-caption">
            PROJETOS REAIS. ESCOLHAS COM CONTEXTO.
          </p>
        </div>
        <div className="experience-visual" key={selected.image}>
          <div className="experience-window">
            <div className="experience-window-bar" aria-hidden="true">
              <span />
              <span />
              <span />
              <small>{new URL(selected.url).hostname}</small>
            </div>
            <Image
              src={selected.image}
              alt={`Tela pública do projeto ${selected.project}`}
              width={1440}
              height={1000}
              sizes="(max-width:1023px) 90vw, 60vw"
            />
          </div>
          <div className="experience-project-meta">
            <span>{selected.project}</span>
            <span className="experience-live">
              <i />
              PRÉVIA DO SITE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
