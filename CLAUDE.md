# Claude Code in Action — Anthropic Course

## Project Purpose

This repo is a hands-on workspace for following the [Claude Code in Action](https://anthropic.skilljar.com/claude-code-in-action) course by Anthropic.

## Secciones del curso

| Sección | Carpeta | Lecciones |
|---------|---------|-----------|
| What is Claude Code? | `modules/01-what-is-claude-code/` | Introduction, What is a coding assistant?, Claude Code in action |
| Getting hands on | `modules/02-getting-hands-on/` | Claude Code setup, Project setup, Adding context, Making changes, Controlling context, Custom commands, MCP servers, Github integration |
| Hooks and the SDK | `modules/03-hooks-and-sdk/` | Introducing hooks, Defining hooks, Implementing a hook, Gotchas, Useful hooks, Claude Code SDK |

## Lecciones completadas

| Lección | Sección | Tema | Concepto clave | Notas |
|---------|---------|------|----------------|-------|
| 1 | What is Claude Code? | Introduction | Qué es Claude Code y para qué sirve | — |
| 2 | What is Claude Code? | What is a coding assistant? | Arquitectura: LLM + herramientas + contexto | — |
| 3 | What is Claude Code? | Claude Code in action | Claude combina herramientas para tareas complejas; extensible con MCP servers | `modules/01-what-is-claude-code/leccion-03-claude-code-in-action.md` |
| 4 | Getting hands on | Claude Code setup | Instalación via Homebrew o curl — omitida por ser setup básico | — |
| 5 | Getting hands on | Project setup | App uigen en `projects/uigen/`; API key en `.env` (nunca a git) | `modules/02-getting-hands-on/leccion-05-project-setup.md` |
| 6 | Getting hands on | Adding context | `/init` genera CLAUDE.md; 3 niveles de CLAUDE.md; `@archivo` para contexto específico; `#` para memory mode | `modules/02-getting-hands-on/leccion-06-adding-context.md` |
| 7 | Getting hands on | Making changes | Screenshots con `Ctrl+V`; Planning Mode (`Shift+Tab` x2); Thinking Modes (`think` → `ultrathink`) | `modules/02-getting-hands-on/leccion-07-making-changes.md` |
| 8 | Getting hands on | Controlling context | `Esc` interrumpe; `Esc`+`#` corrige errores repetitivos; `Esc`x2 rewind; `/compact` y `/clear` | `modules/02-getting-hands-on/leccion-08-controlling-context.md` |

## Proyecto de práctica

- **uigen**: app generadora de UI components — `projects/uigen/`
- Requiere `npm run setup` y `npm run dev` para correr
- API key de Anthropic en `projects/uigen/.env`

## Notes

- Al terminar cada lección, se actualiza la tabla de arriba con el concepto clave
- Los archivos `.md` en cada carpeta de módulo contienen el resumen detallado de cada lección
