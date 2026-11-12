"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: the server-rendered page is readable without GSAP. */
export function SiteMotion() {
  const pathname = usePathname();
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let revert: (() => void) | undefined;

    async function initialize() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      revert = () => media.revert();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const main = document.querySelector("main");
        if (!main) return;
        const lines = main.querySelectorAll(".hero-line > span");
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        // Only play the opening sequence when arriving at the top of the page.
        if (lines.length && window.scrollY < 80 && !window.location.hash) {
          intro
            .from(lines, {
              yPercent: 105,
              rotate: 2,
              duration: 1.05,
              stagger: 0.13,
              clearProps: "transform",
            })
            .from(
              main.querySelectorAll(
                ".hero-copy > .eyebrow, .hero-description, .hero-actions, .hero-signals",
              ),
              {
                y: 14,
                opacity: 0.4,
                duration: 0.65,
                stagger: 0.07,
                clearProps: "all",
              },
              0.3,
            );
        }

        main
          .querySelectorAll<HTMLElement>(
            ".studio-intro h2, .services-title h2, .method-heading h2, .evidence-section h2, .editorial-faq h2, .final-cta h2, .inner-hero h1",
          )
          .forEach((element) => {
            gsap.from(element, {
              y: 30,
              opacity: 0.45,
              duration: 0.85,
              ease: "power3.out",
              clearProps: "transform,opacity",
              scrollTrigger: { trigger: element, start: "top 92%", once: true },
            });
          });
        main
          .querySelectorAll<HTMLElement>(
            ".service-row, .method-grid article, .deliverable",
          )
          .forEach((element) => {
            gsap.from(element, {
              y: 20,
              duration: 0.7,
              ease: "power3.out",
              clearProps: "transform",
              scrollTrigger: { trigger: element, start: "top 94%", once: true },
            });
          });
        const visual = main.querySelector(".hero-visual");
        if (visual) {
          gsap.from(visual, {
            y: 30,
            opacity: 0.5,
            duration: 1.15,
            ease: "power3.out",
            clearProps: "all",
          });
          gsap.to(visual.querySelector("img"), {
            y: 20,
            ease: "none",
            scrollTrigger: {
              trigger: visual,
              start: "top top",
              end: "bottom top",
              scrub: 0.7,
            },
          });
        }
        main
          .querySelectorAll<HTMLElement>(".project-carousel")
          .forEach((carousel) => {
            gsap.from(carousel, {
              y: 30,
              opacity: 0.55,
              duration: 0.9,
              ease: "power3.out",
              clearProps: "all",
              scrollTrigger: {
                trigger: carousel,
                start: "top 95%",
                once: true,
              },
            });
          });
        const showcase = main.querySelector(".showcase-canvas");
        if (showcase)
          gsap.from(showcase.querySelector("img"), {
            y: 55,
            scale: 0.9,
            ease: "none",
            scrollTrigger: {
              trigger: showcase,
              start: "top bottom",
              end: "center center",
              scrub: 0.65,
            },
          });
        if (progress.current)
          gsap.fromTo(
            progress.current,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: document.documentElement,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.15,
              },
            },
          );
        // Focus must reveal a target immediately, even while its entrance is running.
        const revealFocus = (event: FocusEvent) => {
          const target = event.target as HTMLElement;
          const row = target.closest(".service-row, .deliverable");
          if (row) {
            gsap.killTweensOf(row);
            gsap.set(row, { clearProps: "transform,opacity" });
          }
        };
        main.addEventListener("focusin", revealFocus);
        ScrollTrigger.refresh();
        return () => main.removeEventListener("focusin", revealFocus);
      });

      media.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const cleanups: (() => void)[] = [];
          document
            .querySelectorAll<HTMLElement>(".button, .nav-cta")
            .forEach((button) => {
              const x = gsap.quickTo(button, "x", {
                duration: 0.45,
                ease: "power3.out",
              });
              const y = gsap.quickTo(button, "y", {
                duration: 0.45,
                ease: "power3.out",
              });
              const move = (event: PointerEvent) => {
                const box = button.getBoundingClientRect();
                x((event.clientX - box.left - box.width / 2) * 0.045);
                y((event.clientY - box.top - box.height / 2) * 0.09);
              };
              const reset = () => {
                x(0);
                y(0);
              };
              button.addEventListener("pointermove", move);
              button.addEventListener("pointerleave", reset);
              button.addEventListener("blur", reset);
              cleanups.push(() => {
                button.removeEventListener("pointermove", move);
                button.removeEventListener("pointerleave", reset);
                button.removeEventListener("blur", reset);
                x.tween.kill();
                y.tween.kill();
                gsap.set(button, { clearProps: "transform" });
              });
            });
          return () => cleanups.forEach((cleanup) => cleanup());
        },
      );
    }
    // Fonts are local. Wait for layout stability before measuring scroll positions.
    document.fonts.ready.then(() => {
      if (!disposed)
        initialize().catch(() => {
          revert?.();
        });
    });
    return () => {
      disposed = true;
      revert?.();
    };
  }, [pathname]);

  return <div ref={progress} className="reading-progress" aria-hidden="true" />;
}
