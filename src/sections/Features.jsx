import React from "react";

const items = [
  {
    label: "естественно",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 4s-5.5 0-9 3.5S6 14 6 17c0 2.2 1.8 4 4 4 3 0 5-1.5 7.5-5S20 4 20 4Z" fill="none"/>
        <path d="M10 21c0-6 6-10 10-12" fill="none"/>
      </svg>
    ),
  },
  {
    label: "надежно",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 12a9 9 0 0 1 18 0H3Z" fill="none"/>
        <path d="M12 12v6a3 3 0 0 0 3 3" fill="none"/>
      </svg>
    ),
  },
  {
    label: "с любовью",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.1 20.3 12 20.2 11.9 20.3C7 16.5 4 13.9 4 10.7 4 8.6 5.6 7 7.7 7c1.3 0 2.6.6 3.3 1.7.7-1.1 2-1.7 3.3-1.7 2.1 0 3.7 1.6 3.7 3.7 0 3.2-3 5.8-5.9 9.6Z" fill="none"/>
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section id="features" className="features-circles" aria-label="Преимущества" data-anim="fade-scale" data-dur=".6" data-once="true">
      <div
        className="features-circles__grid"
        data-anim="stagger-up"
        data-stagger="90"
        data-dur=".55"
      >
        {items.map((it, i) => (
          <div className="features-circles__item" key={i}>
            <span
              className="features-circles__ico"
              aria-hidden="true"
              data-anim="soft-zoom"
              data-dur=".55"
              data-delay={i * 0.08}
            >
              {it.icon}
            </span>
            <div
              className="features-circles__label"
              data-anim="fade-up"
              data-dur=".5"
              data-delay={i * 0.08 + 0.08}
            >
              {it.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
