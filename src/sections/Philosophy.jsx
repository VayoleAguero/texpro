export default function Philosophy() {
  return (
    <div className="full-bleed">
      <section className="band band--emerald philosophy-band">
        <div className="philosophy-inner">
          <div className="philosophy-visual levitate" data-parallax data-strength="42" data-drift="0.5">
            <img
              src="wp-content/uploads/2023/12/core.jpeg"
              alt=""
              loading="lazy"
              data-speed="0.9"
            />
          </div>

          <div className="philosophy-text">
            <h2 data-anim="slide-up">Философия</h2>
            <p data-anim="slide-up" data-delay="0.05">
              Мы собрали команду специалистов, которые в первую очередь разделяют
              нашу философию и идеологию. Каждый из нас горит идеей лучшего
              сервиса, лучшего качества в дизайне интерьера.
            </p>
            <p data-anim="slide-up" data-delay="0.08">
              За годы работы выполнено более 200 объектов для требовательных и
              взыскательных клиентов.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
