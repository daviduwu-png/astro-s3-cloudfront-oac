import type { SkillCategory } from '../types/portfolio';

export const skillsData: SkillCategory[] = [
  {
    id: 'frontend-stack',
    title: 'Frontend & Arquitectura UI',
    icon: 'code',
    description: 'Creación de interfaces modernas, modulares y optimizadas para cualquier dispositivo.',
    skills: [
      { name: 'TypeScript & JavaScript (ES2024+)', level: 'Avanzado' },
      { name: 'Astro, React & Next.js', level: 'Avanzado' },
      { name: 'Angular & Vue 3 + Vite', level: 'Intermedio-Avanzado' },
      { name: 'HTML5 Semántico, CSS Grid & Animaciones', level: 'Avanzado' },
      { name: 'Accesibilidad (WCAG) & Web Performance', level: 'Avanzado' },
    ],
  },
  {
    id: 'backend-stack',
    title: 'Backend, APIs & Datos',
    icon: 'server',
    description: 'Servicios escalables, diseño de bases de datos y comunicación segura.',
    skills: [
      { name: 'Node.js, Express & NestJS', level: 'Avanzado' },
      { name: 'Diseño de APIs RESTful & GraphQL', level: 'Avanzado' },
      { name: 'PostgreSQL, MySQL & Modelado SQL', level: 'Avanzado' },
      { name: 'Redis, Caché Distribuida & MongoDB', level: 'Avanzado' },
      { name: 'Autenticación OAuth2, JWT & Seguridad Web', level: 'Avanzado' },
    ],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud, DevOps & Calidad',
    icon: 'cloud',
    description: 'Infraestructura en la nube, despliegue automatizado y pruebas de software.',
    skills: [
      { name: 'AWS (S3, CloudFront, EC2, Lambda, IAM)', level: 'Avanzado' },
      { name: 'Docker, Contenedores & Linux', level: 'Avanzado' },
      { name: 'CI/CD con GitHub Actions', level: 'Avanzado' },
      { name: 'Testing Unitario e Integración (Vitest / Playwright)', level: 'Avanzado' },
      { name: 'Arquitectura Modular & Clean Code', level: 'Especialista' },
    ],
  },
];
