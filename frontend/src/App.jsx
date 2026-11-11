import { Link, NavLink, Navigate, Route, Routes } from 'react-router'
import Login from './pages/Login.jsx'
import Registro from './pages/Registro.jsx'
import Animales from './pages/Animales.jsx'

function App() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" to="/login">Buscador de animales</Link>
        <nav className="site-nav" aria-label="Navegación principal">
          <NavLink to="/animales">Animales</NavLink>
          <NavLink to="/login">Ingresar</NavLink>
          <NavLink to="/registro">Registrarse</NavLink>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/animales" element={<Animales />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
