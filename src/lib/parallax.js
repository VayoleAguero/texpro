// Turbo Parallax v2: инерция + drift (чуть двигаем в сторону скролла и мыши)
// Атрибуты:
//   data-parallax            — включает поведение для контейнера
//   внутри: любой узел с data-speed="0.2..2" и опц. data-drift="0..1"
//   data-strength            — амплитуда контейнера (px) для лёгкого общего сдвига
// Авто-дауншифт на мобильных и reduce-motion.

export function useParallax(selector = "[data-parallax]") {
  if (typeof window === "undefined") return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  const parents = Array.from(document.querySelectorAll(selector));
  if (!parents.length) return;

  // состояние скролла
  let lastY = window.scrollY;
  let velY = 0;        // скорость
  let raf = null;
  let mouseX = 0.5;    // нормализованные координаты мыши [0..1]
  let mouseY = 0.5;

  const norm = (v, a, b) => (v - a) / Math.max(1, b - a);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  // мышь: лёгкий drift
  const onMove = (e) => {
    mouseX = clamp(e.clientX / window.innerWidth, 0, 1);
    mouseY = clamp(e.clientY / window.innerHeight, 0, 1);
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  // предкалькуляция позиций контейнеров
  const boxes = parents.map((p) => {
    const layers = Array.from(p.querySelectorAll("[data-speed]"));
    return { el: p, layers, top: 0, bottom: 0, strength: +(p.dataset.strength || 40) };
  });

  const recalc = () => {
    const vh = window.innerHeight;
    boxes.forEach((b) => {
      const r = b.el.getBoundingClientRect();
      const t = r.top + window.scrollY;
      const bt = r.bottom + window.scrollY;
      b.top = t - vh;
      b.bottom = bt;
    });
  };

  const tick = () => {
    raf = null;

    const y = window.scrollY;
    const dy = y - lastY;
    lastY = y;

    // инерция скорости
    velY = lerp(velY, dy, 0.18); // чем больше, тем "тяжелее"
    const driftSign = Math.sign(velY || dy);

    const vh = window.innerHeight;
    boxes.forEach((b) => {
      // общий offset контейнера (лёгкая качка секции)
      const span = b.bottom - b.top || 1;
      const p = clamp((y - b.top) / span, 0, 1); // 0..1 — прогресс внутри блока
      const baseOffset = (p - 0.5) * (reduce ? 0 : isMobile ? b.strength * 0.35 : b.strength); // -S/2..S/2
      b.el.style.transform = `translate3d(0, ${(-baseOffset).toFixed(2)}px, 0)`;

      // слои
      b.layers.forEach((l) => {
        const sp = parseFloat(l.getAttribute("data-speed") || "1"); // 1 — базовая
        const drift = parseFloat(l.getAttribute("data-drift") || "0"); // 0..1
        const driftY =
          drift *
          (reduce ? 0 : isMobile ? 4 : 10) *
          driftSign *
          (Math.abs(velY) / 18); // чем быстрее скролл — тем сильнее сдвиг

        // лёгкий мышиный параллакс: вокруг центра
        const mx = (mouseX - 0.5) * (reduce ? 0 : isMobile ? 2 : 6);
        const my = (mouseY - 0.5) * (reduce ? 0 : isMobile ? 2 : 6);

        const layerOffset = ((p - 0.5) * 2) * (isMobile ? 12 : 22) * (sp - 1); // быстрее/медленнее базового
        const ty = (-layerOffset + driftY + my).toFixed(2);
        const tx = (mx * (sp * 0.4)).toFixed(2);

        l.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        l.style.willChange = "transform";
      });
    });
  };

  const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
  const onResize = () => { recalc(); onScroll(); };

  recalc(); tick();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);

  // возврат — на случай хот-перезапуска
  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("pointermove", onMove);
    if (raf) cancelAnimationFrame(raf);
  };
}
