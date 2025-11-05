// src/sections/Services.jsx
import useInViewLoop from "../hooks/useInViewLoop";

const items = [
  { title: "Проектирование",   img: "wp-content/uploads/2023/12/Services1.png" },
  { title: "Дизайн интерьера", img: "wp-content/uploads/2023/12/Services5.png" },
  { title: "Ремонт и отделка", img: "wp-content/uploads/2023/12/Services3.jpg" },
  { title: "Авторский надзор", img: "wp-content/uploads/2023/12/Services4.jpg" },
];

export default function Services(){
  const ref = useInViewLoop({ threshold: 0.15 });

  const onMouseMove = (e) => {
    const v = e.currentTarget;
    const r = v.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
    const dy = (e.clientY - (r.top  + r.height / 2)) / r.height;
    v.style.setProperty("--tx", `${dx * 8}px`);
    v.style.setProperty("--ty", `${dy * 8}px`);
  };

  const onLeave = (e) => {
    e.currentTarget.style.removeProperty("--tx");
    e.currentTarget.style.removeProperty("--ty");
  };

  return (
    <>
      <section
        id="services"
        className="section full-bleed tiles-overlap after-hero services-section"
        ref={ref}
        aria-label="Услуги"
        data-anim="soft-up"
        data-dur=".7"
        data-once="true"
        data-ease="expo"
      >
        {/* стаггерим непосредственно .tile как детей */}
        <div
          className="tiles tiles-stagger tiles-tall full-bleed-padding inview-group"
          data-anim="stagger-up"
          data-stagger="110"
          data-dur=".6"
          data-ease="expo"
        >
          {items.map((it, i) => (
            <div className="tile service-tile" key={i}>
              <div
                className="visual service-visual"
                onMouseMove={onMouseMove}
                onMouseLeave={onLeave}
              >
                {/* фон — клиповое раскрытие по Y (диафрагма) */}
                <img
                  src={it.img}
                  alt={it.title}
                  loading="lazy"
                  data-anim="clip-y"
                  data-dur=".8"
                  data-delay={i * 0.05}
                  data-once="true"
                />

                <span
                  className="service-shade"
                  aria-hidden="true"
                  data-anim="fade-in"
                  data-dur=".5"
                  data-delay={i * 0.05 + 0.12}
                />

                {/* ВНИМАНИЕ: анимация на контейнере, не на span */}
                <div
                  className="title-vert"
                  data-anim="blur-up"
                  data-dur=".6"
                  data-delay={i * 0.05 + 0.18}
                >
                  <span>{it.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="band emerald-cta full-bleed"
        aria-label="О компании"
        data-anim="fade-scale"
        data-dur=".55"
        data-once="true"
      >
        <div className="emerald-cta-inner">
          <p className="emerald-cta-line" data-anim="fade-in" data-dur=".5">
            Компания полного цикла в области строительства и дизайна.
          </p>
          <p
            className="emerald-cta-line emerald-cta-line--thin"
            data-anim="fade-in"
            data-delay=".08"
            data-dur=".5"
          >
            Мы строим — Вы наслаждаетесь процессом и получаете результат.
          </p>
        </div>
      </section>
    </>
  );
}
