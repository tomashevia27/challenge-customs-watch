import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { ApiError, iniciarSesion } from '../api.js'

function Login({ onLogin, avisoSesion }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [registroExitoso, setRegistroExitoso] = useState(Boolean(location.state?.registroExitoso))
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const datos = new FormData(event.currentTarget)
    const email = String(datos.get('email')).trim()
    const password = String(datos.get('password'))

    setCargando(true)
    setError('')
    setRegistroExitoso(false)

    try {
      const respuesta = await iniciarSesion(email, password)
      onLogin({ token: respuesta.token, email: respuesta.email })
      navigate('/animales', { replace: true })
    } catch (error) {
      setError(error instanceof ApiError ? error.message : 'No se pudo completar la solicitud. Intentá de nuevo.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <section className="auth-page" aria-labelledby="login-titulo">
      <div className="auth-intro">
        <p className="eyebrow">Acceso al buscador</p>
        <h1 id="login-titulo">Ingresar</h1>
        <p>Entrá con tu cuenta para consultar el catálogo de animales.</p>
      </div>

      <form className="form-panel auth-form" onSubmit={handleSubmit}>
        {registroExitoso && <p className="form-message success-message" role="status">Cuenta creada. Ya podés ingresar.</p>}
        {avisoSesion && !error && !cargando && <p className="form-message" role="status">{avisoSesion}</p>}
        <div className="field">
          <label htmlFor="login-email">Correo electrónico</label>
          <input id="login-email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="field">
          <label htmlFor="login-password">Contraseña</label>
          <input id="login-password" name="password" type="password" autoComplete="current-password" required />
        </div>
        {error && <p className="form-message error-message" role="alert">{error}</p>}
        <button className="button-primary" type="submit" disabled={cargando}>
          {cargando ? 'Ingresando...' : 'Ingresar'}
        </button>
        <p className="form-footer">¿Todavía no tenés cuenta? <Link to="/registro">Registrate</Link></p>
      </form>
    </section>
  )
}

export default Login
