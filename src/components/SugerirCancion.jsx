import { useState } from "react";

export default function SugerirCancion() {
  const [cancion, setCancion] = useState("");
  const [enviada, setEnviada] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cancion.trim()) {
      setEnviada(true);
      setTimeout(() => {
        setEnviada(false);
        setCancion("");
      }, 2000);
    }
  };

  return (
    <div className="crystal-panel sugerir-panel">
      <span className="material-symbols-outlined sugerir-icon">music_note</span>
      <h3 className="section-subtitle">Tus Sugerencias</h3>
      <p className="sugerir-text">¿Qué canción te gustaría escuchar en la fiesta?</p>
      {enviada ? (
        <p className="sugerir-gracias">¡Gracias por tu sugerencia!</p>
      ) : (
        <form className="sugerir-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tu melodía favorita..."
            value={cancion}
            onChange={(e) => setCancion(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-icon-submit">
            <span className="material-symbols-outlined">auto_awesome</span>
          </button>
        </form>
      )}
    </div>
  );
}
