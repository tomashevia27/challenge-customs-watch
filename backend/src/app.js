import express from 'express';
import { readFile } from 'node:fs/promises';
import { filtrarAnimales } from './filtrarAnimales.js';
import { parsearFiltros, FiltroInvalidoError } from './parsearFiltros.js';

const app = express();
const archivoAnimales = new URL('../database/animals.json', import.meta.url);
const contenidoArchivo = await readFile(archivoAnimales, 'utf-8');
const animales = JSON.parse(contenidoArchivo);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Ruta raíz de la aplicacion. Para obtener la lista de animales, utiliza la ruta /api/animales con los filtros deseados.');
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
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default app;
