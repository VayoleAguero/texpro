const features = [
  {
    title: "Естественно",
    text: "С заботой о вас! Мы используем только экологически чистые материалы в работе.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 21c4.418 0 8-3.582 8-8 0-1.657-.672-3.157-1.758-4.242C17.157 7.672 15.657 7 14 7c-4.418 0-8 3.582-8 8 0 1.657.672 3.157 1.758 4.242C8.843 20.328 10.343 21 12 21Z"/>
        <path d="M12 12V3M12 3l3 3M12 3 9 6" />
      </svg>
    ),
  },
  {
    title: "Просто",
    text: "Всё гениальное — просто. Все проекты отражают эту идеологию и созданы с этой идеей.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M4 12h16" />
      </svg>
    ),
  },
  {
    title: "С любовью",
    text: "Всё, что мы делаем, сделано с любовью к своему делу, и в каждый проект мы вкладываем частичку себя.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <div className="full-bleed">
      <section className="band band--emerald features-band">
        <div className="features-grid">
          {features.map((f, i) => (
            <article
              key={i}
              className="feature-card levitate"
              data-parallax
              data-strength="28"
              data-drift="0.4"
              data-anim="scale-in"
              data-delay={0.05 * i}
            >
              <div className="feature-icon">
                <div className="feature-icon-ring">{f.icon}</div>
              </div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
