import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('Falta configurar JWT_SECRET en el entorno.');
}

export function requerirAuth(req, res, next) {
    const [esquema, token] = (req.headers.authorization ?? '').split(' ');

    if (esquema !== 'Bearer' || !token) {
        return res.status(401).json({ error: 'Token de autenticación faltante o inválido.' });
    }

    let payload;
    try {
        payload = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token de autenticación expirado.' });
        }
        return res.status(401).json({ error: 'Token de autenticación inválido.' });
    }

    req.usuarioId = Number(payload.sub);
    next();
}
