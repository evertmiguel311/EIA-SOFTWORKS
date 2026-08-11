# Estado actual — EIA Softworks

> Última actualización: 2026-08-11 (publicación de SEO "B.9"). Este documento se reescribe, no se acumula — si algo de aquí ya no es cierto, corrígelo en vez de agregar una entrada nueva debajo.

## Publicado (GitHub Pages sirve commit `02a4a0f`, publicado el 2026-08-11)

`https://evertmiguel311.github.io/EIA-SOFTWORKS/` sirve el resultado de SEO "B.9". Verificado directamente contra el HTML servido en producción (no solo contra el commit local) inmediatamente después del push:

- Las 7 páginas (`/`, `desarrollo-software-a-medida/`, `software-empresas/`, `software-entidades-publicas/`, `desarrollo-web/`, `power-bi-dashboard/`, `contacto/`) responden `HTTP 200`, con `<title>` únicos y diferenciados, canonical correcto, un solo `<h1>` y JSON-LD presente y válido.
- `sitemap.xml` (7 `<url>`, sin duplicados) y `robots.txt` responden `HTTP 200`.
- FAQ visible = `FAQPage` JSON-LD verificado 1:1 en producción para `software-empresas/` y `software-entidades-publicas/` (las dos páginas cuyas preguntas cambiaron en esta ronda).
- El enlace nuevo de Home hacia la página pilar (tarjeta "Desarrollo a medida" → `desarrollo-software-a-medida/`) funciona en producción, verificado con clic real (Playwright), sin errores de consola.

**Anterior estado publicado:** commit `2c09e4d` (2026-08-10). Reemplazado por `02a4a0f` mediante `git push origin master` (fast-forward, sin force push) — el push incluyó de una vez los 5 commits locales que se habían ido acumulando desde `2c09e4d`.

## SEO "B.9" — implementado y publicado

**Estado: IMPLEMENTADO + PUBLICADO + PRODUCCIÓN VERIFICADA.**

Objetivo original: resolver la duplicidad de contenido/keywords entre el pilar (`desarrollo-software-a-medida/`) y sus páginas satélite, detectada en una auditoría previa. Completado y en producción, no queda ningún trabajo de B.9 pendiente en local.

- **B.9.1 — Software para Empresas:** `<title>` diferenciado ("Sistemas de Gestión y Automatización Empresarial"), 3 de 5 preguntas de FAQ reemplazadas por preguntas de intención empresarial propia, `FAQPage` JSON-LD sincronizado.
- **B.9.2 — Software para Entidades Públicas:** `<title>` diferenciado ("Sistemas de Gestión para Procesos Institucionales"), 2 de 5 preguntas de FAQ reemplazadas por preguntas de intención institucional, `FAQPage` JSON-LD sincronizado.
- **Señal internacional/remota:** una frase en el `p-lead` de `#contacto` en Home, sin crear sección nueva ni tocar `areaServed` (sigue `"CO"`).
- **`sitemap.xml`:** `lastmod` de las 3 URLs afectadas actualizado a la fecha real de publicación.
- **Home → página pilar:** enlace contextual nuevo en la tarjeta "Desarrollo a medida" de `#servicios`.

Detalle completo de la decisión (títulos, preguntas reemplazadas, motivo de cada una, progresión geográfica) en [DEC-010](decisions/DEC-010.md).

**Backlog explícito, no bloqueante** (evaluado y dejado deliberadamente sin resolver, no son errores):
- Meta descriptions de 166–174 caracteres en el pilar, Empresas y Entidades Públicas.
- `BreadcrumbList` presente en JSON-LD sin equivalente visible en HTML.
- Interlinking contextual del pilar hacia `desarrollo-web/` y `power-bi-dashboard/` (hoy solo alcanzables desde el pilar vía nav).
- `robots.txt` vive bajo el subpath del proyecto en GitHub Pages (`/EIA-SOFTWORKS/robots.txt`), no en la raíz real del dominio — características conocida de GitHub Pages de tipo proyecto, efecto práctico benigno.
- Imagen Open Graph específica por página (hoy todas comparten el logo de marca).

## Auditorías internas — excluidas del repositorio público

