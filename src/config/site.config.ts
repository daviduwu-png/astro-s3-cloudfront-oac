import type { NavItem } from '../types/portfolio';

export const siteConfig = {
  title: 'Alex Rivera | Senior Full-Stack Developer — Portafolio',
  description:
    'Portafolio profesional de desarrollo de software Full-Stack, diseño de sistemas web escalables, APIs de alto rendimiento y aplicaciones modernas.',
  author: 'Alex Rivera',
  role: 'Senior Full-Stack Developer',
  email: 'contacto@alexrivera.dev',
  navItems: [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Habilidades', href: '#habilidades' },
    { label: 'Experiencia', href: '#experiencia' },
    { label: 'Contacto', href: '#contacto' },
  ] satisfies NavItem[],
  socials: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
};
