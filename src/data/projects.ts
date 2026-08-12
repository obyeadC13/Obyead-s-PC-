export interface Project {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  category: 'web' | 'game' | 'other';
  featured: boolean;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  overview: string;
  problem: string;
  solution: string;
  role: string;
  keyFeatures: string[];
  challenges: string[];
  learnings: string[];
}

export const projects: Project[] = [
  {
    id: 'terminal-13',
    name: 'Terminal 13',
    description: 'Interactive detective mystery game with terminal-style UI, evidence investigation, and deduction mechanics.',
    shortDescription: 'Detective mystery game',
    category: 'game',
    featured: true,
    tech: ['Astro', 'React', 'TypeScript', 'Game Design'],
    liveUrl: 'https://terminal13.vercel.app',
    githubUrl: '#',
    overview: 'Terminal 13 is an interactive detective mystery game that immerses players in a terminal-style interface where they investigate clues, analyze evidence, and make deductions to solve a complex case.',
    problem: 'Traditional point-and-click adventure games have become stale. There was a need for a fresh approach to interactive storytelling that feels modern and engaging.',
    solution: 'Built a terminal-inspired UI that turns investigation into an interactive CLI experience. Players navigate files, cross-reference evidence, and piece together the story through deduction.',
    role: 'Solo developer — handled game design, UI/UX, front-end development, and narrative writing.',
    keyFeatures: [
      'Terminal-style investigation interface',
      'Evidence cross-referencing system',
      'Multiple ending paths based on deductions',
      'Immersive cyberpunk aesthetic',
      'Responsive design for all screen sizes',
    ],
    challenges: [
      'Creating engaging gameplay without traditional game mechanics',
      'Balancing puzzle difficulty across different player types',
      'Designing a terminal UI that feels authentic yet accessible',
    ],
    learnings: [
      'Interactive narratives can thrive in unexpected UI formats',
      'The importance of pacing in mystery storytelling',
      'How to make text-heavy interfaces feel dynamic and engaging',
    ],
  },
  {
    id: 'crm-snowy',
    name: 'CRM Snowy',
    description: 'Full-stack customer relationship management system with analytics dashboard and automated workflows.',
    shortDescription: 'CRM platform with analytics',
    category: 'web',
    featured: true,
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'TypeScript'],
    githubUrl: '#',
    overview: 'A comprehensive CRM system featuring a real-time analytics dashboard, automated workflow engine, customer pipeline management, and team collaboration tools.',
    problem: 'Small to medium businesses need powerful CRM capabilities without the complexity and cost of enterprise solutions like Salesforce.',
    solution: 'Built a full-stack CRM with real-time dashboards, automated workflows, and intuitive pipeline management that delivers enterprise-grade features in a streamlined interface.',
    role: 'Full-stack lead — designed database schema, built APIs, developed frontend components, and implemented the workflow engine.',
    keyFeatures: [
      'Real-time analytics dashboard with live charts',
      'Automated workflow engine with custom triggers',
      'Customer pipeline management with drag-and-drop',
      'Team collaboration with activity feeds',
      'Redis-based caching for performance',
    ],
    challenges: [
      'Designing a schema flexible enough for diverse business needs',
      'Implementing real-time updates across multiple connected clients',
      'Building an intuitive workflow builder from scratch',
    ],
    learnings: [
      'The importance of data modeling for multi-tenant applications',
      'How to architect real-time features at scale',
      'Balancing feature richness with UI simplicity',
    ],
  },
  {
    id: 'pos-snowy',
    name: 'POS Snowy',
    description: 'Cloud-based point of sale system with real-time inventory tracking and payment processing.',
    shortDescription: 'Cloud POS with real-time inventory',
    category: 'web',
    featured: true,
    tech: ['React', 'Node.js', 'Stripe', 'WebSocket', 'TypeScript'],
    githubUrl: '#',
    overview: 'A modern cloud-based point of sale system with real-time inventory tracking, Stripe payment integration, multi-location support, and comprehensive sales reporting.',
    problem: 'Existing POS systems are either too expensive, too complex, or lack the real-time features modern retailers need.',
    solution: 'Created a streamlined cloud POS with live inventory sync, Stripe payments, WebSocket-based real-time updates, and an intuitive interface for quick transactions.',
    role: 'Full-stack developer — built the transaction engine, payment integration, real-time sync, and dashboard.',
    keyFeatures: [
      'Real-time inventory tracking across locations',
      'Stripe payment processing integration',
      'WebSocket-based live updates',
      'Sales analytics and reporting dashboard',
      'Quick transaction flow optimized for speed',
    ],
    challenges: [
      'Ensuring transaction reliability and data consistency',
      'Handling real-time inventory sync without race conditions',
      'Optimizing the checkout flow for speed and accuracy',
    ],
    learnings: [
      'Critical importance of transaction safety in payment systems',
      'Effective WebSocket architecture for real-time sync',
      'How to design for edge cases in retail operations',
    ],
  },
  {
    id: 'local-pos-snowy',
    name: 'Local POS Snowy',
    description: 'Offline-first point of sale solution designed for low-connectivity environments with sync capabilities.',
    shortDescription: 'Offline-first POS system',
    category: 'web',
    featured: false,
    tech: ['React', 'IndexedDB', 'Electron', 'Node.js'],
    githubUrl: '#',
    overview: 'An offline-first point of sale solution built with Electron, designed for environments with unreliable connectivity. Transactions, inventory, and reporting work fully offline with automatic sync when connection is restored.',
    problem: 'Many retail locations have unreliable internet connectivity, making cloud-only POS solutions impractical.',
    solution: 'Built an Electron-based POS that works entirely offline using IndexedDB, with automatic conflict-resolution sync when connectivity is restored.',
    role: 'Lead developer — designed offline architecture, conflict resolution strategy, and Electron integration.',
    keyFeatures: [
      'Full offline operation with IndexedDB',
      'Automatic sync with conflict resolution',
      'Electron desktop app packaging',
      'Receipt printing support',
      'Barcode scanner integration',
    ],
    challenges: [
      'Designing a conflict resolution strategy for concurrent edits',
      'Ensuring data integrity during offline periods',
      'Packaging a performant Electron app with small footprint',
    ],
    learnings: [
      'Offline-first architecture requires fundamentally different data thinking',
      'Conflict resolution strategies and when to use each',
      'Electron packaging and optimization',
    ],
  },
  {
    id: 'project-13',
    name: 'Project 13',
    description: '2D game with custom engine and hand-crafted pixel art levels.',
    shortDescription: '2D platformer with custom engine',
    category: 'game',
    featured: false,
    tech: ['JavaScript', 'Canvas API', 'Pixel Art'],
    githubUrl: '#',
    overview: 'A 2D platformer built with a custom game engine from scratch using Canvas API, featuring hand-crafted pixel art levels and smooth physics-based gameplay.',
    problem: 'Most game engines are overkill for simple 2D games. There was a need for a lightweight, custom-built engine tailored to specific gameplay needs.',
    solution: 'Built a custom 2D game engine from scratch with collision detection, animation system, tile-based level editor, and hand-crafted pixel art.',
    role: 'Solo developer — built the engine, designed levels, created pixel art, and implemented all game mechanics.',
    keyFeatures: [
      'Custom 2D physics engine with collision detection',
      'Tile-based level editor',
      'Hand-crafted pixel art and animations',
      'Smooth 60fps gameplay',
      'Progressive difficulty curves',
    ],
    challenges: [
      'Building a performant game engine from scratch',
      'Creating smooth collision detection and response',
      'Designing engaging level progression',
    ],
    learnings: [
      'Fundamentals of game physics and collision systems',
      'Importance of frame-budget management in Canvas rendering',
      'Level design principles for engaging platformers',
    ],
  },
  {
    id: 'super-swipe',
    name: 'Super Swipe',
    description: 'Fast-paced digital card game with swipe mechanics, competitive rankings, and deck building.',
    shortDescription: 'Competitive card game',
    category: 'game',
    featured: false,
    tech: ['React', 'WebSocket', 'Game Design'],
    githubUrl: '#',
    overview: 'A fast-paced digital card game featuring swipe-to-play mechanics, real-time competitive matches, deck building strategy, and seasonal rankings.',
    problem: 'Digital card games are often slow and complex. There was room for a fast-paced, mobile-friendly card game with accessible mechanics.',
    solution: 'Designed a swipe-based card game with real-time multiplayer, streamlined rounds, and a compelling deck-building meta.',
    role: 'Game designer and developer — designed game mechanics, built the real-time multiplayer system, and created the card database.',
    keyFeatures: [
      'Swipe-to-play card mechanics',
      'Real-time multiplayer via WebSocket',
      'Deck building with card synergies',
      'Seasonal competitive rankings',
      'Animated card interactions',
    ],
    challenges: [
      'Designing balanced card synergies',
      'Implementing low-latency real-time multiplayer',
      'Creating an engaging onboarding experience',
    ],
    learnings: [
      'Game balance and card design mathematics',
      'WebSocket-based real-time game architecture',
      'Importance of first-time user experience in competitive games',
    ],
  },
  {
    id: 'fatink',
    name: 'Fatink',
    description: 'Digital platform with creative tools and messaging features.',
    shortDescription: 'Creative messaging platform',
    category: 'web',
    featured: false,
    tech: ['React', 'Node.js', 'WebSocket'],
    githubUrl: '#',
    overview: 'A digital platform combining creative tools with real-time messaging, enabling users to create, share, and communicate in one workspace.',
    problem: 'Creative professionals need tools that combine creation and communication without context-switching between apps.',
    solution: 'Built an integrated platform with creative tools, real-time messaging, and shared workspaces for seamless collaboration.',
    role: 'Full-stack developer — built the messaging system, creative tool interfaces, and real-time collaboration features.',
    keyFeatures: [
      'Real-time messaging with WebSocket',
      'Built-in creative tools',
      'Shared workspaces',
      'File sharing and previews',
    ],
    challenges: [
      'Synchronizing creative state across multiple users',
      'Building performant real-time messaging',
      'Designing an intuitive creative interface',
    ],
    learnings: [
      'Operational transformation for collaborative editing',
      'Real-time application architecture patterns',
      'Designing interfaces for creative workflows',
    ],
  },
  {
    id: 'fame',
    name: 'Fame',
    description: 'Social platform and branding tool for content creators and influencers.',
    shortDescription: 'Creator branding platform',
    category: 'web',
    featured: false,
    tech: ['Next.js', 'Tailwind CSS', 'PostgreSQL'],
    githubUrl: '#',
    overview: 'A social platform and branding toolkit designed for content creators to manage their presence, analyze engagement, and grow their audience across platforms.',
    problem: 'Content creators struggle to manage their brand presence across multiple platforms without dedicated tools.',
    solution: 'Created a unified platform with profile management, analytics, content scheduling, and audience insights tailored for creators.',
    role: 'Full-stack developer — built the platform with Next.js, designed analytics dashboards, and implemented social integrations.',
    keyFeatures: [
      'Unified creator dashboard',
      'Cross-platform analytics',
      'Content scheduling and previews',
      'Audience engagement insights',
    ],
    challenges: [
      'Integrating multiple social media APIs',
      'Designing analytics that are actionable for creators',
      'Building a responsive dashboard for mobile-first users',
    ],
    learnings: [
      'Working with third-party social APIs and their rate limits',
      'Data visualization best practices for analytics',
      'Mobile-first design for creator tools',
    ],
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'OS-style interactive portfolio website with terminal mode, draggable windows, and cyberpunk aesthetic.',
    shortDescription: 'Interactive OS-style portfolio',
    category: 'web',
    featured: true,
    tech: ['React', 'Vite', 'Tailwind CSS', 'TypeScript', 'Framer Motion'],
    githubUrl: '#',
    overview: 'An interactive portfolio website designed as a virtual operating system with a terminal mode, draggable windows, animated backgrounds, and a cohesive cyberpunk aesthetic.',
    problem: 'Standard portfolio sites feel generic. There was a need for something memorable that showcases both design taste and technical skill.',
    solution: 'Built a full virtual desktop experience as a portfolio, complete with boot sequences, terminal commands, draggable windows, and atmospheric effects.',
    role: 'Solo developer — designed the concept, built the entire frontend, implemented window management, terminal system, and visual effects.',
    keyFeatures: [
      'Virtual desktop with draggable, resizable windows',
      'Functional terminal with command system',
      'Boot sequence with glitch effects',
      'Animated cyberpunk backgrounds',
      'Responsive mobile layout',
      'Command palette and search',
    ],
    challenges: [
      'Implementing a reliable window management system',
      'Balancing visual effects with performance',
      'Making the experience work on mobile devices',
    ],
    learnings: [
      'Advanced React state management patterns',
      'CSS animations and performance optimization',
      'Creating immersive web experiences',
    ],
  },
];

