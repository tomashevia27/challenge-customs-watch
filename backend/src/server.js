import express from 'express';
import { readFile } from 'node:fs/promises';
import { filtrarAnimales } from './filtrarAnimales.js';

const app = express();
const PORT = 3000;
const archivoAnimales = new URL('../database/animals.json', import.meta.url);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/animales', async (req, res) => {
    try {
        const contenidoArchivo = await readFile(archivoAnimales, 'utf-8');
        const animales = JSON.parse(contenidoArchivo);
        const resultados = filtrarAnimales(animales, req.query);
        res.json(resultados);
    } catch (error) {
        console.error('Error al leer los animales:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en http://localhost:${PORT}`);
});