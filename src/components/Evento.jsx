export default function Evento() {
  return (
    <>
      <div className="evento-card crystal-panel">
        <div className="evento-card-icon">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>celebration</span>
        </div>
        <div className="evento-card-body">
          <span className="evento-card-time">SÁBADO 26 SEPTIEMBRE — 7:30 PM</span>
          <h3>Celebración de XV Años</h3>
          <p>Encanto salón de eventos</p>
          <p className="evento-card-addr">Carrera 47 #61-16, Medellín</p>
          <p className="evento-card-note">Te esperamos puntual para disfrutar juntos la velada</p>
          <a
            className="btn btn-link"
            href="https://www.google.com/maps/search/Carrera+47+%2361-16+Medellin"
            target="_blank"
            rel="noopener noreferrer"
          >
            EXPLORAR MAPA
            <span className="material-symbols-outlined">north_east</span>
          </a>
        </div>
      </div>
    </>
  );
}
