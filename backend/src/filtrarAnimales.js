export function filtrarAnimales(animales, { nombre, clase }) {
    let resultados = animales;

    if (typeof nombre === 'string' && nombre.trim() !== '') {
        const busqueda = nombre.trim().toLowerCase();
        resultados = resultados.filter((animal) =>
            animal.nombreComun.toLowerCase().includes(busqueda)
        );
    }

    if (typeof clase === 'string' && clase.trim() !== '') {
        const busqueda = clase.trim().toLowerCase();
        resultados = resultados.filter((animal) =>
            animal.clase.toLowerCase() === busqueda
        );
    }

    return resultados;
}
