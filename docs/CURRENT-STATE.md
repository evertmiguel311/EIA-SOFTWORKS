# Estado actual — EIA Softworks

> Última actualización: 2026-09-03 (renombre a `aplicaciones-moviles/` + patrón de secciones de DEC-012 en las 4 páginas de servicio restantes, ver [DEC-013](decisions/DEC-013.md)). Este documento se reescribe, no se acumula — si algo de aquí ya no es cierto, corrígelo en vez de agregar una entrada nueva debajo.

## ⚠️ Publicado vs. working tree — hay una diferencia real ahora mismo

- **Publicado en producción** (`https://evertmiguel311.github.io/EIA-SOFTWORKS/`, GitHub Pages sirve el commit `c379251`, empujado en una sesión anterior de esta misma fecha): incluye el relanzamiento comercial de DEC-011, el rediseño de Home/Desarrollo Web (hero-photo, "Desafíos comunes", Planes adelantado) y el catálogo de 7 planes en `/planes/`. **No incluye** el trabajo de esta sesión.
- **Working tree local (no publicado, sin commit ni push, sesión 2026-09-03):** `software-empresas/` pasó a ser página puente hacia `/aplicaciones-moviles/` (contenido real movido ahí, con todos los enlaces del sitio actualizados); `desarrollo-software-a-medida/`, `power-bi-dashboard/` y `software-entidades-publicas/` se reescribieron al mismo patrón "Desafíos comunes" de Desarrollo Web. Detalle completo en [DEC-013](decisions/DEC-013.md).
- **Antes de publicar este trabajo**, alguien debe decidir conscientemente hacer el commit/push. El resto de este documento describe primero el estado local (lo más reciente y relevante para seguir trabajando), y después el estado histórico publicado.

## Arquitectura y patrón de página de servicio — estado local actual

Arquitectura comercial (5 servicios públicos, URLs actualizadas):

1. Diseño y optimización de páginas web — `/desarrollo-web/` — 6 planes
2. Desarrollo de Aplicaciones Móviles — `/aplicaciones-moviles/` (renombrada desde `/software-empresas/` el 2026-09-03; la URL vieja quedó como página puente con `<meta http-equiv="refresh">` + canonical hacia la nueva, no se eliminó para no dejar un 404) — sin planes
3. Desarrollo de Software a Medida — `/desarrollo-software-a-medida/` (pilar) — 3 planes ("Niveles de plataforma"), con CTA propio por nivel
4. Integraciones y Dashboards de Datos — `/power-bi-dashboard/` (URL histórica conservada) — sin planes
5. Software para Entidades Públicas — `/software-entidades-publicas/` (sin cambios de nombre) — sin planes

Las 5 páginas de servicio (todas menos Home) comparten ahora la misma estructura recortada: **Hero → Desafíos comunes (3–4 tarjetas, dolor del cliente en primera persona) → Planes (solo donde hay precio real, justo después de Desafíos) → Qué hacemos → FAQ (máx. 5, empieza por precio) → CTA final con `data-subject`.** Se eliminaron de las 4 páginas que no eran Desarrollo Web las secciones "Metodología"/"Proceso" y "Tecnologías"/"Capacidades tecnológicas" — duplicaban contenido de Home y eran la fuente de jerga técnica sin traducir (DAX, Power Query, Kubernetes, etc.) señalada en la revisión CGO de esta misma sesión. Los cross-sell entre servicios ("Relación con...") pasaron de sección completa a una frase con enlace dentro de otra sección.

**Bloqueante real sin resolver:** las 5 páginas de servicio siguen en `.hero-visual-card` (ícono + tags), no `.hero-photo`. DEC-012 aprobó extender `.hero-photo` a las 4 páginas restantes, pero ninguna de las 4 imágenes mockup necesarias existe todavía — no se puede maquetar ese cambio sin ellas, y no se generó ninguna esta sesión (deben diseñarse a medida, nunca stock, según §17 de `CLAUDE.md`).

**Planes vigentes:**

| Página | Plan | Precio |
|---|---|---|
| Home + Desarrollo Web | Landing Esencial | $1.800.000 COP |
| Home + Desarrollo Web | Sitio Corporativo | $2.900.000 COP |
| Home + Desarrollo Web | Corporativo Avanzado | $4.300.000 COP |
| Home + Desarrollo Web | Tienda Virtual | Desde $5.800.000 COP |
| Solo Desarrollo Web | Landing Página Básica | $699.000 COP |
| Solo Desarrollo Web | Rediseño Web | Desde $900.000 COP |
| Solo `/planes/` | Básico Virtual | $3.500.000 COP |
| Software a Medida | Plataforma Operativa | Desde $14.000.000 COP |
| Software a Medida | Flujo y Validación | Desde $45.000.000 COP |
| Software a Medida | Institucional / Multi-organización | Desde $130.000.000 COP |

Apps Móviles, Integraciones y Dashboards, y Entidades Públicas siguen sin planes ni rango de precio — por decisión (DEC-012), no por olvido. Cada una de las 3 sí gano en esta sesión una pregunta de FAQ que reconoce la duda de costo con lenguaje prudente ("depende del alcance, conversemos"), sin inventar cifra.

