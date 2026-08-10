# Auditoría SEO estratégica — 2026-08-10

> Auditoría de solo lectura, sin cambios de código ni de contenido. Objetivo: preparar la evolución de SEO "B.9" para soportar el posicionamiento de EIA Softworks en Cartagena/Bolívar → Colombia → Hispanoamérica, sin crear páginas por país ni inventar datos de mercado.

## 1. Resumen ejecutivo

El sitio tiene una arquitectura SEO técnicamente sana: JSON-LD válido y sincronizado en las 7 páginas, un solo `<h1>` por página, sitemap/robots correctos, y una interlinking coherente (todas las páginas se enlazan entre sí vía nav, y las 4 páginas satélite enlazan contextualmente en el cuerpo hacia `desarrollo-software-a-medida/` como pilar). El problema real no es técnico, es de **redundancia editorial**: `software-empresas/` duplica casi textualmente 3 de sus 5 FAQ con el pilar central, y su `<title>` compite por la misma intención de búsqueda. Esto es exactamente lo que B.9 ya identificó — sigue vigente, no cambia.

Sobre el alcance internacional: el hallazgo más importante es que **el sitio entero tiene una sola frase, en una sola página secundaria (`desarrollo-web/`), que menciona servir clientes fuera de Colombia**. Cada `Organization`/`Service` en JSON-LD declara `areaServed: "CO"` sin excepción, cada `og:locale` es `es_CO`, y no hay ni una mención de "Hispanoamérica" o país distinto a Colombia en ningún copy visible. No es una señal contradictoria — es simplemente inexistente. Expandir el alcance no requiere páginas nuevas ni por país; requiere decidir, con aprobación del dueño de la marca, dónde y cómo introducir esa señal sin diluir el posicionamiento local que hoy funciona bien.

## 2. Estado SEO actual

| Página | Intención | Title (long.) | H1 | Geo (menciones) | FAQ | JSON-LD | Riesgo |
|---|---|---|---|---|---|---|---|
| Home | Marca / hub | "EIA Softworks — Consultoría & Desarrollo de Software" (52) | "Entendemos el negocio antes de construir el software" | Cartagena×9, Colombia×11 | 4, generales (ya redistribuidas en B.9 parcial) | Organization, WebSite, WebPage, FAQPage | Bajo |
| Contacto | Transaccional | "Contacto — EIA Softworks" (24) | "Hablemos de tu próximo proyecto" | Cartagena×7, Colombia×9 | Sin FAQ | Organization, WebSite, ContactPage, BreadcrumbList | Ninguno |
| Desarrollo Web | Servicio (web) | "Desarrollo Web a Medida para Empresas — EIA Softworks" (53) | "Entendemos tu negocio antes de diseñar tu sitio web" | Cartagena×10, Colombia×12, "remoto"×2 | 4, específicas de web | +Service, BreadcrumbList, FAQPage | Bajo |
| Desarrollo Software a Medida (**pilar**) | Servicio (autoridad temática) | "Desarrollo de Software a Medida para Empresas — EIA Softworks" (61) | "Software a medida que empieza por entender tu negocio" | Cartagena×9, Colombia×11 | 5, generales de "software a medida" | +Service, BreadcrumbList, FAQPage | **Alto** (fuente de la duplicación) |
| Software Empresas | Servicio (sector privado) | "Software para Empresas — EIA Softworks" (38) | "Software para empresas que entiende cómo opera tu negocio" | Cartagena×9, Colombia×11 | 5, **3 casi duplicadas del pilar** | +Service, BreadcrumbList, FAQPage | **Alto** |
| Software Entidades Públicas | Servicio (sector público) | "Software para Entidades Públicas — EIA Softworks" (48) | "Software para entidades públicas que entiende sus procesos institucionales" | Cartagena×9, Colombia×11 | 5, mayormente diferenciadas (2/5 con solape conceptual) | +Service, BreadcrumbList, FAQPage | Medio |
| Power BI Dashboard | Servicio (dato/BI) | "Dashboards y Power BI — EIA Softworks" (37) | "Dashboards y Power BI que convierten datos dispersos en decisiones claras" | Cartagena×9, Colombia×11 | 5, específicas de Power BI | +Service, BreadcrumbList, FAQPage | Ninguno |

