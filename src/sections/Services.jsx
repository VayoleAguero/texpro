import useInViewLoop from "../hooks/useInViewLoop";

const items = [
  { title: "Проектирование",   img: "wp-content/uploads/2023/12/Services1.png" },
  { title: "Дизайн-интерьера", img: "wp-content/uploads/2023/12/Services5.png" },
  { title: "Ремонт и отделка", img: "wp-content/uploads/2023/12/Services3.jpg" },
  { title: "Авторский надзор", img: "wp-content/uploads/2023/12/Services4.jpg" },
];

export default function Services(){
  const ref = useInViewLoop({ threshold: 0.15 });

  const onMouseMove = (e) => {
    const v = e.currentTarget;
    const r = v.getBoundingClientRect();
    const dx = ((e.clientX - (r.left + r.width/2)) / r.width);
    const dy = ((e.clientY - (r.top  + r.height/2)) / r.height);
    v.style.setProperty("--tx", `${dx * 8}px`);
    v.style.setProperty("--ty", `${dy * 8}px`);
  };
  const onLeave = (e) => {
    e.currentTarget.style.removeProperty("--tx");
    e.currentTarget.style.removeProperty("--ty");
  };

  return (
    <>
      {/* секция услуг на бренд-фоне, во всю ширину */}
      <section
        id="services"
        className="section full-bleed tiles-overlap after-hero services-section"
        ref={ref}
        aria-label="Услуги"
      >
        <div className="tiles tiles-stagger tiles-tall full-bleed-padding inview-group">
          {items.map((it, i)=>(
            <div className="tile reveal-zoom service-tile" style={{ "--d": `${i * 0.06}s` }} key={i}>
              <div
                className="visual service-visual"
                onMouseMove={onMouseMove}
                onMouseLeave={onLeave}
              >
                <img src={it.img} alt={it.title} loading="lazy" />
                {/* затемняющая нижняя подложка для контраста */}
                <span className="service-shade" aria-hidden="true" />
                {/* вертикальная подпись слева */}
                <div className="title-vert">
                  <span>{it.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* подпись-CTA под блоком услуг (вплотную) */}
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
