export class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function solicitar(url, opciones) {
  const respuesta = await fetch(url, opciones)
  const datos = await respuesta.json().catch(() => null)

  if (!respuesta.ok) {
    throw new ApiError(respuesta.status, datos?.error ?? 'No se pudo completar la solicitud.')
  }

  if (datos === null) {
    throw new Error('La respuesta del servidor no tiene el formato esperado.')
  }

  return datos
}

export function registrarUsuario(email, password) {
  return solicitar('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
}

export function iniciarSesion(email, password) {
  return solicitar('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
}

export function obtenerAnimales(consulta, token, signal) {
  const query = consulta ? `?${consulta}` : ''

  return solicitar(`/api/animales${query}`, {
    headers: { Authorization: `Bearer ${token}` },
    signal,
  })
}
