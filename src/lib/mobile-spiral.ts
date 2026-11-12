/** Mobile keeps the spiral composition without compiling a WebGL renderer. */
export function createMobileSpiral(
  root: HTMLElement,
  options: { paused: () => boolean; focused: () => number | null },
) {
  const slots = [...root.querySelectorAll<HTMLElement>(".orbit-slot")];
  const hero = root.closest("section")!;
  const origins = slots.map((slot) => ({
    x: parseFloat(slot.style.getPropertyValue("--orbit-x")) / 100,
    y: parseFloat(slot.style.getPropertyValue("--orbit-y")) / 100,
  }));
  let width = root.clientWidth,
    height = root.clientHeight;
  let frame = 0,
    last = 0,
    time = 0,
    travel = 0,
    visible = true;
  const resize = new ResizeObserver(() => {
    width = root.clientWidth;
    height = root.clientHeight;
  });
  resize.observe(root);
  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  });
  visibility.observe(hero);
  root.dataset.renderer = "css";
  root.dataset.orbitReady = "true";
  const paint = (now: number) => {
    frame = requestAnimationFrame(paint);
    if (now - last < 1000 / 30) return;
    const delta = Math.min((now - last) / 1000, 0.06);
    last = now;
    if (
      !visible ||
      document.hidden ||
      options.paused() ||
      options.focused() !== null
    )
      return;
    time += delta;
    travel += delta * 0.009;
    const scroll = -hero.getBoundingClientRect().top * 0.00018;
    const diagonal = Math.hypot(width, height) / 2;
    slots.forEach((slot, index) => {
      const arm = index % 3,
        row = Math.floor(index / 3);
      const p = ((row + 0.55 + arm * 0.39) / 3 + travel + scroll) % 1;
      const radius = diagonal * (0.055 + Math.pow(p, 0.92) * 1.5);
      const angle =
        (arm * Math.PI * 2) / 3 +
        (radius / (diagonal * 0.74)) * Math.PI * 2 * 0.85 -
        time * 0.012;
      const x = Math.cos(angle) * radius,
        y = Math.sin(angle) * radius * 0.95;
      const w = Math.max(
        72,
        Math.min(height * 0.25, 180) * (0.25 + 1.05 * Math.pow(p, 0.75)) * 1.44,
      );
      slot.style.transform = `translate3d(${width / 2 + x - origins[index].x * width}px,${height / 2 - y - origins[index].y * height}px,0) translate(-50%,-50%) rotate(${Math.sin(index) * 4}deg) scale(${w / 95})`;
      slot.style.opacity = String(Math.min(1, p / 0.12) * 0.85);
    });
  };
  frame = requestAnimationFrame(paint);
  return () => {
    cancelAnimationFrame(frame);
    resize.disconnect();
    visibility.disconnect();
    delete root.dataset.renderer;
    delete root.dataset.orbitReady;
    slots.forEach((slot) => {
      slot.style.transform = "";
      slot.style.width = "";
      slot.style.opacity = "";
    });
  };
}
