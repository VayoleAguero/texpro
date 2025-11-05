// src/sections/Hero.jsx
export default function Hero() {
  return (
    <section id="home" className="hero-video" aria-label="Hero">
      <video
        className="hero-video__bg full-bleed"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="wp-content/uploads/2023/12/Intro1.mp4"
          type="video/mp4"
        />
        Ваш браузер не поддерживает видео тег.
      </video>
    </section>
  );
}
