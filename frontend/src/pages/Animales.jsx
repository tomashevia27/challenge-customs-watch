function Animales() {
  return (
    <section className="catalog-page" aria-labelledby="animales-titulo">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Catálogo de especies</p>
          <h1 id="animales-titulo">Explorar animales</h1>
          <p>Combiná los filtros para encontrar los animales que buscás.</p>
        </div>
      </div>

      <form className="form-panel filters" onSubmit={(event) => event.preventDefault()}>
        <div className="field">
          <label htmlFor="filtro-nombre">Nombre común</label>
          <input id="filtro-nombre" name="nombre" type="search" placeholder="Ej.: león" />
        </div>
        <div className="field">
          <label htmlFor="filtro-clase">Clase</label>
          <select id="filtro-clase" name="clase" defaultValue="">
            <option value="">Todas</option>
            <option>Anfibio</option>
            <option>Ave</option>
            <option>Insecto</option>
            <option>Mamífero</option>
            <option>Pez</option>
            <option>Reptil</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="filtro-dieta">Dieta</label>
          <select id="filtro-dieta" name="dieta" defaultValue="">
            <option value="">Todas</option>
            <option>Carnívoro</option>
            <option>Herbívoro</option>
            <option>Omnívoro</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="filtro-continente">Continente</label>
          <select id="filtro-continente" name="continente" defaultValue="">
            <option value="">Todos</option>
            <option>África</option>
            <option>América</option>
            <option>Antártida</option>
            <option>Asia</option>
            <option>Europa</option>
            <option>Oceanía</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="filtro-peso-min">Peso mínimo (kg)</label>
          <input id="filtro-peso-min" name="pesoMin" type="number" min="0" step="any" />
        </div>
        <div className="field">
          <label htmlFor="filtro-peso-max">Peso máximo (kg)</label>
          <input id="filtro-peso-max" name="pesoMax" type="number" min="0" step="any" />
        </div>
        <div className="field">
          <label htmlFor="filtro-peligro">En peligro de extinción</label>
          <select id="filtro-peligro" name="enPeligro" defaultValue="">
            <option value="">Todos</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="filter-action">
          <button className="button-primary" type="submit" disabled>Buscar</button>
        </div>
      </form>

      <section className="results" aria-labelledby="resultados-titulo">
        <div className="results-heading">
          <h2 id="resultados-titulo">Resultados</h2>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Nombre común</th>
                <th scope="col">Nombre científico</th>
                <th scope="col">Clase</th>
                <th scope="col">Dieta</th>
                <th scope="col">Continente</th>
                <th scope="col">Peso (kg)</th>
                <th scope="col">En peligro</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="empty-results" colSpan="7">Todavía no hay resultados para mostrar.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </section>
  )
}

export default Animales
