import { useEffect, useRef } from "react";

/**
 * Полноэкранный sticky-Hero из 5 шагов:
 * 1) «Искусство»
 * 2) «СТРО»
 * 3) «ИТЬ»
 * 4) «ВНЕ ВРЕМЕНИ»
 * 5) Сплит из двух картинок со скошенным стыком
 */
const SLIDES = [
  // 1 — Нечётный: клин слева
  {
    type: "default",
    title: "Искусство",
    side: "left",
    align: "left",
    size: "lg",
    img:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2400&auto=format&fit=crop",
  },
  // 2 — Чётный: клин справа
  {
    type: "default",
    title: "СТРО",
    side: "right",
    align: "left",
    size: "mega",
    img:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2400&auto=format&fit=crop",
  },
  // 3 — Нечётный: клин слева
  {
    type: "default",
    title: "ИТЬ",
    side: "left",
    align: "left",
    size: "mega",
    img:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2400&auto=format&fit=crop",
  },
  // 4 — Чётный: клин справа + заголовок «ВНЕ ВРЕМЕНИ»
  {
    type: "default",
    title: "ВНЕ ВРЕМЕНИ",
    side: "right",
    align: "right",
    size: "lg",
    img:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2400&auto=format&fit=crop",
  },
  // 5 — Сплит из двух фото с диагональным скосом
  {
    type: "split",
    leftImg:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=2400&auto=format&fit=crop",
    rightImg:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=2400&auto=format&fit=crop",
  },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const panelsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const panels = panelsRef.current;
    if (!section || !panels.length) return;

    let raf = 0;

    const calc = () => {
      const vh = window.innerHeight;
      const rect = section.getBoundingClientRect();
      const totalScrollable = section.offsetHeight - vh;

      // Прогресс только внутри hero [0..1]
      const t =
        totalScrollable > 0
          ? Math.min(Math.max(-rect.top / totalScrollable, 0), 1)
          : 0;

      // Раскладка по сегментам между слайдами
      const segments = SLIDES.length - 1; // переходов на единицу пути
      const seg = 1 / segments;
      const idx = Math.min(Math.floor(t / seg), segments - 1);
      const local = (t - idx * seg) / seg;
      const active = Math.min(
        Math.max(Math.round(t / seg), 0),
        SLIDES.length - 1
      );

      panels.forEach((p, i) => {
        const kind = p.dataset.type;

        // Кроссфейд: предыдущий → следующий
        let alpha = 0;
        if (i === idx) alpha = 1 - local;
        else if (i === idx + 1) alpha = local;
        else if (t === 0 && i === 0) alpha = 1;
        else if (t === 1 && i === SLIDES.length - 1) alpha = 1;
        p.style.opacity = alpha.toFixed(4);

        if (kind === "split") return; // у split нет клина/заголовка

        // Анимация цветной плашки (клин)
        const overlay = p.querySelector(".hero-overlay");
        const dir = p.dataset.side === "right" ? 1 : -1; // + вправо / − влево
        const slideT =
          i === idx ? 1 - local : i === idx + 1 ? local : i === active ? 1 : 0;
        const dx = (1 - slideT) * dir * 14; // проценты ширины для смещения
        overlay.style.transform = `translate3d(${dx}%,0,0)`;

        // Заголовок показываем только у активного
        const title = p.querySelector(".hero-title");
        const isActive = i === active;
        title.style.opacity = isActive ? 1 : 0;
        title.style.transform = `translate3d(${isActive ? 0 : dir * 22}px,0,0)`;
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => ((raf = 0), calc()));
    };

    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", calc);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", calc);
    };
  }, []);

  return (
    <section
      id="home"
      className="hero-steps"
      ref={sectionRef}
      style={{ height: `calc(${SLIDES.length} * 100vh)` }}
      aria-label="Hero"
    >
      <div className="hero-steps-sticky">
        {SLIDES.map((s, i) => (
          <article
            key={i}
            className="hero-panel"
            data-type={s.type}
            data-side={s.side || ""}
            ref={(el) => (panelsRef.current[i] = el)}
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            {s.type === "split" ? (
              <div className="hero-split">
                <img className="split-img left" src={s.leftImg} alt="" />
                <img className="split-img right" src={s.rightImg} alt="" />
                <div className="split-divider" aria-hidden />
              </div>
            ) : (
              <>
                <img className="hero-bg" src={s.img} alt="" />
                <div className={`hero-overlay ${s.side}`} />
                <h1
                  className={[
                    "hero-title",
                    s.align === "right"
                      ? "hero-title--right"
                      : "hero-title--left",
                    s.size === "mega" ? "hero-title--mega" : "hero-title--lg",
                  ].join(" ")}
                >
                  {s.title}
                </h1>
              </>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
