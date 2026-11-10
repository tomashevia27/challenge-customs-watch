import { readFile, writeFile } from 'node:fs/promises';

const archivoUsuarios = new URL('../database/users.json', import.meta.url);

export async function obtenerUsuarios() {
    try {
        const contenido = await readFile(archivoUsuarios, 'utf-8');
        return JSON.parse(contenido);
    } catch (error) {
        if (error.code === 'ENOENT') return [];
        throw error;
    }
}

export async function guardarUsuarios(usuarios) {
    const contenido = JSON.stringify(usuarios, null, 2);
    await writeFile(archivoUsuarios, contenido, 'utf-8');
}