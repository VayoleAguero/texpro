export default function Standards() {
  return (
    <section
      id="standards"
      className="standards-band standards-band--tight full-bleed"
      aria-label="Система стандартов"
      data-anim="clip-x"
      data-dur=".75"
      data-once="true"
      data-ease="expo"
    >
      <div className="standards-grid">
        {/* ЛЕВЫЙ МЕДИА-БЛОК */}
        <div className="standards-media" data-anim="fade-in" data-dur=".5" data-once="true">
          {/* Фоновая «плёнка» — отдельный контейнер с ручками */}
          <div
            className="std-bg-wrap"
            /* можно править прямо здесь под нужный кадр */
            style={{
              '--std-bg-w': '180%',          // ширина полотна
              '--std-bg-h': '120%',          // высота относительно колонки
              '--std-bg-left': '-40%',       // сдвиг фона влево (отриц. = за край)
              '--std-bg-top': '-10%',        // выход вверх
              '--std-bg-bottom': '-10%',     // выход вниз
              '--std-bg-pos': 'left center', // object-position
            }}
          >
            <img
              className="std-bg"
              src="wp-content/uploads/2023/12/Standards_bg.jpg"
              alt=""
              loading="lazy"
            />
          </div>

          {/* Верхняя карточка — с мягким ревилом */}
          <img
            className="std-front"
            src="wp-content/uploads/2023/12/Standards_up.jpg"
            alt=""
            loading="lazy"
            data-anim="soft-up"
            data-delay=".12"
            data-dur=".6"
          />
        </div>

        {/* ПРАВЫЙ ТЕКСТ */}
        <div
          className="standards-card standards-card--ghost"
          data-anim="slide-left"
          data-dur=".6"
        >
          <h2 className="standards-title" data-anim="fade-in" data-delay=".06" data-dur=".5">
            Система стандартов
          </h2>
          <span className="st-title-underline" aria-hidden="true" data-anim="fade-in" data-delay=".12" data-dur=".5" />
          <ul
            className="standards-list"
            data-anim="stagger-up"
            data-stagger="80"
            data-dur=".55"
          >
            <li>Соблюдение строительных норм и правил (СНиП)</li>
            <li>Многоступенчатый контроль — Директор-Инженер-Прораб-Бригадир</li>
            <li>Страхование объектов</li>
            <li>Отчётность и соблюдение договорных обязательств</li>
            <li>Постоянный мониторинг современных трендов и инжиниринг</li>
            <li>Реализация проектов любого уровня сложности</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
