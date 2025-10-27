import { useEffect, useState, useRef } from "react";
import ContactForm from "./ContactForm";

export default function ProjectModal({ open, onClose, project }) {
  const [viewer, setViewer] = useState(null);
  const innerRef = useRef(null);

  useEffect(() => {
    if (!open) { setViewer(null); return; }
    const onKey = (e) => {
      if (!open) return;
      if (e.key === "Escape") {
        if (viewer !== null) setViewer(null);
        else onClose?.();
      }
      if (viewer !== null) {
        if (e.key === "ArrowRight") setViewer((v) => (v + 1) % (project.images?.length || 1));
        if (e.key === "ArrowLeft")  setViewer((v) => (v - 1 + (project.images?.length || 1)) % (project.images?.length || 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, viewer, onClose, project?.images]);

  if (!open || !project) return null;

  const imgs = project.images || [];
  const next = () => setViewer((v) => (v + 1) % imgs.length);
  const prev = () => setViewer((v) => (v - 1 + imgs.length) % imgs.length);

  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      if (viewer !== null) setViewer(null);
      else onClose?.();
    }
  };

  return (
    <div className="modal-root modal-root-full" role="dialog" aria-modal="true" onClick={onBackdropClick}>
      <div className="modal-wrap modal-wrap-full" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" type="button" aria-label="Закрыть" onClick={onClose}>×</button>

        <div className="modal-head">
          <h2 className="modal-title">{project.title}</h2>
          {project.summary && <p className="modal-summary">{project.summary}</p>}

          {project.details?.length > 0 && (
            <div className="modal-details">
              <p className="modal-details-label">Мы выполняли:</p>
              <ol className="modal-details-list">
                {project.details.map((d, i) => <li key={i}>{d}</li>)}
              </ol>
              <p className="modal-details-note">Объект сдан.</p>
            </div>
          )}
        </div>

        <div className="grid-gallery">
          {imgs.map((src, i) => (
            <button
              key={i}
              className="grid-thumb"
              onClick={() => setViewer(i)}
              aria-label={`Открыть фото ${i + 1}`}
              type="button"
            >
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>

        <div className="modal-contact" id="modal-contact">
          <h3>Связаться с нами</h3>
          <ContactForm />
        </div>

        {viewer !== null && (
          <div
            className="viewer-overlay"
            onClick={() => setViewer(null)}
          >
            <button
              className="viewer-close"
              type="button"
              aria-label="Закрыть просмотр"
              onClick={(e) => { e.stopPropagation(); setViewer(null); }}
            >
              ×
            </button>

            <div
              className="viewer-inner"
              ref={innerRef}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="viewer-main">
                <button
                  className="viewer-nav prev"
                  type="button"
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  aria-label="Предыдущее фото"
                >‹</button>

                <img src={imgs[viewer]} alt="" />

                <button
                  className="viewer-nav next"
                  type="button"
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  aria-label="Следующее фото"
                >›</button>
              </div>

              <div className="viewer-thumbs">
                {imgs.map((src, i) => (
                  <button
                    key={i}
                    className={`viewer-thumb ${i === viewer ? "active" : ""}`}
                    type="button"
                    onClick={() => setViewer(i)}
                  >
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
