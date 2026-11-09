export function filtrarAnimales(animales, { nombre }) {
    if (nombre === undefined || nombre.trim() === '') {
        return animales;
    }

    const busqueda = nombre.trim().toLowerCase();
    return animales.filter((animal) => 
        animal.nombreComun.toLowerCase().includes(busqueda)
    );
}