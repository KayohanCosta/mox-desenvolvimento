import Image from "next/image";
import { PageHeroArt } from "@/components/page-hero-art";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services, seo, siteUrl } from "@/lib/site";
import { CTA, FinalCTA, JsonLd } from "@/components/ui";
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  return s ? seo(s.label, s.description, `/${slug}`) : {};
}
export default async function Service({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  if (!s) notFound();
  const background =
    slug === "criacao-de-sites-fortaleza"
      ? "/services/fortaleza.jpg"
      : slug === "sites-para-empresas"
        ? "/services/empresas.jpg"
        : null;
  return (
    <main id="conteudo">
      <section
        className={`inner-hero ${background ? "service-hero-photo" : "wrap illustrated-hero"}`}
        data-photo={background ? slug : undefined}
      >
        {background && (
          <div className="service-hero-backdrop" aria-hidden="true">
            <Image src={background} alt="" fill priority sizes="100vw" />
            <div className="service-hero-tint" />
          </div>
        )}
        <div className={`page-hero-copy ${background ? "wrap" : ""}`}>
          <nav className="breadcrumb" aria-label="Caminho">
            <Link href="/">Início</Link>
            <span aria-hidden="true">/</span>
            <span>{s.label}</span>
          </nav>
          <p className="eyebrow">{s.label}</p>
          <h1>{s.title}</h1>
          <p className="lead">{s.intro}</p>
          <CTA>Conversar sobre esta solução</CTA>
        </div>
        {!background && (
          <PageHeroArt
            src={
              slug === "landing-pages"
                ? "/services/hero-landing-pages-v2.png"
                : `/services/hero-${slug}.png`
            }
          />
        )}
      </section>
      <section className="section wrap content-split">
        <h2>
          O que faz parte
          <br />
          da conversa.
        </h2>
        <div>
          {s.items.map((item, i) => (
            <article className="deliverable" key={item}>
              <span className="purple">0{i + 1}</span>
              <h3>{item}</h3>
            </article>
          ))}
          <p className="muted">
            O escopo final é definido na proposta, conforme os objetivos e as
            necessidades do seu negócio.
          </p>
        </div>
      </section>
      <section className="wrap faq">
        <h2>Uma dúvida comum.</h2>
        <details open>
          <summary>{s.question}</summary>
          <p>{s.answer}</p>
        </details>
      </section>
      <section className="section wrap">
        <p className="eyebrow">OUTROS CAMINHOS</p>
        <div className="related">
          {services
            .filter((x) => x.slug !== slug)
            .map((x) => (
              <Link key={x.slug} href={`/${x.slug}`}>
                {x.label} ↗
              </Link>
            ))}
        </div>
      </section>
      <FinalCTA />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: s.label,
              description: s.description,
              url: `${siteUrl}/${slug}`,
              provider: { "@id": `${siteUrl}/#organization` },
              areaServed: { "@type": "City", name: "Fortaleza" },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Início",
                  item: siteUrl,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: s.label,
                  item: `${siteUrl}/${slug}`,
                },
              ],
            },
          ],
        }}
      />
    </main>
  );
}
