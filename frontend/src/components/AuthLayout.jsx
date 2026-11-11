import './AuthLayout.css'

function AuthLayout({
  titleId,
  asideTitle,
  asideDescription,
  formEyebrow,
  formTitle,
  formDescription,
  children,
}) {
  return (
    <section className="auth-layout" aria-labelledby={titleId}>
      <aside className="auth-aside">
        <span className="eyebrow eyebrow-light">
          <span className="eyebrow-dot" aria-hidden="true" />
          Faunario
        </span>
        <h1 id={titleId}>{asideTitle}</h1>
        <p>{asideDescription}</p>
        <span className="aside-foot">
          <span aria-hidden="true" />
          FAUNA · NATURALEZA · VIDA
        </span>
      </aside>

      <div className="auth-card">
        <p className="eyebrow">{formEyebrow}</p>
        <h2>{formTitle}</h2>
        <p className="auth-description">{formDescription}</p>
        {children}
      </div>
    </section>
  )
}

export default AuthLayout
