import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ApiError, registrarUsuario } from '../api.js'

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
    <section className="auth-page" aria-labelledby="registro-titulo">
      <div className="auth-intro">
        <p className="eyebrow">Acceso al buscador</p>
        <h1 id="registro-titulo">Crear una cuenta</h1>
        <p>Registrate para explorar la colección de animales y buscar por sus características.</p>
      </div>

      <form className="form-panel auth-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="registro-email">Correo electrónico</label>
          <input id="registro-email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="field">
          <label htmlFor="registro-password">Contraseña</label>
          <input id="registro-password" name="password" type="password" autoComplete="new-password" minLength={6} aria-describedby="registro-password-ayuda" required />
          <small id="registro-password-ayuda">Mínimo 6 caracteres.</small>
        </div>
        {error && <p className="form-message error-message" role="alert">{error}</p>}
        <button className="button-primary" type="submit" disabled={cargando}>
          {cargando ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>
        <p className="form-footer">¿Ya tenés una cuenta? <Link to="/login">Ingresá</Link></p>
      </form>
    </section>
  )
}

export default Registro
