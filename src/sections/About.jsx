export default function About() {
  return (
    <section id="about" className="about full-bleed" aria-label="О нас">
      <div
        className="about-grid full-bleed-padding"
        data-anim="soft-zoom"
        data-dur=".65"
        data-once="true"
      >
        {/* LEFT COPY */}
        <div className="about-copy">
          <h2 className="about-h" data-anim="slide-left" data-dur=".55" data-ease="expo">О НАС</h2>
          <span className="about-rule" aria-hidden="true" data-anim="fade-in" data-delay=".08" data-dur=".6" />
          <p className="about-lead" data-anim="fade-up" data-delay=".12" data-dur=".65">
            Техника пространства основана группой креативных московских
            архитекторов-дизайнеров и командой профессионалов в области
            строительных технологий. Мы создаем эстетичные пространства,
            внимательно относясь к запросам Клиента и не нарушаем правила
            реализации проекта
          </p>
          <div className="about-stat" data-anim="soft-up" data-delay=".2" data-dur=".6">
            <div className="about-stat-n">200+</div>
            <div className="about-stat-t">реализованных<br/>проектов</div>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="about-visual" data-anim="fade-in" data-dur=".5" data-once="true">
          {/* ФОНОВАЯ «ПЛЁНКА» — отдельный контейнер с ручками */}
          <div
            className="about-bg-wrap"
            /* без data-anim, чтобы не прятать фон до инициализации */
            style={{
              '--bg-w': '200%',          // ширина фона относительно ПРАВОЙ колонки
              '--bg-h': '180%',          // высота фона (через top/bottom растянется)
              '--bg-right': '-8%',       // якорение от правого края
              '--bg-top': '-6%',         // выход за верх
              '--bg-bottom': '-6%',      // выход за низ
              '--bg-pos': 'right center' // object-position у картинки
            }}
          >
            <img
              className="about-bg"
              src="wp-content/uploads/2023/12/AboutLower.jpg"
              alt=""
              loading="lazy"
            />
          </div>

          {/* Передняя карточка — с мягким ревилом */}
          <img
            className="about-fore"
            src="wp-content/uploads/2023/12/AoutUpper.jpg"
            alt=""
            loading="lazy"
            data-anim="soft-up"
            data-delay=".15"
            data-dur=".6"
            data-ease="expo"
            data-once="true"
          />
        </div>
      </div>
    </section>
  );
}
