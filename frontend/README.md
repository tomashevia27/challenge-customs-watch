# Frontend del buscador de animales

Proyecto React con Vite. Necesita Node.js 20.19+ o 22.12+.

```bash
cd frontend
npm ci
npm run dev
```

Abrí la URL que muestra Vite (normalmente `http://localhost:5173`). El backend se inicia aparte desde `backend/` con `npm start`. Durante el desarrollo, Vite reenvía las solicitudes que empiezan por `/api` al backend en `http://localhost:3000`.

La ruta `/registro` crea una cuenta; `/login` inicia sesión; `/animales` está protegida y permite combinar filtros. El token vive en el estado de React y se pierde al recargar la página. Los errores de la API y de red se muestran en pantalla.

Para comprobar el frontend:

```bash
npm run lint
npm run build
```
