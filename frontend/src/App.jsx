import { useCallback, useState } from 'react'
import { Link, NavLink, Navigate, Route, Routes } from 'react-router'
import Login from './pages/Login.jsx'
import Registro from './pages/Registro.jsx'
import Animales from './pages/Animales.jsx'

function RequerirSesion({ sesion, children }) {
  return sesion ? children : <Navigate to="/login" replace />
}

function App() {
  const [sesion, setSesion] = useState(null)
  const [avisoSesion, setAvisoSesion] = useState('')

  const cerrarSesion = useCallback((mensaje = '') => {
    setSesion(null)
    setAvisoSesion(mensaje)
  }, [])

  const sesionExpirada = useCallback(() => {
    cerrarSesion('Tu sesión venció. Volvé a ingresar.')
  }, [cerrarSesion])

  function iniciarSesion(datos) {
    setSesion(datos)
    setAvisoSesion('')
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" to={sesion ? '/animales' : '/login'} aria-label="Faunario, inicio"><span className="brand-icon" aria-hidden="true">f</span><span>faunario<span className="brand-dot">.</span></span></Link>
        <nav className="site-nav" aria-label="Navegación principal">
          {sesion ? (
            <>
              <NavLink to="/animales">Animales</NavLink>
              <span className="session-email">{sesion.email}</span>
              <button className="nav-button" type="button" onClick={() => cerrarSesion()}>Salir</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Ingresar</NavLink>
              <NavLink to="/registro">Registrarse</NavLink>
            </>
          )}
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to={sesion ? '/animales' : '/login'} replace />} />
          <Route path="/registro" element={sesion ? <Navigate to="/animales" replace /> : <Registro />} />
          <Route path="/login" element={sesion ? <Navigate to="/animales" replace /> : <Login onLogin={iniciarSesion} avisoSesion={avisoSesion} />} />
          <Route
            path="/animales"
            element={
              <RequerirSesion sesion={sesion}>
                <Animales token={sesion?.token} onUnauthorized={sesionExpirada} />
              </RequerirSesion>
            }
          />
          <Route path="*" element={<Navigate to={sesion ? '/animales' : '/login'} replace />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <Link className="footer-brand" to={sesion ? '/animales' : '/login'}>faunario<span>.</span></Link>
        <span className="footer-note">FAUNA · NATURALEZA · VIDA</span>
      </footer>
    </div>
  )
}

export default App
