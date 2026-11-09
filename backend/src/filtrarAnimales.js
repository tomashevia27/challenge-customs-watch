// se asume que los filtros llegan parseados y validados
export function filtrarAnimales(animales, { nombre, clase, dieta, continente, pesoMin, pesoMax, enPeligro }) {
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

    if (dieta !== undefined) {
        resultados = resultados.filter((animal) =>
            animal.dieta.toLowerCase() === dieta.toLowerCase()
        );
    }

    if (continente !== undefined) {
        resultados = resultados.filter((animal) =>
            animal.continente.toLowerCase() === continente.toLowerCase()
        );
    }

    if (pesoMin !== undefined) {
        resultados = resultados.filter((animal) =>
            animal.pesoPromedioKg >= pesoMin
        );
    }

    if (pesoMax !== undefined) {
        resultados = resultados.filter((animal) =>
            animal.pesoPromedioKg <= pesoMax
        );
    }

    if (enPeligro !== undefined) {
        resultados = resultados.filter((animal) =>
            animal.enPeligroExtincion === enPeligro
        );
    }

    return resultados;
}