Meta descriptions: 111–174 caracteres (Contacto 111, el resto 150–174). Google suele truncar cerca de ~155–160 — `desarrollo-software-a-medida` (166), `software-empresas` (166) y `software-entidades-publicas` (174) están en o sobre ese límite. No es parte del alcance de B.9 (restricción explícita: no tocar meta descriptions), queda como observación técnica para más adelante.

## 3. Arquitectura SEO

```
Home (hub de marca, sin Service propio en JSON-LD)
 ├─ enlaza a las 6 páginas de servicio + Contacto (nav completo en las 7 páginas)
 │
 ├─ Desarrollo de Software a Medida  ← PILAR CENTRAL (autoridad temática de "software a medida")
 │     ↑ enlazado contextualmente en el cuerpo (no solo nav) desde:
 │        Desarrollo Web · Software Empresas · Software Entidades Públicas · Power BI Dashboard
 │
 ├─ Desarrollo Web           (satélite, intención propia: sitios/landing)
 ├─ Software Empresas        (satélite, intención casi idéntica al pilar — ver riesgo)
 ├─ Software Entidades Públicas (satélite, intención diferenciada por sector institucional)
 ├─ Power BI Dashboard       (satélite, intención propia: datos/BI)
 └─ Contacto                 (transaccional, sin contenido temático, sin FAQ)
```

El enlazado interno es plano por nav (cada página enlaza a todas) pero jerárquico en el cuerpo: las 4 páginas satélite citan explícitamente "nuestro enfoque general de desarrollo de software a medida" enlazando al pilar — arquitectura de autoridad temática correctamente construida, no tocar.

## 4. B.9 — qué mantener / modificar / eliminar / posponer

- **Mantener:** la redistribución de FAQ ya planeada (listas A/B/C del brief original) — el hallazgo de duplicación (`software-empresas` repite casi textual 3/5 preguntas del pilar) la confirma como necesaria, no especulativa.
- **Mantener:** el ajuste de `<title>` de `software-empresas/` y `software-entidades-publicas/` — confirmado con datos: `software-empresas` (38 car.) es el título más corto y genérico del sitio, y su patrón "Software para X" compite directamente con el pilar.
- **Modificar (respecto al brief original):** ninguna modificación estructural necesaria — el plan sigue siendo correcto. Lo único que se agrega es una consideración de alcance (ver punto siguiente), no una corrección.
- **Eliminar:** nada.
- **Posponer:** cualquier cambio de `areaServed` en JSON-LD o de copy geográfico — no estaba en el alcance original de B.9 y no debe mezclarse con la limpieza de FAQ/títulos. Es una decisión separada (ver §11).
- **Nueva consideración derivada del alcance internacional:** cuando se redistribuyan las FAQ de las páginas pilar, hay espacio natural para que **una** de las preguntas (probablemente en Home o en la página pilar) aborde explícitamente "¿trabajan con clientes fuera de Colombia?" — hoy esa respuesta solo existe, enterrada, en `desarrollo-web/`. No se propone como implementación automática de B.9; es una decisión de producto (ver §11).

## 5. Estrategia geográfica: Cartagena → Colombia → Hispanoamérica

- **Local (Cartagena):** señal fuerte y consistente — 7-10 menciones por página, dirección/teléfono en JSON-LD, footer siempre "Cartagena de Indias, Colombia". Funciona bien, no tocar.
- **Nacional (Colombia):** también fuerte y consistente — cada meta description cierra con "Cartagena y Colombia" o "Cartagena y toda Colombia"; `areaServed: "CO"` en todo el JSON-LD. El patrón local→nacional ya está bien resuelto en el copy actual.
- **Internacional (Hispanoamérica):** prácticamente ausente. Ni una mención en meta descriptions, `og:locale` (siempre `es_CO`), `areaServed` (siempre `CO`), ni copy visible de Home/Contacto/pilares. Única excepción: una frase en el FAQ de `desarrollo-web/`.

