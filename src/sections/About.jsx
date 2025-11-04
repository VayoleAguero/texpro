export default function About() {
  return (
    <section id="about" className="about full-bleed" aria-label="О нас">
      <div className="about-grid full-bleed-padding">
        {/* LEFT COPY */}
        <div className="about-copy reveal-group">
          <h2 className="about-h reveal-fade">О НАС</h2>
          <span className="about-rule reveal-slide" aria-hidden="true" />
          <p className="about-lead reveal-fade">
            Техника пространства основана группой креативных московских
            архитекторов-дизайнеров и командой профессионалов в области
            строительных технологий. Мы создаем эстетичные пространства,
            внимательно относясь к запросам Клиента и не нарушаем правила
            реализации проекта
          </p>

          <div className="about-stat reveal-zoom">
            <div className="about-stat-n">200+</div>
            <div className="about-stat-t">
              реализованных
              <br /> проектов
            </div>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="about-visual reveal-group">
          <img
            className="about-bg reveal-fade"
            src="wp-content/uploads/2023/12/AboutLower.jpg"
            alt=""
            loading="lazy"
          />
          <img
            className="about-fore reveal-zoom"
            src="wp-content/uploads/2023/12/AoutUpper.jpg"
            alt=""
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}