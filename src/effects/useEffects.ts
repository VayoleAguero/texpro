// src/effects/useEffects.ts
import { useEffect } from "react";

type ParallaxTarget = HTMLElement & { __pax?: { sx:number, sy:number } };

export function useRevealObserver(root: HTMLElement | null = null) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) (e.target as HTMLElement).classList.add("in-view");
        });
      },
      { root, threshold: 0.15 }
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [root]);
}

export function useParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // -------- scroll parallax (data-parallax-y / data-parallax-x in px) --------
    const paxEls = Array.from(document.querySelectorAll<ParallaxTarget>("[data-parallax-y], [data-parallax-x]"));
    const lerp = (a:number, b:number, t:number)=> a + (b-a)*t;
    let ticking = false;

    const updateScroll = () => {
      const vh = window.innerHeight;
      paxEls.forEach(el => {
        const r = el.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, 1 - Math.abs((r.top + r.height/2 - vh/2)/(vh*0.9))));
        const maxY = parseFloat(el.dataset.parallaxY || "0");
        const maxX = parseFloat(el.dataset.parallaxX || "0");
        // сохраняем сглаженные смещения на элементе
        el.__pax = el.__pax || { sx:0, sy:0 };
        el.__pax.sx = lerp(el.__pax.sx, maxX * (1 - progress), 0.12);
        el.__pax.sy = lerp(el.__pax.sy, maxY * (1 - progress), 0.12);
        el.style.transform = `translate3d(${el.__pax.sx.toFixed(2)}px, ${el.__pax.sy.toFixed(2)}px, 0) ${el.dataset.tiltActive ? el.dataset.tiltActive : ""}`;
      });
      ticking = false;
    };

    const onScroll = () => { if (!ticking){ ticking = true; requestAnimationFrame(updateScroll); } };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // -------- mouse parallax (data-mouse-parallax="intensity") --------
    const mpEls = Array.from(document.querySelectorAll<HTMLElement>("[data-mouse-parallax]"));
    const state = { mx:0, my:0, lx:0, ly:0 };

    const onMove = (e: MouseEvent) => {
      const { innerWidth:w, innerHeight:h } = window;
      state.mx = (e.clientX / w - 0.5) * 2;  // -1..1
      state.my = (e.clientY / h - 0.5) * 2;
    };

    let rafId = 0;
    const loop = () => {
      state.lx += (state.mx - state.lx) * 0.08;
      state.ly += (state.my - state.ly) * 0.08;
      mpEls.forEach(el => {
        const k = parseFloat(el.dataset.mouseParallax || "10"); // px
        const tx = -(state.lx * k);
        const ty = -(state.ly * k);
        el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
      });
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);
}

export function useTilt() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tiltEls = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"));
    const onEnter = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      el.style.willChange = "transform";
    };
    const onLeave = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
      el.style.willChange = "auto";
      const p = el.closest<HTMLElement>("[data-parallax-y], [data-parallax-x]");
      if (p) p.dataset.tiltActive = ""; // сброс дополнительного transform
    };
    const onMove = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rx = (-y * 6).toFixed(2);
      const ry = ( x * 8).toFixed(2);
      const t  = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
      el.style.transform = t;
      // если этот блок ещё и скролл-параллакс родителя — склеиваем трансформы
      const p = el.closest<HTMLElement>("[data-parallax-y], [data-parallax-x]");
      if (p) p.dataset.tiltActive = t;
    };

    tiltEls.forEach(el => {
      el.addEventListener("mouseenter", onEnter as any);
      el.addEventListener("mouseleave", onLeave as any);
      el.addEventListener("mousemove", onMove as any);
    });

    return () => {
      tiltEls.forEach(el => {
        el.removeEventListener("mouseenter", onEnter as any);
        el.removeEventListener("mouseleave", onLeave as any);
        el.removeEventListener("mousemove", onMove as any);
      });
    };
  }, []);
}

// Провайдер: включить сразу все
export function useSiteEffects(root?: HTMLElement | null) {
  useRevealObserver(root || null);
  useParallax();
  useTilt();
}
