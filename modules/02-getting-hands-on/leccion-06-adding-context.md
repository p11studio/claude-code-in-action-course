# Lección 6: Adding Context

## Idea central

Demasiado contexto irrelevante **reduce** la efectividad de Claude. El objetivo es darle exactamente la información necesaria — ni más, ni menos.

---

## El comando `/init`

Al arrancar Claude Code en un proyecto por primera vez, corre:

```
/init
```

Claude analiza todo el codebase y entiende:
- El propósito y arquitectura del proyecto
- Comandos importantes y archivos críticos
- Patrones de código y estructura

Al terminar, genera un archivo `CLAUDE.md` con todo lo encontrado. Cuando pide permiso para crearlo:
- `Enter` → aprueba operación por operación
- `Shift + Tab` → permite a Claude escribir archivos libremente durante la sesión

---

## El archivo CLAUDE.md

Tiene dos propósitos:

1. **Guía a Claude** por el codebase — arquitectura, comandos, archivos clave
2. **Instrucciones personalizadas** — reglas de comportamiento específicas del proyecto

Sus contenidos se incluyen en **cada request** que le haces a Claude. Es como un system prompt persistente para tu proyecto.

### Los 3 tipos de CLAUDE.md

| Archivo | Ubicación | Se sube a git | Para quién |
|---------|-----------|--------------|------------|
| `CLAUDE.md` | Raíz del proyecto | Sí | Todo el equipo |
| `CLAUDE.local.md` | Raíz del proyecto | No | Solo tú |
| `~/.claude/CLAUDE.md` | Tu máquina | No | Todos tus proyectos |

---

## Agregar instrucciones personalizadas

Usa el símbolo `#` dentro de Claude Code para entrar en **memory mode** y editar el `CLAUDE.md` de forma inteligente:

```
# Don't write comments so often
```

Claude fusiona esa instrucción en el archivo automáticamente — no sobreescribe, sino que la integra de forma coherente.

---

## Mencionar archivos con `@`

Para apuntar a Claude hacia archivos específicos usa `@` seguido del path:

```
How does the auth system work? @src/lib/auth.ts
```

El archivo se incluye automáticamente en el request. Claude muestra una lista de archivos que coincidan para que elijas.

---

## Mencionar archivos dentro del CLAUDE.md

Si un archivo es relevante para muchos aspectos del proyecto, menciónalo directamente en el `CLAUDE.md`:

```
The database schema is defined in @prisma/schema.prisma.
Reference it anytime you need to understand the data structure.
```

Así ese archivo se incluye en **todos** los requests sin tener que mencionarlo cada vez.

**Ejemplo práctico:** `schema.prisma` define todas las tablas de la base de datos — al incluirlo en `CLAUDE.md`, Claude puede responder preguntas como "¿qué atributos tiene el usuario?" sin necesidad de buscarlo primero.
