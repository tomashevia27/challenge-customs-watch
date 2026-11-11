import { useEffect, useState } from 'react'
import { ApiError, obtenerAnimales } from '../api.js'

function Animales({ token, onUnauthorized }) {
  const [busqueda, setBusqueda] = useState({ query: '' })
  const [animales, setAnimales] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [errorFiltros, setErrorFiltros] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function cargarAnimales() {
      setCargando(true)
      setError('')

      try {
        const resultados = await obtenerAnimales(busqueda.query, token, controller.signal)
        if (controller.signal.aborted) return
        if (!Array.isArray(resultados)) {
          throw new Error('La respuesta del servidor no tiene el formato esperado.')
        }
        setAnimales(resultados)
      } catch (fallo) {
        if (controller.signal.aborted) return

        if (fallo instanceof ApiError && fallo.status === 401) {
          onUnauthorized()
          return
        }

        setAnimales([])
        setError(fallo instanceof ApiError ? fallo.message : 'No se pudieron cargar los animales. Intentá de nuevo.')
      } finally {
        if (!controller.signal.aborted) setCargando(false)
      }
    }

    cargarAnimales()
    return () => controller.abort()
  }, [busqueda, token, onUnauthorized])

  function handleSubmit(event) {
    event.preventDefault()
    const datos = new FormData(event.currentTarget)
    const pesoMin = String(datos.get('pesoMin') ?? '').trim()
    const pesoMax = String(datos.get('pesoMax') ?? '').trim()

    if (pesoMin !== '' && pesoMax !== '' && Number(pesoMin) > Number(pesoMax)) {
      setErrorFiltros('El peso mínimo no puede superar al máximo.')
      return
    }

    const parametros = new URLSearchParams()
    for (const [clave, valor] of datos) {
      const limpio = String(valor).trim()
      if (limpio !== '') parametros.set(clave, limpio)
    }

    setErrorFiltros('')
    setBusqueda({ query: parametros.toString() })
  }

  return (
    <section className="catalog-page" aria-labelledby="animales-titulo">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Catálogo de especies</p>
          <h1 id="animales-titulo">Explorar animales</h1>
          <p>Combiná los filtros para encontrar los animales que buscás.</p>
        </div>
      </div>

      <form className="form-panel filters" onSubmit={handleSubmit}>
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
          <button className="button-primary" type="submit" disabled={cargando}>
            {cargando ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
        {errorFiltros && <p className="form-message error-message filter-error" role="alert">{errorFiltros}</p>}
      </form>

      <section className="results" aria-labelledby="resultados-titulo">
        <div className="results-heading">
          <h2 id="resultados-titulo">Resultados</h2>
          {!cargando && !error && <span className="result-count">{animales.length} {animales.length === 1 ? 'animal' : 'animales'}</span>}
        </div>
        {cargando && <p className="result-status" role="status">Cargando animales...</p>}
        {error && <p className="form-message error-message" role="alert">{error}</p>}
        {!cargando && !error && animales.length === 0 && (
          <p className="result-status">No encontramos animales con esos filtros.</p>
        )}
        {!cargando && !error && animales.length > 0 && (
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
                {animales.map((animal) => (
                  <tr key={animal.id}>
                    <td>{animal.nombreComun}</td>
                    <td><i>{animal.nombreCientifico}</i></td>
                    <td>{animal.clase}</td>
                    <td>{animal.dieta}</td>
                    <td>{animal.continente}</td>
                    <td>{animal.pesoPromedioKg}</td>
                    <td>{animal.enPeligroExtincion ? 'Sí' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  )
}

export default Animales
