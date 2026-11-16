import type { ProjectItem } from '../types/portfolio';

export const projectsData: ProjectItem[] = [
  {
    id: 'nexus-fintech-dashboard',
    title: 'NexusPay — Plataforma de Gestión Financiera SaaS',
    category: 'Fintech & Analytics',
    description:
      'Panel de control financiero en tiempo real para empresas con conciliación automática de pagos, reportes multi-divisa y control de permisos por equipo.',
    stackSummary: 'React + TypeScript • Node.js API • PostgreSQL & Redis',
    tags: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'REST API'],
    metrics: '+18,000 transacciones procesadas diariamente',
    repoUrl: 'https://github.com',
    liveUrl: '#proyectos',
    featured: true,
  },
  {
    id: 'nova-commerce-engine',
    title: 'NovaStore — E-Commerce Headless de Alto Rendimiento',
    category: 'E-Commerce & Web Performance',
    description:
      'Tienda en línea con arquitectura headless, catálogo estático ultrarrápido, carrito persistente, búsqueda instantánea y checkout integrado con Stripe.',
    stackSummary: 'Astro + Islands • Stripe API • Headless CMS',
    tags: ['Astro', 'TypeScript', 'Stripe', 'CSS Moderno', 'Edge CDN'],
    metrics: 'Tiempo de carga < 0.6s • +32% en tasa de conversión',
    repoUrl: 'https://github.com',
    liveUrl: '#proyectos',
    featured: true,
  },
  {
    id: 'pulse-health-booking',
    title: 'PulseMed — Sistema de Agendamiento y Telemedicina',
    category: 'HealthTech Platform',
    description:
      'Aplicación web para clínicas médicas que gestiona citas en línea, recordatorios automatizados, historial clínico encriptado y videoconsultas.',
    stackSummary: 'Next.js • WebSockets • Prisma ORM • Docker',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Docker'],
    metrics: 'Más de 120 especialistas activos en la plataforma',
    repoUrl: 'https://github.com',
    liveUrl: '#proyectos',
    featured: false,
  },
  {
    id: 'atlas-workflow-automation',
    title: 'AtlasFlow — Motor de Automatización de Tareas para Equipos',
    category: 'Productivity & SaaS',
    description:
      'Herramienta colaborativa con tableros Kanban, automatización de reglas de negocio mediante webhooks y paneles de métricas de productividad.',
    stackSummary: 'Vue 3 + Vite • Go Backend • WebSockets',
    tags: ['Vue 3', 'Vite', 'Go', 'WebSockets', 'CI/CD'],
    metrics: 'Reducción del 40% en tiempos operativos de soporte',
    repoUrl: 'https://github.com',
    liveUrl: '#proyectos',
    featured: false,
  },
];
