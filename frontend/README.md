# Frontend del buscador de animales

Proyecto React con Vite. Necesita Node.js 20.19+ o 22.12+.

```bash
cd frontend
npm ci
npm run dev
```

Abrí la URL que muestra Vite (normalmente `http://localhost:5173`). El backend se inicia aparte desde `backend/` con `npm start`. Durante el desarrollo, Vite reenvía las solicitudes que empiezan por `/api` al backend en `http://localhost:3000`.

Las rutas `/registro`, `/login` y `/animales` ya muestran la estructura visual. Sus formularios aún no envían solicitudes; eso se implementará en los siguientes pasos.
