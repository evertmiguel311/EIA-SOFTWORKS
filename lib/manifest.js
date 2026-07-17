(function () {
  "use strict";
  window.__BRAND__ = {
    name: "EIA Softworks",
    tagline: "Consultoría & Desarrollo de Software",
    contact: {
      email: "eiasoftworks@gmail.com",
      phone: "+57 318 533 1654",
      city: "Cartagena de Indias, Colombia"
    },

    services: [
      {
        title: "Desarrollo a medida",
        desc: "Software diseñado desde los procesos reales del negocio, no desde plantillas genéricas.",
        icon: "code"
      },
      {
        title: "Consultoría de procesos",
        desc: "Mapeamos flujos de trabajo y organización interna antes de escribir una sola línea de código.",
        icon: "map"
      },
      {
        title: "UX/UI y branding digital",
        desc: "Identidad visual y experiencia de producto coherentes con la estrategia de negocio.",
        icon: "layers"
      },
      {
        title: "Arquitectura de plataformas",
        desc: "Sistemas modulares, escalables y preparados para crecer junto con la organización.",
        icon: "cube"
      },
      {
        title: "Integraciones y automatización",
        desc: "Conectamos herramientas y automatizamos procesos operativos para reducir fricción.",
        icon: "link"
      }
    ],

    sectors: [
      {
        title: "Retail & E-commerce",
        desc: "Plataformas de venta, inventario y operación conectadas en un solo sistema.",
        img: "assets/img/sector-retail.webp",
        alt: "Estantería de tienda retail con productos organizados"
      },
      {
        title: "Logística",
        desc: "Visibilidad y control sobre procesos de movimiento, distribución y cadena de suministro.",
        img: "assets/img/sector-logistica.webp",
        alt: "Operario con montacargas moviendo pallets en una bodega de logística"
      },
      {
        title: "Gobierno & Sector público",
        desc: "Sistemas de gestión y atención ciudadana con foco en trazabilidad y claridad.",
        img: "assets/img/sector-gobierno.webp",
        alt: "Edificio institucional de gobierno"
      }
    ],

    techGroups: [
      {
        name: "Frontend",
        items: [
          { name: "React", icon: "assets/logos/react.svg" },
          { name: "Next.js", icon: "assets/logos/nextjs.svg" },
          { name: "TypeScript", icon: "assets/logos/typescript.svg" },
          { name: "TailwindCSS", icon: "assets/logos/tailwindcss.svg" }
        ]
      },
      {
        name: "Backend",
        items: [
          { name: "Node.js", icon: "assets/logos/nodejs.svg" },
          { name: "Python", icon: "assets/logos/python.svg" },
          { name: "Go", icon: "assets/logos/go.svg" }
        ]
      },
      {
        name: "Cloud & Infra",
        items: [
          { name: "AWS", icon: "assets/logos/aws.svg" },
          { name: "Docker", icon: "assets/logos/docker.svg" },
          { name: "Kubernetes", icon: "assets/logos/kubernetes.svg" }
        ]
      },
      {
        name: "Datos",
        items: [
          { name: "PostgreSQL", icon: "assets/logos/postgresql.svg" },
          { name: "GraphQL", icon: "assets/logos/graphql.svg" },
          { name: "Redis", icon: "assets/logos/redis.svg" }
        ]
      }
    ]
  };
})();
