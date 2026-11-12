"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { publishedProjects } from "@/lib/projects";

function spiralPath(arm: number) {
  return Array.from({ length: 110 }, (_, index) => {
    const radius = 45 + (index / 109) * 1270;
    const angle = (arm * Math.PI) / 3 + (radius / 740) * Math.PI * 2 * 0.85;
    return `${index ? "L" : "M"}${(Math.cos(angle) * radius).toFixed(2)},${(-Math.sin(angle) * radius).toFixed(2)}`;
  }).join(" ");
}

export function HeroOrbit() {
  const scene = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const focused = useRef<number | null>(null);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const query = window.matchMedia("(prefers-reduced-motion:no-preference)");
    let generation = 0;
    async function initialize() {
      const current = ++generation;
      cleanup?.();
      cleanup = undefined;
      if (!query.matches || !scene.current) return;
      try {
        const createScene =
          window.innerWidth < 1024
            ? (await import("@/lib/mobile-spiral")).createMobileSpiral
            : (await import("@/lib/spiral-scene")).createSpiralScene;
        if (
          disposed ||
          current !== generation ||
          !query.matches ||
          !scene.current
        )
          return;
        const release = await createScene(scene.current, {
          paused: () => paused.current,
          focused: () => focused.current,
        });
        if (disposed || current !== generation || !query.matches) release();
        else cleanup = release;
      } catch {
        if (scene.current) {
          scene.current.dataset.renderer = "fallback";
          scene.current.querySelector("canvas")?.remove();
        }
      }
    }
    const breakpoint = window.matchMedia("(min-width:1024px)");
    initialize();
    breakpoint.addEventListener("change", initialize);
    query.addEventListener("change", initialize);
    return () => {
      disposed = true;
      generation++;
      query.removeEventListener("change", initialize);
      breakpoint.removeEventListener("change", initialize);
      cleanup?.();
    };
  }, []);
  return (
    <>
      <div
        ref={scene}
        className="craft-orbital-projects orbit-scene"
        onFocusCapture={(event) => {
          const anchor = (event.target as HTMLElement).closest<HTMLElement>(
            "[data-project-index]",
          );
          focused.current = anchor ? Number(anchor.dataset.projectIndex) : null;
        }}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node))
            focused.current = null;
        }}
      >
        <svg
          className="spiral-guides"
          viewBox="-1000 -650 2000 1300"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <circle r="410" />
          <circle r="750" />
          {Array.from({ length: 6 }, (_, arm) => (
            <g key={arm}>
              <path className="spiral-guide" d={spiralPath(arm)} />
              <path
                className="spiral-pulse"
                d={spiralPath(arm)}
                style={{ strokeDashoffset: arm * 220 }}
              />
              {Array.from({ length: 12 }, (_, index) => {
                const r = 380 + index * 55;
                const a = (arm * Math.PI) / 3 + (r / 740) * Math.PI * 2 * 0.85;
                return (
                  <path
                    key={index}
                    className="spiral-tick"
                    d={`M ${Math.cos(a) * (r - 5)},${-Math.sin(a) * (r - 5)} L ${Math.cos(a) * (r + 5)},${-Math.sin(a) * (r + 5)}`}
                  />
                );
              })}
            </g>
          ))}
        </svg>
        {publishedProjects.map((project, index) => {
          const phase =
            (index / publishedProjects.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <div
              className="orbit-slot"
              key={project.id}
              style={
                {
                  "--orbit-x": `${50 + Math.cos(phase) * 44}%`,
                  "--orbit-y": `${49 + Math.sin(phase) * 43}%`,
                  "--orbit-rotate": `${Math.cos(phase) * -7}deg`,
                } as React.CSSProperties
              }
            >
              <a
                className="orbital-project"
                data-project-index={index}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Explorar ${project.name} — abre em nova aba`}
              >
                <Image
                  src={project.image!}
                  alt={`Prévia do site ${project.name}`}
                  width={1440}
                  height={1000}
                  sizes="220px"
                />
                <span>
                  {project.name}
                  <span aria-hidden="true">↗</span>
                </span>
              </a>
            </div>
          );
        })}
      </div>
      <button
        className="orbit-toggle"
        type="button"
        aria-pressed={!playing}
        onClick={() => {
          paused.current = playing;
          setPlaying(!playing);
        }}
      >
        <span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span>
        {playing ? "Pausar movimento" : "Retomar movimento"}
      </button>
    </>
  );
}
