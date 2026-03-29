# Lección 7 — Making changes

**Sección:** Getting hands on

## 1. Screenshots para comunicación precisa
- Pegar screenshots con `Ctrl+V` (no `Cmd+V`) en Claude Code
- Permite señalar exactamente qué parte de la UI quieres modificar

## 2. Planning Mode
- Se activa con `Shift + Tab` dos veces (o una si ya tienes auto-accept activo)
- Claude explora el codebase antes de actuar
- Genera un plan detallado y **espera tu aprobación** antes de proceder
- Ideal para: tareas multi-archivo, implementaciones complejas, cambios que afectan varios componentes

## 3. Thinking Modes
Niveles progresivos de razonamiento (más tokens = análisis más profundo):

| Modo | Nivel |
|------|-------|
| `think` | Básico |
| `think more` | Extendido |
| `think a lot` | Comprensivo |
| `think longer` | Tiempo extendido |
| `ultrathink` | Máximo |

## 4. Cuándo usar cada uno

| Planning Mode | Thinking Mode |
|---------------|---------------|
| Entender el codebase ampliamente | Lógica compleja |
| Cambios en múltiples archivos | Debugging difícil |
| Implementaciones por pasos | Desafíos algorítmicos |

> Se pueden combinar. Ambos consumen tokens adicionales.
