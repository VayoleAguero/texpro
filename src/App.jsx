import { useEffect } from "react";

import Header from "./components/Header";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import Philosophy from "./sections/Philosophy";
import Features from "./sections/Features";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Standards from "./sections/Standards";

// ✅ добавили импорт подводки к портфолио
import PortfolioIntro from "./sections/PortfolioIntro";

import "./App.css";
import { initReveal } from "./lib/reveal";
import { useParallax } from "./lib/parallax";

export default function App() {
  useEffect(() => {
    const cleanupReveal = initReveal?.();
    const cleanupParallax = useParallax?.();
    return () => {
      cleanupReveal?.();
      cleanupParallax?.();
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section id="home">
          <Hero />
        </section>

        {/* Services рендерит свою <section id="services"> внутри */}
        <Services />

        {/* About (клиенты/о нас) */}
        <section id="clients" className="section">
          <About />
        </section>

        {/* СИСТЕМА СТАНДАРТОВ — без обёртки .section для full-bleed */}
        <Standards />


        {/* Why Us / Features */}
        <section id="why-us" className="section">
          <Features />
        </section>

        {/* Portfolio (якорь оставляем здесь) */}
        <section id="portfolio" className="section">
          <Projects />
        </section>

        {/* Contacts */}
        <section id="contacts" className="section contact-section">
          <Contact />
        </section>
      </main>

      <footer className="footer">Copyright by respace.ru 2023</footer>
    </>
  );
}
 
//  Первостепенные задачи
//    Сделать ревил эффекты при скролле
//    выровнять секции по слоям
//    
//


// TODO:
// Применить 1–3 из фиксов к hero/tiles/cta.

//Подкрутить scale/тени на карточках (Project/Tile).

//Включить чуть большую амплитуду параллакса fast-слоёв.

//Урезать tracking заголовков.

// Проверить baseline подписей тайлов на трёх брейкпоинтах.

// портфолио - убрать с главногооооооооо меню плитки с модалками, сделать просто портфолиииииио превью 
// по нажатию на него открывать портфолиио
// на сайдбаре при нажааатии кнопки портфолио сразу проваливаемся в портфолио, не яякорь,
// 

//
// Шрифт : Dejavu Sans
// 
// 
//
// /*  08241E - цыет чуть потемнее для хедера
//     
// то что в хиро сделать как карусель проектов для портфолио, в нем сдеелать краткую сводку на проект, инфу про проект, прии нажатии перейти в саму модалку окна
// в хиро сделать анимку как на сайте с архитектурой(реверс инжинириннннннг)
//  в сервисах по кд картинки все затемненные, при наведении растемняются, увеличиваются текст увеличивается


// шрифт из иншота CaviarDreams

// прописать reveal как на сайте bsd development
