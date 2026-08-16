const FOTOS = [
  {
    id: 1,
    src: "/images/foto5.jpg",
    alt: "Saray - Retrato",
    main: true,
  },
  {
    id: 2,
    src: "/images/foto1.jpg",
    alt: "Saray - Foto 1",
  },
  {
    id: 3,
    src: "/images/foto2.jpg",
    alt: "Saray - Foto 2",
  },
  {
    id: 4,
    src: "/images/foto3.jpg",
    alt: "Saray - Foto 3",
  },
  {
    id: 5,
    src: "/images/foto4.jpg",
    alt: "Saray - Foto 4",
  },
];

export default function Galeria() {
  return (
    <div className="galeria-wrapper">
      <span className="galeria-corner galeria-corner-tl material-symbols-outlined">
        auto_awesome
      </span>
      <span className="galeria-corner galeria-corner-tr material-symbols-outlined">
        auto_awesome
      </span>
      <span className="galeria-corner galeria-corner-bl material-symbols-outlined">
        auto_awesome
      </span>
      <span className="galeria-corner galeria-corner-br material-symbols-outlined">
        auto_awesome
      </span>

      <div className="galeria-bento">
        {FOTOS.map((foto) => (
          <div
            key={foto.id}
            className={`galeria-item ${foto.main ? "galeria-item-main" : ""}`}
          >
            <img src={foto.src} alt={foto.alt} />
          </div>
        ))}
      </div>
    </div>
  );
}
