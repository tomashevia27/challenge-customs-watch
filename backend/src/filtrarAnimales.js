const predicados = {
    nombre: (animal, valorFiltro) => animal.nombreComun.toLowerCase().includes(valorFiltro),
    clase: (animal, valorFiltro) => animal.clase.toLowerCase() === valorFiltro,
    dieta: (animal, valorFiltro) => animal.dieta.toLowerCase() === valorFiltro,
    continente: (animal, valorFiltro) => animal.continente.toLowerCase() === valorFiltro,
    enPeligro: (animal, valorFiltro) => animal.enPeligroExtincion === valorFiltro,
    pesoMin: (animal, valorFiltro) => animal.pesoPromedioKg >= valorFiltro,
    pesoMax: (animal, valorFiltro) => animal.pesoPromedioKg <= valorFiltro,
};

export function filtrarAnimales(animales, filtros = {}) {
    const activos = Object.entries(filtros)
        .filter(([, valor]) => valor !== undefined)
        .map(([clave, valor]) => [
            predicados[clave],
            typeof valor === 'string' ? valor.toString().toLowerCase() : valor
        ]);

    if (activos.length === 0) return animales;

    return animales.filter((animal) =>
        activos.every(([predicado, valor]) => predicado(animal, valor))
    );
}