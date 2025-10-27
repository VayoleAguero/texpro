import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Цикличная, «живая» анимация:
 * - STEP_MS — период начала следующего слайда (меньше длительности → плавное перекрытие)
 * - FADE_MS — длительность кроссфейда/движений
 */
const STEP_MS = 1100;
const FADE_MS = 800;

const SLIDES = [
  { type: "default", title: "Искусство",   side: "left",  align: "left",  size: "lg",
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2400&auto=format&fit=crop" },

  // «СТРО» — заголовок на правом изумрудном клине
  { type: "default", title: "СТРО",        side: "right", align: "right", size: "mega",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2400&auto=format&fit=crop" },

  { type: "default", title: "ИТЬ",         side: "left",  align: "left",  size: "mega",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2400&auto=format&fit=crop" },

  { type: "default", title: "ВНЕ ВРЕМЕНИ", side: "right", align: "right", size: "lg",
    img: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2400&auto=format&fit=crop" },

  // split: два клина без белой полосы
  { type: "split",
    leftImg:  "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=2400&auto=format&fit=crop",
    rightImg: "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=2400&auto=format&fit=crop" },
];

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(0);
  const timerRef = useRef(0);

  const prevSide = SLIDES[prevIdx]?.side || "left";
  const currSide = SLIDES[idx]?.side || "left";

  // Стартовый «залёт» клина: если меняем сторону — амплитуда больше,
  // если сторона та же — небольшой скользящий перенос (выглядит естественнее)
  const fromX = useMemo(() => {
    if (SLIDES[idx].type === "split") return 0;
    if (prevSide === currSide) return currSide === "right" ? 5 : -5;
    return currSide === "right" ? 12 : -12;
  }, [idx, prevSide, currSide]);

  // Небольшой сдвиг фона в сторону клина — создаёт ощущение непрерывного движения
  const bgShiftX = useMemo(() => (currSide === "right" ? "-1.2%" : "1.2%"), [currSide]);

  useEffect(() => {
    const advance = () => {
      setIdx((current) => {
        setPrevIdx(current);
        return (current + 1) % SLIDES.length;
      });
    };
    timerRef.current = window.setInterval(advance, STEP_MS);
    return () => window.clearInterval(timerRef.current);
  }, []);

  return (
    <section
      id="home"
      className="hero-auto"
      aria-label="Hero"
      style={{ ["--fade"]: `${FADE_MS}ms` }}
    >
      {SLIDES.map((s, i) => {
        const isActive = i === idx;
        const isPrev   = i === ((idx - 1 + SLIDES.length) % SLIDES.length);
        return (
          <article
            key={i}
            className={[
              "hero-auto__panel",
              s.type === "split" ? "is-split" : "is-default",
              isActive ? "is-active" : "",
              isPrev ? "was-active" : "",
            ].join(" ")}
            aria-hidden={!isActive && !isPrev}
          >
            {s.type === "default" ? (
              <>
                <img
                  className="hero-bg smooth-zoom"
                  src={s.img}
                  alt=""
                  style={{ ["--bgShiftX"]: bgShiftX }}
                />
                <div
                  className={`hero-overlay ${s.side === "right" ? "right" : "left"}`}
                  style={{ ["--fromX"]: `${fromX}%` }}
                />
                <h1
                  className={[
                    "hero-title",
                    s.align === "right" ? "hero-title--right" : "hero-title--left",
                    s.size === "mega" ? "hero-title--mega" : "hero-title--lg",
                  ].join(" ")}
                >
                  {s.title}
                </h1>
              </>
            ) : (
              <div className="split-tri">
                <div className="tri tri-left"  style={{ backgroundImage: `url(${s.leftImg})` }} />
                <div className="tri tri-right" style={{ backgroundImage: `url(${s.rightImg})` }} />
              </div>
            )}
          </article>
        );
      })}
    </section>
  );
}
