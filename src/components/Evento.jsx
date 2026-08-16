const MAP_IMG_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuBvZ7RPt0HIvhALOt6v7ap8usdNOLubPK799fCbAoYIEhN1VcYgGvAzRBmhrvO_qjsOQTiDyqhwyLma3bqGxngrFUKmww9jRu1OfrrRGn8zXmW56jF1GCHfCxdh6iIXHJ5zThhYha599h9PSdci0ike3-2Ipuc_mvPwmKQkvFIe3CRduwsylt7VYpPu6wjNtG_z0D4a83R2VLMZxCYGqcmXHgEuzdBywIKKDb0u8r4oq4ucxdCf9JPgvQ";

export default function Evento() {
  return (
    <div className="evento-grid">
      <div className="glass-card evento-info-card">
        <span className="glass-card-corner glass-card-corner-tl material-symbols-outlined">
          auto_awesome
        </span>
        <span className="glass-card-corner glass-card-corner-br material-symbols-outlined">
          auto_awesome
        </span>
        <div className="evento-info-group">
          <div>
            <p className="evento-info-label">FECHA Y HORA</p>
            <p className="evento-info-value">SÁBADO 26 SEPTIEMBRE — 7:30 PM</p>
          </div>
          <div>
            <p className="evento-info-label">TIPO DE EVENTO</p>
            <p className="evento-info-value-light">Celebración de XV Años</p>
          </div>
          <div>
            <p className="evento-info-label">LUGAR</p>
            <p className="evento-info-value">Encanto salón de eventos</p>
            <p className="evento-info-value-light">Carrera 47 #61-16, Medellín</p>
          </div>
        </div>
        <a
          className="btn-link"
          href="https://www.google.com/maps/search/Carrera+47+%2361-16+Medellin"
          target="_blank"
          rel="noopener noreferrer"
        >
          EXPLORAR MAPA
          <span className="material-symbols-outlined">north_east</span>
        </a>
      </div>
      <div className="glass-card evento-map-card">
        <span className="glass-card-corner glass-card-corner-tl material-symbols-outlined">
          auto_awesome
        </span>
        <span className="glass-card-corner glass-card-corner-br material-symbols-outlined">
          auto_awesome
        </span>
        <a
          className="evento-map-link"
          href="https://www.google.com/maps/search/Carrera+47+%2361-16+Medellin"
          target="_blank"
          rel="noopener noreferrer"
          title="Abrir ubicación en Google Maps"
        >
          <img className="evento-map-img" src={MAP_IMG_URL} alt="Mapa del evento" />
        </a>
      </div>
    </div>
  );
}
