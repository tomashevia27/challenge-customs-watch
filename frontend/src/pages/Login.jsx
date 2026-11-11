import { Link } from 'react-router'

function Login() {
  return (
    <section className="auth-page" aria-labelledby="login-titulo">
      <div className="auth-intro">
        <p className="eyebrow">Acceso al buscador</p>
        <h1 id="login-titulo">Ingresar</h1>
        <p>Entrá con tu cuenta para consultar el catálogo de animales.</p>
      </div>

      <form className="form-panel auth-form" onSubmit={(event) => event.preventDefault()}>
        <div className="field">
          <label htmlFor="login-email">Correo electrónico</label>
          <input id="login-email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="field">
          <label htmlFor="login-password">Contraseña</label>
          <input id="login-password" name="password" type="password" autoComplete="current-password" required />
        </div>
        <button className="button-primary" type="submit" disabled>Ingresar</button>
        <p className="form-footer">¿Todavía no tenés cuenta? <Link to="/registro">Registrate</Link></p>
      </form>
    </section>
  )
}

export default Login