export const skills = {
  frontend: [
    { name: 'React', level: 'Expert', description: 'Components, hooks, state management, SSR' },
    { name: 'TypeScript', level: 'Expert', description: 'Generics, type-level programming, strict mode' },
    { name: 'Next.js', level: 'Advanced', description: 'App Router, SSR, SSG, API routes' },
    { name: 'Tailwind CSS', level: 'Expert', description: 'Custom themes, responsive, animations' },
    { name: 'Vite', level: 'Advanced', description: 'Plugin system, SSR, build optimization' },
    { name: 'HTML/CSS', level: 'Expert', description: 'Semantics, accessibility, layouts' },
    { name: 'Framer Motion', level: 'Advanced', description: 'Animations, gestures, layouts' },
    { name: 'Astro', level: 'Intermediate', description: 'Islands architecture, SSG' },
  ],
  backend: [
    { name: 'Node.js', level: 'Expert', description: 'Express, REST APIs, middleware' },
    { name: 'Express', level: 'Advanced', description: 'Routing, error handling, auth' },
    { name: 'PHP', level: 'Advanced', description: 'Laravel, WordPress, APIs' },
    { name: 'WebSocket', level: 'Advanced', description: 'Real-time, Socket.io, custom' },
    { name: 'Electron', level: 'Intermediate', description: 'Desktop apps, IPC, packaging' },
    { name: 'REST API Design', level: 'Expert', description: 'Architecture, versioning, docs' },
  ],
  database: [
    { name: 'PostgreSQL', level: 'Advanced', description: 'Joins, indexes, migrations' },
    { name: 'Redis', level: 'Advanced', description: 'Caching, pub/sub, sessions' },
    { name: 'IndexedDB', level: 'Advanced', description: 'Offline storage, transactions' },
    { name: 'MongoDB', level: 'Intermediate', description: 'Aggregations, schema design' },
  ],
  tools: [
    'Git', 'Docker', 'Linux', 'Nginx', 'Vercel', 'GitHub Actions', 'Figma', 'VS Code',
  ],
  design: [
    'UI Design', 'Typography', 'Color Theory', 'Responsive Design', 'Accessibility', 'Design Systems',
  ],
  exploring: [
    'Rust', 'WebGPU', 'Three.js', 'Go', 'gRPC', 'Microservices',
  ],
};

export const aboutMe = `Obyead // SYSTEM OPERATOR

Full-stack developer, game creator, and writer.
I build things that work, play things I make, and write about both.

Currently exploring the intersection of interactive
narratives and modern web technologies.

Terminal 13 was my first shipped game.
This portfolio is my second experiment.

Contact:
  Email: hello@obyead.dev
  GitHub: github.com/obyead`;