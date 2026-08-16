import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { fetchGuests, fetchSongs, setSongSelected } from "../lib/api";

const SARAY_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDzbWq2HHCFxIFnLHw2rqutJ-ip_0d7ow2ndcZWkXKQy1ONttWSgvHjqBFD7CWQ2_rsZ1c9CoDGVdZejNA7xt42giX0GKNTpb1auGJWAqlrqoxGyg3apwTSuv4SFq1VICzHDAiAMX_JOWTTS5SnKAeji4Is_JNFdeKmE_8lnU7HYWwz27Of-KTXdknDDZexumn4Jj1soUARevmawFnoBs5ONkbro_tF-LbLqUJM_3Uj5wgHUnD8FpKr6A";

export default function AdminDashboard() {
  const [guests, setGuests] = useState([]);
  const [songs, setSongs] = useState([]);
  const [filter, setFilter] = useState("todos");
  const [query, setQuery] = useState("");
  const [view, setView] = useState("guests");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = () => {
      Promise.all([fetchGuests(), fetchSongs()])
        .then(([g, s]) => {
          setGuests(g);
          setSongs(s);
          setLoading(false);
        })
        .catch((e) => {
          setError(e.message || "Error al cargar datos");
          setLoading(false);
        });
    };
    loadData();
    window.addEventListener("focus", loadData);
    return () => window.removeEventListener("focus", loadData);
  }, []);

  const stats = useMemo(() => {
    const confirmed = guests.filter((g) => g.confirmed).length;
    const totalGuests = guests.reduce((acc, g) => acc + (g.num_guests || 1), 0);
    return { total: guests.length, confirmed, pending: guests.length - confirmed, totalGuests };
  }, [guests]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const byStatus = (g) => {
      if (filter === "confirmados") return g.confirmed;
      if (filter === "pendientes") return !g.confirmed;
      return true;
    };
    return guests.filter((g) => byStatus(g) && (!q || g.display_name.toLowerCase().includes(q)));
  }, [guests, filter, query]);

  const selectedSongs = songs.filter((s) => s.selected);

  const handleToggleSong = async (song, value) => {
    setSongs((prev) => prev.map((s) => (s.id === song.id ? { ...s, selected: value } : s)));
    try {
      await setSongSelected(song.id, value);
    } catch (e) {
      setError(e.message || "Error al actualizar");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/", { replace: true });
  };

  if (loading) {
    return (
      <div className="admin-center">
        <span className="material-symbols-outlined admin-loading-icon">crown</span>
        <p className="admin-loading-text">Cargando...</p>
      </div>
    );
  }

  const initial = (name) => (name ? name.trim().charAt(0).toUpperCase() : "?");

  return (
    <div className={`adn adn-view-${view}`}>
      <header className="adn-appbar">
        <div className="adn-appbar-inner">
          <div className="adn-appbar-left">
            <div className="adn-appbar-avatar">
              <img src={SARAY_AVATAR} alt="Saray" />
            </div>
            <h1 className="adn-appbar-title">Saray&apos;s Quince</h1>
          </div>
          <button className="adn-icon-btn" onClick={handleLogout} title="Cerrar sesión" aria-label="Cerrar sesión">
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </header>

      <main className="adn-canvas">
        {error && <p className="adn-error">{error}</p>}

        <section className="adn-guests-view">
            <section className="adn-hero">
              <h2 className="adn-title">Guest List</h2>
              <p className="adn-subtitle">
                {stats.total} invitaciones · {stats.totalGuests} personas
              </p>
            </section>

            <div className="adn-search">
              <span className="material-symbols-outlined adn-search-icon">search</span>
              <input
                className="adn-search-input"
                type="text"
                placeholder="Buscar por nombre o familia..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="adn-filters">
              <button
                className={`adn-chip ${filter === "todos" ? "active" : ""}`}
                onClick={() => setFilter("todos")}
              >
                Todos ({stats.total})
              </button>
              <button
                className={`adn-chip ${filter === "confirmados" ? "active" : ""}`}
                onClick={() => setFilter("confirmados")}
              >
                Confirmados ({stats.confirmed})
              </button>
              <button
                className={`adn-chip ${filter === "pendientes" ? "active" : ""}`}
                onClick={() => setFilter("pendientes")}
              >
                Pendientes ({stats.pending})
              </button>
            </div>

            <section className="adn-cards">
              {filtered.map((guest) => (
                <div className="adn-card" key={guest.id}>
                  <div className="adn-card-left">
                    <div className="adn-card-avatar">{initial(guest.display_name)}</div>
                    <div className="adn-card-text">
                      <h3 className="adn-card-name">{guest.display_name}</h3>
                      <p className="adn-card-meta">
                        {guest.confirmed
                          ? `${guest.num_guests} ${guest.num_guests === 1 ? "persona" : "personas"} · ${new Date(
                              guest.confirmed_at
                            ).toLocaleDateString("es-CO", { day: "2-digit", month: "short" })}`
                          : "Sin confirmar"}
                      </p>
                    </div>
                  </div>
                  <span className={`adn-badge ${guest.confirmed ? "confirmed" : "pending"}`}>
                    <span className="material-symbols-outlined">
                      {guest.confirmed ? "check_circle" : "schedule"}
                    </span>
                    {guest.confirmed ? "Confirmado" : "Pendiente"}
                  </span>
                </div>
              ))}
              {filtered.length === 0 && (
                <p className="adn-empty">No hay invitados que coincidan.</p>
              )}
            </section>
          </section>

          <section className="adn-music-view">
            <section className="adn-hero">
              <h2 className="adn-title">Playlist</h2>
              <p className="adn-subtitle">
                {selectedSongs.length} seleccionada{selectedSongs.length === 1 ? "" : "s"} · {songs.length}{" "}
                sugerida{songs.length === 1 ? "" : "s"}
              </p>
            </section>

            <section className="adn-cards">
              {songs.map((song) => (
                <div className={`adn-card ${song.selected ? "selected" : ""}`} key={song.id}>
                  <div className="adn-card-left">
                    <div className="adn-card-avatar adn-song-avatar">
                      <span className="material-symbols-outlined">music_note</span>
                    </div>
                    <div className="adn-card-text">
                      <h3 className="adn-card-name">{song.song_name}</h3>
                      <p className="adn-card-meta">
                        {song.guests?.display_name || "Invitado"} ·{" "}
                        {new Date(song.created_at).toLocaleDateString("es-CO", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </p>
                    </div>
                  </div>
                  <button
                    className={`adn-toggle ${song.selected ? "on" : ""}`}
                    onClick={() => handleToggleSong(song, !song.selected)}
                    title={song.selected ? "Quitar de la playlist" : "Agregar a la playlist"}
                  >
                    <span className="material-symbols-outlined">
                      {song.selected ? "check_circle" : "radio_button_unchecked"}
                    </span>
                  </button>
                </div>
              ))}
              {songs.length === 0 && (
                <p className="adn-empty">Todavía no hay canciones sugeridas.</p>
              )}
            </section>
          </section>
        </main>

      <nav className="adn-nav">
        <button
          className={`adn-nav-item ${view === "guests" ? "" : ""}`}
          onClick={() => {
            setView("guests");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="material-symbols-outlined">home</span>
          <span className="adn-nav-label">Home</span>
        </button>
        <button className={`adn-nav-item ${view === "guests" ? "active" : ""}`} onClick={() => setView("guests")}>
          <span className="material-symbols-outlined">group</span>
          <span className="adn-nav-label">Guests</span>
        </button>
        <button className={`adn-nav-item ${view === "music" ? "active" : ""}`} onClick={() => setView("music")}>
          <span className="material-symbols-outlined">music_note</span>
          <span className="adn-nav-label">Music</span>
        </button>
        <button
          className="adn-nav-item"
          onClick={() => {
            setView("guests");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="material-symbols-outlined">celebration</span>
          <span className="adn-nav-label">Event</span>
        </button>
      </nav>
    </div>
  );
}