'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, LogOut, PawPrint, Search } from 'lucide-react'

type Animal = {
  id: number
  nombreComun: string
  nombreCientifico: string
  clase: string
  habitat: string
  dieta: string
  pesoPromedioKg: number
  esperanzaVidaAnios: number
  continente: string
  enPeligroExtincion: boolean
}
type FilterState = { nombre: string; clase: string; dieta: string; continente: string; pesoMin: string; pesoMax: string; enPeligro: boolean }
type View = 'signup' | 'login' | 'filter'

const animals: Animal[] = [
  { id: 1, nombreComun: 'León', nombreCientifico: 'Panthera leo', clase: 'Mamífero', habitat: 'Sabana', dieta: 'Carnívoro', pesoPromedioKg: 190, esperanzaVidaAnios: 14, continente: 'África', enPeligroExtincion: true },
  { id: 2, nombreComun: 'Elefante africano', nombreCientifico: 'Loxodonta africana', clase: 'Mamífero', habitat: 'Sabana', dieta: 'Herbívoro', pesoPromedioKg: 5400, esperanzaVidaAnios: 65, continente: 'África', enPeligroExtincion: true },
  { id: 3, nombreComun: 'Flamenco', nombreCientifico: 'Phoenicopterus roseus', clase: 'Ave', habitat: 'Humedal', dieta: 'Omnívoro', pesoPromedioKg: 3, esperanzaVidaAnios: 30, continente: 'Europa', enPeligroExtincion: false },
  { id: 4, nombreComun: 'Oso polar', nombreCientifico: 'Ursus maritimus', clase: 'Mamífero', habitat: 'Ártico', dieta: 'Carnívoro', pesoPromedioKg: 450, esperanzaVidaAnios: 25, continente: 'América', enPeligroExtincion: true },
  { id: 5, nombreComun: 'Jirafa', nombreCientifico: 'Giraffa camelopardalis', clase: 'Mamífero', habitat: 'Sabana', dieta: 'Herbívoro', pesoPromedioKg: 1200, esperanzaVidaAnios: 26, continente: 'África', enPeligroExtincion: true },
  { id: 6, nombreComun: 'Tigre de Bengala', nombreCientifico: 'Panthera tigris tigris', clase: 'Mamífero', habitat: 'Selva', dieta: 'Carnívoro', pesoPromedioKg: 220, esperanzaVidaAnios: 15, continente: 'Asia', enPeligroExtincion: true },
  { id: 7, nombreComun: 'Guacamayo rojo', nombreCientifico: 'Ara macao', clase: 'Ave', habitat: 'Selva', dieta: 'Herbívoro', pesoPromedioKg: 1, esperanzaVidaAnios: 50, continente: 'América', enPeligroExtincion: false },
  { id: 8, nombreComun: 'Panda gigante', nombreCientifico: 'Ailuropoda melanoleuca', clase: 'Mamífero', habitat: 'Bosque', dieta: 'Herbívoro', pesoPromedioKg: 115, esperanzaVidaAnios: 20, continente: 'Asia', enPeligroExtincion: true },
]
const emptyFilters: FilterState = { nombre: '', clase: '', dieta: '', continente: '', pesoMin: '', pesoMax: '', enPeligro: false }

