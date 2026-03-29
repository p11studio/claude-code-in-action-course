# Lección 9 — Custom commands

**Sección:** Getting hands on

## ¿Qué son los custom commands?
Comandos personalizados que puedes agregar a Claude Code además de los built-in (los que aparecen al escribir `/`). Son útiles para automatizar tareas repetitivas.

## Cómo crear un custom command

1. Dentro de tu proyecto, entra a la carpeta `.claude/`
2. Crea un subdirectorio llamado `commands/`
3. Crea un archivo `.md` con el nombre del comando (ej. `audit.md`)
4. El nombre del archivo = el nombre del comando
5. **Reinicia Claude Code** para que lo detecte
6. Úsalo con `/audit`

## Ejemplo: comando `/audit`

Contenido de `.claude/commands/audit.md`:
```
Your goal is to update any vulnerable dependencies.

Do the following:
1. Run `npm audit` to find vulnerable installed packages in this project
2. Run `npm audit fix` to apply updates
3. Run tests and verify the updates didn't break anything
```

## Argumentos con `$ARGUMENTS`
Los comandos pueden recibir parámetros usando el placeholder `$ARGUMENTS` en el texto del comando.

**Ejemplo: comando `/write_tests`**

Contenido de `.claude/commands/write_tests.md`:
```
Write comprehensive tests for: $ARGUMENTS

Testing conventions:
* Use Vitest with React Testing Library
* Place test files in a __tests__ directory in the same folder as the source file
* Name test files as [filename].test.ts(x)
* Use @/ prefix for imports

Coverage:
* Test happy paths
* Test edge cases
* Test error states
```

Se ejecuta así:
```
/write_tests the use-auth.ts file in the hooks directory
```

> **Nota:** Si ejecutas el comando sin argumento, Claude no lo corre a ciegas — detecta que `$ARGUMENTS` está vacío y pregunta "Which file would you like to write tests for?" mostrando una lista de archivos del proyecto. Comportamiento inteligente por defecto, no hay que manejarlo manualmente.
