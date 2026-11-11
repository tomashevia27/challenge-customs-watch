import { useEffect, useState } from 'react'
import { ApiError, obtenerAnimales } from '../api.js'
import AnimalCard from '../components/AnimalCard.jsx'

function Animales({ token, onUnauthorized }) {
  const [busqueda, setBusqueda] = useState({ query: '' })
  const [animales, setAnimales] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [errorFiltros, setErrorFiltros] = useState('')
  const [filtrosVisibles, setFiltrosVisibles] = useState(false)

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

  function limpiarFiltros(event) {
    event.currentTarget.form?.reset()
    setErrorFiltros('')
    setFiltrosVisibles(false)
    setBusqueda({ query: '' })
  }

  const filtrosActivos = new URLSearchParams(busqueda.query).size

  return (
    <section className="catalog-page" aria-labelledby="hero-title">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-content">
          <span className="eyebrow eyebrow-light">
            <span className="eyebrow-dot" aria-hidden="true" />
            Faunario
          </span>
          <h1 id="hero-title">La vida salvaje,<br /><em>más cerca.</em></h1>
          <p>Descubrí especies de todo el mundo y lo que hace única a cada una.</p>
          <a className="hero-cta" href="#explorar">
            Explorar especies
            <span className="button-arrow" aria-hidden="true">→</span>
          </a>
        </div>
        <div className="hero-visual">
          <img src="/faunario-elephant-clean.png" alt="Elefante africano en un hábitat verde y natural" fetchPriority="high" />
        </div>
      </section>

      <section className="intro-strip" aria-label="Resumen del catálogo">
        <div>
          <span className="eyebrow">Catálogo de especies</span>
          <h2>Explorá la fauna</h2>
        </div>
        <p>Combiná los filtros para conocer hábitats, alimentación y características de cada animal.</p>
        <div className="intro-stat" aria-live="polite">
          <strong>{cargando ? '—' : animales.length}</strong>
          <span>resultados<br />actuales</span>
        </div>
      </section>

      <section className="explorer" id="explorar" aria-labelledby="explorer-title">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Busca tu próxima especie</span>
            <h2 id="explorer-title">El catálogo, a tu medida<span className="heading-dot">.</span></h2>
          </div>
          <button
            className="mobile-filter-toggle"
            type="button"
            aria-expanded={filtrosVisibles}
            aria-controls="animal-filters"
            onClick={() => setFiltrosVisibles((visible) => !visible)}
          >
            Filtros
            <span className="active-filter-count">{filtrosActivos}</span>
          </button>
        </div>

        <form className="explorer-form" onSubmit={handleSubmit}>
          <div className="search-row">
            <label className="search-box">
              <span className="search-icon" aria-hidden="true" />
              <input
                id="filtro-nombre"
                aria-label="Buscar por nombre común"
                name="nombre"
                type="search"
                placeholder="Buscar especie por nombre común..."
              />
            </label>
            <div className="search-actions">
              <button className="clear-button" type="button" onClick={limpiarFiltros}>Limpiar</button>
              <button className="button-primary" type="submit" disabled={cargando}>
                <span>{cargando ? 'Buscando...' : 'Buscar'}</span>
                <span className="button-arrow" aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          {errorFiltros && <p className="form-message error-message filter-error" role="alert">{errorFiltros}</p>}

          <div className="explorer-body">
            <aside
              id="animal-filters"
              className={`filter-sidebar ${filtrosVisibles ? 'filters-visible' : ''}`}
              aria-label="Filtros de búsqueda"
            >
              <div className="filter-heading">
                <span>Filtrar resultados</span>
                <span className="filter-dash" aria-hidden="true" />
              </div>

              <div className="filter-group">
                <label className="filter-label" htmlFor="filtro-clase">Clase</label>
                <div className="select-wrap">
                  <select id="filtro-clase" name="clase" defaultValue="">
                    <option value="">Todas</option>
                    <option>Anfibio</option>
                    <option>Ave</option>
                    <option>Insecto</option>
                    <option>Mamífero</option>
                    <option>Pez</option>
                    <option>Reptil</option>
                  </select>
                  <span className="select-chevron" aria-hidden="true">⌄</span>
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label" htmlFor="filtro-dieta">Dieta</label>
                <div className="select-wrap">
                  <select id="filtro-dieta" name="dieta" defaultValue="">
                    <option value="">Todas</option>
                    <option>Carnívoro</option>
                    <option>Herbívoro</option>
                    <option>Omnívoro</option>
                  </select>
                  <span className="select-chevron" aria-hidden="true">⌄</span>
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label" htmlFor="filtro-continente">Continente</label>
                <div className="select-wrap">
                  <select id="filtro-continente" name="continente" defaultValue="">
                    <option value="">Todos</option>
                    <option>África</option>
                    <option>América</option>
                    <option>Antártida</option>
                    <option>Asia</option>
                    <option>Europa</option>
                    <option>Oceanía</option>
                  </select>
                  <span className="select-chevron" aria-hidden="true">⌄</span>
                </div>
              </div>

              <div className="filter-group">
                <span className="filter-label">Peso promedio <span className="filter-unit">KG</span></span>
                <div className="weight-inputs">
                  <label className="sr-only" htmlFor="filtro-peso-min">Peso mínimo en kilogramos</label>
                  <input id="filtro-peso-min" name="pesoMin" type="number" min="0" step="any" placeholder="Mín." />
                  <span aria-hidden="true">—</span>
                  <label className="sr-only" htmlFor="filtro-peso-max">Peso máximo en kilogramos</label>
                  <input id="filtro-peso-max" name="pesoMax" type="number" min="0" step="any" placeholder="Máx." />
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label" htmlFor="filtro-peligro">En peligro de extinción</label>
                <div className="select-wrap">
                  <select id="filtro-peligro" name="enPeligro" defaultValue="">
                    <option value="">Todos</option>
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                  </select>
                  <span className="select-chevron" aria-hidden="true">⌄</span>
                </div>
              </div>

              <p className="filter-note">La búsqueda consulta el catálogo de especies disponible.</p>
            </aside>

            <div className="results-area" aria-busy={cargando}>
              <div className="results-topline">
                <p><strong>{cargando ? '—' : String(animales.length).padStart(2, '0')}</strong> especies encontradas</p>
                <span className="results-mode"><span aria-hidden="true" />Datos del catálogo</span>
              </div>
              {cargando && <p className="result-status" role="status">Cargando animales...</p>}
              {error && <p className="form-message error-message" role="alert">{error}</p>}
              {!cargando && !error && animales.length === 0 && (
                <div className="empty-state">
                  <span className="empty-mark" aria-hidden="true" />
                  <h3>No encontramos animales con esos filtros.</h3>
                  <p>Probá cambiar la búsqueda para explorar otras especies.</p>
                </div>
              )}
              {!cargando && !error && animales.length > 0 && (
                <div className="animal-grid">
                  {animales.map((animal) => <AnimalCard key={animal.id} animal={animal} />)}
                </div>
              )}
            </div>
          </div>
        </form>
      </section>
    </section>
  )
}

export default Animales
