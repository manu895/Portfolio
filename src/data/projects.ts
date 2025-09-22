export type Project = {
  id: string;
  title: string;
  slug: string;
  year: number;
  category: 'Web App' | 'E-commerce' | 'Landing' | 'Design System';
  stack: string[];
  summary: string;
  goals: string[];
  process: string[];
  results: string[];
  images: { src: string; alt: string }[];
  repoUrl?: string;
  demoUrl?: string;
};

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Dashboard Analytics',
    slug: 'dashboard-analytics',
    year: 2024,
    category: 'Web App',
    stack: ['React', 'Vite', 'Tailwind', 'TS'],
    summary: 'Dashboard ad alte prestazioni con chart e filtri in tempo reale.',
    goals: ['LCP < 2.5s', 'Accessibilità AA', 'Code-splitting'],
    process: ['Architettura componenti', 'Ottimizzazione bundle', 'Testing'],
    results: ['CWV migliorati', '+30% conversion', 'Manutenzione semplificata'],
    images: [
      { src: '/images/projects/dashboard.png', alt: 'Dashboard overview' },
      { src: '/images/projects/dashboard.png', alt: 'Dettaglio grafici' }
    ],
    repoUrl: 'https://github.com/example/repo',
    demoUrl: 'https://example.com/demo'
  },
  {
    id: 'p2',
    title: 'E-commerce Sneakers',
    slug: 'ecommerce-sneakers',
    year: 2023,
    category: 'E-commerce',
    stack: ['React', 'Tailwind', 'TS' , 'Bootstrap'],
    summary: 'Store e-commerce con carrello e checkout mock.',
    goals: ['UI responsive', 'SEO', 'Accessibilità'],
    process: ['Design system', 'Implementazione React', 'QA'],
    results: ['+25% tempo sul sito', 'SEO +', 'UX migliorata'],
    images: [
      { src: '/images/projects/e-commerce.png', alt: 'Home store' },
      { src: '/images/projects/e-commerce.png', alt: 'Catalogo prodotti' }
    ]
  },
  {
    id: 'p3',
    title: 'Siti Vetrina',
    slug: 'landing-campagna',
    year: 2025,
    category: 'Landing',
    stack: ['Vite', 'Tailwind' , 'Javascript' , 'HTML'],
    summary: 'Landing page ad alto impatto con micro-interazioni.',
    goals: ['CTR alto', 'Above-the-fold leggero'],
    process: ['Copywriting', 'Animazioni', 'A/B test'],
    results: ['CTR +18%', 'Bounce -12%', 'SEO ottimizzato'],
    images: [
      { src: '/images/projects/sitoweb.png', alt: 'Hero landing' }
    ]
  },
  {
    id: 'p4',
    title: 'Design System UI',
    slug: 'design-system-ui',
    year: 2022,
    category: 'Design System',
    stack: ['React', 'TS' , 'Bootstrap' , 'Next JS', 'Lucide React'],
    summary: 'Libreria di componenti riutilizzabili e accessibili.',
    goals: ['Token design', 'Documentazione', 'Storybook'],
    process: ['Audit UI', 'Refactoring', 'Docs'],
    results: ['Coerenza visiva', 'Dev velocity +40%', 'Bug -20%'],
    images: [
      { src: '/images/projects/testing.png', alt: 'Component library' }
    ]
  },
  
  {
    id: 'p6',
    title: 'App',
    slug: 'App',
    year: 2021,
    category: 'Web App',
    stack: ['React', 'TS' , 'React router' , 'Node Red'],
    summary: 'App veloci, efficienti e durature.',
    goals: ['Editor semplice', 'MDX-ready'],
    process: ['Schema contenuti', 'UI CRUD', 'Build statico'],
    results: ['Tempo di pubblicazione -60%'],
    images: [
      { src: '/images/projects/app.png', alt: 'Editor contenuti' }
    ]
  }
]