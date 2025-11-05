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
        <div
          className="standards-media"
          data-anim="fade-in"
          data-dur=".5"
          data-once="true"
          style={{ minHeight: 'clamp(640px, 60vw, 900px)', position: 'relative' }}
        >
          {/* фон — отдельный слой без скруглений */}
          <div
            className="std-bg-bleed"
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, overflow: 'visible', zIndex: 0 }}
          >
            <img
              className="std-bg-fit"
              src="wp-content/uploads/2023/12/Standards_bg.jpg"
              alt=""
              loading="lazy"
              style={{
                position: 'absolute',
                top: 0,
                left: '-40%',
                height: '100%',
                width: 'auto',
                maxWidth: 'none',
                objectFit: 'contain',
                transform: 'none',
                border: '0',
                borderRadius: 0,
                boxShadow: 'none'
              }}
            />
          </div>

          {/* верхняя картинка — строгий прямоугольник */}
          <img
            className="std-front-plain"
            src="wp-content/uploads/2023/12/Standards_up.jpg"
            alt=""
            loading="lazy"
            data-anim="soft-up"
            data-delay=".12"
            data-dur=".6"
            style={{
              position: 'absolute',
              left: 'calc(18vw + 10px)',
              top: '20%',                  // было 46% — приподняли
              transform: 'translateY(-50%)',
              aspectRatio: '5 / 7',
              width: 'min(34%, 380px)',
              border: '0',
              borderRadius: 0,
              outline: 'none',
              boxShadow: 'none',
              zIndex: 2
            }}
          />
        </div>

        <div
          className="standards-card standards-card--ghost"
          data-anim="slide-left"
          data-dur=".6"
        >
          <h2 className="standards-title" data-anim="fade-in" data-delay=".06" data-dur=".5">
            Система стандартов
          </h2>
          <span
            className="st-title-underline"
            aria-hidden="true"
            data-anim="fade-in"
            data-delay=".12"
            data-dur=".5"
          />
          <ul className="standards-list" data-anim="stagger-up" data-stagger="80" data-dur=".55">
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
