# Estado actual — EIA Softworks

> Última actualización: 2026-09-02 (relanzamiento comercial, ver [DEC-011](decisions/DEC-011.md)). Este documento se reescribe, no se acumula — si algo de aquí ya no es cierto, corrígelo en vez de agregar una entrada nueva debajo.

## ⚠️ Publicado vs. working tree — hay una diferencia real ahora mismo

- **Publicado en producción** (`https://evertmiguel311.github.io/EIA-SOFTWORKS/`, GitHub Pages sirve el commit `02a4a0f`, 2026-08-11): todavía refleja la arquitectura **anterior** al relanzamiento — "Software para Empresas" y "Dashboards y Power BI" siguen siendo los nombres en producción, y el Home publicado tiene la estructura de la sesión SEO "B.9".
- **Working tree local (no publicado, sin commit ni push)**: contiene el relanzamiento comercial completo (ver "Relanzamiento comercial" abajo) — nueva arquitectura de 5 servicios, catálogo de 6 planes en Desarrollo Web, tracking homogeneizado, meta descriptions optimizadas.
- **Antes de publicar este trabajo**, alguien debe decidir conscientemente hacer el commit/push — no ha ocurrido en ninguna sesión hasta ahora. El resto de este documento describe primero el estado local (lo más reciente y relevante para seguir trabajando), y después el estado histórico publicado.

## Relanzamiento comercial — implementado en local, pendiente de publicar

**Estado: IMPLEMENTADO + AUDITADO + NO PUBLICADO.**

Arquitectura comercial definitiva (5 servicios públicos):

1. Diseño y optimización de páginas web — `/desarrollo-web/` — 6 planes
2. Desarrollo de Aplicaciones Móviles — `/software-empresas/` (URL histórica conservada) — sin planes
3. Desarrollo de Software a Medida — `/desarrollo-software-a-medida/` (pilar) — 3 planes
4. Integraciones y Dashboards de Datos — `/power-bi-dashboard/` (URL histórica conservada) — sin planes
5. Software para Entidades Públicas — `/software-entidades-publicas/` (sin cambios de nombre) — sin planes

Detalle completo de la decisión, motivos y consecuencias en [DEC-011](decisions/DEC-011.md).

**Planes vigentes:**

| Página | Plan | Precio |
|---|---|---|
| Home + Desarrollo Web | Landing Esencial | $1.800.000 COP |
| Home + Desarrollo Web | Sitio Corporativo | $2.900.000 COP |
| Home + Desarrollo Web | Corporativo Avanzado | $4.300.000 COP |
| Home + Desarrollo Web | Tienda Virtual | Desde $5.800.000 COP |
| Solo Desarrollo Web | Landing Página Básica | $699.000 COP |
| Solo Desarrollo Web | Rediseño Web | Desde $900.000 COP |
| Software a Medida | Plataforma Operativa | Desde $14.000.000 COP |
| Software a Medida | Flujo y Validación | Desde $45.000.000 COP |
| Software a Medida | Institucional / Multi-organización | Desde $130.000.000 COP |

El Home muestra únicamente sus 4 planes originales (verificado por DOM tras el cambio). Apps Móviles, Integraciones y Dashboards, y Entidades Públicas no tienen planes por diseño.

**Auditoría de cierre (2026-09-02) — hallazgos y correcciones:**

- Se detectó y corrigió una afirmación comercial sin respaldo introducida en la sesión anterior: el plan "Landing Página Básica" declaraba una entrega de "5–7 días hábiles" y "7 días de soporte" sin ninguna aprobación real detrás. Se reemplazó por lenguaje prudente ("entrega más ágil que Landing Esencial, por su alcance reducido · soporte se confirma al iniciar"), sin inventar una cifra alternativa. **Pendiente:** el dueño de la marca debe confirmar los plazos reales para reemplazar este lenguaje por números concretos.
- Se verificó que el "desbordamiento horizontal mobile" reportado en el cierre de la fase anterior (~43px en Home, ~7px en Desarrollo Web) **no es un bug real**: es una medición de `document.body.scrollWidth`, que no tiene en cuenta que `html`/`body` ya tienen `overflow-x: clip` (definido en `styles.css`, sección Reset) desde antes de esta sesión. Se verificó programáticamente (intento de `window.scrollTo` en viewport móvil) en las 7 páginas públicas: **no existe scroll horizontal real ni contenido interactivo clipeado** en ninguna. No se aplicó ningún cambio de CSS — habría sido churn cosmético sobre un problema inexistente.
- Se homogeneizó el tracking (`data-gtag-event`) de CTA de navegación, FAB, CTA final de servicio y CTA de plan en las 7 páginas públicas — antes solo Home tenía cobertura completa; el resto solo tenía tracking en los botones de plan. No se modificó `main.js` (el sistema ya es genérico por atributos) ni se introdujo una plataforma de analytics nueva.
- Meta descriptions de `desarrollo-software-a-medida/` (166→157), `software-entidades-publicas/` (174→151) y `software-empresas/` (161→146) acortadas a menos de 160 caracteres, resolviendo el backlog SEO abierto desde B.9 (ver más abajo). El resto de páginas ya estaba en rango.

