# Lección 5: Project Setup

## Proyecto de práctica: uigen

El curso usa una app llamada **uigen** — un generador de componentes UI con chat. Es la misma app vista en la demo de la lección 3. Se encuentra en `projects/uigen/`.

Stack: Next.js, SQLite (Prisma), Tailwind, TypeScript.

---

## Setup realizado

```bash
# Desde projects/uigen/
npm run setup    # instala dependencias + genera base de datos SQLite
npm run dev      # levanta la app en http://localhost:3000
```

---

## API Key y archivo `.env`

El proyecto usa la Anthropic API para generar componentes reales. Sin key, genera código estático de prueba (suficiente para practicar con Claude Code).

### Cómo funciona el `.env`
- Archivo de texto plano en la raíz del proyecto
- Guarda variables de entorno sensibles (como la API key)
- **Nunca se sube a git** — está en `.gitignore`
- La app lo lee automáticamente al correr `npm run dev`

```
# projects/uigen/.env
ANTHROPIC_API_KEY="sk-ant-..."
```

### Obtener la API key
Ir a **console.anthropic.com → API Keys → Create Key**. $5 de créditos es más que suficiente para todo el curso.

### Buenas prácticas de seguridad
- Nunca compartir la key en el chat ni en ningún lugar público
- Siempre escribirla directamente en el `.env` desde el editor
- Si se compromete: crear una nueva key primero, actualizar el `.env`, luego borrar la anterior (para no quedar sin acceso)
- Los nombres de las keys son solo etiquetas — pueden repetirse sin conflicto

---

## Estructura del proyecto en el repo

```
projects/
  uigen/          ← app de práctica del curso
    .env          ← API key (NO en git)
    prisma/       ← schema y migraciones de SQLite
    src/          ← código fuente Next.js
```
