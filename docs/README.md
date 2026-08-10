# Documentación — EIA Softworks

Índice de la documentación técnica y de proyecto. Para todo lo relativo a marca, diseño, tono y reglas de contenido, la fuente de verdad sigue siendo [`CLAUDE.md`](../CLAUDE.md) en la raíz del repo — estos documentos no la duplican, la complementan.

| Documento | Para qué sirve |
|---|---|
| [CURRENT-STATE.md](CURRENT-STATE.md) | Foto del momento: qué está desplegado, qué está a medio camino, qué sigue. Se actualiza en cada sesión de trabajo relevante. |
| [REQUIREMENTS.md](REQUIREMENTS.md) | Qué debe hacer el sitio y para quién, requisitos funcionales y no funcionales, qué queda fuera de alcance. |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Cómo está construido: stack, estructura de archivos, páginas, integraciones, despliegue. |
| [CHANGELOG.md](CHANGELOG.md) | Historia de cambios reales, generada a partir del historial de git. |
| [decisions/](decisions/README.md) | Registro de decisiones de arquitectura/producto (ADR), con contexto y consecuencias. |
| [audits/](audits/) | Informes de auditoría (SEO, visual/UX, etc.): hallazgos, riesgos y decisiones pendientes de una revisión puntual — no son estado ni decisiones tomadas, son insumo para decidir. |

## Convención de actualización

- **CURRENT-STATE.md** se reescribe (no se acumula): refleja el momento actual, no el historial.
- **CHANGELOG.md** se agrega al final de cada release/commit significativo relevante.
- **decisions/** solo crece: una decisión ya tomada no se borra ni se edita en retrospectiva; si se revierte, se documenta como una decisión nueva que referencia a la anterior.
- **REQUIREMENTS.md** y **ARCHITECTURE.md** se actualizan cuando el requisito o la arquitectura realmente cambian, no en cada sesión.
- **audits/** solo crece: cada auditoría es un archivo nuevo fechado (`YYYY-MM-DD-tema.md`), nunca se edita retroactivamente. Si sus hallazgos se resuelven, se refleja en `CURRENT-STATE.md`/`decisions/`, no borrando el informe.
