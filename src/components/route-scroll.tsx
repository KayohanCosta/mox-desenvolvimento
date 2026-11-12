"use client";
import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/** Shared footer position must never become the entry point of a new page. */
export function RouteScroll() {
  const pathname = usePathname();
  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    if (!window.location.hash)
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const frame = requestAnimationFrame(() => {
      if (!window.location.hash)
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
    return () => {
      cancelAnimationFrame(frame);
      window.history.scrollRestoration = previous;
    };
  }, [pathname]);
  return null;
}