**Tensión a resolver, no a ignorar:** ampliar el `areaServed`/copy geográfico de forma agresiva en todas las páginas puede diluir la señal local que hoy sostiene el posicionamiento en Cartagena (Google Local Pack premia consistencia geográfica estrecha). La recomendación no es "agregar Venezuela en todos lados", sino mantener el NAP (nombre/dirección/teléfono) y el `areaServed` core concentrados en Colombia, y permitir que el lenguaje de "trabajo remoto para toda la región" viva en contenido de apoyo (una FAQ, un párrafo de Contacto) sin tocar los datos estructurados de ubicación. Es una decisión de producto, no una implementación técnica trivial.

## 6. Venezuela y Hispanoamérica

- **Oportunidad:** existe, pero no hay evidencia en el repositorio (ni debería inventarse) sobre volumen real de búsqueda o demanda desde Venezuela u otros países. Es desconocido.
- **Riesgo de crear una landing específica ahora:** clasificaría como "contenido artificial" — exactamente lo que se prohíbe recomendar sin justificación comercial. No hay evidencia de demanda ni de un servicio diferenciado para ese mercado.
- **Qué puede hacerse dentro de las páginas existentes (sin crear páginas nuevas):** una mención natural, no repetitiva, de que el trabajo es remoto y abierto a clientes hispanohablantes fuera de Colombia — en un lugar (ej. una FAQ de Home o de Contacto), no repetida artificialmente en las 7 páginas.
- **Qué sería contraproducente:** repetir "Venezuela" como keyword en múltiples páginas sin contenido real detrás; ampliar `areaServed` a valores vagos no soportados por Schema.org; cualquier señal que sugiera presencia física fuera de Cartagena (falso, y arriesga las guías de Google Business Profile si en algún momento se vincula una ficha local).
- **Cuándo tendría sentido una landing por país:** solo con evidencia real — inquiries/clientes efectivos desde ese país, o datos de Search Console/GA4 mostrando impresiones/clics sostenidos desde esa geografía para consultas relevantes. No antes.
- **Evidencia que falta y debería recopilarse primero:** reporte de países en Search Console (impresiones/clics por query), reporte de geografía en GA4 (usuarios por país), y — dato que hoy no se captura — el formulario de contacto no tiene campo de país, así que ni siquiera los leads reales quedan geolocalizados. Esto limita saber, con datos propios, si ya hay demanda desde fuera de Colombia.

## 7. FAQ / JSON-LD

- **Sincronización visible↔JSON-LD:** verificada programáticamente en esta auditoría (comparación automatizada `<summary>` vs `mainEntity`) — **las 7 páginas están sincronizadas**. Criterio de validación permanente para cualquier cambio futuro de FAQ.
- **Duplicación detectada:**
  - `software-empresas/` vs `desarrollo-software-a-medida/`: 3 de 5 preguntas son la misma pregunta reformulada ("¿cuánto cuesta...?", "¿cuándo debería desarrollar software propio...?", "¿en qué se diferencia de un software estándar?"). **La duplicación más severa del sitio.**
  - `software-entidades-publicas/` vs el pilar: solape conceptual moderado en 2 de 5 (adaptar/integrar sistemas existentes; software genérico vs. a medida), pero ya reformuladas en clave institucional — menos grave.
  - `desarrollo-web/`, `power-bi-dashboard/`, Home: sin duplicación entre sí ni con el pilar.
- **Preguntas demasiado genéricas para su página:** las 3 duplicadas de `software-empresas/` — no aportan intención de búsqueda específica del sector empresarial (integración con sistemas existentes, plazos de proyectos empresariales, seguridad de datos — que es justamente lo que el brief original de B.9 ya proponía como reemplazo).
- **Regla de sincronización:** cualquier redistribución de FAQ debe hacer el cambio visible y el cambio JSON-LD en el mismo edit, nunca en pasos separados — ya ocurrió una vez un desajuste temporal durante el trabajo previo en `index.html` y se corrigió a tiempo.

