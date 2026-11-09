// se asume que los filtros llegan parseados y validados
export function filtrarAnimales(animales, { nombre, clase }) {
    let resultados = animales;

    if (nombre !== undefined) {
        const busqueda = nombre.toLowerCase();
        resultados = resultados.filter((animal) =>
            animal.nombreComun.toLowerCase().includes(busqueda)
        );
    }

    if (clase !== undefined) {
        resultados = resultados.filter((animal) =>
            animal.clase.toLowerCase() === clase.toLowerCase()
        );
    }

    return resultados;
}
