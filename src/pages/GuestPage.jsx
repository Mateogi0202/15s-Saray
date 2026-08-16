import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Hero from "../components/Hero";
import Countdown from "../components/Countdown";
import Invitados from "../components/Invitados";
import Evento from "../components/Evento";
import ConfirmarAsistencia from "../components/ConfirmarAsistencia";
import Galeria from "../components/Galeria";
import DressCode from "../components/DressCode";
import SugerirCancion from "../components/SugerirCancion";
import ShaderBackground from "../components/ShaderBackground";
import Butterflies from "../components/Butterflies";
import CrownParticles from "../components/CrownParticles";
import { getGuest, confirmRsvp } from "../lib/api";
import "../App.css";

const MIS15_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuCVfEkKXJQDKvITg5nqu0wAyrggpR_67p4kKK27TDg6EJHw8FTLbaUH-25GQUdb9Yb57qusG7KafTax_uYd7eCgy5iB_5CQJIl9EggLgt5RZVGF4qD_jDM-dGXzqkwzHicVwZcOVR5PNWyGVxiiFKs8fdyxXjiDxDtmQAiWYE2CU6KcSjQby1wsfEYuvoXrrh0qB1LdUwMmFvSnLTGmhtie-Ef8pNAlU6egjqwC84LXPCtszlkjm1X2tlErvoJOTakc1gghgUFD7Vbj1lg";

const StarDivider = () => (
  <div className="section-star-divider">
    <span className="material-symbols-outlined">star</span>
  </div>
);

export default function GuestPage() {
  const { slug } = useParams();
  const [guest, setGuest] = useState(null);
  const [status, setStatus] = useState("loading");

  const [entered, setEntered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState("");
  const audioRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    getGuest(slug)
      .then((g) => {
        if (!mounted) return;
        if (!g) {
          setStatus("notfound");
          return;
        }
        setGuest(g);
        setStatus("ready");
      })
      .catch(() => {
        if (mounted) setStatus("error");
      });
    return () => {
      mounted = false;
    };
  }, [slug]);

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
        sparkle.style.background = Math.random() > 0.5 ? "#F1DDCF" : "#87d7ac";
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

  const handleConfirm = async (numGuests) => {
    if (!guest) return;
    setConfirmMsg("");
    try {
      const updated = await confirmRsvp(guest.id, numGuests);
      setGuest((prev) => ({
        ...prev,
        confirmed: true,
        num_guests: updated?.num_guests ?? numGuests,
        confirmed_at: updated?.confirmed_at ?? new Date().toISOString(),
      }));
      setConfirmMsg("confirmada");
    } catch (err) {
      console.error("confirmRsvp falló:", err);
      setConfirmMsg("error");
    }
  };

  if (status === "loading") {
    return (
      <div className="admin-center">
        <span className="material-symbols-outlined admin-loading-icon">crown</span>
        <p className="admin-loading-text">Preparando tu invitación...</p>
      </div>
    );
  }

  if (status === "notfound") {
    return (
      <div className="admin-center">
        <div className="glass-card admin-invalid-card">
          <span className="material-symbols-outlined admin-invalid-icon">link_off</span>
          <h1 className="admin-login-title">Invitación no válida</h1>
          <p className="admin-login-subtitle">
            El enlace no corresponde a un invitado. Verificá el enlace que te enviaron.
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="admin-center">
        <div className="glass-card admin-invalid-card">
          <span className="material-symbols-outlined admin-invalid-icon">cloud_off</span>
          <h1 className="admin-login-title">Error de conexión</h1>
          <p className="admin-login-subtitle">
            No se pudo cargar la invitación. Intentalo de nuevo más tarde.
          </p>
        </div>
      </div>
    );
  }

  const guestName = guest.display_name;

  return (
    <>
      <ShaderBackground />
      <div className="fabric-overlay" />
      {entered && (
        <>
          <div className="cursor-custom" ref={cursorRef} />
          <Butterflies active={entered} />
        </>
      )}

      {!entered ? (
        <>
          <CrownParticles />
          <Hero guestName={guestName} onEnter={handleEnter} />
        </>
      ) : (
        <>
          <audio ref={audioRef} src="/music.m4a" loop preload="auto" controls={false} />
          <main className="main-content">
            <section className="countdown-section" id="inicio">
              <p className="countdown-quote">
                &ldquo;Hay momentos que marcan un antes y un después... Con mucha alegría, te invito a celebrar conmigo esta noche mágica llena de alegría, baile y recuerdos para no olvidar.&rdquo;
              </p>
              <div
                className="countdown-mis15-img"
                role="img"
                aria-label="Mis 15 Años"
                style={{
                  backgroundColor: "#F1DDCF",
                  WebkitMaskImage: `url(${MIS15_IMG})`,
                  maskImage: `url(${MIS15_IMG})`,
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              />
              <Countdown />
            </section>

            <StarDivider />

            <section className="section" id="invitados">
              <div className="section-inner" style={{ maxWidth: "64rem", margin: "0 auto" }}>
                <Invitados />
              </div>
            </section>

            <StarDivider />

            <section className="evento-section" id="eventos">
              <div className="evento-header">
                <h2 className="section-title">El evento</h2>
                <div className="evento-header-line" />
              </div>
              <Evento />
            </section>

            <StarDivider />

            <section className="galeria-section" id="galeria">
              <div className="galeria-header">
                <h2 className="section-title">Galería</h2>
              </div>
              <Galeria />
            </section>

            <StarDivider />

            <section className="logistics-section" id="logistics">
              <div className="logistics-grid">
                <DressCode />
                <SugerirCancion guest={guest} />
              </div>
            </section>

            <StarDivider />

            <section className="rsvp-section" id="rsvp">
              <ConfirmarAsistencia guest={guest} onConfirm={handleConfirm} confirmMsg={confirmMsg} />
            </section>
          </main>
          <button
            className="music-toggle"
            onClick={toggleMusic}
            title={playing ? "Pausar música" : "Reanudar música"}
          >
            <span className="material-symbols-outlined">
              {playing ? "volume_up" : "volume_off"}
            </span>
          </button>
        </>
      )}
    </>
  );
}