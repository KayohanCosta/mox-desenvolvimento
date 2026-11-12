"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function ScrollThread() {
  const pathname = usePathname();
  const svg = useRef<SVGSVGElement>(null);
  const track = useRef<SVGPathElement>(null);
  const trail = useRef<SVGPathElement>(null);
  const head = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    async function setup() {
      if (
        pathname !== "/" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (
        disposed ||
        !svg.current ||
        !track.current ||
        !trail.current ||
        !head.current
      )
        return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const root = svg.current!,
          line = track.current!,
          moving = trail.current!,
          dot = head.current!;
        let length = 1;
        let progress = 0;
        let frame = 0;
        const paint = () => {
          const distance = length * progress;
          moving.style.strokeDasharray = `${Math.min(distance, 190)} ${length + 190}`;
          moving.style.strokeDashoffset = String(-Math.max(0, distance - 190));
          const point = line.getPointAtLength(distance);
          dot.setAttribute("cx", String(point.x));
          dot.setAttribute("cy", String(point.y));
          dot.style.opacity = progress > 0.003 ? "1" : "0";
        };
        const measure = () => {
          const width = document.documentElement.clientWidth;
          const height = document.documentElement.scrollHeight;
          const inset = width < 700 ? 9 : 24;
          const left = inset,
            right = width - inset;
          const sections = [
            ...document.querySelectorAll<HTMLElement>(".edition-two > section"),
          ];
          const first = sections[0];
          if (!first) return;
          let y = first.offsetTop + 180;
          let x = right;
          let d = `M ${x} ${y}`;
          sections.slice(1).forEach((section, index) => {
            const boundary =
              section.getBoundingClientRect().top + window.scrollY;
            const nextX = index % 2 === 0 ? left : right;
            const turnY = Math.max(y + 100, boundary - 24);
            d += ` L ${x} ${turnY - 50} C ${x} ${turnY + 15}, ${nextX} ${turnY - 40}, ${nextX} ${turnY + 55}`;
            x = nextX;
            y = turnY + 55;
          });
          d += ` L ${x} ${height - 55}`;
          root.setAttribute("viewBox", `0 0 ${width} ${height}`);
          root.style.height = `${height}px`;
          line.setAttribute("d", d);
          moving.setAttribute("d", d);
          length = line.getTotalLength();
          paint();
        };
        measure();
        const trigger = ScrollTrigger.create({
          start: 0,
          end: () => ScrollTrigger.maxScroll(window),
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progress = self.progress;
            paint();
          },
          onRefresh: (self) => {
            measure();
            progress = self.progress;
            paint();
          },
        });
        const resize = () => {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => {
            measure();
            trigger.refresh();
          });
        };
        const observer = new ResizeObserver(resize);
        const main = document.querySelector("main");
        if (main) observer.observe(main);
        window.addEventListener("resize", resize);
        return () => {
          trigger.kill();
          observer.disconnect();
          window.removeEventListener("resize", resize);
          cancelAnimationFrame(frame);
          moving.style.strokeDasharray = "0 1";
          dot.style.opacity = "0";
        };
      });
      cleanup = () => media.revert();
    }
    document.fonts.ready.then(() => {
      if (!disposed) setup().catch(() => cleanup?.());
    });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [pathname]);

  if (pathname !== "/") return null;
  return (
    <svg
      ref={svg}
      className="scroll-thread"
      aria-hidden="true"
      focusable="false"
    >
      <path ref={track} className="thread-track" />
      <path ref={trail} className="thread-trail" />
      <circle ref={head} r="4" className="thread-head" />
    </svg>
  );
}
