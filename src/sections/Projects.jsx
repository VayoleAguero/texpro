import { useEffect, useMemo, useRef, useState } from "react";
import ProjectModal from "../components/ProjectModal";

/** ТВОЙ ЖЕ МАССИВ ПРОЕКТОВ — без изменений */
const projects = [
  {
    title: "Квартира в ЖК Вавилов дом",
    summary: "Трёхкомнатная квартира площадью 79 кв.м.",
    details: ["Дизайн, проектирование", "Отделка под ключ", "Комплектация"],
    images: [
      "/wp-content/uploads/2023/12/Vavilov/Vavilov2.jpg",
      "/wp-content/uploads/2023/12/Vavilov/Vavilov1.jpg",
      "/wp-content/uploads/2023/12/Vavilov/Vavilov3.jpg",
      "/wp-content/uploads/2023/12/Vavilov/Vavilov4.jpg",
      "/wp-content/uploads/2023/12/Vavilov/Vavilov5.jpg",
    ],
  },
  {
    title: "Дом Благовещенка",
    summary: "Загородный дом с акцентом на натуральные материалы.",
    details: ["Дизайн, проектирование", "Отделка под ключ", "Комлпектация"],
    images: [
      "/wp-content/uploads/2023/12/Blagoveshenka/Blagoveshenka1.jpg",
      "/wp-content/uploads/2023/12/Blagoveshenka/Blagoveshenka2.jpg",
      "/wp-content/uploads/2023/12/Blagoveshenka/Blagoveshenka3.jpg",
      "/wp-content/uploads/2023/12/Blagoveshenka/Blagoveshenka4.jpg",
      "/wp-content/uploads/2023/12/Blagoveshenka/Blagoveshenka5.jpg",
      "/wp-content/uploads/2023/12/Blagoveshenka/Blagoveshenka6.jpg",
      "/wp-content/uploads/2023/12/Blagoveshenka/Blagoveshenka7.jpg",
      "/wp-content/uploads/2023/12/Blagoveshenka/Blagoveshenka8.jpg",
      "/wp-content/uploads/2023/12/Blagoveshenka/Blagoveshenka9.jpg",
      "/wp-content/uploads/2023/12/Blagoveshenka/Blagoveshenka10.jpg",
      "/wp-content/uploads/2023/12/Blagoveshenka/Blagoveshenka11.jpg",
      "/wp-content/uploads/2023/12/Blagoveshenka/Blagoveshenka12.jpg",
      "/wp-content/uploads/2023/12/Blagoveshenka/Blagoveshenka13.jpg",
      "/wp-content/uploads/2023/12/Blagoveshenka/Blagoveshenka14.jpg",
      "/wp-content/uploads/2023/12/Blagoveshenka/Blagoveshenka15.jpg",
      "/wp-content/uploads/2023/12/Blagoveshenka/Blagoveshenka16.jpg",
      "/wp-content/uploads/2023/12/Blagoveshenka/Blagoveshenka17.jpg",
      "/wp-content/uploads/2023/12/Blagoveshenka/Blagoveshenka18.jpg",
      "/wp-content/uploads/2023/12/Blagoveshenka/Blagoveshenka19.jpg",
      "/wp-content/uploads/2023/12/Blagoveshenka/Blagoveshenka20.jpg",
    ],
  },
  {
    title: "Апартаменты в Химках",
    summary: "Трехкомнатная квартира площадью 87 кв.м.",
    details: ["Дизайн, проектирование", "Отделка под ключ", "Комплектация"],
    images: [
      "/wp-content/uploads/2023/12/Khinmki/Khinmki1.jpg",
      "/wp-content/uploads/2023/12/Khinmki/Khinmki2.jpg",
      "/wp-content/uploads/2023/12/Khinmki/Khinmki3.jpg",
      "/wp-content/uploads/2023/12/Khinmki/Khinmki4.jpg",
      "/wp-content/uploads/2023/12/Khinmki/Khinmki5.jpg",
      "/wp-content/uploads/2023/12/Khinmki/Khinmki6.jpg",
      "/wp-content/uploads/2023/12/Khinmki/Khinmki7.jpg",
      "/wp-content/uploads/2023/12/Khinmki/Khinmki8.jpg",
      "/wp-content/uploads/2023/12/Khinmki/Khinmki9.jpg",
      "/wp-content/uploads/2023/12/Khinmki/Khinmki10.jpg",
      "/wp-content/uploads/2023/12/Khinmki/Khinmki11.jpg",
      "/wp-content/uploads/2023/12/Khinmki/Khinmki12.jpg",
      "/wp-content/uploads/2023/12/Khinmki/Khinmki13.jpg",
      "/wp-content/uploads/2023/12/Khinmki/Khinmki14.jpg",
      "/wp-content/uploads/2023/12/Khinmki/Khinmki15.jpg",
      "/wp-content/uploads/2023/12/Khinmki/Khinmki16.jpg",
      "/wp-content/uploads/2023/12/Khinmki/Khinmki17.jpg",
      "/wp-content/uploads/2023/12/Khinmki/Khinmki18.jpg",
      "/wp-content/uploads/2023/12/Khinmki/Khinmki19.jpg",
      "/wp-content/uploads/2023/12/Khinmki/Khinmki20.jpg",
      "/wp-content/uploads/2023/12/Khinmki/Khinmki21.jpg",
      "/wp-content/uploads/2023/12/Khinmki/Khinmki22.jpg",
      "/wp-content/uploads/2023/12/Khinmki/Khinmki23.jpg",
      "/wp-content/uploads/2023/12/Khinmki/Khinmki24.jpg",
      "/wp-content/uploads/2023/12/Khinmki/Khinmki25.jpg",
      "/wp-content/uploads/2023/12/Khinmki/Khinmki26.jpg",
      "/wp-content/uploads/2023/12/Khinmki/Khinmki27.jpg",
    ],
  },
  {
    title: "Апартаменты в доме на Мосфильмовской",
    summary: "Апартаменты площадью 106 кв. м.",
    details: ["Дизайн,проектирование", "Отделка под ключ", "Комплектация"],
    images: [
      "/wp-content/uploads/2023/12/Mosfilm/Mosfilm1.jpg",
      "/wp-content/uploads/2023/12/Mosfilm/Mosfilm2.jpg",
      "/wp-content/uploads/2023/12/Mosfilm/Mosfilm3.jpg",
      "/wp-content/uploads/2023/12/Mosfilm/Mosfilm4.jpg",
      "/wp-content/uploads/2023/12/Mosfilm/Mosfilm5.jpg",
      "/wp-content/uploads/2023/12/Mosfilm/Mosfilm6.jpg",
      "/wp-content/uploads/2023/12/Mosfilm/Mosfilm7.jpg",
      "/wp-content/uploads/2023/12/Mosfilm/Mosfilm8.jpg",
      "/wp-content/uploads/2023/12/Mosfilm/Mosfilm9.jpg",
      "/wp-content/uploads/2023/12/Mosfilm/Mosfilm10.jpg",
      "/wp-content/uploads/2023/12/Mosfilm/Mosfilm11.jpg",
      "/wp-content/uploads/2023/12/Mosfilm/Mosfilm12.jpg",
      "/wp-content/uploads/2023/12/Mosfilm/Mosfilm13.jpg",
      "/wp-content/uploads/2023/12/Mosfilm/Mosfilm14.jpg",
      "/wp-content/uploads/2023/12/Mosfilm/Mosfilm15.jpg",
      "/wp-content/uploads/2023/12/Mosfilm/Mosfilm16.jpg",
      "/wp-content/uploads/2023/12/Mosfilm/Mosfilm17.jpg",
      "/wp-content/uploads/2023/12/Mosfilm/Mosfilm18.jpg",
      "/wp-content/uploads/2023/12/Mosfilm/Mosfilm19.jpg",
      "/wp-content/uploads/2023/12/Mosfilm/Mosfilm20.jpg",
      "/wp-content/uploads/2023/12/Mosfilm/Mosfilm21.jpg",
    ],
  },
  {
    title: "Квартира 54 кв.м.",
    summary: "Двухкомнатная квартира площадью 54 кв. м.",
    details: ["Дизайн, Проектирование", "Отделка под ключ", "Комплектация"],
    images: [
      "/wp-content/uploads/2023/12/flat/Flat1.jpg",
      "/wp-content/uploads/2023/12/flat/Flat2.jpg",
      "/wp-content/uploads/2023/12/flat/Flat3.jpg",
      "/wp-content/uploads/2023/12/flat/Flat4.jpg",
      "/wp-content/uploads/2023/12/flat/Flat5.jpg",
      "/wp-content/uploads/2023/12/flat/Flat6.jpg",
      "/wp-content/uploads/2023/12/flat/Flat7.jpg",
      "/wp-content/uploads/2023/12/flat/Flat8.jpg",
      "/wp-content/uploads/2023/12/flat/Flat9.jpg",
      "/wp-content/uploads/2023/12/flat/Flat10.jpg",
      "/wp-content/uploads/2023/12/flat/Flat11.jpg",
      "/wp-content/uploads/2023/12/flat/Flat12.jpg",
      "/wp-content/uploads/2023/12/flat/Flat13.jpg",
      "/wp-content/uploads/2023/12/flat/Flat14.jpg",
      "/wp-content/uploads/2023/12/flat/Flat15.jpg",
      "/wp-content/uploads/2023/12/flat/Flat16.jpg",
      "/wp-content/uploads/2023/12/flat/Flat17.jpg",
      "/wp-content/uploads/2023/12/flat/Flat18.jpg",
      "/wp-content/uploads/2023/12/flat/Flat19.jpg",
      "/wp-content/uploads/2023/12/flat/Flat20.jpg",
      "/wp-content/uploads/2023/12/flat/Flat21.jpg",
      "/wp-content/uploads/2023/12/flat/Flat22.jpg",
      "/wp-content/uploads/2023/12/flat/Flat22.jpg",
    ],
  },
  {
    title: "Квартира в ЖК Маяк",
    summary: "Четырехкомнатная квартира площадью 130 кв. м.",
    details: ["Дизайн, проектирование", "Отделка под ключ", "Комплектация"],
    images: [
      "/wp-content/uploads/2023/12/Mayak/Mayak1.jpg",
      "/wp-content/uploads/2023/12/Mayak/Mayak2.jpg",
      "/wp-content/uploads/2023/12/Mayak/Mayak3.jpg",
      "/wp-content/uploads/2023/12/Mayak/Mayak4.jpg",
      "/wp-content/uploads/2023/12/Mayak/Mayak5.jpg",
      "/wp-content/uploads/2023/12/Mayak/Mayak6.jpg",
      "/wp-content/uploads/2023/12/Mayak/Mayak7.jpg",
      "/wp-content/uploads/2023/12/Mayak/Mayak8.jpg",
      "/wp-content/uploads/2023/12/Mayak/Mayak9.jpg",
      "/wp-content/uploads/2023/12/Mayak/Mayak10.jpg",
      "/wp-content/uploads/2023/12/Mayak/Mayak11.jpg",
      "/wp-content/uploads/2023/12/Mayak/Mayak12.jpg",
      "/wp-content/uploads/2023/12/Mayak/Mayak13.jpg",
      "/wp-content/uploads/2023/12/Mayak/Mayak14.jpg",
      "/wp-content/uploads/2023/12/Mayak/Mayak15.jpg",
      "/wp-content/uploads/2023/12/Mayak/Mayak16.jpg",
      "/wp-content/uploads/2023/12/Mayak/Mayak17.jpg",
      "/wp-content/uploads/2023/12/Mayak/Mayak18.jpg",
      "/wp-content/uploads/2023/12/Mayak/Mayak19.jpg",
      "/wp-content/uploads/2023/12/Mayak/Mayak20.jpg",
      "/wp-content/uploads/2023/12/Mayak/Mayak21.jpg",
      "/wp-content/uploads/2023/12/Mayak/Mayak22.jpg",
      "/wp-content/uploads/2023/12/Mayak/Mayak23.jpg",
      "/wp-content/uploads/2023/12/Mayak/Mayak24.jpg",
      "/wp-content/uploads/2023/12/Mayak/Mayak25.jpg",
    ],
  },
];

