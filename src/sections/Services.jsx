import useInViewLoop from "../hooks/useInViewLoop";

const items = [
  { title: "Проектирование",   img: "wp-content/uploads/2023/12/proj.jpeg" },
  { title: "Дизайн-интерьера", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2400" },
  { title: "Ремонт и отделка", img: "wp-content/uploads/2023/12/remont.jpeg" },
  { title: "Авторский надзор", img: "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=2400" },
];

export default function Services(){
  const ref = useInViewLoop({ threshold: 0.15 });

  const onMouseMove = (e) => {
    const t = e.currentTarget.querySelector(".title");
    if (!t) return;
    const r = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width/2)) / r.width;
    const dy = (e.clientY - (r.top  + r.height/2)) / r.height;
    t.style.transform = `translate(${dx*10}px, ${dy*10}px)`;
  };
  const onLeave = (e) => {
    const t = e.currentTarget.querySelector(".title");
    if (t) t.style.transform = "translate(0,0)";
  };

  return (
    <>
      {/* СЕКЦИЯ УСЛУГ на изумрудном фоне, во всю ширину и без внешних отступов */}
      <section
        id="services"
        className="section full-bleed tiles-overlap after-hero services-section"
        ref={ref}
        aria-label="Услуги"
      >
        <div className="tiles tiles-stagger tiles-tall full-bleed-padding inview-group">
          {items.map((it, i)=>(
            <div className="tile reveal-zoom" style={{ "--d": `${i * 0.06}s` }} key={i}>
              <div className="visual" onMouseMove={onMouseMove} onMouseLeave={onLeave}>
                <img src={it.img} alt={it.title} loading="lazy" />
                <div className="title">{it.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Изумрудная подпись под блоком услуг (вплотную) */}
      <section className="band emerald-cta full-bleed" aria-label="О компании">
        <div className="emerald-cta-inner">
          <p className="emerald-cta-line">
            Компания полного цикла в области строительства и дизайна.
          </p>
          <p className="emerald-cta-line emerald-cta-line--thin">
            Мы строим — Вы наслаждаетесь процессом и получаете результат.
          </p>
        </div>
      </section>
    </>
  );
}
