import express from 'express';
import { readFile } from 'node:fs/promises';
import { filtrarAnimales } from './filtrarAnimales.js';
import { parsearFiltros, FiltroInvalidoError } from './parsearFiltros.js';

const app = express();
const PORT = 3000;
const archivoAnimales = new URL('../database/animals.json', import.meta.url);

const contenidoArchivo = await readFile(archivoAnimales, 'utf-8');
const animales = JSON.parse(contenidoArchivo);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/animales', (req, res) => {
    try {
        const filtros = parsearFiltros(req.query);
        const resultados = filtrarAnimales(animales, filtros);
        res.json(resultados);
    } catch (error) {
        if (error instanceof FiltroInvalidoError) {
            return res.status(400).json({ error: error.message });
        }

        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en http://localhost:${PORT}`);
});
