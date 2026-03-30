# Lección 10 — MCP servers with Claude Code

**Sección:** Getting hands on

## ¿Qué son los MCP servers?
Permiten agregar nuevas herramientas y capacidades a Claude Code. Pueden correr remotamente o localmente en tu máquina.

## Instalar un MCP server

Desde la terminal (**no dentro de Claude Code**):
```bash
claude mcp add playwright npx @playwright/mcp@latest
```
- `playwright` = nombre que le das al server
- Lo que sigue = comando que lo inicia localmente

## Evitar popups de permisos
Por defecto Claude pide permiso cada vez que usa el MCP. Para desactivarlo, edita `.claude/settings.local.json`:
```json
{
  "allow": ["mcp__playwright"]
}
```
> Nota: son **dos underscores** (`mcp__playwright`)

Después de reiniciar Claude Code ya no pedirá permiso.

## Ejemplo práctico con Playwright

El video muestra un caso de uso con el proyecto `uigen` donde Claude Code mejora el **prompt del sistema** que vive en `src/lib/prompts/generation.tsx` — el archivo que controla cómo se generan todos los componentes de la app.

**El usuario le pide a Claude Code:**
```
Your goal is to improve the component generation prompt at
@src/lib/prompts/generation.tsx. Here's how:

1. Open a browser and navigate to localhost:3000
2. Request a basic component to be generated
3. Review the generated component and its source code
4. Identify areas for improvement
5. Update the prompt to produce better components going forward.

For now, only evaluate visual styling aspects. We don't want
components generated that look like typical tailwindcss components —
we want something more original.
```

**Lo que hace Claude Code:**
1. Usa Playwright para abrir el browser y navegar a `localhost:3000`
2. Genera un componente en la app y lo evalúa visualmente
3. Detecta problemas de styling genérico:
   - Gradientes purple-blue muy comunes
   - Rounded corners típicos de Tailwind (`rounded-2xl`)
   - Sombras básicas (`shadow-xl`)
   - Hover effects sobreusados (scale transform)
   - Botones genéricos con gradiente
   - Spacing por defecto (`p-8`, `mt-4`, `space-y-4`)
4. **Edita directamente `generation.tsx`** para que el prompt produzca componentes más originales
5. Genera un nuevo componente para verificar la mejora

> **Importante:** Claude no mejora el prompt que el usuario escribe en la app — mejora el prompt del sistema en el código fuente (`generation.tsx`) que controla cómo se generan todos los componentes.

## Takeaway
Los MCP servers abren la puerta a casos de uso muy interesantes. Busca servidores MCP que se adapten a tu stack y proyecto específico.