export default function Page() {
  const [view, setView] = useState<View>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [filters, setFilters] = useState<FilterState>(emptyFilters)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const results = useMemo(() => animals.filter((animal) =>
    animal.nombreComun.toLowerCase().includes(filters.nombre.trim().toLowerCase()) &&
    (!filters.clase || animal.clase === filters.clase) &&
    (!filters.dieta || animal.dieta === filters.dieta) &&
    (!filters.continente || animal.continente === filters.continente) &&
    (!filters.pesoMin || animal.pesoPromedioKg >= Number(filters.pesoMin)) &&
    (!filters.pesoMax || animal.pesoPromedioKg <= Number(filters.pesoMax)) &&
    (!filters.enPeligro || animal.enPeligroExtincion)
  ), [filters])

  function updateFilter<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Ingresa un correo electrónico válido.')
    if (password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres.')
    setError('')
    setView('filter')
  }

  function logout() {
    setEmail('')
    setPassword('')
    setError('')
    setView('login')
  }

  const authenticated = view === 'filter'

  return (
    <main className="app-shell" id="inicio">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Faunario, inicio"><span className="brand-icon"><PawPrint size={19} aria-hidden="true" /></span><span>faunario<span className="brand-dot">.</span></span></a>
        <nav className="main-nav" aria-label="Opciones principales">
          <button className={`nav-option ${view === 'signup' ? 'selected' : ''}`} onClick={() => { setView('signup'); setError('') }} aria-current={view === 'signup' ? 'page' : undefined}>SignUp</button>
          <button className={`nav-option ${view === 'login' ? 'selected' : ''}`} onClick={() => { setView('login'); setError('') }} aria-current={view === 'login' ? 'page' : undefined}>Login</button>
          <button className={`nav-option ${view === 'filter' ? 'selected' : ''}`} onClick={() => { if (authenticated) setView('filter') }} aria-current={view === 'filter' ? 'page' : undefined} aria-disabled={!authenticated}>Filtro</button>
        </nav>
        {authenticated && <button className="logout-button" onClick={logout}><LogOut size={16} aria-hidden="true" /> Logout</button>}
      </header>

      {view === 'filter' ? (
        <>
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-content"><span className="eyebrow light">FAUNARIO</span><h1 id="hero-title">La vida salvaje,<br /><em>más cerca.</em></h1><p>Encuentra tu próxima especie favorita.</p><a className="hero-cta" href="#explorar">Explorar especies <ArrowRight size={16} /></a></div>
            <div className="hero-visual"><Image src="/images/faunario-elephant-clean.png" alt="Elefante africano en un hábitat verde y natural" fill priority sizes="(max-width: 760px) 100vw, 55vw" /></div>
          </section>
          <section className="explorer" id="explorar" aria-labelledby="explorer-title">
            <div className="section-heading"><h2 id="explorer-title">Explora la fauna</h2><button className={`mobile-filter-toggle ${filtersOpen ? 'is-open' : ''}`} onClick={() => setFiltersOpen(!filtersOpen)} aria-expanded={filtersOpen}><span>Filtros</span><span className="active-filter-count">{Object.values(filters).filter(Boolean).length}</span></button></div>
            <div className="search-row"><label className="search-box"><Search size={17} aria-hidden="true" /><input aria-label="Buscar por nombre común" placeholder="Buscar especie…" value={filters.nombre} onChange={(event) => updateFilter('nombre', event.target.value)} /></label><button className="clear-button" onClick={() => setFilters(emptyFilters)}>Limpiar</button></div>
            <div className="explorer-body">
              <aside className={`filter-sidebar ${filtersOpen ? 'filters-visible' : ''}`} aria-label="Filtros de búsqueda"><div className="filter-heading"><span>Filtrar resultados</span><span className="filter-dash" /></div><FilterSelect label="Clase" value={filters.clase} options={['Mamífero', 'Ave', 'Reptil', 'Anfibio']} onChange={(value) => updateFilter('clase', value)} /><FilterSelect label="Dieta" value={filters.dieta} options={['Carnívoro', 'Herbívoro', 'Omnívoro']} onChange={(value) => updateFilter('dieta', value)} /><FilterSelect label="Continente" value={filters.continente} options={['África', 'Asia', 'América', 'Europa', 'Oceanía']} onChange={(value) => updateFilter('continente', value)} /><div className="filter-group"><label className="filter-label" htmlFor="peso-min">Peso promedio <small>KG</small></label><div className="weight-inputs"><input id="peso-min" type="number" min="0" aria-label="Peso mínimo en kg" placeholder="Mín." value={filters.pesoMin} onChange={(event) => updateFilter('pesoMin', event.target.value)} /><span>—</span><input type="number" min="0" aria-label="Peso máximo en kg" placeholder="Máx." value={filters.pesoMax} onChange={(event) => updateFilter('pesoMax', event.target.value)} /></div></div><label className="check-filter"><input type="checkbox" checked={filters.enPeligro} onChange={(event) => updateFilter('enPeligro', event.target.checked)} /><span className="custom-check" aria-hidden="true" />En peligro de extinción</label></aside>
              <div className="results-area"><div className="results-topline"><span><strong>{String(results.length).padStart(2, '0')}</strong> especies</span></div>{results.length ? <div className="animal-grid">{results.map((animal) => <article className="animal-card" key={animal.id}><div className="animal-card-top"><span className="animal-class">{animal.clase}</span><span className={`risk-label ${animal.enPeligroExtincion ? 'is-at-risk' : 'is-safe'}`}><span aria-hidden="true" />{animal.enPeligroExtincion ? 'En peligro' : 'No en peligro'}</span></div><h3>{animal.nombreComun}</h3><p className="scientific-name">{animal.nombreCientifico}</p><dl className="animal-details"><div><dt>Hábitat</dt><dd>{animal.habitat}</dd></div><div><dt>Dieta</dt><dd>{animal.dieta}</dd></div><div><dt>Peso promedio</dt><dd>{animal.pesoPromedioKg.toLocaleString('es')} kg</dd></div><div><dt>Esperanza de vida</dt><dd>{animal.esperanzaVidaAnios} años</dd></div><div><dt>Continente</dt><dd>{animal.continente}</dd></div></dl></article>)}</div> : <div className="empty-state"><span className="empty-mark"><Search size={19} /></span><h3>No encontramos esa especie.</h3><p>Prueba con otros filtros o vuelve a explorar el archivo completo.</p><button onClick={() => setFilters(emptyFilters)}>Limpiar filtros <ArrowRight size={14} /></button></div>}</div>
            </div>
          </section>
        </>
      ) : (
        <section className="auth-layout" aria-labelledby="auth-title"><div className="auth-aside"><span className="eyebrow light">FAUNARIO</span><h1>El reino animal<br /><em>te espera.</em></h1><p>Tu próxima visita empieza aquí.</p></div><div className="auth-card"><span className="eyebrow">TU CUADERNO DE CAMPO</span><h2 id="auth-title">{view === 'signup' ? 'Empieza a explorar.' : 'Qué bueno verte.'}</h2><p className="auth-description">{view === 'signup' ? 'Crea tu cuenta y descubre algo nuevo.' : 'Entra a tu espacio de exploración.'}</p><form onSubmit={handleSubmit} className="auth-form"><label className="field" htmlFor="email"><span>Correo electrónico</span><input id="email" type="email" autoComplete="email" placeholder="hola@ejemplo.com" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label className="field" htmlFor="password"><span>Contraseña</span><input id="password" type="password" autoComplete={view === 'signup' ? 'new-password' : 'current-password'} minLength={6} placeholder="Mínimo 6 caracteres" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="primary-button" type="submit">{view === 'signup' ? 'Crear cuenta' : 'Iniciar sesión'} <ArrowRight size={16} /></button></form><p className="auth-hint">{view === 'signup' ? '¿Ya tienes cuenta?' : '¿Aún no tienes cuenta?'} <button onClick={() => { setView(view === 'signup' ? 'login' : 'signup'); setError('') }}>{view === 'signup' ? 'Login' : 'SignUp'}</button></p></div></section>
      )}
      <footer className="footer"><a className="footer-brand" href="#inicio">faunario<span>.</span></a><span className="footer-note">FAUNA · NATURALEZA · VIDA</span></footer>
    </main>
  )
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <div className="filter-group"><label className="filter-label" htmlFor={`filter-${label}`} >{label}</label><div className="select-wrap"><select id={`filter-${label}`} value={value} onChange={(event) => onChange(event.target.value)}><option value="">Todas</option>{options.map((option) => <option value={option} key={option}>{option}</option>)}</select><span aria-hidden="true">⌄</span></div></div>
}
