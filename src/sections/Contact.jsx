// Contact.jsx
export default function Contact(){
  const onSubmit = (e) => {
    e.preventDefault();
    alert("Заявка отправлена (демо). Подключим реальную отправку/CRM позже.");
  };

  // данные
  const phoneDisplay = "+7 (999) 123-45-67";
  const phonePlain   = "+79991234567";
  const tgLink       = "https://t.me/your_handle";
  const waLink       = `https://wa.me/${phonePlain.replace(/\D/g,'')}`;

  // временная привязка — рикролл
  const rickrollUrl  = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  const handleStub = (e, label, realUrl) => {
    e.preventDefault();
    // визуальный отклик
    const el = e.currentTarget;
    el.classList.add("clicked");
    setTimeout(() => el.classList.remove("clicked"), 450);

    // уведомление
    alert(`Супер! (${label})`);

    // временно ведём на рикролл; когда будет реальный URL — меняем здесь
    window.open(realUrl ?? rickrollUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="section-narrow contact-wrap" id="contact">
      <div className="container" data-anim="fade-up">
        <h2 className="contact-h2">Свяжитесь с нами</h2>

        <div className="contact-grid">
          {/* Форма */}
          <form className="form contact-form" onSubmit={onSubmit}>
            <input className="input" placeholder="Имя" />
            <input className="input" placeholder="Телефон" />
            <input className="input" type="email" placeholder="Email" />
            <button className="button" type="submit">Отправить</button>
          </form>

          {/* Визитка */}
          <aside className="contact-card">
            <div className="cc-title">Контакты</div>

            <a className="cc-row" href={`tel:${phonePlain}`} onClick={(e)=>handleStub(e,"Звонок", rickrollUrl)}>
              <span className="cc-phone">{phoneDisplay}</span>
            </a>

            <div className="cc-actions">
              <a
                className="cc-btn tg"
                href={tgLink}
                onClick={(e)=>handleStub(e,"Telegram", rickrollUrl)}
                aria-label="Telegram"
              >
                <svg viewBox="0 0 240 240" aria-hidden="true" className="cc-ico">
                  <circle cx="120" cy="120" r="120" fill="currentColor" opacity="0.1"/>
                  <path fill="currentColor" d="M192.5 61.5L169 179.6c-1.7 8.6-6.5 10.7-13.2 6.7l-36.6-27.0-17.7 17.1c-2 2-3.6 3.6-7.3 3.6l2.7-38.5 70.1-63.3c3-2.7-.7-4.3-4.6-1.6l-86.7 54.6-37.4-11.7c-8.1-2.5-8.3-8.1 1.7-12L182 49.9c7.4-2.5 14 1.8 10.5 11.6z"/>
                </svg>
                <span>Telegram</span>
              </a>

              <a
                className="cc-btn wa"
                href={waLink}
                onClick={(e)=>handleStub(e,"WhatsApp", rickrollUrl)}
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 512 512" aria-hidden="true" className="cc-ico">
                  <path fill="currentColor" d="M256 50c113.6 0 206 92.4 206 206 0 113.7-92.4 206-206 206-36 0-69.9-9.3-99.3-25.6L86 462l27.4-69.2C94.9 363.4 84 330.8 84 296 84 142.8 184.2 50 256 50zm0 32c-60.6 0-115.6 32.8-145.6 85.7-29.6 52.2-30.2 114-1.7 166.8l3.2 5.8-16.2 40.8 42.2-15.1 5.6 3.3c28.9 17 61.9 26 95.7 26 101 0 182.9-81.9 182.9-182.9C421.1 163.9 357 82 256 82zm98.7 204.8c-4.7 13.2-23.1 24.2-32.1 25.7-8.5 1.5-19.6 2.2-63.6-13.6-53.1-19-87.4-75.3-90-78.7-2.6-3.4-21.5-28.6-21.5-54.6s13.2-38.7 18-44.1c4.7-5.4 10.3-6.7 13.7-6.7 3.4 0 6.8 0 9.8.2 3.1.1 7.3-.6 11.4 8.7 4.7 10.9 16 37.6 17.4 40.3 1.4 2.7 2.3 5.9.4 9.3-1.9 3.4-2.9 5.9-5.7 9.1-2.7 3.2-5.8 7.1-8.3 9.6-2.7 2.7-5.5 5.6-2.4 11 3.1 5.4 13.9 22.9 29.8 37.1 20.5 18.4 37.8 24.2 43.3 26.8 5.5 2.6 8.8 2.2 12-1.3 3.2-3.5 13.8-16.1 17.5-21.6 3.7-5.5 7.4-4.6 12.4-2.7 5.1 1.9 32.1 15.2 37.6 17.9 5.5 2.7 9.1 4 10.4 6.2 1.4 2.2 1.4 13.1-3.3 26.3z"/>
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="cc-note">Пишите или звоните — ответим быстро.</div>
          </aside>
        </div>
      </div>
    </section>
  );
}