## Próxima ronda de trabajo: rediseño CGO/UX de las 4 páginas de servicio restantes (aprobada, no iniciada)

**Estado: APROBADA + DOCUMENTADA + NO INICIADA.** Ningún HTML/CSS/JS fue tocado en esta sesión — ver [DEC-012](decisions/DEC-012.md) para el detalle completo.

Home y Desarrollo Web ya tienen el patrón "dolor en primera persona + precio adelantado con CTA propio + hero-photo". Las otras 4 páginas de servicio (`desarrollo-software-a-medida/`, `software-empresas/`, `power-bi-dashboard/`, `software-entidades-publicas/`) todavía no. Se analizó el hueco desde los roles de CTO, Chief Growth Officer y diseño UI/UX, y el dueño de la marca aprobó:

1. Extender `.hero-photo` (antes exclusivo de Desarrollo Web, ver nota actualizada en `CLAUDE.md` §17) a las 4 páginas restantes.
2. **No** agregar todavía rangos de precio a Apps Móviles, Integraciones y Dashboards, ni Entidades Públicas — siguen sin planes por decisión, no por olvido (ver tabla de planes vigentes, arriba).
3. Diseñar (no usar stock) una imagen de hero por página: Software a Medida (mockup de panel/sistema interno), Apps Móviles (mockup de FinControl en un teléfono — producto propio y real), Integraciones y Dashboards (mockup de un tablero Power BI), Entidades Públicas (mockup de un portal ciudadano).
4. **Orden de ejecución: `desarrollo-software-a-medida/` primero** — ya tiene precios reales ("Niveles de plataforma") y es la que menos contenido nuevo necesita. Las otras 3 se ordenan al cerrar esa.

Patrón repetible que se aplicará a cada página (detalle completo en DEC-012): nav sin "Sobre mí" en escritorio, hero-photo, sección única de dolor en 1ª persona reemplazando "El problema"/"Qué es"/"Retos"/"Cuándo tiene sentido", precio (donde exista) subido justo después con CTA propio por plan, sección "Proceso" recortada o enlazada a Home en vez de repetida, "Tecnologías"/"Capacidades" recortada o retirada, cross-sell entre servicios reducido a una frase con link, FAQ a máximo 4–5 preguntas, CTA final con `data-subject` del servicio.

**Bloqueantes reales antes de implementar:** las 4 imágenes de hero no existen todavía; los rangos de precio de 3 de los 4 servicios tampoco (y se dejan fuera de esta ronda a propósito).

## Decisión pendiente: `Informe_EIA_Softworks.docx`

Investigado en la auditoría de cierre (2026-09-02): es un informe técnico fechado 21 de julio de 2026 que describe una **arquitectura ya obsoleta** (sitio de una sola página, sin el catálogo de planes ni las páginas de servicio actuales — describe `index.html` con 610 líneas y las secciones Hero/Sobre mí/Servicios/Sectores/Proceso/FAQ/Tecnologías/Contacto/Footer, previas a la reestructura multi-página). No está referenciado en ningún HTML del sitio. Al vivir en la raíz del repo, que es también la raíz servida por GitHub Pages, es **públicamente descargable** en `https://evertmiguel311.github.io/EIA-SOFTWORKS/Informe_EIA_Softworks.docx` aunque nadie enlace a él — no es información sensible, pero sí una nota técnica interna obsoleta expuesta sin necesidad.

Recomendación: dado que `docs/ARCHITECTURE.md` ya cumple y supera su propósito con información actualizada, este archivo puede retirarse del árbol servido públicamente (sacarlo de la raíz del repo, o mover a una carpeta excluida del despliegue como se hizo con `docs/audits/`). No se eliminó en esta sesión — requiere confirmación del dueño de la marca.

---

## Histórico — estado publicado antes de este relanzamiento

### Publicado (GitHub Pages sirve commit `02a4a0f`, publicado el 2026-08-11)

`https://evertmiguel311.github.io/EIA-SOFTWORKS/` sirve el resultado de SEO "B.9". Verificado directamente contra el HTML servido en producción (no solo contra el commit local) inmediatamente después del push:

