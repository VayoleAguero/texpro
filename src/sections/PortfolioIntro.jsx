export default function PortfolioIntro() {
  return (
    <section className="portfolio-intro full-bleed" aria-label="Портфолио — подводка">
      <div className="portfolio-intro__grid">
        {/* ЛЕВАЯ КОЛОНКА — заголовок и подзаголовок */}
        <div className="pi-copy">
          <h2 className="pi-title">Портфолио</h2>
          <span className="pi-rule" aria-hidden="true" />
          <p className="pi-lead">
            За годы работы<br/>
            мы воплотили в жизнь<br/>
            множество самых<br/>
            смелых фантазий
          </p>
        </div>

        {/* ПРАВАЯ КОЛОНКА — медиа (большой фон + маленький кадр) */}
        <div className="pi-media">
          {/* большой фон (право) */}
          <img
            className="pi-bg"
            src="https://images.unsplash.com/photo-1529694157871-05969a175f1a?q=80&w=2400"
            alt=""
            loading="lazy"
          />
          {/* передняя карточка (слева-внизу) */}
          <img
            className="pi-front"
            src="https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1600"
            alt="Фрагмент проекта"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
