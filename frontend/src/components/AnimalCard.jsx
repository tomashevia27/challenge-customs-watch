import './AnimalCard.css'

function AnimalCard({ animal }) {
  const estadoConservacion = animal.enPeligroExtincion ? 'En peligro' : 'No en peligro'

  return (
    <article className="animal-card">
      <div className="animal-card-top">
        <span className="animal-class">{animal.clase}</span>
        <span
          className={`risk-label ${animal.enPeligroExtincion ? 'is-at-risk' : 'is-safe'}`}
          aria-label={`${estadoConservacion} de extinción`}
        >
          <span aria-hidden="true" />
          {estadoConservacion}
        </span>
      </div>

      <h3 className="animal-name">{animal.nombreComun}</h3>
      <p className="scientific-name">{animal.nombreCientifico}</p>

      <dl className="animal-details">
        <div>
          <dt>Hábitat</dt>
          <dd>{animal.habitat}</dd>
        </div>
        <div>
          <dt>Dieta</dt>
          <dd>{animal.dieta}</dd>
        </div>
        <div>
          <dt>Peso promedio</dt>
          <dd>{animal.pesoPromedioKg.toLocaleString('es', { maximumFractionDigits: 6 })} kg</dd>
        </div>
        <div>
          <dt>Esperanza de vida</dt>
          <dd>{animal.esperanzaVidaAnios} años</dd>
        </div>
        <div>
          <dt>Continente</dt>
          <dd>{animal.continente}</dd>
        </div>
      </dl>
    </article>
  )
}

export default AnimalCard
