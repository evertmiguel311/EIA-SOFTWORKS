# Registro de decisiones (ADR)

Decisiones de arquitectura y producto relevantes, con su contexto y consecuencias. Formato corto (Contexto / Decisión / Consecuencias). Una decisión no se edita en retrospectiva: si se revierte, se documenta como una decisión nueva que referencia a la que reemplaza.

| # | Fecha | Decisión | Estado |
|---|---|---|---|
| [DEC-001](DEC-001.md) | 2026-07-15 | Sitio HTML/CSS/JS vanilla, sin build step | Vigente |
| [DEC-002](DEC-002.md) | 2026-07-15 | Ilustraciones SVG propias en vez de fotografía de stock | Vigente |
| [DEC-003](DEC-003.md) | 2026-07-16 | Alternancia de secciones oscuras y claras | Vigente |
| [DEC-004](DEC-004.md) | 2026-07-16 | Eliminación de la sección "Soluciones" por redundante | Vigente |
| [DEC-005](DEC-005.md) | 2026-07-17 | Retrato real del fundador, única excepción a "sin fotografía" | Vigente |
| [DEC-006](DEC-006.md) | 2026-07-17 | Íconos sociales del footer sin enlace hasta tener perfiles reales | Vigente (pendiente de reemplazo) |
| [DEC-007](DEC-007.md) | 2026-07-17 | GitHub Pages como hosting actual, Hostinger como destino futuro | Vigente |
| [DEC-008](DEC-008.md) | 2026-07-18 | Consentimiento de datos y campos obligatorios en formularios | Vigente |
| [DEC-009](DEC-009.md) | 2026-07-18 | Eliminación de `lib/` y `manifest.js` por código muerto | Vigente |
| [DEC-010](DEC-010.md) | 2026-08-11 | Diferenciación SEO de páginas satélite y progresión geográfica ("B.9") | Vigente |
| [DEC-011](DEC-011.md) | 2026-09-02 | Relanzamiento comercial: "Software para Empresas" → "Desarrollo de Aplicaciones Móviles"; "Dashboards y Power BI" → "Integraciones y Dashboards de Datos" | Vigente (no publicado) |
| [DEC-012](DEC-012.md) | 2026-09-02 | Rediseño CGO/UX de las 4 páginas de servicio restantes: patrón hero-photo + precios adelantados | Aprobada (implementada parcialmente, ver DEC-013) |
| [DEC-013](DEC-013.md) | 2026-09-03 | Renombre `software-empresas/` → `aplicaciones-moviles/` e implementación del patrón de DEC-012 (sin hero-photo, bloqueado por falta de imágenes) | Implementado (no publicado) |

Las decisiones DEC-001 a DEC-009 se reconstruyeron a partir de las notas fechadas ya existentes en [`CLAUDE.md`](../../CLAUDE.md) al momento de crear este registro (2026-08-10); desde esa fecha, toda decisión nueva se documenta primero aquí.
