
export default function Standards() {
  return (
    <section
      id="standards"
      className="standards-band full-bleed"
      aria-label="Система стандартов"
    >
      <div className="standards-grid">
        {/* Левый медиа-блок */}
        <div className="standards-media">
          <img
            className="std-bg"
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2400&auto=format&fit=crop"
            alt=""
            loading="lazy"
          />
          <img
            className="std-front"
            src="https://images.unsplash.com/photo-1484100356142-db6ab6244067?q=80&w=1600&auto=format&fit=crop"
            alt=""
            loading="lazy"
          />
        </div>

        {/* Правый текстовый блок */}
        <div className="standards-card">
          <h2 className="standards-title">Система стандартов</h2>
          <span className="st-title-underline" aria-hidden="true" />
          <ul className="standards-list">
            <li>Соблюдение строительных норм и правил (СниП)</li>
            <li>
              Многоступенчатый контроль — Директор-Инженер-Прораб-Бригадир
            </li>
            <li>Страхование объектов</li>
            <li>Отчётность и соблюдение договорных обязательств</li>
            <li>
              Постоянный мониторинг современных трендов и инжиниринг
            </li>
            <li>Реализация проектов любого уровня сложности</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