- Las 7 páginas (`/`, `desarrollo-software-a-medida/`, `software-empresas/`, `software-entidades-publicas/`, `desarrollo-web/`, `power-bi-dashboard/`, `contacto/`) responden `HTTP 200`, con `<title>` únicos y diferenciados, canonical correcto, un solo `<h1>` y JSON-LD presente y válido.
- `sitemap.xml` (7 `<url>`, sin duplicados) y `robots.txt` responden `HTTP 200`.
- FAQ visible = `FAQPage` JSON-LD verificado 1:1 en producción para `software-empresas/` y `software-entidades-publicas/` (las dos páginas cuyas preguntas cambiaron en esta ronda).
- El enlace nuevo de Home hacia la página pilar (tarjeta "Desarrollo a medida" → `desarrollo-software-a-medida/`) funciona en producción, verificado con clic real (Playwright), sin errores de consola.

**Anterior estado publicado:** commit `2c09e4d` (2026-08-10). Reemplazado por `02a4a0f` mediante `git push origin master` (fast-forward, sin force push).

### SEO "B.9" — implementado y publicado (superado parcialmente por el relanzamiento de arriba)

Objetivo original: resolver la duplicidad de contenido/keywords entre el pilar (`desarrollo-software-a-medida/`) y sus páginas satélite. Los nombres de página que introdujo ("Sistemas de Gestión y Automatización Empresarial" para `software-empresas/`) fueron reemplazados por el relanzamiento comercial de arriba — ver [DEC-011](decisions/DEC-011.md). El resto de B.9 (FAQ de Entidades Públicas, progresión geográfica, `areaServed`) sigue vigente sin cambios. Detalle completo en [DEC-010](decisions/DEC-010.md).

**Backlog de B.9 — estado tras esta sesión:**
- ~~Meta descriptions de 166–174 caracteres en el pilar, Empresas y Entidades Públicas.~~ **Resuelto** en la auditoría de cierre (ver arriba).
- `BreadcrumbList` presente en JSON-LD sin equivalente visible en HTML. Sigue abierto.
- Interlinking contextual del pilar hacia `desarrollo-web/` y `power-bi-dashboard/`. Sigue abierto.
- `robots.txt` vive bajo el subpath del proyecto en GitHub Pages, no en la raíz real del dominio — característica benigna conocida de GitHub Pages de tipo proyecto.
- Imagen Open Graph específica por página (hoy todas comparten el logo de marca). Sigue abierto.

### Auditorías internas — excluidas del repositorio público

Las auditorías de solo lectura de SEO estratégico y visual/UX (2026-08-10) existen localmente en `docs/audits/` pero **ya no están trackeadas en git** desde el commit `02a4a0f` — la carpeta está en `.gitignore`. Sus hallazgos ya aplicados están en producción (accesibilidad por teclado del dropdown, tarjetas huérfanas, formulario embebido en `/contacto/`, jerarquía de CTA del Home, duplicidad de FAQ).

## Fase de medición SEO (aplica una vez se publique el relanzamiento)

1. Verificar en Google Search Console que las 7 URLs se rastrean e indexan correctamente tras publicar.
2. Establecer una línea base de métricas (impresiones, clics, CTR, posición media) posterior a la publicación del relanzamiento — la medición de B.9 (0 clics/impresiones antes de esa publicación) ya no aplica como referencia, mide un contenido dos veces superado.
3. Evolucionar el SEO solo a partir de esos datos.

## Riesgo conocido: sincronización JSON-LD / FAQ

En `index.html` y en las seis páginas de servicio, el bloque JSON-LD `FAQPage` es un espejo 1:1 del texto visible de `.faq-item`. Verificado programáticamente en la auditoría de cierre (2026-09-02): las 7 páginas están sincronizadas ahora mismo (recuento de preguntas visibles = recuento en JSON-LD en cada una). El riesgo sigue siendo hacia adelante: cualquier cambio futuro de pregunta/respuesta visible debe ir acompañado del mismo cambio en su JSON-LD.

## Próximos pasos sugeridos

1. **Decidir si se publica el relanzamiento comercial** (commit + push) — es el paso que más impacto tiene ahora mismo; todo lo demás depende de que esto se publique primero.
2. Confirmar los plazos reales de entrega/soporte de Landing Página Básica y Rediseño Web (ver "Auditoría de cierre" arriba) antes o poco después de publicar.
3. **Implementar el rediseño CGO/UX de `desarrollo-software-a-medida/`** (ver "Próxima ronda de trabajo" arriba y [DEC-012](decisions/DEC-012.md)) — requiere primero tener lista la imagen de hero de esa página.
4. Resolver la decisión sobre `Informe_EIA_Softworks.docx` (ver arriba).
5. Una vez publicado: verificar las 7 URLs en Google Search Console y establecer línea base de métricas.
6. Backlog no bloqueante restante: `BreadcrumbList` visible, interlinking adicional, imagen Open Graph por página.
7. Mantener este archivo al día en cada sesión de trabajo relevante.
