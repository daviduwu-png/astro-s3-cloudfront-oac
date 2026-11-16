export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
  detail: string;
}

export interface ProfileData {
  name: string;
  handle: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  availability: string;
  specialtyBadge: string;
  stats: StatItem[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: 'code' | 'layers' | 'cloud' | 'database';
  deliverables: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  stackSummary: string;
  tags: string[];
  metrics: string;
  repoUrl: string;
  liveUrl: string;
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: 'code' | 'server' | 'cloud';
  description: string;
  skills: {
    name: string;
    level: string;
  }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  type: string;
  description: string;
  highlights: string[];
  tech: string[];
}
