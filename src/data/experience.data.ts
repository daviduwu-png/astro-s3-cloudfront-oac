import type { ExperienceItem } from '../types/portfolio';

export const experienceData: ExperienceItem[] = [
  {
    period: '2023 — Presente',
    role: 'Senior Full-Stack Developer',
    company: 'Veridian Digital Solutions',
    type: 'Tiempo Completo • Remoto',
    description:
      'Liderazgo técnico en el desarrollo de aplicaciones web empresariales con arquitectura modular, mejorando el rendimiento de carga y la escalabilidad del frontend y backend.',
    highlights: [
      'Diseñé e implementé una arquitectura frontend modular que redujo el tiempo de compilación y entrega de nuevas funcionalidades en un 35%.',
      'Optimicé las métricas de Core Web Vitals logrando puntuaciones superiores a 98/100 en Lighthouse.',
      'Integré flujos de despliegue continuo automatizados hacia infraestructura en la nube con cero tiempo de inactividad.',
    ],
    tech: ['TypeScript', 'Astro', 'React', 'Node.js', 'PostgreSQL', 'AWS'],
  },
  {
    period: '2020 — 2023',
    role: 'Full-Stack Software Engineer',
    company: 'Kinetix Cloud Labs',
    type: 'Tiempo Completo',
    description:
      'Desarrollo de plataformas SaaS B2B, creación de APIs REST de alta disponibilidad y migración de sistemas monolíticos hacia arquitecturas desacopladas.',
    highlights: [
      'Desarrollé módulos de facturación, paneles analíticos en tiempo real y pasarelas de pago con Stripe.',
      'Implementé estrategias de caché y distribución por CDN disminuyendo la latencia global por debajo de 30ms.',
      'Colaboré en revisiones de código, pruebas automatizadas y documentación técnica para el equipo de ingeniería.',
    ],
    tech: ['React', 'Vite', 'Node.js', 'Docker', 'Redis', 'GitHub Actions'],
  },
];
