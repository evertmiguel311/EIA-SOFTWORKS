# Changelog — EIA Softworks

Generado a partir del historial real de `git log` de la rama `master`. Formato: fecha, hash corto, resumen. Las entradas no se reescriben — una corrección se agrega como entrada nueva.

## 2026-08

- `354b48d` — 2026-08-03 — Corregir patrón de validación del teléfono inválido en Chrome reciente.
- `42c7fd6` — 2026-08-03 — Cerrar el modal de agenda automáticamente tras enviar el formulario.

## 2026-07

- `3f02013` — 2026-07-27 — Agregar `sitemap.xml` y `robots.txt`, sumar cláusula de cookies analíticas a la política de datos.
- `c57b0d1` — 2026-07-27 — Agregar etiqueta de Google Analytics 4 (GA4).
- `7983dd7` — 2026-07-22 — Reemplazar foto de Sobre mí por crossfade de escritorio a retrato con halo.
- `40cd089` — 2026-07-20 — Animar Hero: gradiente en loop, isotipo flotante más rápido y flujo en líneas de red.
- `827227f` — 2026-07-18 — Rediseñar formulario de agenda, alternar tonos de sección y limpiar código muerto. Ver [DEC-009](decisions/DEC-009.md).
- `5e03f2e` — 2026-07-18 — Agregar consentimiento de datos, campo Empresa, teléfono obligatorio y modal de política de tratamiento de datos. Ver [DEC-008](decisions/DEC-008.md).
- `78e31b7` — 2026-07-17 — Corregir alineación del correo en el footer y documentar cambios de la sesión en `CLAUDE.md`.
- `bd26bff` — 2026-07-17 — Revertir retrato de Sobre mí al recorte circular con anillo (sin desborde de cabello/hombros).
- `7c880b7` — 2026-07-17 — Actualizar contacto a `eiasoftworks@gmail.com`, retrato en Sobre mí con anillo de marca, header flotante más delgado, footer en columnas con redes sociales, y CTAs de reunión abren modal. Ver [DEC-005](decisions/DEC-005.md), [DEC-006](decisions/DEC-006.md).
- `764bb50` — 2026-07-16 — Quitar sección Soluciones por redundante y ajustar alternancia clara/oscura. Ver [DEC-004](decisions/DEC-004.md).
- `c00f3b3` — 2026-07-16 — Suavizar transición del modal de agenda y unificar tarjetas de Sectores con Servicios.
- `df6f83d` — 2026-07-16 — Sumar movimiento, alternancia clara/oscura y botón flotante con modal de agenda. Ver [DEC-003](decisions/DEC-003.md).
- `b67b2cc` — 2026-07-16 — Revertir foto en Sobre mí: el recorte dejaba un halo cuadriculado visible.
- `6f4133b` — 2026-07-16 — Agregar foto real en Sobre mí y ajustar texto a formato cita.
- `55cdcc7` — 2026-07-16 — Reforzar identidad del Hero, sección Sobre mí, manifiesto y footer.
- `49cfc4d` — 2026-07-16 — Restablecer el formulario de contacto 10s después de un envío exitoso.
- `99fb0ce` — 2026-07-16 — Agregar teléfono opcional al formulario y prefijo de asunto para filtrado.
- `8977abc` — 2026-07-16 — Conectar el formulario de contacto a Web3Forms (envío real).
- `2c67db2` — 2026-07-16 — Quitar tarjetas de los logos de tecnología para un look más limpio.
- `6f4f628` — 2026-07-16 — Reducir espaciado entre secciones, limpiar títulos y actualizar stack tecnológico.
- `d4e3959` — 2026-07-15 — Agrandar logo del nav 3x y ajustar altura del nav.
- `ace8648` — 2026-07-15 — Initial commit: EIA Softworks presentation site. Ver [DEC-001](decisions/DEC-001.md), [DEC-002](decisions/DEC-002.md).

## Sin publicar (working tree, no commiteado)

> Ver [CURRENT-STATE.md](CURRENT-STATE.md) para el detalle completo y actualizado.

- Seis páginas de servicio nuevas (`contacto/`, `desarrollo-web/`, `desarrollo-software-a-medida/`, `software-empresas/`, `software-entidades-publicas/`, `power-bi-dashboard/`) existen en disco pero nunca se han commiteado.
- `index.html`, `main.js`, `styles.css`, `sitemap.xml` tienen cambios locales sin commitear (accesibilidad B.8 y SEO B.9 en curso).
- `Informe_EIA_Softworks.docx` está en stage (`git add`) sin commitear.