Las auditorías de solo lectura de SEO estratégico y visual/UX (2026-08-10) existen localmente en `docs/audits/` pero **ya no están trackeadas en git** desde el commit `02a4a0f` — la carpeta está en `.gitignore` para que no vuelva a publicarse por accidente. Se conservan en el disco de quien trabaja en el repo, no en `origin/master`.

Los hallazgos de esas auditorías que aplicaban ya están resueltos y en producción:

- **Accesibilidad por teclado del dropdown "Servicios":** los enlaces del submenú quedaban `visibility:hidden` hasta recibir foco, por lo que un usuario de teclado no podía llegar a 5 de las 7 páginas desde el nav de escritorio. Resuelto en el commit `904e0cd` (2026-08-10).
- **Tarjetas huérfanas** (grids de 6 tarjetas dejando 1 sola en la última fila, 3 casos): resuelto con la clase explícita `.card-grid-3x2`, commit `bd57ff1` (2026-08-11).
- **`/contacto/` sin formulario embebido:** la página ahora tiene el formulario completo (`<form class="cta-form" data-contact-form>`) directamente en su contenido, no solo vía modal.
- **`#contacto` del Home desbalanceado** en escritorio ancho: resuelto junto con la jerarquía de CTA (formulario como acción primaria, "Agendar reunión" como secundaria), commit `bd57ff1`.
- **SEO — duplicidad de FAQ entre pilar y satélites:** resuelto, ver sección "SEO B.9" arriba.

## Fase actual: validación y medición SEO (ya no implementación)

Con B.9 publicado, el trabajo deja de ser "modificar SEO" y pasa a ser "medir con datos reales":

1. Verificar en Google Search Console que las 7 URLs publicadas se rastrean e indexan correctamente.
2. Establecer una línea base de métricas (impresiones, clics, CTR, posición media) posterior a esta publicación.
3. Evolucionar el SEO solo a partir de esos datos — no seguir ajustando títulos/FAQ "a ciegas".

### Google Search Console

- **Antes de esta publicación:** Search Console mostraba 0 clics, 0 impresiones, sin consultas significativas; la Home estaba indexada. Ese periodo corresponde a la versión previa del sitio (antes de B.9) y **no debe usarse para evaluar el resultado de B.9** — mide un contenido distinto al que ahora está publicado.
- **Después de esta publicación:** **pendiente de inspección.** Todavía no se ha hecho la ronda de verificación de las 7 URLs en Search Console tras este push. No se ha solicitado indexación ni se ha tocado ninguna configuración de Search Console.

## Riesgo conocido: sincronización JSON-LD / FAQ

En `index.html` y en las seis páginas de servicio, el bloque JSON-LD `FAQPage` es un espejo 1:1 del texto visible de `.faq-item`. Verificado programáticamente antes de publicar y de nuevo contra el contenido servido en producción: las 7 páginas están sincronizadas ahora mismo. El riesgo sigue siendo hacia adelante: cualquier cambio futuro de pregunta/respuesta visible debe ir acompañado del mismo cambio en su JSON-LD, o los datos estructurados quedan describiendo preguntas que ya no están en la página.

## Decisión pendiente (no inventada, reportada para que la resuelva el dueño de la marca)

`Informe_EIA_Softworks.docx` (197 KB, en la raíz del repo, público desde el commit `2c09e4d`) no está referenciado en ningún HTML ni documentado en `ARCHITECTURE.md`/`REQUIREMENTS.md`. Su propósito y si debería vivir en la raíz del repo, en `docs/`, o fuera del repo del todo, sigue sin decidirse.

## Próximos pasos sugeridos

1. Verificar las 7 URLs en Google Search Console (rastreo, indexación) — ver "Fase actual" arriba.
2. Establecer línea base de métricas de Search Console posterior a esta publicación.
3. Decidir prioridad del backlog SEO (meta descriptions, `BreadcrumbList`, interlinking hacia `desarrollo-web/`/`power-bi-dashboard/`) — ninguno bloquea nada, quedan a criterio del dueño de la marca.
4. Resolver la decisión pendiente sobre `Informe_EIA_Softworks.docx` (ver arriba).
5. Mantener este archivo al día en cada sesión de trabajo relevante.
