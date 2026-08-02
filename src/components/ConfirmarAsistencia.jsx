import { useState } from "react";

export default function ConfirmarAsistencia({ onConfirm }) {
  const [nombre, setNombre] = useState("");
  const [acompanantes, setAcompanantes] = useState("1 Persona");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim()) {
      onConfirm(nombre.trim(), acompanantes);
    }
  };

  return (
    <div className="crystal-panel rsvp-panel">
      <div className="rsvp-header">
        <h2 className="section-title">Confirmar Asistencia</h2>
        <p className="section-desc">Confirma tu presencia para que podamos tener todo listo para ti.</p>
      </div>

      <form className="rsvp-form" onSubmit={handleSubmit}>
        <div className="rsvp-form-grid">
          <div className="rsvp-field">
            <label className="rsvp-label">Nombre Completo</label>
            <input
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="rsvp-field">
            <label className="rsvp-label">Acompañantes</label>
            <select
              value={acompanantes}
              onChange={(e) => setAcompanantes(e.target.value)}
            >
              <option>1 Persona</option>
              <option>2 Personas</option>
              <option>3 Personas</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-gradient btn-full">
          CONFIRMAR ASISTENCIA
        </button>
        <p className="rsvp-deadline">Confirma antes del 15 de Septiembre</p>
      </form>
    </div>
  );
}
