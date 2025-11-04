// src/sections/Standards.jsx
export default function Standards() {
  return (
    <section
      id="standards"
      className="standards-band standards-band--tight full-bleed"
      aria-label="Система стандартов"
    >
      <div className="standards-grid">
        {/* ЛЕВЫЙ МЕДИА-БЛОК: фон + малое фото поверх */}
        <div className="standards-media">  {/* <-- без standards-media--lift */}
          <img
            className="std-bg"
            src="wp-content/uploads/2023/12/Standards_bg.jpg"
            alt=""
            loading="lazy"
          />
          <img
            className="std-front"
            src="wp-content/uploads/2023/12/Standards_up.jpg"
            alt=""
            loading="lazy"
          />
        </div>

        {/* ПРАВЫЙ ТЕКСТ */}
        <div className="standards-card standards-card--ghost">
          <h2 className="standards-title">Система стандартов</h2>
          <span className="st-title-underline" aria-hidden="true" />
          <ul className="standards-list">
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
