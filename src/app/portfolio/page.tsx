import { seo, siteUrl } from "@/lib/site";
import { publishedProjects } from "@/lib/projects";
import { ProjectGrid } from "@/components/projects";
import { FinalCTA, JsonLd } from "@/components/ui";
export const metadata = seo(
  "Projetos e portfólio de desenvolvimento web",
  "Conheça os projetos apresentados pela MOX.: gastronomia, varejo, entretenimento e serviços locais. Explore os sites.",
  "/portfolio",
);
export default function Portfolio() {
  return (
    <main id="conteudo">
      <section className="wrap inner-hero">
        <p className="eyebrow">PORTFÓLIO / PROJETOS SELECIONADOS</p>
        <h1>
          Projetos diferentes.
          <br />O mesmo <span className="serif-word purple">cuidado.</span>
        </h1>
      </section>
      <section className="wrap portfolio-projects" aria-label="Projetos">
        <ProjectGrid />
      </section>
      <FinalCTA />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Projetos MOX.",
          url: `${siteUrl}/portfolio`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: publishedProjects.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "CreativeWork",
                name: p.name,
                url: p.url,
                description: p.description,
              },
            })),
          },
        }}
      />
    </main>
  );
}
