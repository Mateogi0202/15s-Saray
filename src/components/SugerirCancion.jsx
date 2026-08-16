import { useState } from "react";
import { addSong } from "../lib/api";

export default function SugerirCancion({ guest }) {
  const [cancion, setCancion] = useState("");
  const [enviada, setEnviada] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cancion.trim()) return;
    if (!guest) return;
    try {
      await addSong(guest.id, cancion.trim());
      setEnviada(true);
      setCancion("");
      setError("");
      setTimeout(() => setEnviada(false), 2000);
    } catch (err) {
      setError(err.message || "No se pudo enviar la sugerencia.");
    }
  };

  return (
    <div className="glass-card logistics-card">
      <span className="glass-card-corner glass-card-corner-tl material-symbols-outlined">
        auto_awesome
      </span>
      <span className="glass-card-corner glass-card-corner-br material-symbols-outlined">
        auto_awesome
      </span>
      <div className="logistics-card-icon">
        <span className="material-symbols-outlined">library_music</span>
      </div>
      <h3 className="logistics-card-label">TUS SUGERENCIAS</h3>
      <p className="logistics-card-text" style={{ marginBottom: "2.5rem" }}>
        ¿Qué canción te gustaría escuchar en la fiesta?
      </p>
      {enviada ? (
        <p className="song-thanks">¡Gracias por tu sugerencia!</p>
      ) : (
        <form className="song-input-wrap" onSubmit={handleSubmit}>
          <input
            className="song-input"
            type="text"
            placeholder="Nombre de la canción..."
            value={cancion}
            onChange={(e) => setCancion(e.target.value)}
            required
          />
          <button type="submit" className="song-submit-btn">
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
      )}
      {error && <p className="admin-login-error">{error}</p>}
    </div>
  );
}