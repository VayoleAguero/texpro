import { useEffect } from "react";

import Header from "./components/Header";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import Philosophy from "./sections/Philosophy";
import Features from "./sections/Features";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Standards from "./sections/Standards"; // <- система стандартов

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

        {/* СИСТЕМА СТАНДАРТОВ — полноширинная секция */}
        <Standards />

        {/* Philosophy */}
        <section id="philosophy" className="section">
          <Philosophy />
        </section>

        {/* Why Us / Features */}
        <section id="why-us" className="section">
          <Features />
        </section>

        {/* Portfolio */}
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
