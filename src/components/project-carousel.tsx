"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { publishedProjects } from "@/lib/projects";

export function ProjectCarousel() {
  const rail = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const [end, setEnd] = useState(false);
  function navigate(direction: number) {
    const element = rail.current;
    if (!element) return;
    const cards = Array.from(element.children) as HTMLElement[];
    const current = cards.reduce(
      (best, card, index) =>
        Math.abs(card.offsetLeft - element.scrollLeft) <
        Math.abs(cards[best].offsetLeft - element.scrollLeft)
          ? index
          : best,
      0,
    );
    const next = Math.max(0, Math.min(cards.length - 1, current + direction));
    element.scrollTo({
      left: cards[next].offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  return (
    <div
      className="project-carousel"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Projetos MOX."
    >
      <div
        ref={rail}
        className="project-rail"
        tabIndex={0}
        aria-label="Arraste ou use as setas para explorar os projetos"
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            navigate(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
        onScroll={() => {
          const element = rail.current;
          if (!element) return;
          const first = element.firstElementChild as HTMLElement;
          const stride = first.getBoundingClientRect().width + 24;
          setPosition(Math.round(element.scrollLeft / stride));
          setEnd(
            element.scrollLeft >= element.scrollWidth - element.clientWidth - 8,
          );
        }}
      >
        {publishedProjects.map((project, index) => (
          <article
            className="project-card"
            key={project.id}
            aria-roledescription="slide"
            aria-label={`${index + 1} de ${publishedProjects.length}`}
          >
            <a
              className="project-site"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="project-image">
                <div className="project-browser" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <span>{new URL(project.url).hostname}</span>
                </div>
                <Image
                  src={project.image!}
                  alt={`Página inicial de ${project.name}`}
                  width={1440}
                  height={1000}
                  sizes="(max-width:700px) 85vw, (max-width:1100px) 75vw, 65vw"
                />
                <span className="project-open" aria-hidden="true">
                  ↗
                </span>
              </div>
              <span className="sr-only">Abre em nova aba.</span>
              <div className="project-minimal-caption">
                <h3>{project.name}</h3>
                <span>
                  Visitar site <span aria-hidden="true">↗</span>
                </span>
              </div>
            </a>
          </article>
        ))}
      </div>
      <div className="carousel-toolbar">
        <span className="carousel-status" aria-live="polite" aria-atomic="true">
          {String(position + 1).padStart(2, "0")}{" "}
          <span>/ {String(publishedProjects.length).padStart(2, "0")}</span>
        </span>
        <div className="carousel-track" aria-hidden="true">
          <span
            style={{
              width: `${100 / publishedProjects.length}%`,
              transform: `translateX(${Math.min(position, publishedProjects.length - 1) * 100}%)`,
            }}
          />
        </div>
        <div className="carousel-buttons">
          <button
            type="button"
            aria-label="Projeto anterior"
            disabled={position === 0}
            onClick={() => navigate(-1)}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Próximo projeto"
            disabled={end}
            onClick={() => navigate(1)}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
