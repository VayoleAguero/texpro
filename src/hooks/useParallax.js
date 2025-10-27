// Лёгкий параллакс: любой контейнер с data-parallax,
// а внутри элементы с data-speed="-20..20"
import { useEffect } from "react";

export default function useParallax(selector = "[data-parallax]") {
  useEffect(() => {
    const parents = Array.from(document.querySelectorAll(selector));

    const onScroll = () => {
      const wh = window.innerHeight;
      parents.forEach((p) => {
        const rect = p.getBoundingClientRect();
        const t = (rect.top + rect.height * 0.5 - wh * 0.5) / wh; // [-1..2] условно
        const layers = p.querySelectorAll("[data-speed]");
        layers.forEach((l) => {
          const sp = parseFloat(l.getAttribute("data-speed") || "0");
          l.style.transform = `translate3d(0, ${t * sp * 10}px, 0)`;
        });
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [selector]);
}
