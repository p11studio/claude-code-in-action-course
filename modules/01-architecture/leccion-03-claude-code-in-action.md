# Lección 3: Claude Code in Action

## Ideas clave

El video muestra 4 demostraciones de lo que Claude Code puede hacer, usando herramientas de forma inteligente.

---

## Demo 1: Optimizar una librería real (chalk)

Claude recibe la tarea de encontrar y optimizar problemas de rendimiento en **chalk** (el paquete más descargado del ecosistema JS con 429M descargas/semana). Claude:

- Crea una lista de tareas para rastrear su progreso
- Ejecuta benchmarks
- Escribe un archivo de profiling para analizar el caso más lento
- Implementa mejoras

**Resultado: 3.9x más throughput en una operación clave.**

---

## Demo 2: Análisis de datos en Jupyter Notebook

Claude recibe un CSV con datos de usuarios de una plataforma de streaming y debe analizar causas de abandono (*churn*).

Lo clave: Claude no solo *escribe* código en el notebook, sino que también lo *ejecuta*, ve los resultados y ajusta cada celda siguiente según lo que observa — un loop de observación e iteración.

---

## Demo 3: Mejorar una UI con control de browser

Claude mejora el estilo de una app usando herramientas del **Playwright MCP server** para controlar un navegador real. Puede:

- Abrir la app en el browser
- Tomar screenshots
- Ver cómo se ve el resultado
- Editar el CSS e iterar

Todo de forma autónoma, sin intervención manual.

---

## Demo 4: Integración con GitHub (Code Review automático)

Claude Code corre dentro de un **GitHub Action** y revisa Pull Requests automáticamente.

**Ejemplo real:** detecta que añadir el email de usuarios a una función Lambda termina exponiendo **PII (datos personales)** a un partner externo — un error que sería imposible de notar sin entender toda la infraestructura definida en Terraform.

---

## Idea central

Claude Code no es solo un asistente de escritura de código. Su poder está en **combinar herramientas inteligentemente**, y puedes extenderlo con nuevas herramientas (MCP servers) para adaptarlo a cualquier flujo de trabajo.

> "Think of Claude Code as a flexible assistant that can be customized, grow, and change over time to meet the needs of your team."