const STEP_MS = 4200; // период смены слайда
const FADE_MS = 900;  // длительность кроссфейда/движения

export default function Projects(){
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [active, setActive] = useState(null);
  const timerRef = useRef(0);

  const side = (i) => (i % 2 ? "right" : "left");
  const currSide = side(idx);
  const prevSide = side(prev);

  // амплитуда "влёта" клина — как в Hero
  const fromX = useMemo(() => {
    if (prevSide === currSide) return currSide === "right" ? 5 : -5;
    return currSide === "right" ? 12 : -12;
  }, [prevSide, currSide]);

  useEffect(() => {
    const next = () => {
      setIdx((cur) => {
        const n = (cur + 1) % projects.length;
        setPrev(cur);
        return n;
      });
    };
    timerRef.current = window.setInterval(next, STEP_MS);
    return () => window.clearInterval(timerRef.current);
  }, []);

  const open = (p) => { setActive(p); setModalOpen(true); };
  const close = () => setModalOpen(false);

  return (
    <>
      <section
        id="projects"
        className="proj-auto section"
        aria-label="Наши проекты"
        style={{ ["--fade"]: `${FADE_MS}ms` }}
      >
        {projects.map((p, i) => {
          const isActive = i === idx;
          const isPrev   = i === ((idx - 1 + projects.length) % projects.length);
          const bg = p.images?.[0] || "";
          const s = side(i);

          return (
            <article
              key={i}
              className={[
                "proj-panel",
                isActive ? "is-active" : "",
                isPrev ? "was-active" : "",
              ].join(" ")}
              aria-hidden={!isActive && !isPrev}
              role="button"
              tabIndex={isActive ? 0 : -1}
              onClick={() => open(p)}
              onKeyDown={(e)=> (e.key === "Enter" || e.key === " ") && open(p)}
            >
              {/* фон фото */}
              <img className="proj-bg smooth-zoom" src={bg} alt="" />
              {/* изумрудный клин слева/справа */}
              <div
                className={`proj-overlay ${s === "right" ? "right" : "left"}`}
                style={{ ["--fromX"]: `${fromX}%` }}
              />
              {/* карточка описания на изумрудном фоне */}
              <div className={`proj-card ${s === "right" ? "right" : "left"}`}>
                <h2 className="proj-title">{p.title}</h2>
                <span className="proj-underline" />
                <p className="proj-summary">{p.summary}</p>
                {p.details?.length ? (
                  <ul className="proj-list">
                    {p.details.slice(0,3).map((d, k) => <li key={k}>{d}</li>)}
                  </ul>
                ) : null}
                <div className="proj-cta">Открыть проект ↗</div>
              </div>
            </article>
          );
        })}
      </section>

      <ProjectModal open={modalOpen} onClose={close} project={active} />
    </>
  );
}
