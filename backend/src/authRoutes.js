import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { obtenerUsuarios, guardarUsuarios } from './usuarios.js';

const authRouter = Router();
const EMAIL_REGEX = /^[^\s@.]+(?:\.[^\s@.]+)*@[^\s@.]+(?:\.[^\s@.]+)+$/;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('Falta configurar JWT_SECRET en el entorno.');
}

authRouter.post('/signup', async (req, res) => {
    const { email, password } = req.body ?? {};

    if (typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
        return res.status(400).json({ error: 'Ingresá un email válido.' });
    }
    if (typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres.' });
    }
    if (bcrypt.truncates(password)) {
        return res.status(400).json({ error: 'La contraseña es demasiado larga.' });
    }

    const emailNormalizado = email.trim().toLowerCase();

    try {
        const usuarios = await obtenerUsuarios();
        if (usuarios.some((usuario) => usuario.email === emailNormalizado)) {
            return res.status(409).json({ error: 'El email ya está registrado.' });
        }

        const id = usuarios.reduce((maximo, usuario) => Math.max(maximo, usuario.id), 0) + 1;
        const passwordHash = await bcrypt.hash(password, 10);
        usuarios.push({ id, email: emailNormalizado, passwordHash });
        await guardarUsuarios(usuarios);

        return res.status(201).json({ id, email: emailNormalizado });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body ?? {};
    if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(401).json({ error: 'Email o contraseña incorrectos.' });
    }

    const emailNormalizado = email.trim().toLowerCase();

    try {
        const usuarios = await obtenerUsuarios();
        const usuario = usuarios.find((usuario) => usuario.email === emailNormalizado);
        if (!usuario || !(await bcrypt.compare(password, usuario.passwordHash))) {
            return res.status(401).json({ error: 'Email o contraseña incorrectos.' });
        }

        const token = jwt.sign({ sub: String(usuario.id) }, JWT_SECRET, {
            algorithm: 'HS256',
            expiresIn: '1h',
        });
        return res.status(200).json({ token, id: usuario.id, email: usuario.email });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default authRouter;
