export default function About() {
  return (
    <section id="about" className="about full-bleed" aria-label="О нас">
      <div className="about-grid full-bleed-padding">
        {/* LEFT COPY */}
        <div className="about-copy">
          <h2 className="about-h">О НАС</h2>
          <span className="about-rule" aria-hidden="true" />
          <p className="about-lead">
            Техника пространства основана группой креативных московских
            архитекторов-дизайнеров и командой профессионалов в области
            строительных технологий. Мы создаем эстетичные пространства,
            внимательно относясь к запросам Клиента и не нарушаем правила
            реализации проекта
          </p>

          <div className="about-stat">
            <div className="about-stat-n">200+</div>
            <div className="about-stat-t">
              реализованных
              <br /> проектов
            </div>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="about-visual">
          {/* Большое фото на заднем плане */}
          <img
            className="about-bg"
            src="https://images.unsplash.com/photo-1613541444690-460e5d6a3d32?q=80&w=2400&auto=format&fit=crop"
            alt=""
            loading="lazy"
          />
          {/* Квадрат поверх слева */}
          <img
            className="about-fore"
            src="https://images.unsplash.com/photo-1535905748047-14b20a516d79?q=80&w=1600&auto=format&fit=crop"
            alt=""
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
