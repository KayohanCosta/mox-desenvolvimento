import Link from "next/link";
import { ProjectCarousel } from "@/components/project-carousel";
export function ProjectGrid() {
  return <ProjectCarousel />;
}
export function FeaturedProjects() {
  return (
    <section id="projetos" className="wrap featured-projects">
      <div className="section-line">
        <p className="eyebrow">PROJETOS SELECIONADOS</p>
        <span>DESIGN QUE GANHA VIDA</span>
      </div>
      <div className="projects-heading">
        <h2>
          Da ideia à experiência.
          <br />
          <span className="purple">Veja na prática.</span>
        </h2>
        <Link className="text-link" href="/portfolio">
          Explorar portfólio ↗
        </Link>
      </div>
      <ProjectCarousel />
    </section>
  );
}
