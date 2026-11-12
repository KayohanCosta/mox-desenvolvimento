import { PageHeroArt } from "@/components/page-hero-art";
import { seo, contactHref, contacts } from "@/lib/site";
import { ContactForm } from "@/components/contact-form";
export const metadata = seo(
  "Contato e orçamento",
  "Conte sobre seu projeto de site, landing page ou sistema web. Prepare um briefing para conversar com a MOX. sobre escopo e próximos passos.",
  "/contato",
);
export default function Contato() {
  return (
    <main id="conteudo">
      <section className="wrap inner-hero illustrated-hero contact-hero">
        <div className="page-hero-copy">
          <p className="eyebrow">VAMOS CONVERSAR</p>
          <h1>
            Seu próximo
            <br />
            passo começa
            <br />
            <span className="purple">aqui.</span>
          </h1>
          <p className="lead">
            O que você quer construir? Conte o contexto do seu negócio e o que
            precisa mudar.
          </p>
          {contactHref.startsWith("https:") ? (
            <a className="button" href={contactHref}>
              Conversar no WhatsApp ↗
            </a>
          ) : (
            <p className="muted">Canal de WhatsApp em configuração.</p>
          )}
          <div className="contact-direct-links">
            <a href="tel:+5585998213158">
              Telefone <strong>{contacts.phone}</strong>
            </a>
            <a href={`mailto:${contacts.email}`}>
              E-mail <strong>{contacts.email}</strong>
            </a>
            <a
              href={contacts.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram <strong>@{contacts.instagram} ↗</strong>
            </a>
          </div>
          <p className="contact-aside">
            Fortaleza, Ceará · Atendimento online.
            <br />
            Prazo e investimento são definidos após entender o escopo.
          </p>
        </div>
        <PageHeroArt src="/services/hero-contato.png" />
      </section>
      <section
        className="wrap contact-form-section"
        aria-label="Briefing do projeto"
      >
        <ContactForm />
      </section>
    </main>
  );
}
