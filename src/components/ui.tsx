import Link from "next/link";
import { contactHref } from "@/lib/site";
export function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
export function CTA({
  children = "Vamos conversar",
  secondary = false,
}: {
  children?: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      className={`button ${secondary ? "secondary" : ""}`}
      href={contactHref}
      data-conversion="contact-intent"
    >
      {children}
      <Arrow />
    </Link>
  );
}
export function Heading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {body && <p className="muted">{body}</p>}
    </div>
  );
}
export function FinalCTA() {
  return (
    <section className="final-cta wrap">
      <p className="eyebrow">O PRÓXIMO PASSO</p>
      <h2>
        Vamos construir
        <br />o próximo passo<span className="purple">.</span>
      </h2>
      <p className="muted">
        Conte o que seu negócio precisa. A direção começa nessa conversa.
      </p>
      <CTA>Conversar sobre meu projeto</CTA>
    </section>
  );
}
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\u003c"),
      }}
    />
  );
}
