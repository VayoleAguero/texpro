// Повторяемые scroll-reveal анимации.
// По умолчанию replay включен: элемент сбрасывается при уходе и снова анимируется при входе.
// Поставь data-once="true", чтобы анимация отработала один раз.

export function initReveal() {
  if (typeof window === "undefined") return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = Array.from(document.querySelectorAll('[data-anim]'));
  if (!els.length) return;

  const PRESETS = {
    'fade-in': () => ({ from:{opacity:0}, to:{opacity:1, transform:'none'} }),
    'fade-up': () => ({ from:{opacity:0, transform:'translateY(24px)'}, to:{opacity:1, transform:'translateY(0)'} }),
    'slide-left': () => ({ from:{opacity:0, transform:'translateX(24px)'}, to:{opacity:1, transform:'translateX(0)'} }),
    'scale-in': () => ({ from:{opacity:0, transform:'scale(.96)'}, to:{opacity:1, transform:'scale(1)'} }),
    'stagger-up': () => ({ from:{opacity:0, transform:'translateY(18px)'}, to:{opacity:1, transform:'translateY(0)'} }),
  };

  // Инициал: ставим "from" для всех наблюдаемых
  els.forEach(el => {
    const t = el.dataset.anim || 'fade-in';
    const preset = PRESETS[t] ? PRESETS[t]() : PRESETS['fade-in']();
    if (reduce) { Object.assign(el.style, {opacity:1, transform:'none'}); return; }

    if (t === 'stagger-up') {
      const kids = Array.from(el.children);
      kids.forEach(k => Object.assign(k.style, preset.from, { willChange: 'transform,opacity' }));
    } else {
      Object.assign(el.style, preset.from, { willChange: 'transform,opacity' });
    }
  });

  if (reduce) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      const t = el.dataset.anim || 'fade-in';
      const dur = +el.dataset.dur || .7;
      const delay = +el.dataset.delay || 0;
      const once = el.dataset.once === 'true';
      const preset = PRESETS[t] ? PRESETS[t]() : PRESETS['fade-in']();

      const applyTo = (node) => {
        node.style.transition = `transform ${dur}s cubic-bezier(.2,.8,.2,1), opacity ${dur}s ease`;
        Object.assign(node.style, preset.to);
      };
      const applyFrom = (node) => {
        node.style.transition = 'none';
        Object.assign(node.style, preset.from);
        void node.offsetHeight;
      };

      if (entry.isIntersecting) {
        if (t === 'stagger-up') {
          const kids = Array.from(el.children);
          const st = +(el.dataset.stagger || 90);
          kids.forEach((k, i) => setTimeout(() => applyTo(k), delay*1000 + i*st));
        } else {
          setTimeout(() => applyTo(el), delay*1000);
        }
        if (once) io.unobserve(el);
      } else {
        if (!once) {
          if (t === 'stagger-up') {
            const kids = Array.from(el.children);
            kids.forEach(k => applyFrom(k));
          } else {
            applyFrom(el);
          }
        }
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });

  els.forEach(el => io.observe(el));

  // вернуть очистку наблюдателя
  return () => io.disconnect();
}
