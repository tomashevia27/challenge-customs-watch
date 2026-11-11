import { Link } from 'react-router'

function Registro() {
  return (
    <section className="auth-page" aria-labelledby="registro-titulo">
      <div className="auth-intro">
        <p className="eyebrow">Acceso al buscador</p>
        <h1 id="registro-titulo">Crear una cuenta</h1>
        <p>Registrate para explorar la colección de animales y buscar por sus características.</p>
      </div>

      <form className="form-panel auth-form" onSubmit={(event) => event.preventDefault()}>
        <div className="field">
          <label htmlFor="registro-email">Correo electrónico</label>
          <input id="registro-email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="field">
          <label htmlFor="registro-password">Contraseña</label>
          <input id="registro-password" name="password" type="password" autoComplete="new-password" minLength="6" required />
          <small>Mínimo 6 caracteres.</small>
        </div>
        <button className="button-primary" type="submit" disabled>Crear cuenta</button>
        <p className="form-footer">¿Ya tenés una cuenta? <Link to="/login">Ingresá</Link></p>
      </form>
    </section>
  )
}

export default Registro