⚠️ **Nota de consistencia sin resolver, detectada en la revisión CGO de esta sesión:** `desarrollo-web/#planes` (6 planes) y `/planes/index.html` (7 planes, incluye "Básico Virtual") son catálogos mantenidos por separado y ya divergieron una vez. No se resolvió esta sesión — sigue como riesgo abierto de que un cambio futuro de precio/plan se aplique en un solo lugar.

## Decisión pendiente: `Informe_EIA_Softworks.docx`

Es un informe técnico fechado 21 de julio de 2026 que describe una **arquitectura ya obsoleta** (sitio de una sola página, previo a la reestructura multi-página). No está referenciado en ningún HTML del sitio, pero vive en la raíz del repo (raíz servida por GitHub Pages) y es **públicamente descargable** aunque nadie enlace a él.

Recomendación: dado que `docs/ARCHITECTURE.md` ya cumple y supera su propósito, este archivo puede retirarse del árbol servido públicamente. No se ha eliminado — requiere confirmación del dueño de la marca.

---

## Histórico — sesiones anteriores

### Relanzamiento comercial y rediseño de Home/Desarrollo Web (2026-09-02, publicado)

Ver [DEC-011](decisions/DEC-011.md) para el detalle del relanzamiento de 5 servicios y el catálogo de planes. El rediseño posterior de Home y Desarrollo Web (hero-photo, "Desafíos comunes", Planes adelantado, secciones recortadas) se hizo en la misma fecha y ya está publicado (commit `c379251`).

**Auditoría de cierre del relanzamiento (2026-09-02):**
- Se corrigió una afirmación comercial sin respaldo en "Landing Página Básica" (entrega/soporte inventados), reemplazada por lenguaje prudente.
- Se verificó que el "desbordamiento horizontal mobile" reportado antes no era un bug real (medición que ignoraba `overflow-x: clip` ya existente).
- Se homogeneizó el tracking (`data-gtag-event`) en las 7 páginas públicas de esa fecha.
- Meta descriptions largas del pilar, Empresas y Entidades Públicas se acortaron a menos de 160 caracteres.

### Publicado antes del relanzamiento (commit `02a4a0f`, 2026-08-11)

Sirvió el resultado de SEO "B.9" — ver [DEC-010](decisions/DEC-010.md). Los nombres que introdujo para `software-empresas/` fueron reemplazados por el relanzamiento comercial. El resto de B.9 (FAQ de Entidades Públicas, progresión geográfica, `areaServed`) sigue vigente.

**Backlog de B.9 aún abierto:**
- `BreadcrumbList` presente en JSON-LD sin equivalente visible en HTML.
- Interlinking contextual adicional entre el pilar y sus páginas satélite.
- Imagen Open Graph específica por página (hoy todas comparten el logo de marca).

### Auditorías internas — excluidas del repositorio público

Las auditorías de solo lectura de SEO estratégico y visual/UX (2026-08-10) existen localmente en `docs/audits/` pero no están trackeadas en git (`.gitignore`). Sus hallazgos ya aplicados están en producción.

## Fase de medición SEO (aplica una vez se publique el trabajo pendiente)

1. Verificar en Google Search Console que las 8 URLs actuales (incluida `/aplicaciones-moviles/`) se rastrean e indexan correctamente tras publicar.
2. Establecer una línea base de métricas posterior a la publicación — la medición de B.9 ya no aplica como referencia.
3. Evolucionar el SEO solo a partir de esos datos.

## Riesgo conocido: sincronización JSON-LD / FAQ

En `index.html` y en las 6 páginas de servicio, el bloque JSON-LD `FAQPage` debe ser un espejo 1:1 del texto visible de `.faq-item`. Verificado para las 4 páginas reescritas esta sesión (recuento y orden de preguntas visibles = JSON-LD, en cada una). El riesgo sigue siendo hacia adelante: cualquier cambio futuro de pregunta/respuesta visible debe ir acompañado del mismo cambio en su JSON-LD.

## Próximos pasos sugeridos

1. **Decidir si se publica este trabajo** (commit + push) — renombre a `aplicaciones-moviles/` + recorte de secciones de las 3 páginas restantes.
2. Resolver la divergencia de catálogo entre `desarrollo-web/#planes` y `/planes/` (ver nota de consistencia arriba).
3. Diseñar las 4 imágenes de hero mockup (Software a Medida, Apps Móviles, Integraciones y Dashboards, Entidades Públicas) para poder implementar `.hero-photo` en esas páginas — bloqueante real desde DEC-012.
4. Confirmar rangos de precio reales de Apps Móviles, Integraciones y Dashboards, y Entidades Públicas cuando el dueño de la marca los defina.
5. Resolver la decisión sobre `Informe_EIA_Softworks.docx`.
6. Una vez publicado: verificar las URLs en Google Search Console y establecer línea base de métricas.
7. Backlog no bloqueante restante: `BreadcrumbList` visible, interlinking adicional, imagen Open Graph por página.
8. Mantener este archivo al día en cada sesión de trabajo relevante.
