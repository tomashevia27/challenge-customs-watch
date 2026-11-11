# Buscador de animales

Aplicación para registrar usuarios, iniciar sesión y consultar animales con filtros. El backend usa Node.js, Express y archivos JSON para persistir los datos.

## Ejecutar el backend

Se desarrolló con Node.js 24.15.0 y npm 11.12.1.

1. Entrá en `backend/` e instalá las dependencias:

   ```bash
   cd backend
   npm ci
   ```

2. Creá el archivo de configuración local:

   ```bash
   cp .env.example .env
   ```

3. Generá una clave aleatoria con este comando y copiá el resultado después de `JWT_SECRET=` en `.env`:

   ```bash
   node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
   ```

   La clave se usa para firmar y verificar los tokens. No compartas ni subas `.env` al repositorio. La aplicación no inicia si `JWT_SECRET` está vacía.

4. Iniciá el servidor:

   ```bash
   npm start
   ```

   La API queda disponible en `http://localhost:3000`.

## API

| Método y ruta | Descripción |
| --- | --- |
| `POST /api/auth/signup` | Registra un usuario con `email` y `password`. |
| `POST /api/auth/login` | Recibe `email` y `password` y devuelve un `token`. |
| `GET /api/animales` | Lista animales y admite filtros; requiere el encabezado `Authorization: Bearer <token>`. |

Los filtros disponibles son `nombre`, `clase`, `dieta`, `continente`, `pesoMin`, `pesoMax` y `enPeligro`.

El dataset está en `backend/database/animals.json`. El servidor crea y actualiza `backend/database/users.json` cuando se registran usuarios; ese archivo queda fuera de Git.

## Ejecutar el frontend

Con el backend en marcha, abrí otra terminal:

```bash
cd frontend
npm ci
npm run dev
```

Abrí la dirección que muestra Vite, normalmente `http://localhost:5173`. En desarrollo, Vite envía las solicitudes `/api` al backend. Creá una cuenta en `/registro`, ingresá en `/login`, buscá animales en `/animales` y usá **Salir** para cerrar la sesión.

El token se guarda solo en el estado de React. Al recargar la página se cierra la sesión y hay que ingresar otra vez. El cierre de sesión elimina el token del navegador, pero no revoca un JWT ya emitido; el backend lo acepta hasta su vencimiento.

## Comprobaciones

```bash
cd frontend
npm run lint
npm run build
```

La compilación genera `frontend/dist/`. Para comprobar las dependencias desde una instalación limpia, ejecutá `npm ci` tanto en `backend/` como en `frontend/`.
