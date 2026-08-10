# Estado actual — EIA Softworks

> Última actualización: 2026-08-10 (publicación del checkpoint de consolidación). Este documento se reescribe, no se acumula — si algo de aquí ya no es cierto, corrígelo en vez de agregar una entrada nueva debajo.

## Publicado (GitHub Pages sirve commit `2c09e4d`, publicado el 2026-08-10)

`https://evertmiguel311.github.io/EIA-SOFTWORKS/` ya sirve el checkpoint de consolidación. Verificado en producción (con bypass de caché) tras el push:

- Home con `#contacto` resumida (sin formulario, con enlace "Ir a contacto →") y FAQ generales — confirmado leyendo el HTML servido en vivo, no solo el commit.
- Nav con dropdown de "Servicios" (`.nav-item-dropdown`) presente en el HTML servido.
- Las 6 páginas de servicio (`contacto/`, `desarrollo-web/`, `desarrollo-software-a-medida/`, `software-empresas/`, `software-entidades-publicas/`, `power-bi-dashboard/`) responden `HTTP 200`.
- `sitemap.xml` (7 `<url>`) y `robots.txt` responden `HTTP 200`.
- `styles.css` y `main.js` se sirven con `?v=20260810` en las 7 páginas, y esas URLs versionadas resuelven `HTTP 200`.

**Anterior estado publicado:** commit `354b48d` (2026-08-03) — solo Home, con formulario completo en `#contacto`, sin páginas de servicio ni dropdown de nav. Reemplazado por `2c09e4d` mediante `git push origin master` (fast-forward, sin force push).

**Nota sobre verificación:** el endpoint legacy `GET /repos/.../pages/builds/latest` de la API de GitHub siguió reportando el commit `354b48d` como "built" incluso 5 minutos después del push y con el contenido nuevo ya confirmado en vivo — es metadata de esa API específica que no se actualizó, no un fallo real del despliegue. La verificación válida fue contra el contenido HTTP real servido (con parámro de bypass de caché), no contra esa API.

## Consolidado en el commit `2c09e4d` (2026-08-10, ver `docs/decisions/` y el historial de git para detalle)

- **Seis páginas de servicio**: verificadas — 1 solo `<h1>` por página, JSON-LD válido y sincronizado con el contenido visible, sin enlaces internos rotos, sin texto de relleno ni afirmaciones prohibidas por `CLAUDE.md` §17.
- **Nav con dropdown de "Servicios"** y **mejoras de accesibilidad de modales** (focus trap + `inert`) en `main.js`/`styles.css`.
- **`docs/`**: documentación técnica y de gestión completa (`README.md`, `REQUIREMENTS.md`, `ARCHITECTURE.md`, `CURRENT-STATE.md`, `CHANGELOG.md`, `decisions/DEC-001`–`DEC-009`).
- **Cache-busting corregido**: `main.js`/`styles.css` habían cambiado de contenido pero seguían con el `?v=` viejo; se bumpeó a `?v=20260810` en las 7 páginas antes de publicar, evitando que visitantes quedaran con caché desincronizada bajo la misma URL versionada.

## Tarea en curso: SEO "B.9" (pendientes editoriales)

Objetivo: resolver duplicidad de contenido/keywords entre Home y las páginas de servicio, detectada en una auditoría previa ("B.6"). **Sigue sin avanzar** — esta sesión fue exclusivamente de publicación y verificación, no se tocó SEO B.9.

**Hecho y ya publicado (solo en `index.html`):**
- Sección `#contacto` del Home resumida.
- FAQ del Home reemplazadas por preguntas generales de empresa.
- JSON-LD `FAQPage` de `index.html` actualizado para coincidir con las preguntas visibles nuevas.

**Pendiente (siguiente tarea):**
- Redistribuir las FAQ de las tres páginas pilar (`desarrollo-software-a-medida/`, `software-empresas/`, `software-entidades-publicas/`) para que dejen de solaparse entre sí, y actualizar su `FAQPage` JSON-LD en consecuencia.
- Ajustar `<title>` de `software-empresas/` y `software-entidades-publicas/` para diferenciarlos de "a medida" (no tocar `<title>` ni `<h1>` de `desarrollo-software-a-medida/`, que es el pilar central).

## Riesgo conocido: sincronización JSON-LD / FAQ

En `index.html` y en las seis páginas de servicio, el bloque JSON-LD `FAQPage` es un espejo 1:1 del texto visible de `.faq-item`. **Verificado programáticamente antes de publicar y de nuevo contra el contenido servido en producción: las 7 páginas están sincronizadas ahora mismo.** El riesgo sigue siendo hacia adelante: cuando se retome B.9 y se redistribuyan las FAQ de las páginas pilar, cada cambio de pregunta/respuesta visible debe ir acompañado del mismo cambio en su JSON-LD — de lo contrario los datos estructurados quedan describiendo preguntas que ya no están en la página, ya en producción.

## Decisión pendiente (no inventada, reportada para que la resuelva el dueño de la marca)

`Informe_EIA_Softworks.docx` (197 KB, en la raíz del repo, ya publicado dentro del commit `2c09e4d`) no está referenciado en ningún HTML ni documentado en `ARCHITECTURE.md`/`REQUIREMENTS.md`. Su propósito y si debería vivir en la raíz del repo, en `docs/`, o fuera del repo del todo, sigue sin decidirse.

## Próximos pasos sugeridos

1. Retomar la redistribución de FAQ de las páginas pilar + ajuste de títulos (SEO B.9).
2. Resolver la decisión pendiente sobre `Informe_EIA_Softworks.docx` (ver arriba).
3. Mantener este archivo al día en cada sesión de trabajo relevante.
