import { useState, useEffect } from "react";

const SECTIONS = [
  { id: "inicio", label: "INICIO" },
  { id: "eventos", label: "EVENTO" },
  { id: "galeria", label: "GALERÍA" },
  { id: "rsvp", label: "RSVP" },
];

export default function Navbar() {
  const [active, setActive] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 300) {
            setActive(s.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-inner">
          <span className="navbar-logo" onClick={() => scrollTo("inicio")}>
            Princess Saray
          </span>
          <div className="navbar-links">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                className={`navbar-link ${active === s.id ? "active" : ""}`}
                onClick={() => scrollTo(s.id)}
              >
                {s.label}
              </button>
            ))}
            <button className="navbar-cta" onClick={() => scrollTo("rsvp")}>
              CONFIRMAR ASISTENCIA
            </button>
          </div>
          <button className="navbar-mobile-btn" onClick={() => scrollTo("rsvp")}>
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </nav>

      <nav className="navbar-bottom">
        <button className={`navbar-bottom-link ${active === "inicio" ? "active" : ""}`} onClick={() => scrollTo("inicio")}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span>Inicio</span>
        </button>
        <button className={`navbar-bottom-link ${active === "eventos" ? "active" : ""}`} onClick={() => scrollTo("eventos")}>
          <span className="material-symbols-outlined">auto_awesome</span>
          <span>Evento</span>
        </button>
        <button className={`navbar-bottom-link ${active === "galeria" ? "active" : ""}`} onClick={() => scrollTo("galeria")}>
          <span className="material-symbols-outlined">auto_stories</span>
          <span>Galería</span>
        </button>
        <button className={`navbar-bottom-link ${active === "rsvp" ? "active" : ""}`} onClick={() => scrollTo("rsvp")}>
          <span className="material-symbols-outlined">mail</span>
          <span>RSVP</span>
        </button>
      </nav>
    </>
  );
}
