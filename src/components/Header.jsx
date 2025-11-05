import { useEffect, useRef, useState } from "react";

const COOLDOWN_MS = 600;
const logoUrl = `${import.meta.env.BASE_URL}wp-content/uploads/2023/12/Logologo.svg`;   // иконка/знак
const textLogoUrl = `${import.meta.env.BASE_URL}wp-content/uploads/2023/12/text_logo.svg`; // слово/текст
const lineLogoUrl = `${import.meta.env.BASE_URL}wp-content/uploads/2023/12/line.svg`;

export default function Header() {
  const [hoverEdge, setHoverEdge] = useState(false);
  const [hoverSidebar, setHoverSidebar] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);
  const [suppressHoverUntil, setSuppressHoverUntil] = useState(0);

  const sidebarRef = useRef(null);
  const logoRef = useRef(null);

  // стартовая анимация логотипа (включает «въезд» текстового лого)
  useEffect(() => {
    const node = logoRef.current;
    if (!node) return;
    const t = setTimeout(() => node.classList.add("logo-anim"), 30);
    return () => clearTimeout(t);
  }, []);

  // сброс transform у сайдбара на первый рендер (чтобы не мигал)
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
    const onKey = (e) => { 
      if (e.key === "Escape") hardClose();
    };
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

  // ====== Меню из макета ======
  const menu = [
    ["#home", "В НАЧАЛО"],
    ["#portfolio", "ПОРТФОЛИО"],
    ["#portfolio", "ПРИМЕРЫ ПРОЕКТОВ"],
    ["#services", "СТРОИМ ДОМА"],
    ["#services", "ИНТЕРЬЕРЫ И ОТДЕЛКА КВАРТИР"],
    ["#portfolio", "ОБЩЕСТВЕННЫЕ ПРОСТРАНСТВА"],
    ["#standards", "ИНЖЕНЕРИЯ"],
    ["#philosophy", "РЕСТАВРАЦИЯ"],
    ["#services", "СОГЛАСОВАНИЕ ПЕРЕПЛАНИРОВКИ"],
    ["#philosophy", "НАША СТРАСТЬ"],
  ];

  return (
    <>
      <header className="header">
        <div className="container header-inner">
          {/* ЛОГО: знак слева статично + текст-лого въезжает справа */}
          <div
            ref={logoRef}
            className="logo"
            data-anim="fade-in"
            data-delay=".05"
            onMouseEnter={replayLogoAnim}
            title="На главную"
          >
            <a
              href="#home"
              className="logo-link"
              aria-label="respace — на главную"
              onClick={(e)=>handleNavClick(e,"#home")}
            >
              {/* знак/иконка — фикс у левого края */}
              <img src={logoUrl} alt="" className="logo-img logo-white" />
              {/* текстовое лого — въезд с правого края */}
              <img src={textLogoUrl} alt="Техника пространства" className="logo-text-img" />
              <span className="logo-line" aria-hidden="true" />
            </a>
          </div>

          {/* Справа оставляем только бургер */}
          <div className="header-right" style={{ display: "flex", alignItems: "center", gap: 12 }}>
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

        {/* ====== Главное меню ====== */}
        <nav className="sidebar-nav">
          {menu.map(([href, label]) => (
            <a
              key={`${href}-${label}`}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Контакты внизу (оставил email/телефон как ссылки в меню, номер из хедера убран) */}
        <div className="sidebar-contacts">
          <div className="sc-title">Свяжитесь с нами</div>
          <div>Телефон <a href="tel:+79104519866">+7(910) 451-98-66</a></div>
          <div>Почта <a href="mailto:hello@respace.ru">hello@respace.ru</a></div>
        </div>
      </aside>

      <div className={`backdrop ${isOpen ? "show" : ""}`} onClick={hardClose} />
    </>
  );
}
