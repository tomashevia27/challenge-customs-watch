import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { ApiError, iniciarSesion } from '../api.js'
import AuthLayout from '../components/AuthLayout.jsx'

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
    <AuthLayout
      titleId="login-titulo"
      asideTitle={<>La vida salvaje,<br /><em>más cerca.</em></>}
      asideDescription="Descubrí nuevas especies y explorá sus características con filtros simples."
      formEyebrow="Tu cuaderno de campo"
      formTitle="Ingresar"
      formDescription="Entrá con tu cuenta para continuar explorando."
    >
      <form className="auth-form" onSubmit={handleSubmit} aria-busy={cargando}>
        {registroExitoso && <p className="form-message success-message" role="status">Cuenta creada. Ya podés ingresar.</p>}
        {avisoSesion && !error && !cargando && <p className="form-message" role="status">{avisoSesion}</p>}
        <label className="field" htmlFor="login-email">
          <span>Correo electrónico</span>
          <input id="login-email" name="email" type="email" autoComplete="email" placeholder="hola@ejemplo.com" required />
        </label>
        <label className="field" htmlFor="login-password">
          <span>Contraseña</span>
          <input id="login-password" name="password" type="password" autoComplete="current-password" placeholder="Tu contraseña" required />
        </label>
        {error && <p className="form-message error-message" role="alert">{error}</p>}
        <button className="button-primary" type="submit" disabled={cargando}>
          <span>{cargando ? 'Ingresando...' : 'Ingresar'}</span>
          <span className="button-arrow" aria-hidden="true">→</span>
        </button>
        <p className="form-footer">¿Todavía no tenés cuenta? <Link to="/registro">Registrate</Link></p>
      </form>
    </AuthLayout>
  )
}

export default Login
