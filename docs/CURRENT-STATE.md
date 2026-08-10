# Estado actual — EIA Softworks

> Última actualización: 2026-08-10 (consolidación de estado). Este documento se reescribe, no se acumula — si algo de aquí ya no es cierto, corrígelo en vez de agregar una entrada nueva debajo.

## Publicado (último push a GitHub Pages: commit `354b48d`, 2026-08-03)

Lo que ve un visitante hoy en `https://evertmiguel311.github.io/EIA-SOFTWORKS/` es la versión de `354b48d`: solo el Home, con formulario de contacto completo en `#contacto`, sin las páginas de servicio nuevas ni el nav con dropdown de "Servicios". **El commit de consolidación descrito abajo todavía no se ha subido (`git push`)** — publicarlo es un paso deliberado y posterior, no automático.

## Consolidado localmente el 2026-08-10 (working tree → un commit)

Antes de esta consolidación existían 6 páginas de servicio, un rediseño de nav/formularios y toda la documentación de `docs/` viviendo sin commitear en el working tree, junto con `Informe_EIA_Softworks.docx` ya en stage. Se auditó todo eso y se dejó listo en un único commit coherente:

- **Seis páginas de servicio** (`contacto/`, `desarrollo-web/`, `desarrollo-software-a-medida/`, `software-empresas/`, `software-entidades-publicas/`, `power-bi-dashboard/`): verificadas — 1 solo `<h1>` por página, JSON-LD válido y sincronizado con el contenido visible, sin enlaces internos rotos, sin texto de relleno ni afirmaciones prohibidas por `CLAUDE.md` §17.
- **Nav con dropdown de "Servicios"** (`.nav-item-dropdown` en `styles.css`, usado por las 7 páginas) y **mejoras de accesibilidad de modales** (`main.js`: focus trap + `inert` en el fondo al abrir un modal) — ambos ya estaban en el working tree como prerequisito funcional de las páginas nuevas, no como trabajo adicional de esta tarea.
- **`sitemap.xml`**: ya listaba las 7 URLs (home + 6 páginas de servicio) antes de esta consolidación.
- **Home (`#contacto` y FAQ)**: la sección de contacto del Home quedó resumida (sin formulario, con enlace "Ir a contacto →" hacia `/contacto/`) y las FAQ del Home pasaron a preguntas generales de empresa — trabajo de la tarea SEO "B.9", ver más abajo.
- **`docs/`**: toda la documentación técnica y de gestión (`README.md`, `REQUIREMENTS.md`, `ARCHITECTURE.md`, `CURRENT-STATE.md`, `CHANGELOG.md`, `decisions/DEC-001`–`DEC-009`) quedó incluida en este mismo commit.

### Corrección aplicada durante la auditoría de consolidación

- **Cache-busting desactualizado**: `main.js` y `styles.css` habían cambiado de contenido en el working tree (focus trap de modales, CSS del dropdown de nav) pero seguían referenciados con el `?v=` ya publicado (`main.js?v=20260718h`, `styles.css?v=20260722a`). Publicar así habría dejado a visitantes con caché de la versión vieja bajo la misma URL versionada, anulando el propósito del cache-busting (`CLAUDE.md` §8). Se bumpeó a `?v=20260810` en las 7 páginas por igual.

## Tarea en curso: SEO "B.9" (pendientes editoriales)

Objetivo: resolver duplicidad de contenido/keywords entre Home y las páginas de servicio, detectada en una auditoría previa ("B.6"). **No se avanzó en esta consolidación** — se dejó explícitamente en pausa para consolidar primero el estado del repo.

**Hecho y validado (solo en `index.html`, ya incluido en el commit de consolidación):**
- Sección `#contacto` del Home resumida.
- FAQ del Home reemplazadas por preguntas generales de empresa.
- JSON-LD `FAQPage` de `index.html` actualizado para coincidir con las preguntas visibles nuevas.

**Pendiente (siguiente tarea):**
- Redistribuir las FAQ de las tres páginas pilar (`desarrollo-software-a-medida/`, `software-empresas/`, `software-entidades-publicas/`) para que dejen de solaparse entre sí, y actualizar su `FAQPage` JSON-LD en consecuencia.
- Ajustar `<title>` de `software-empresas/` y `software-entidades-publicas/` para diferenciarlos de "a medida" (no tocar `<title>` ni `<h1>` de `desarrollo-software-a-medida/`, que es el pilar central).

## Riesgo conocido: sincronización JSON-LD / FAQ

En `index.html` y en las seis páginas de servicio, el bloque JSON-LD `FAQPage` es un espejo 1:1 del texto visible de `.faq-item`. **Verificado programáticamente durante esta consolidación: las 7 páginas están sincronizadas ahora mismo.** El riesgo es hacia adelante: cuando se retome B.9 y se redistribuyan las FAQ de las páginas pilar, cada cambio de pregunta/respuesta visible debe ir acompañado del mismo cambio en su JSON-LD — de lo contrario los datos estructurados describen preguntas que ya no están en la página. Ya ocurrió una vez (y se corrigió) durante el trabajo previo en `index.html`.

## Decisión pendiente (no inventada, reportada para que la resuelva el dueño de la marca)

`Informe_EIA_Softworks.docx` (197 KB, en la raíz del repo) está en stage desde antes de esta consolidación, pero no está referenciado en ningún HTML ni documentado en `ARCHITECTURE.md`/`REQUIREMENTS.md`. Se mantuvo en el commit porque ya había una acción explícita de `git add` sobre él (señal de intención deliberada), pero su propósito y si debería vivir en la raíz del repo, en `docs/`, o fuera del repo del todo, no está decidido — no se inventó una respuesta.

## Próximos pasos sugeridos

1. Decidir cuándo hacer `git push` de este commit de consolidación a GitHub Pages (no es automático).
2. Retomar la redistribución de FAQ de las páginas pilar + ajuste de títulos (SEO B.9).
3. Resolver la decisión pendiente sobre `Informe_EIA_Softworks.docx` (ver arriba).
4. Mantener este archivo al día en cada sesión de trabajo relevante.
