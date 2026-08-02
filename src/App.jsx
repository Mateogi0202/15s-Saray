import { useState, useRef, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import Invitados from "./components/Invitados";
import Evento from "./components/Evento";
import ConfirmarAsistencia from "./components/ConfirmarAsistencia";
import Galeria from "./components/Galeria";
import DressCode from "./components/DressCode";
import SugerirCancion from "./components/SugerirCancion";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ShaderBackground from "./components/ShaderBackground";
import Butterflies from "./components/Butterflies";
import SpiralCelebration from "./components/SpiralCelebration";
import "./App.css";

function AppContent() {
  const [entered, setEntered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [celebratedName, setCelebratedName] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const audioRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    if (!entered) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouse = (e) => {
      cursor.style.left = e.clientX - 6 + "px";
      cursor.style.top = e.clientY - 6 + "px";

      if (Math.random() > 0.88) {
        const sparkle = document.createElement("div");
        sparkle.className = "magic-sparkle";
        sparkle.style.left = e.clientX + "px";
        sparkle.style.top = e.clientY + "px";
        sparkle.style.background = Math.random() > 0.5 ? "#e9c176" : "#87d7ac";
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
      }
    };

    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, [entered]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const handleEnter = (conMusica) => {
    setEntered(true);
    if (conMusica) {
      setTimeout(() => {
        const audio = audioRef.current;
        if (audio) {
          audio.currentTime = 40;
          audio.play().then(() => setPlaying(true)).catch(() => {});
        }
      }, 200);
    }
  };

  const handleConfirm = (nombre) => {
    setCelebratedName(nombre);
    setShowThankYou(false);
    setCelebrating(true);
  };

  const handleCelebrationComplete = () => {
    setShowThankYou(true);
  };

  const handleBackToPage = () => {
    setCelebrating(false);
    setShowThankYou(false);
  };

  return (
    <>
      {entered && !celebrating && (
        <>
          <ShaderBackground />
          <div className="fabric-overlay" />
          <div className="cursor-custom" ref={cursorRef} />
          <Butterflies active={entered} />
        </>
      )}

      {!entered ? (
        <Hero onEnter={handleEnter} />
      ) : celebrating ? (
        <div className="celebration-page">
          <SpiralCelebration show={true} onComplete={handleCelebrationComplete} />
          {showThankYou && (
            <div className="celebration-thankyou">
              <div className="celebration-thankyou-inner">
                <span className="celebration-check">check_circle</span>
                <h2 className="celebration-title">¡Gracias, {celebratedName}!</h2>
                <p className="celebration-desc">
                  Tu confirmación ha sido recibida. Te esperamos con mucha alegría para celebrar juntos esta noche especial.
                </p>
                <button className="btn btn-primary" onClick={handleBackToPage}>
                  Volver a la invitación
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <audio ref={audioRef} src="/music.m4a" loop preload="auto" controls={false} />
          <Navbar />
          <main className="main-content">
            <section className="hero-section" id="inicio">
              <div className="hero-section-inner">
                <span className="hero-section-badge">26 DE SEPTIEMBRE — 7:30 PM</span>
                <h1 className="hero-section-title">Mis XV Años</h1>
                <p className="hero-section-subtitle">
                  Los invito a celebrar conmigo esta noche mágica llena de alegría, baile y recuerdos inolvidables.
                </p>
                <Countdown />
              </div>
            </section>

            <section className="section" id="invitados">
              <div className="section-inner">
                <Invitados />
              </div>
            </section>

            <section className="section" id="eventos">
              <div className="section-inner">
                <div className="section-header">
                  <h2 className="section-title">El Evento</h2>
                  <div className="section-divider" />
                </div>
                <div className="eventos-grid">
                  <Evento />
                </div>
              </div>
            </section>

            <section className="section" id="galeria">
              <div className="section-inner">
                <div className="section-header">
                  <h2 className="section-title">Galería</h2>
                  <p className="section-desc">UN VISTAZO A ESTA NOCHE TAN ESPECIAL</p>
                </div>
                <Galeria />
              </div>
            </section>

            <section className="section" id="rsvp">
              <div className="section-inner rsvp-section-inner">
                <div className="rsvp-side">
                  <DressCode />
                  <SugerirCancion />
                </div>
                <ConfirmarAsistencia onConfirm={handleConfirm} />
              </div>
            </section>
          </main>
          <Footer />
          <button className="music-toggle" onClick={toggleMusic} title={playing ? "Pausar música" : "Reanudar música"}>
            <span className="material-symbols-outlined">{playing ? "volume_up" : "volume_off"}</span>
          </button>
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
