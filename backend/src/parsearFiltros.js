export class FiltroInvalidoError extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = 'FiltroInvalidoError';
    }
}

function parsearTexto(valor, nombreFiltro) {
    if (valor === undefined) {
        return undefined;
    }
    if (typeof valor !== 'string') {
        throw new FiltroInvalidoError(`El filtro "${nombreFiltro}" debe ser una cadena de texto.`);
    }

    const valorLimpio = valor.trim();
    return valorLimpio === '' ? undefined : valorLimpio;
}

function parsearPeso(valor, nombreFiltro) {
    if (valor === undefined) {
        return undefined;
    }
    if (typeof valor !== 'string') {
        throw new FiltroInvalidoError(`El filtro "${nombreFiltro}" debe ser un número no negativo.`);
    }

    const valorLimpio = valor.trim();
    if (valorLimpio === '') {
        return undefined;
    }

    const peso = Number(valorLimpio);
    if (!Number.isFinite(peso) || peso < 0) {
        throw new FiltroInvalidoError(`El filtro "${nombreFiltro}" debe ser un número no negativo.`);
    }
    return peso;
}

export function parsearFiltros(query) {
    const filtros = {};
    const { pesoMin, pesoMax, enPeligro } = query;

    for (const nombreFiltro of ['nombre', 'clase', 'dieta', 'continente']) {
        const valor = parsearTexto(query[nombreFiltro], nombreFiltro);
        if (valor !== undefined) {
            filtros[nombreFiltro] = valor;
        }
    }

    const pesoMinimo = parsearPeso(pesoMin, 'pesoMin');
    const pesoMaximo = parsearPeso(pesoMax, 'pesoMax');
    if (pesoMinimo !== undefined) {
        filtros.pesoMin = pesoMinimo;
    }
    if (pesoMaximo !== undefined) {
        filtros.pesoMax = pesoMaximo;
    }
    if (pesoMinimo !== undefined && pesoMaximo !== undefined && pesoMinimo > pesoMaximo) {
        throw new FiltroInvalidoError('El filtro "pesoMin" no puede ser mayor que "pesoMax".');
    }

    if (enPeligro !== undefined) {
        if (typeof enPeligro !== 'string') {
            throw new FiltroInvalidoError('El filtro "enPeligro" debe ser "true" o "false".');
        }
        const peligroLimpio = enPeligro.trim().toLowerCase();
        if (peligroLimpio !== '') {
            if (peligroLimpio !== 'true' && peligroLimpio !== 'false') {
                throw new FiltroInvalidoError('El filtro "enPeligro" debe ser "true" o "false".');
            }
            filtros.enPeligro = peligroLimpio === 'true';
        }
    }

    return filtros;
}
