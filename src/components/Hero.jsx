import { useSearchParams } from "react-router-dom";

export default function Hero({ onEnter }) {
  const [searchParams] = useSearchParams();
  const nombre = searchParams.get("nombre") || "Invitado Especial";

  return (
    <section className="hero" id="inicio">
      <div className="hero-overlay">
        <div className="hero-content">
          <span className="hero-badge">XV AÑOS — 26 SEPTIEMBRE 2026</span>
          <h1 className="hero-title">
            <span className="hero-title-name">Saray</span>
          </h1>
          <p className="hero-subtitle">
            Con mucha alegría te invitamos a celebrar mis quince años. Tu presencia hará
            de este día un recuerdo inolvidable.
          </p>
          <p className="hero-nombre">
            Te esperamos junto a <strong>{nombre}</strong>
          </p>
          <p className="hero-music-hint">La música de fondo es parte de la experiencia</p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => onEnter(true)}>
              <span className="material-symbols-outlined">music_note</span>
              Ingresar con música
            </button>
            <button className="btn btn-secondary" onClick={() => onEnter(false)}>
              Ingresar sin música
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
