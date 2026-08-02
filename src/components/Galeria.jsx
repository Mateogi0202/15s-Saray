const FOTOS = [
  { id: 1, src: "/images/foto1.jpg", alt: "Saray - Foto 1" },
  { id: 2, src: "/images/foto2.jpg", alt: "Saray - Foto 2" },
  { id: 3, src: "/images/foto3.jpg", alt: "Saray - Foto 3" },
  { id: 4, src: "/images/foto4.jpg", alt: "Saray - Foto 4" },
];

export default function Galeria() {
  return (
    <div className="galeria-grid">
      <div className="galeria-item crystal-panel galeria-main">
        <img src={FOTOS[0].src} alt={FOTOS[0].alt} />
        <div className="galeria-overlay">
          <p className="galeria-overlay-text">Saray — XV Años</p>
        </div>
      </div>
      <div className="galeria-item crystal-panel">
        <img src={FOTOS[1].src} alt={FOTOS[1].alt} />
      </div>
      <div className="galeria-item crystal-panel">
        <img src={FOTOS[2].src} alt={FOTOS[2].alt} />
      </div>
    </div>
  );
}
