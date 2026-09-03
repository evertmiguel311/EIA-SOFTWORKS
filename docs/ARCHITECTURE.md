# Arquitectura — EIA Softworks

## 1. Stack

HTML + CSS + JavaScript vanilla, **sin build step** (sin npm, sin framework, sin bundler). Decisión deliberada, no una limitación temporal — ver [DEC-001](decisions/DEC-001.md) y [CLAUDE.md §8](../CLAUDE.md#8-arquitectura).

- `<script defer>` clásico, patrón IIFE con namespace `window.__BRAND__` — nunca `type="module"` (rompe en `file://`).
- Cache-busting manual con `?v=YYYYMMDD` en `<link>`/`<script>`.
- Un único `styles.css`, seccionado por número; un único `main.js`, cada `init()` envuelto en `safe()`.

## 2. Estructura de archivos

```
index.html                          ← home
contacto/index.html                 ← página de contacto (formulario completo)
desarrollo-web/index.html           ← servicio: diseño y optimización de páginas web (catálogo de 6 planes)
software-empresas/index.html        ← servicio: desarrollo de aplicaciones móviles (URL histórica, ver nota)
desarrollo-software-a-medida/index.html   ← servicio: desarrollo de software a medida (pilar central, 3 planes)
power-bi-dashboard/index.html       ← servicio: integraciones y dashboards de datos (URL histórica, ver nota)
software-entidades-publicas/index.html    ← servicio: software para entidades públicas
main.js                             ← entry point único, IIFE
styles.css                          ← único archivo CSS
sitemap.xml / robots.txt            ← SEO técnico
.htaccess                           ← cache headers (Hostinger; inerte en GitHub Pages, ver §4)
assets/
  img/                               ← fotografía real de contenido (.webp) — retrato del fundador
  logos/                             ← logo de marca + logos de tecnologías (SVG)
tools/
  webp_convert.py                    ← script de conversión a .webp, no se despliega
docs/                                ← esta documentación
```

Cada página de servicio replica la misma estructura de `<head>` (meta, Open Graph, Twitter Card, JSON-LD) y el mismo nav/footer/modales que `index.html`, adaptando solo el contenido de `<main>` y las rutas relativas (`../` en vez de raíz).

> ✅ **Actualizado (2026-09-02) — relanzamiento comercial:** "Software para Empresas" dejó de existir como servicio. Su contenido se reescribió por completo para representar **"Desarrollo de Aplicaciones Móviles"**, pero la URL/carpeta `software-empresas/` se **conservó deliberadamente** (no se creó `desarrollo-aplicaciones-moviles/` ni se migró) — decisión tomada porque el sitio es estático en GitHub Pages sin mecanismo de redirección server-side (`.htaccess` es inerte ahí, ver §4), así que cambiar la URL solo podía introducir un 404 sin ningún beneficio real, dado el bajo tráfico histórico de la página. De igual forma, `power-bi-dashboard/` conservó su URL al reposicionarse como **"Integraciones y Dashboards de Datos"** (Power BI sigue siendo la herramienta principal mencionada en el contenido, pero el servicio ya no está limitado a ella). **"Software para Entidades Públicas" no cambió de nombre ni de URL.** Ver [DEC-011](decisions/DEC-011.md) para el detalle completo de esta decisión.

## 3. Componentes

El vocabulario completo de componentes reutilizables (`.glass-card`, `.tech-tile`, `.sector-card`, `.faq-item`, `[data-open-modal]`, `.field-consent`, etc.) está documentado en [CLAUDE.md §10](../CLAUDE.md#10-componentes) y es la referencia autoritativa — no se duplica aquí para evitar que ambos documentos queden desincronizados.

## 4. Despliegue

- **Actual**: GitHub Pages, rama `master`, sin workflow de CI/CD — `https://evertmiguel311.github.io/EIA-SOFTWORKS/`. Sirve vía CDN de Fastly con `Cache-Control: max-age=600` fijo; `.htaccess` no tiene ningún efecto en este hosting.
- **Objetivo futuro**: Hostinger (por eso `.htaccess` existe y se mantiene).
- Un `git push` no publica al instante: Pages tarda en reconstruir y el CDN puede tardar hasta ~10 min en servir la versión nueva. El cache-busting `?v=` sigue siendo necesario para CSS/JS; el HTML no tiene forma de cache-bustearse a sí mismo.

## 5. Integraciones externas

| Integración | Uso | Dónde |
|---|---|---|
| **Web3Forms** | Envío real de los formularios de contacto y agenda (`data-contact-form`) | `main.js`, función de submit (~línea 208) |
| **Google Analytics 4** | Analítica de navegación, agregada y anónima | Tag `gtag.js` en `<head>` de cada página |

No hay backend propio, base de datos ni autenticación.

## 6. Datos estructurados (JSON-LD)

Cada página incluye un `@graph` con, según corresponda: `Organization`, `WebSite`, `WebPage`, `Service`, `BreadcrumbList` y `FAQPage`. Regla dura: el `mainEntity` de `FAQPage` debe reflejar exactamente las preguntas/respuestas visibles en `.faq-item` de esa página — un desajuste entre ambos es un defecto, no un detalle menor (ver incidente documentado en [CURRENT-STATE.md](CURRENT-STATE.md)).

## 7. Roadmap técnico

Cuando exista una razón funcional real (login, datos dinámicos, backend) que el HTML estático no pueda resolver, el stack objetivo es: React, Next.js, TypeScript, Tailwind CSS, Framer Motion, Laravel, PostgreSQL. El HTML/CSS actual usa nombres de componentes y estructura semántica pensados para que ese mapeo a componentes React sea directo. Ver [CLAUDE.md §18](../CLAUDE.md#18-futuras-etapas).
