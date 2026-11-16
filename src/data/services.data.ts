import type { ServiceItem } from '../types/portfolio';

export const servicesData: ServiceItem[] = [
  {
    id: 'frontend-engineering',
    title: 'Desarrollo Frontend Moderno',
    description:
      'Construcción de interfaces web responsivas, accesibles y de carga instantánea utilizando componentes reutilizables y tipado estricto.',
    icon: 'code',
    deliverables: [
      'Aplicaciones SPA y sitios estáticos (Astro, React, Next.js)',
      'Sistemas de diseño escalables y componentes UI modulares',
      'Optimización de rendimiento (Core Web Vitals y SEO)',
    ],
  },
  {
    id: 'backend-apis',
    title: 'Arquitectura Backend & APIs',
    description:
      'Diseño e implementación de servicios REST y GraphQL seguros, con autenticación robusta, manejo de caché y alta concurrencia.',
    icon: 'layers',
    deliverables: [
      'Microservicios y APIs con Node.js, TypeScript y Go',
      'Autenticación JWT, OAuth 2.0 y control de acceso basado en roles',
      'Integración de pasarelas de pago y webhooks en tiempo real',
    ],
  },
  {
    id: 'database-cloud',
    title: 'Bases de Datos & Despliegue Cloud',
    description:
      'Modelado de datos relacionales y NoSQL acompañado de pipelines de integración continua e infraestructura en la nube.',
    icon: 'cloud',
    deliverables: [
      'Optimización de consultas en PostgreSQL, Redis y MongoDB',
      'Automatización de despliegues CI/CD con GitHub Actions y Docker',
      'Infraestructura escalable, monitoreo y distribución en CDN',
    ],
  },
];

