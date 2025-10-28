import { useEffect, useRef, useState } from "react";

const COOLDOWN_MS = 600;
const logoUrl = `${import.meta.env.BASE_URL}wp-content/uploads/2023/12/cropped-favicon-180x180.png`;

export default function Header() {
  const [hoverEdge, setHoverEdge] = useState(false);
  const [hoverSidebar, setHoverSidebar] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);
  const [suppressHoverUntil, setSuppressHoverUntil] = useState(0);

  const sidebarRef = useRef(null);
  const logoRef = useRef(null);

  // стартовая анимация логотипа
  useEffect(() => {
    const node = logoRef.current;
    if (!node) return;
    const t = setTimeout(() => node.classList.add("logo-anim"), 30);
    return () => clearTimeout(t);
  }, []);

  // сброс transform у сайдбара на первый рендер (не мигал)
  useEffect(() => {
    const side = sidebarRef.current;
    if (side) {
      side.style.transform = "";
      side.style.opacity = "";
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = document.querySelector(".header");
      if (el) el.classList.toggle("scrolled", window.scrollY > 4);
    };
    const onKey = (e) => { if (e.key === "Escape") hardClose(); };
    const onHash = () => hardClose();

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", onHash);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  const hoverAllowed = Date.now() >= suppressHoverUntil;
  const isOpen = manualOpen || (hoverAllowed && (hoverEdge || hoverSidebar));

  const hardClose = () => {
    setManualOpen(false);
    setHoverEdge(false);
    setHoverSidebar(false);
    setSuppressHoverUntil(Date.now() + COOLDOWN_MS);
    const side = sidebarRef.current;
    if (side) {
      side.style.transform = "";
      side.style.opacity = "";
    }
  };

  // аккуратный скролл с учётом фикс-хедера
  const scrollWithOffset = (el) => {
    const header = document.querySelector(".header");
    const headerH = header ? header.getBoundingClientRect().height : 0;
    const extra = 16; // совпадает с [id]{ scroll-margin-top: var(--header-h)+16px }
    const top = el.getBoundingClientRect().top + window.scrollY - (headerH + extra);
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    hardClose();
    if (el) setTimeout(() => scrollWithOffset(el), 0);
  };

  const replayLogoAnim = () => {
    const node = logoRef.current;
    if (!node) return;
    node.classList.remove("logo-anim", "logo-hover-pop");
    // force reflow
    // eslint-disable-next-line no-unused-expressions
    node.offsetHeight;
    node.classList.add("logo-anim", "logo-hover-pop");
  };

  // ====== Меню из макета (привязки к существующим блокам) ======
  // Если в будущем появятся отдельные страницы/якоря — просто сменить href.
  const menu = [
    ["#home", "В НАЧАЛО"],                       // home
    ["#portfolio", "ПОРТФОЛИО"],                 // сетка проектов
    ["#portfolio", "ПРИМЕРЫ ПРОЕКТОВ"],          // туда же
    ["#services", "СТРОИМ ДОМА"],                // услуги
    ["#services", "ИНТЕРЬЕРЫ И ОТДЕЛКА КВАРТИР"],// услуги
    ["#portfolio", "ОБЩЕСТВЕННЫЕ ПРОСТРАНСТВА"],  // проекты (фильтр появится позже)
    ["#standards", "ИНЖЕНЕРИЯ"],                 // система стандартов как инженерный блок
    ["#philosophy", "РЕСТАВРАЦИЯ"],              // философия/подход (пока сюда)
    ["#services", "СОГЛАСОВАНИЕ ПЕРЕПЛАНИРОВКИ"],// услуги
    ["#philosophy", "НАША СТРАСТЬ"],             // философия/миссия
  ];

  return (
    <>
      <header className="header">
        <div className="container header-inner">
          {/* ЛОГО */}
          <div
            ref={logoRef}
            className="logo"
            data-anim="fade-in"
            data-delay=".05"
            onMouseEnter={replayLogoAnim}
            title="На главную"
          >
            <a href="#home" className="logo-link" aria-label="respace — на главную" onClick={(e)=>handleNavClick(e,"#home")}>
              <img src={logoUrl} alt="respace" className="logo-img logo-white" />
              <span className="logo-stack">
                <span className="logo-text">respace</span>
                <span className="logo-line" />
              </span>
            </a>
          </div>

          {/* ПРАВО: телефон + соц + бургер */}
          <div className="header-right" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a
              href="tel:+70000000000"
              className="header-phone"
              style={{
                color: "#fff",
                fontWeight: 600,
                textDecoration: "none",
                letterSpacing: ".3px",
                transform: "translateY(1px)",
                transition: "transform .2s ease, opacity .2s ease",
                opacity: 0.95,
                whiteSpace: "nowrap",
                marginRight: 6
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(1px)")}
              title="+7(000)000-0000"
            >
              +7(000)000-0000
            </a>

            <div className="header-actions" aria-label="Соцсети" style={{ display: "flex", gap: 12 }}>
              <button className="icon-btn icon-anim" type="button" aria-label="Telegram" title="Telegram">
                <span className="icon-aura" aria-hidden />
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
                  <path d="M9.03 15.47 8.9 18.64a.87.87 0 0 0 .69-.34l1.66-1.71 3.45 2.53c.63.35 1.07.17 1.23-.58l2.23-10.46h0c.2-.95-.35-1.32-.96-1.09L3.5 10.39c-.93.36-.92.89-.16 1.12l4.35 1.35 10.1-6.36c.48-.29.92-.13.56.18Z" fill="currentColor"/>
                </svg>
              </button>

              <button className="icon-btn icon-anim" type="button" aria-label="WhatsApp" title="WhatsApp">
                <span className="icon-aura" aria-hidden />
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
                  <path d="M12.04 2a9.9 9.9 0 0 0-8.45 14.86L2 22l5.27-1.53A9.93 9.93 0 1 0 12.04 2Zm5.82 14.5c-.24.68-1.2 1.1-1.96 1.25-.52.1-1.2.18-3.47-.72-2.91-1.21-4.81-4.17-4.96-4.36-.15-.2-1.18-1.58-1.18-3 0-1.43.75-2.13 1.02-2.42.26-.29.58-.36.78-.36h.56c.18 0 .42-.07.65.49.24.58.83 2 .9 2.14.07.15.12.32.02.51-.1.2-.16.32-.32.49-.15.17-.34.39-.49.52-.16.13-.33.27-.14.55.2.29.9 1.47 1.94 2.39 1.34 1.18 2.47 1.54 2.79 1.7.32.15.5.13.69-.08.18-.2.8-.93 1.02-1.25.22-.32.45-.26.75-.15.31.11 1.95.92 2.28 1.08.33.16.55.25.63.4.08.15.08.89-.15 1.56Z" fill="currentColor"/>
                </svg>
              </button>
            </div>

            <button
              className="burger"
              type="button"
              onClick={() => { setSuppressHoverUntil(0); setManualOpen(true); }}
              aria-label="Открыть меню"
              aria-expanded={isOpen}
              aria-controls="sidebar-menu"
              title="Меню"
            >
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div className="header-spacer" />

      {/* горячая зона справа для hover-открытия */}
      <div
        className="edge-hotzone"
        onPointerEnter={() => setHoverEdge(true)}
        onPointerLeave={() => setHoverEdge(false)}
      />

      <aside
        id="sidebar-menu"
        ref={sidebarRef}
        className={`sidebar ${isOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        onPointerEnter={() => setHoverSidebar(true)}
        onPointerLeave={() => setHoverSidebar(false)}
      >
        <button className="sidebar-close" type="button" onClick={hardClose} aria-label="Закрыть меню">×</button>

        {/* ====== Главное меню из макета ====== */}
        <nav style={{ marginTop: 40 }}>
          {menu.map(([href, label]) => (
            <a
              key={`${href}-${label}`}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              style={{ textTransform: "uppercase", fontWeight: 800, letterSpacing: ".3px" }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Контакты внизу */}
        <div style={{ marginTop: 24, opacity: 0.9, fontSize: 14 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Свяжитесь с нами</div>
          <div>Телефон <a href="tel:+79104519866" style={{ textDecoration: "underline" }}>+7(910) 451-98-66</a></div>
          <div>Почта <a href="mailto:hello@respace.ru" style={{ textDecoration: "underline" }}>hello@respace.ru</a></div>
        </div>
      </aside>

      <div className={`backdrop ${isOpen ? "show" : ""}`} onClick={hardClose} />
    </>
  );
}