## 8. Titles

| Página | Actual | Longitud | Propuesta para discusión |
|---|---|---|---|
| `desarrollo-software-a-medida/` | Desarrollo de Software a Medida para Empresas — EIA Softworks | 61 | **No tocar** (pilar central, regla explícita) |
| `software-empresas/` | Software para Empresas — EIA Softworks | 38 | "Soluciones Tecnológicas para Empresas — EIA Softworks" (evita "software" y "a medida", diferencia el ángulo) |
| `software-entidades-publicas/` | Software para Entidades Públicas — EIA Softworks | 48 | "Tecnología para el Sector Público — EIA Softworks" (evita "software" y el patrón "Software para X" que comparte con `software-empresas/`) |
| Resto de páginas | — | 24–53 | Sin cambios — sin riesgo de canibalización detectado |

## 9. Medición futura (Search Console + GA4)

- GA4 ya está activo con una sola propiedad (`G-XJQSVD0RMP`) consistente en las 7 páginas — buena base existente.
- No se encontró meta tag `google-site-verification` en el repositorio — la verificación de Search Console, si existe, se hizo por otro método (DNS, u otro). **Desconocido desde el repo**, no debe asumirse verificado ni no verificado.
- Antes de decidir sobre expansión internacional, revisar (no configurar ahora): reporte de **países** en Search Console (impresiones/clics/posición por query y por país), reporte de **geografía** en GA4 (usuarios/sesiones por país), páginas indexadas vs. enviadas en el sitemap, y CTR por página para detectar títulos/descriptions débiles.
- Limitación actual de datos propios: el formulario de contacto no captura país del lead — sin ese dato, ni Search Console/GA4 (agregados, no vinculados a leads reales) ni el propio embudo de conversión pueden confirmar si ya hay demanda real desde fuera de Colombia.

## 10. Plan recomendado

**P0 — imprescindible (retomar B.9 tal como estaba, sin cambios de alcance):**
1. Redistribuir FAQ de las 3 páginas pilar (listas A/B/C ya definidas), actualizando JSON-LD en el mismo cambio.
2. Ajustar `<title>` de `software-empresas/` y `software-entidades-publicas/`.

**P1 — importante (requiere decisión de producto antes de ejecutar):**
3. Decidir si se agrega una mención natural de alcance internacional/remoto en algún punto del sitio (no repetida en las 7 páginas), y dónde.
4. Revisar longitud de meta descriptions largas (166–174 car.) en una futura pasada — no en B.9.

**P2 — posterior (requiere datos que hoy no existen):**
5. Confirmar estado real de Search Console (verificación, sitemap enviado, datos históricos).
6. Evaluar agregar un campo opcional de país/ciudad en el formulario de contacto, para empezar a capturar geografía real de leads.
7. Con datos de 3-6 meses de Search Console/GA4 por país, decidir si se justifica contenido dedicado a mercados específicos (nunca antes de tener esa evidencia).

## 11. Decisiones que requieren aprobación del Product Owner

- Si se agrega alguna mención de alcance internacional/remoto al copy del sitio, y en qué página(s) — no es parte del B.9 originalmente aprobado.
- Si conviene ampliar el `areaServed` en JSON-LD más allá de `"CO"`, y con qué valor (Schema.org no tiene un tipo estándar limpio para "Hispanoamérica" — requeriría definir países explícitos o una `GeoShape`, decisión de alcance comercial, no solo técnica).
- Si se agrega un campo de país al formulario de contacto (cambia el formulario y la Política de Tratamiento de Datos que enumera los campos recolectados — no es un cambio trivial de UI).
- Cuándo se considera "suficiente evidencia" de Search Console/GA4 para justificar contenido dedicado a un país.

## 12. Confirmación

- Archivos modificados durante la auditoría: ninguno.
- Commits: ninguno.
- SEO B.9: no ejecutado.
