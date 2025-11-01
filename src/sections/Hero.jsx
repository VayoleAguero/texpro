export default function Hero() {
  return (
    <section id="home" className="hero-video" aria-label="Hero">
      <video
        className="tds-project-banner-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="https://tardigradastudio.com/wp-content/uploads/2025/08/tardigrada-ARRIS-journal-branding-editorial-thumbnail-work.mp4.mp4"
          type="video/mp4"
        />
      </video>
    </section>
  );
}
