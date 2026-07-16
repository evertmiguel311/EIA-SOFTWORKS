# EIA Softworks — Guía de proyecto

> Este documento es la fuente de verdad del proyecto. Antes de tomar cualquier decisión visual, estructural o de contenido, léelo. Si una decisión entra en conflicto con algo escrito aquí, este documento gana.

---

## 1. Visión del Proyecto

EIA Softworks es una marca personal en camino a convertirse en una empresa de software. Este sitio es la primera materialización pública de esa marca: no es una landing de captación agresiva, es una **presentación profesional**. Su función es dar la primera impresión correcta a alguien que está evaluando si confiarle un proyecto de software a esta marca.

El sitio debe poder crecer — en contenido, en secciones, en producto — sin que su base tenga que rehacerse. Ver también [§18 Futuras Etapas](#18-futuras-etapas).

## 2. Filosofía

La página no busca vender software. **Busca transmitir confianza.**

El visitante debe sentir que detrás de la marca existe una persona organizada, analítica y profesional. La tecnología es una consecuencia de esa forma de trabajar, no el mensaje. La confianza es el objetivo.

**Pregunta obligatoria antes de cualquier decisión de diseño:**

> ¿Esto genera más confianza?

Si la respuesta es no, se elimina. No se justifica una tarjeta, una animación, un color o una frase por ser "bonita" o "impresionante" — se justifica solo si construye confianza.

## 3. Objetivo

No buscamos parecer la empresa más grande. Buscamos parecer **la empresa en la que confiaríamos para desarrollar nuestro propio software**.

El proyecto no pretende demostrar todo lo que sabemos hacer técnicamente. Pretende demostrar que sabemos **resolver problemas**. La diferencia es enorme: la primera actitud llena la página de funcionalidades y efectos porque "se pueden hacer"; la segunda solo agrega lo que resuelve algo real para quien visita el sitio.

## 4. Identidad Visual

**Paleta actual** (definida en `styles.css`, tokens `:root`):

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `oklch(8% 0.007 262)` | Fondo — negro casi puro, con una pizca de temperatura fría |
| `--accent` | `oklch(60% 0.22 258)` | Azul eléctrico — acento principal |
| `--accent-2` | `oklch(72% 0.14 195)` | Cyan — acento secundario |
| `--accent-3` | `oklch(62% 0.14 300)` | Morado — acento terciario, **muy sutil**, nunca protagonista |
| `--ink` | `#f5f6f8` | Texto — nunca blanco puro |
| `--glass` | `rgba(255,255,255,0.04)` | Superficie de tarjetas — glassmorphism ligero |

**Tipografía:** Inter (sans, cuerpo y títulos) + JetBrains Mono (solo para kickers, etiquetas técnicas y metadatos — nunca para texto de lectura).

**Regla de acentos:** el morado (`--accent-3`) es siempre un tercer color de apoyo — un ícono, un halo, un detalle — nunca la base de una sección. Si una sección "se ve morada", está mal usado.

## 5. Público Objetivo

Dueños de negocio y equipos directivos en Colombia (y potencialmente LatAm) que necesitan software a medida y están evaluando con quién construirlo. No son desarrolladores buscando documentación técnica; son personas de negocio evaluando **confiabilidad** antes que capacidad técnica. Llegan comparando, escépticos de promesas grandes, buscando señales de seriedad y método.

## 6. Personalidad de la Marca

**Transmite:**
- Calma
- Orden
- Claridad
- Profesionalismo
- Visión
- Crecimiento

**No transmite:**
- Urgencia
- Marketing
- Ventas
- Tecnología exagerada
- Futurismo extremo

Cualquier copy, color o animación que empuje hacia la segunda lista se descarta, sin importar cuán efectivo sea "vendiendo".

## 7. Principios de Diseño

**Inspiración permanente — nunca perder esta línea visual:**
Apple · Linear · Stripe · Vercel · Notion · OpenAI

Lo que estas marcas comparten y que este proyecto debe imitar en espíritu (no en literal): tipografía cuidada, mucho espacio en blanco, un signature effect por sección (no doce), jerarquía clara, restricción de color, movimiento que explica en vez de decorar.

- **Espacio > densidad.** Priorizar siempre aire y legibilidad antes que llenar la pantalla.
- **Un signature effect por proyecto**, el resto de efectos lo apoyan — nunca compiten entre sí.
- **Contenido primero, animación después.** Un efecto que oculta texto mientras carga es una regresión, no una mejora.

## 8. Arquitectura

El sitio es **HTML + CSS + JavaScript vanilla, sin build step** (sin npm, sin framework, sin bundler) para esta etapa. Esto es intencional, no una limitación temporal por pereza:

- Debe poder subirse por FTP/drag-and-drop a Hostinger y funcionar tal cual.
- Debe abrir directo con doble clic (`file://`) sin romperse.
- Sin `<script type="module">` con imports relativos — rompe en `file://` y complica el cache-busting. Todo `<script defer>` clásico + patrón IIFE con namespace `window.__BRAND__`.
- Cache-busting manual con `?v=YYYYMMDD` en `<link>`/`<script>`, bump en cada deploy que toque CSS/JS.
- `.htaccess` en la raíz define las cabeceras de cache (HTML sin cache, JS/CSS revalidan, imágenes/fuentes cache largo).
- Imágenes siempre en `.webp` (convertidas con `tools/webp_convert.py`, Pillow).

Ver [§18 Futuras Etapas](#18-futuras-etapas) para cuándo y por qué esto cambiará.

## 9. Organización del Código

```
index.html            ← toda la estructura y contenido hardcodeado (ver §10)
styles.css              ← único archivo CSS, seccionado por número (Tokens, Reset, Nav, Hero...)
main.js                 ← entry point, IIFE, cada init() envuelto en safe()
lib/
  manifest.js            ← datos de marca: window.__BRAND__ (servicios, soluciones, sectores, stack)
  gsap.min.js / ScrollTrigger.min.js  ← únicas libs externas, vendorizadas localmente
assets/
  img/                   ← reservado para fotografía de contenido futura (.webp), vacío por ahora — ver §17
  logos/                 ← logo de marca (eia-mark.webp, favicons) + logos de tecnologías (SVG a color, sobre chip blanco)
tools/
  webp_convert.py         ← script de conversión a .webp, no se despliega
.htaccess                ← cache headers para Hostinger
```

**Convenciones de nombres:** archivos e imágenes en `kebab-case`; clases CSS en `kebab-case`; variables/funciones JS en `camelCase`; custom properties CSS con prefijo `--`.

## 10. Componentes

Todo componente debe:
1. Tener **una única responsabilidad**.
2. Ser **reutilizable** en otra sección o página sin modificarlo.
3. Depender solo de las custom properties del tema (`--accent`, `--glass`, etc.), nunca de valores hardcodeados sueltos.

Vocabulario de componentes ya establecido en `styles.css` — reutilizar antes de crear uno nuevo:

| Clase | Responsabilidad |
|---|---|
| `.glass-card` | Superficie flotante con glassmorphism + tilt 3D + halo opcional (`.has-tilt`, `.has-halo`) |
| `.btn` (`.btn-solid` / `.btn-ghost`) | Acción primaria / secundaria |
| `.tech-tile` | Logo a color de una tecnología (sin chip ni tarjeta) + nombre, flotando directo sobre el fondo |
| `.sector-card` | Tarjeta con ilustración de fondo + overlay + contenido |
| `.abstract-visual` | Ilustración abstracta en SVG (mesh de color + grid de puntos + line-art) — reemplazo permanente de fotografía de stock, ver §17 |
| `.faq-item` | Acordeón nativo (`<details>`), funciona sin JS |
| `[data-reveal]` | Reveal on scroll — nunca ocultar contenido crítico detrás de esto sin fallback |

Antes de inventar un componente nuevo, preguntar: ¿esto ya existe con otro nombre? ¿Puede resolverse variando una custom property de uno existente?

## 11. Reglas UX

- El usuario **nunca** debe sentirse abrumado.
- Nunca demasiadas tarjetas en una sola vista.
- Nunca demasiados colores compitiendo a la vez (máximo: fondo + 1 acento protagonista + 1 de apoyo).
- Nunca demasiado texto — si un párrafo puede decirse en una frase, se dice en una frase.
- Nunca demasiadas animaciones simultáneas en un mismo viewport.
- Cada sección responde una sola pregunta del visitante. Si intenta responder dos, se divide.

## 12. Reglas UI

- Fondo oscuro dominante, acentos de color usados con moderación (ver §4).
- Glassmorphism **ligero**: blur discreto, bordes de 1px casi invisibles, nunca cristal "pesado" que compita con el contenido.
- Iconografía minimalista: trazo fino, un color o gradiente de dos tonos, nunca ilustraciones complejas.
- Botones con un único estilo primario y uno secundario — no inventar variantes por sección.
- Bordes redondeados moderados (14–20px), consistentes entre componentes.

## 13. Reglas de Animaciones

Nunca hacer animaciones para impresionar. Una animación solo se justifica si:
- **Guía** la atención hacia lo que importa.
- **Explica** una relación o un cambio de estado.
- **Acompaña** una transición para que no se sienta abrupta.

Si no cumple una de esas tres, se elimina. Nunca debe **distraer**.

**Regla de rendimiento:** si una animación aporta menos valor del que cuesta en rendimiento, se elimina la animación. No se negocia "un poco más lento pero se ve mejor".

**Reduced motion:** solo se atenúan los efectos genuinamente intrusivos (video autoplay, partículas, parallax fuerte, loops infinitos). Micro-interacciones (hover, tilt, fade) se mantienen — no es una excusa para desactivar todo el movimiento.

## 14. Reglas de Accesibilidad

- Un único `<h1>` por página, jerarquía de encabezados semántica.
- `alt` descriptivo en toda imagen de contenido; `aria-hidden="true"` en decorativas.
- Skip-link funcional al inicio del `<body>`.
- `:focus-visible` siempre visible, nunca `outline: none` sin reemplazo.
- Contraste de texto mínimo 4.5:1 (cuerpo) / 3:1 (texto grande).
- Formularios con `<label>` asociado a cada campo.
- El sitio debe seguir siendo usable con JavaScript desactivado (contenido crítico hardcodeado en HTML, JS solo enriquece).

## 15. Reglas SEO

- `<title>` y `meta description` únicos y descriptivos por página.
- HTML semántico (`<nav>`, `<main>`, `<section>`, `<footer>`) — no todo `<div>`.
- Imágenes optimizadas (`.webp`, tamaños razonables) para tiempo de carga bajo.
- `lang="es"` en `<html>`.
- Copys pensados para lectura humana, no para keyword-stuffing.

## 16. Contenido

- Tono editorial, directo, sin relleno. Ninguna frase debe sonar a plantilla de agencia.
- Español como idioma principal del sitio.
- Todo dato mostrado debe ser real y verificable por el propio usuario/dueño de la marca. Si no hay dato real, se omite la sección — no se inventa uno "razonable".
- Ver [§17 Restricciones](#17-restricciones) para la lista explícita de lo que nunca se escribe.

## 17. Restricciones

**Nunca convertir esta web en una landing comercial.**

**Nunca agregar:**
- Testimonios
- Estadísticas falsas
- Clientes ficticios
- Años de experiencia inventados
- Frases exageradas ("somos líderes", "más de 500 clientes", "más de 20 años")
- Marketing agresivo
- Elementos cyberpunk exagerados
- IA "por todas partes" (mención decorativa de IA sin sustento real)
- Robots (imágenes o iconografía de robots)
- Fotografías de stock genéricas

Si en algún momento no hay un dato, cliente o cifra real que mostrar, **la sección se omite** — nunca se rellena con algo inventado "porque se ve mejor con números".

> ✅ **Resuelto (2026-07-15):** el sitio usaba fotografía de stock (Openverse, CC) en Hero, Quiénes Somos, Soluciones y Sectores, incluida una foto de un brazo robótico industrial en "Automatización de procesos" — un conflicto directo con esta sección. Se reemplazó toda esa fotografía por ilustraciones abstractas propias en SVG (componente `.abstract-visual`, ver [§10](#10-componentes)), construidas solo con los tokens de color de marca y motivos geométricos sin fotografía ni iconografía de robots. `assets/img/`, `assets/photos/`, `assets/credits.json` y `creditos.html` se eliminaron por quedar sin uso.

## 18. Futuras Etapas

El proyecto **debe sentirse como un SaaS**, aunque hoy sea una simple presentación profesional. Ninguna decisión de hoy debe cerrar la puerta a ese crecimiento — pero tampoco se adelanta complejidad que la etapa actual no necesita.

**Stack objetivo para cuando el producto lo requiera** (portal de cliente, dashboard, autenticación, backend real):

- React
- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- Laravel
- PostgreSQL

**Regla de transición:** el HTML/CSS actual está escrito con nombres de componentes y estructura semántica clara (ver §9–10) precisamente para que, cuando llegue el momento de migrar, el mapeo a componentes React sea directo — cada `.glass-card`, `.tech-tile`, `.sector-card` ya es conceptualmente un componente. No se migra antes de tener una razón funcional real (login, datos dinámicos, backend) que el HTML estático no pueda resolver.

## 19. Forma de trabajar

Instrucciones para quien (persona o Claude) trabaje en este repositorio:

1. **Antes de cualquier cambio visual o de contenido, aplica la pregunta de §2**: ¿esto genera más confianza? Si no, no se hace, aunque el usuario lo pida distraídamente en una frase suelta — en ese caso, se pregunta o se advierte, no se ejecuta en silencio.
2. **Nunca agregues nada de la lista de §17**, aunque técnicamente "quede bien" o el usuario lo sugiera de pasada sin pensarlo (testimonios, cifras, clientes). Si el usuario lo pide explícita y conscientemente, confírmalo primero — no lo asumas como "obviamente sí".
3. **No agregues funcionalidad porque es técnicamente posible.** Cada feature nueva debe resolver una necesidad real de quien visita el sitio, no una demostración de capacidad técnica.
4. **Prefiere quitar antes que añadir.** Ante la duda entre una versión con más elementos y una más simple, la más simple gana.
5. **Reutiliza componentes existentes (§10) antes de crear nuevos.**
6. **Respeta la arquitectura vanilla (§8)** hasta que exista una razón funcional real para migrar — no introduzcas build steps, frameworks o dependencias "por si acaso".
7. **Todo cambio de imagen/color/animación se valida contra §4, §11, §12 y §13** antes de darse por terminado.
8. Si un pedido del usuario entra en conflicto con este documento, dilo explícitamente y pregunta antes de proceder — este documento representa una decisión deliberada de marca, no una preferencia estética de momento.
