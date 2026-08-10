# Requisitos — EIA Softworks

> Los requisitos de marca, tono, diseño y restricciones de contenido viven en [`CLAUDE.md`](../CLAUDE.md) y son normativos (ver especialmente §2, §5, §6, §16, §17). Este documento cubre lo que el sitio debe **hacer** — funcional y técnicamente — no cómo debe verse.

## 1. Objetivo del producto

Sitio de presentación profesional de EIA Softworks: da la primera impresión a alguien evaluando si confiarle un proyecto de software a la marca. No es una landing de captación agresiva ni un catálogo de producto — es una carta de presentación. Ver [CLAUDE.md §1-3](../CLAUDE.md#1-visión-del-proyecto).

## 2. Público objetivo

Dueños de negocio y equipos directivos en Colombia (y potencialmente LatAm) evaluando con quién construir software a medida. Perfil de negocio, no técnico; escéptico de promesas grandes, buscando señales de método y seriedad. Ver [CLAUDE.md §5](../CLAUDE.md#5-público-objetivo).

## 3. Requisitos funcionales

### 3.1 Páginas del sitio

| Página | Ruta | Función |
|---|---|---|
| Home | `/` | Presentación general: hero, sobre mí, servicios, sectores, proceso, FAQ generales, tecnologías, contacto resumido |
| Contacto | `/contacto/` | Única página con el formulario completo de contacto |
| Desarrollo Web | `/desarrollo-web/` | Página de servicio (pilar) |
| Desarrollo de Software a Medida | `/desarrollo-software-a-medida/` | Página de servicio (pilar central) |
| Software para Empresas | `/software-empresas/` | Página de servicio (pilar, sector privado) |
| Software para Entidades Públicas | `/software-entidades-publicas/` | Página de servicio (pilar, sector público) |
| Dashboards y Power BI | `/power-bi-dashboard/` | Página de servicio |

Cada página de servicio debe tener: hero propio, contenido diferenciado (sin solapamiento de `<title>`/FAQ con otras páginas del mismo nivel), FAQ contextualizada a su tema, y CTA hacia el modal de agenda o hacia `/contacto/`.

### 3.2 Contacto

- El formulario de contacto completo (nombre, correo, teléfono obligatorio, empresa opcional, asunto/mensaje, consentimiento de datos) existe **únicamente** en `/contacto/` y en el modal de agenda (accesible desde cualquier página vía `[data-open-modal]`).
- El envío real de formularios se procesa vía Web3Forms (ver [ARCHITECTURE.md](ARCHITECTURE.md#integraciones)).
- Antes de enviar, el usuario debe aceptar la Política de Tratamiento de Datos Personales (checkbox obligatorio + modal con el texto legal completo, Ley 1581 de 2012 / Decreto 1074 de 2015).

### 3.3 Navegación

- Nav global con dropdown de servicios, replicado en versión mobile.
- FAB (botón flotante) con acceso rápido a agendar reunión o escribir por WhatsApp.
- Todo CTA de "agendar/reunión" abre el modal de agenda, nunca enlaza a `#contacto` (ver [CLAUDE.md §19.9](../CLAUDE.md#19-forma-de-trabajar)).

### 3.4 SEO

- `<title>` y `meta description` únicos por página, sin solapamiento de keywords entre páginas del mismo nivel (pilares de servicio).
- JSON-LD (`Organization`, `WebSite`, `WebPage`, `Service`, `FAQPage`, `BreadcrumbList`) por página, sincronizado con el contenido visible — en particular, las preguntas/respuestas de `FAQPage` deben coincidir exactamente con las que se muestran en el `<details class="faq-item">` de esa misma página.
- `sitemap.xml` y `robots.txt` reflejan todas las páginas publicadas.

## 4. Requisitos no funcionales

- **Sin build step**: HTML + CSS + JS vanilla. Debe poder abrirse por `file://` y subirse tal cual a hosting estático. Ver [CLAUDE.md §8](../CLAUDE.md#8-arquitectura).
- **Rendimiento**: sin librerías externas innecesarias, imágenes en `.webp`, animaciones hechas a mano (sin GSAP ni libs de animación).
- **Accesibilidad**: jerarquía semántica de encabezados, `alt` descriptivo, skip-link, `:focus-visible`, contraste mínimo 4.5:1/3:1, formularios con `<label>` asociado, contenido crítico funcional sin JS. Ver [CLAUDE.md §14](../CLAUDE.md#14-reglas-de-accesibilidad).
- **Compatibilidad**: debe funcionar igual en GitHub Pages (hosting actual) y en Hostinger (hosting objetivo futuro), sin asumir ningún comportamiento de CDN/cache específico de uno u otro más allá de lo documentado en `.htaccess` y en [CLAUDE.md §8](../CLAUDE.md#8-arquitectura).

## 5. Restricciones de contenido (no negociables)

Nunca agregar testimonios, estadísticas falsas, clientes ficticios, años de experiencia inventados, frases de marketing agresivo, iconografía de robots o fotografía de stock. Si no hay un dato real que mostrar, la sección se omite. Lista completa y razón de cada restricción en [CLAUDE.md §17](../CLAUDE.md#17-restricciones).

## 6. Fuera de alcance (por ahora)

No hay backend, autenticación, base de datos ni portal de cliente. El stack objetivo para cuando el producto lo requiera (React, Next.js, TypeScript, Tailwind, Framer Motion, Laravel, PostgreSQL) está definido en [CLAUDE.md §18](../CLAUDE.md#18-futuras-etapas), pero no se adelanta sin una razón funcional real (login, datos dinámicos, backend).
