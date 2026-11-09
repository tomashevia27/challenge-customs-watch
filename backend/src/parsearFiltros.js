export class FiltroInvalidoError extends Error {
    constructor(mensaje, filtro) {
        super(mensaje);
        this.name = 'FiltroInvalidoError';
        this.filtro = filtro;
    }
}

const REGEX_DECIMAL_NO_NEGATIVO = /^\d+(?:\.\d+)?$/;

function leerString(valor, nombreFiltro, esperado) {
    if (valor === undefined) {
        return undefined;
    }

    if (Array.isArray(valor)) {
        throw new FiltroInvalidoError(`El filtro "${nombreFiltro}" no puede repetirse.`, nombreFiltro);
    }

    if (typeof valor !== 'string') {
        throw new FiltroInvalidoError(`El filtro "${nombreFiltro}" debe ser ${esperado}.`, nombreFiltro);
    }

    const valorLimpio = valor.trim();
    return valorLimpio === '' ? undefined : valorLimpio;
}

function parsearTexto(valor, nombreFiltro) {
    return leerString(valor, nombreFiltro, 'una cadena de texto');
}

function parsearPeso(valor, nombreFiltro) {
    const esperado = 'un número decimal no negativo';
    const valorLimpio = leerString(valor, nombreFiltro, esperado);
    if (valorLimpio === undefined) {
        return undefined;
    }

    const peso = Number(valorLimpio);
    if (!REGEX_DECIMAL_NO_NEGATIVO.test(valorLimpio) || !Number.isFinite(peso)) {
        throw new FiltroInvalidoError(`El filtro "${nombreFiltro}" debe ser ${esperado}.`, nombreFiltro);
    }

    return peso;
}

function parsearBooleano(valor, nombreFiltro) {
    const esperado = 'un valor booleano ("true" o "false")';
    const valorLimpio = leerString(valor, nombreFiltro, esperado)?.toLowerCase();
    if (valorLimpio === undefined) {
        return undefined;
    }

    if (valorLimpio !== 'true' && valorLimpio !== 'false') {
        throw new FiltroInvalidoError(`El filtro "${nombreFiltro}" debe ser ${esperado}.`, nombreFiltro);
    }

    return valorLimpio === 'true';
}

const PARSERS = {
    nombre: parsearTexto,
    clase: parsearTexto,
    dieta: parsearTexto,
    continente: parsearTexto,
    pesoMin: parsearPeso,
    pesoMax: parsearPeso,
    enPeligro: parsearBooleano
};

export function parsearFiltros(query) {
    const desconocidos = Object.keys(query).filter((filtro) => !Object.hasOwn(PARSERS, filtro));
    if (desconocidos.length > 0) {
        throw new FiltroInvalidoError(
            `Filtros no soportados: ${desconocidos.join(', ')}. Permitidos: ${Object.keys(PARSERS).join(', ')}.`
        );
    }

    const filtros = {};
    for (const [filtro, parsear] of Object.entries(PARSERS)) {
        const valor = parsear(query[filtro], filtro);
        if (valor !== undefined) {
            filtros[filtro] = valor;
        }
    }

    if (filtros.pesoMin !== undefined && filtros.pesoMax !== undefined && filtros.pesoMin > filtros.pesoMax) {
        throw new FiltroInvalidoError('El filtro "pesoMin" no puede ser mayor que "pesoMax".', 'pesoMin');
    }
    return filtros;
}
