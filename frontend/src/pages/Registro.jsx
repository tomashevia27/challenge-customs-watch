import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ApiError, registrarUsuario } from '../api.js'
import AuthLayout from '../components/AuthLayout.jsx'

function Registro() {
  const navigate = useNavigate()
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const datos = new FormData(event.currentTarget)
    const email = String(datos.get('email')).trim()
    const password = String(datos.get('password'))

    setCargando(true)
    setError('')

    try {
      await registrarUsuario(email, password)
      navigate('/login', { replace: true, state: { registroExitoso: true } })
    } catch (error) {
      setError(error instanceof ApiError ? error.message : 'No se pudo completar la solicitud. Intentá de nuevo.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <AuthLayout
      titleId="registro-titulo"
      asideTitle={<>Descubrí el mundo<br /><em>animal.</em></>}
      asideDescription="Creá tu cuenta para explorar el catálogo y conocer cada especie en detalle."
      formEyebrow="Tu cuaderno de campo"
      formTitle="Crear una cuenta"
      formDescription="Registrate para abrir tu espacio de exploración."
    >
      <form className="auth-form" onSubmit={handleSubmit} aria-busy={cargando}>
        <label className="field" htmlFor="registro-email">
          <span>Correo electrónico</span>
          <input id="registro-email" name="email" type="email" autoComplete="email" placeholder="hola@ejemplo.com" required />
        </label>
        <label className="field" htmlFor="registro-password">
          <span>Contraseña</span>
          <input id="registro-password" name="password" type="password" autoComplete="new-password" minLength={6} aria-describedby="registro-password-ayuda" placeholder="Mínimo 6 caracteres" required />
          <small id="registro-password-ayuda">Mínimo 6 caracteres.</small>
        </label>
        {error && <p className="form-message error-message" role="alert">{error}</p>}
        <button className="button-primary" type="submit" disabled={cargando}>
          <span>{cargando ? 'Creando cuenta...' : 'Crear cuenta'}</span>
          <span className="button-arrow" aria-hidden="true">→</span>
        </button>
        <p className="form-footer">¿Ya tenés una cuenta? <Link to="/login">Ingresá</Link></p>
      </form>
    </AuthLayout>
  )
}

export default Registro
