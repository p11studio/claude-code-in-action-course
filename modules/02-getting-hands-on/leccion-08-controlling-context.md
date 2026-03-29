# Lección 8 — Controlling context

**Sección:** Getting hands on

## 1. Interrumpir con `Escape`
- Presiona `Esc` para detener a Claude a mitad de respuesta
- **Ejemplo del video:** Claude recibe el prompt "escribe tests para el archivo auth.ts" y empieza a planear tests para varias funciones a la vez → presionas `Esc` y lo redireccionas a trabajar una función a la vez

## 2. `Escape` + Memories (`#`)
- Combinación para corregir errores repetitivos entre conversaciones
- **Ejemplo del video:** Claude intenta leer un archivo de configuración de tests que no existe — un error ya visto antes en el proyecto. Flujo:
  1. `Esc` — detiene el error antes de que avance
  2. `#` — agrega un memory con el nombre correcto del archivo de config
  3. Claude ya no repite ese error en conversaciones futuras

## 3. Rewind con `Escape` doble
- `Esc` x2 muestra todos los mensajes enviados para saltar a uno anterior
- **Ejemplo del video:** Claude termina tests para `createSession`, pero acumuló mucho back-and-forth debuggeando un paquete faltante. En vez de cargar ese contexto irrelevante para el siguiente test, haces rewind al mensaje anterior y lo cambias a "escribe tests para `getSession`" — Claude ya sabe qué es `auth.ts` pero sin el ruido del debug

## 4. Comandos de contexto

| Comando | Cuándo usarlo |
|---------|--------------|
| `/compact` | Claude aprendió mucho del proyecto y vas a la siguiente tarea relacionada — resume la conversación preservando el conocimiento acumulado |
| `/clear` | Cambias a una tarea completamente diferente — limpia todo para empezar de cero |

## 5. Cuándo usar estas técnicas
- Al cambiar entre tareas
- En conversaciones largas con contexto acumulado irrelevante
- Cuando Claude repite el mismo error
- Proyectos complejos que requieren foco en componentes específicos
