export default function Invitados() {
  return (
    <div className="crystal-panel invitados-panel">
      <div className="invitados-decor">
        <span className="material-symbols-outlined">eco</span>
      </div>
      <h2 className="section-title">Invitados de Honor</h2>
      <div className="invitados-body">
        <p className="invitados-text">
          Con mucha gratitud en el corazón, los invitamos a compartir y celebrar este día tan especial.
        </p>
        <p className="invitados-text italic">
          Su presencia es el mejor regalo que podemos recibir en esta nueva etapa de mi vida.
        </p>
        <div className="invitados-divider" />
        <div className="invitados-parents">
          <span className="invitados-parents-label">MIS PADRES</span>
          <p className="invitados-parents-names">[Nombre de los padres de Saray]</p>
        </div>
      </div>
    </div>
  );
}
