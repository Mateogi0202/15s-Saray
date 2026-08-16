import { useState } from "react";

export default function ConfirmarAsistencia({ guest, onConfirm, confirmMsg }) {
  const [numGuests, setNumGuests] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    await onConfirm(numGuests);
    setSubmitting(false);
  };

  const guestName = guest?.display_name || "Invitado";

  if (guest?.confirmed) {
    return (
      <div className="glass-card rsvp-panel rsvp-confirmed">
        <span className="glass-card-corner glass-card-corner-tl material-symbols-outlined">
          auto_awesome
        </span>
        <span className="glass-card-corner glass-card-corner-br material-symbols-outlined">
          auto_awesome
        </span>
        <span className="material-symbols-outlined rsvp-confirmed-check">check_circle</span>
        <h2 className="rsvp-title">Confirmada</h2>
        <p className="rsvp-desc">
          Tu asistencia ya está registrada. ¡Gracias por confirmar!
        </p>
        <div className="rsvp-guest-box">
          <span className="material-symbols-outlined rsvp-guest-icon">group</span>
          <p className="rsvp-guest-label">INVITADO</p>
          <p className="rsvp-guest-name">{guestName}</p>
          <p className="rsvp-confirmed-people">
            {guest.num_guests || 1} {guest.num_guests === 1 ? "persona" : "personas"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rsvp-panel">
      <div className="rsvp-panel-glow" />
      <span className="glass-card-corner glass-card-corner-tl material-symbols-outlined">
        auto_awesome
      </span>
      <span className="glass-card-corner glass-card-corner-br material-symbols-outlined">
        auto_awesome
      </span>
      <h2 className="rsvp-title">Confirmar Asistencia</h2>
      <p className="rsvp-desc">
        Confirma tu presencia para que podamos tener todo listo para ti.
      </p>

      <div className="rsvp-guest-box">
        <span className="material-symbols-outlined rsvp-guest-icon">group</span>
        <p className="rsvp-guest-label">INVITADO</p>
        <p className="rsvp-guest-name">{guestName}</p>
      </div>

      <form className="rsvp-form rsvp-form-single" onSubmit={handleSubmit}>
        <div className="rsvp-field">
          <label className="rsvp-label">¿CUÁNTAS PERSONAS IRÁN?</label>
          <div className="rsvp-select-wrap">
            <select
              className="rsvp-select"
              value={numGuests}
              onChange={(e) => setNumGuests(Number(e.target.value))}
            >
              <option value={1}>1 Persona</option>
              <option value={2}>2 Personas</option>
              <option value={3}>3 Personas</option>
              <option value={4}>4 Personas</option>
              <option value={5}>5 Personas</option>
            </select>
            <span className="material-symbols-outlined rsvp-select-chevron">
              expand_more
            </span>
          </div>
        </div>
      </form>
      <button className="rsvp-submit" onClick={handleSubmit} disabled={submitting}>
        <span className="material-symbols-outlined">check_circle</span>
        {submitting ? "CONFIRMANDO..." : "CONFIRMAR ASISTENCIA"}
      </button>
      {confirmMsg === "error" && (
        <p className="rsvp-feedback rsvp-feedback-error">
          No se pudo guardar tu confirmación. Volvé a intentarlo.
        </p>
      )}
      <p className="rsvp-deadline">
        <span className="material-symbols-outlined">event</span>
        Confirma antes del 15 de Septiembre
      </p>
    </div>
  );
}