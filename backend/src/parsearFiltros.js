export class FiltroInvalidoError extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = 'FiltroInvalidoError';
    }
}

export function parsearFiltros(query) {
    const filtros = {};
    const { nombre, clase } = query;

    if (nombre !== undefined) {
        if (typeof nombre !== 'string') {
            throw new FiltroInvalidoError('El filtro "nombre" debe ser una cadena de texto.');
        }
        const nombreLimpio = nombre.trim();
        if (nombreLimpio !== '') {
            filtros.nombre = nombreLimpio;
        }
    }

    if (clase !== undefined) {
        if (typeof clase !== 'string') {
            throw new FiltroInvalidoError('El filtro "clase" debe ser una cadena de texto.');
        }
        const claseLimpia = clase.trim();
        if (claseLimpia !== '') {
            filtros.clase = claseLimpia;
        }
    }

    return filtros;
}
