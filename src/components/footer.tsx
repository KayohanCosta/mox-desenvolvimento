import Image from "next/image";
import Link from "next/link";
import { contactHref, contacts, services } from "@/lib/site";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link className="logo" href="/" aria-label="MOX. — início">
            <Image src="/logo.svg" alt="MOX." width={504} height={130} />
          </Link>
          <p>
            Tecnologia, design e estratégia.
            <br />
            De Fortaleza para o próximo
            <br />
            passo do seu negócio.
          </p>
          <span className="footer-location">
            Fortaleza, Ceará
            <br />
            Atendimento online em todo o Brasil.
            <br />
            Presencial mediante agendamento.
          </span>
        </div>
        <nav aria-label="Soluções no rodapé">
          <h2>Soluções</h2>
          {services.map((s) => (
            <Link key={s.slug} href={`/${s.slug}`}>
              {s.label}
            </Link>
          ))}
        </nav>
        <nav aria-label="Explore a MOX">
          <h2>Explore</h2>
          <Link href="/">Início</Link>
          <Link href="/portfolio">Portfólio</Link>
          <Link href="/sobre">Sobre a MOX.</Link>
          <Link href="/contato">Contato</Link>
        </nav>
        <div className="footer-contacts">
          <h2>Vamos conversar</h2>
          <a href="tel:+5585998213158">
            <span>Telefone</span>
            {contacts.phone}
          </a>
          <a href={contactHref}>
            <span>WhatsApp</span>
            {contacts.whatsapp}
          </a>
          <a href={`mailto:${contacts.email}`}>
            <span>E-mail</span>
            {contacts.email}
          </a>
          <a
            href={contacts.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Instagram ↗</span>@{contacts.instagram}
          </a>
        </div>
        <div className="footer-legal">
          <span>
            © {new Date().getFullYear()} MOX. Todos os direitos reservados.
          </span>
          <span>Desenvolvimento web em Fortaleza.</span>
        </div>
      </div>
    </footer>
  );
}
