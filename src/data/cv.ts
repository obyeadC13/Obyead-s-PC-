export const profile = {
  name: 'Mohammed Obyead',
  shortName: 'Obyead',
  title: 'Front-End Developer · Software Engineer · Writer',
  tagline: 'With Hard work You Can Do Anything In Life.',
  location: 'Dhaka, Bashundahara',
  phone: '(+88) 017-2006-1723',
  email: 'obyead@gmail.com',
  website: 'https://obyead-s-pc.vercel.app/',
  github: 'https://github.com/OO13Sp',
  githubHandle: 'OO13Sp',
  linkedin: 'https://www.linkedin.com/in/md-obyead-a70749259',
  cvUrl: '/resume/CV-2026.pdf',
  currentFocus:
    'Marketing Content Head at AP2T Labs and Junior Developer at Lorem Ipsum Dev — building front-end experiences with React, Remix and TypeScript while completing an M.S. in IT.',
};

export const education = [
  {
    school: 'Independent University Bangladesh',
    location: 'Dhaka, Bangladesh',
    degree: 'B.S. in Computer Science and Engineering',
    period: 'May 2020 – Sept 2024',
    details: 'Major (AI, App Development, Automata, Graph Theory, HCI) · Minor (Marketing)',
  },
  {
    school: 'University of the People',
    location: 'Dhaka, Bangladesh',
    degree: 'M.S. in Information Technology',
    period: 'Jan 2025 – Current',
    details: '',
  },
];

export const skillGroups = [
  {
    key: 'frontend',
    label: 'Front-End',
    color: '#863bff',
    type: 'chips' as const,
    items: ['React', 'Remix', 'Tailwind', 'Bootstrap', 'HTML5', 'CSS', 'SASS'],
  },
  {
    key: 'backend',
    label: 'Back-End',
    color: '#10b981',
    type: 'chips' as const,
    items: ['Express', 'Node.js', 'PHP', 'MySQL'],
  },
  {
    key: 'programming',
    label: 'Programming',
    color: '#f59e0b',
    type: 'chips' as const,
    items: ['JavaScript', 'TypeScript', 'C++'],
  },
  {
    key: 'languages',
    label: 'Languages',
    color: '#ec4899',
    type: 'chips' as const,
    items: ['English', 'Bengali', 'Hindi', 'Urdu', 'French'],
  },
];

export interface CvProject {
  name: string;
  role: string;
  year: string;
  bullets: string[];
  link?: string;
}

export const projects = [
  {
    name: 'HDMI Dynamic Weather App',
    role: 'Researcher, Programmer',
    year: '2022',
    bullets: [
      'Developed a device that uses GPS & GSM modules to track vehicles.',
      'Created an app using Dart & Android Studio with Google API integration.',
      'Learned how to write a comprehensive research paper using results.',
      'Published a Research Paper on IEEE.',
    ],
    link: 'https://ieeexplore.ieee.org/document/11272007',
  },
  {
    name: 'Dynamic Weather App',
    role: 'UI/UX Designer, Programmer',
    year: '2023',
    bullets: [
      'Created UI/UX using Figma to enhance user experience.',
      'Built the app using Dart, OpenWeather API & Android Studio for dynamic weather updates.',
    ],
  },
  {
    name: 'Fame',
    role: 'Researcher, Designer and Programmer',
    year: '2023',
    bullets: ['Developed a freelancer website using HTML, CSS, & JavaScript.'],
  },
  {
    name: 'Safeguard',
    role: 'Programmer',
    year: '2024',
    bullets: [
      'Built the backend using PHP and SQL commands.',
      'Developed the frontend with React.js and Vanilla JavaScript.',
    ],
  },
  {
    name: "Obyead's World",
    role: 'Personal Website',
    year: '2024',
    bullets: ['Developed the website using React.js and Vanilla JavaScript.'],
    link: 'https://obyeadsworld.netlify.app',
  },
  {
    name: 'Spotify Clone',
    role: 'Programmer, Designer',
    year: '2024',
    bullets: [
      'Created a Spotify clone using Remix, TypeScript, and Tailwind CSS.',
      'Connected the backend with JSON files to load and play songs.',
    ],
    link: 'https://demotest404.netlify.app/',
  },
  {
    name: 'Terminal 13',
    role: 'Solo Developer',
    year: '',
    bullets: [
      'Interactive detective mystery game with terminal-style UI, evidence investigation, and deduction mechanics.',
      'Built with Astro, React and TypeScript — my first shipped game.',
    ],
    link: 'https://terminal13.vercel.app',
  },
] satisfies CvProject[];

export interface ExperienceEntry {
  company: string;
  location: string;
  role: string;
  period: string;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    company: 'AP2T Labs',
    location: 'Cincinnati, Ohio, USA',
    role: 'Marketing Content Head',
    period: 'April 2025 – Current',
    bullets: [
      'Developed and refined content strategies, ensuring clear communication of the brand\'s Unique Value Propositions (UVPs) across all digital channels.',
      'Worked closely with cross-functional teams to align content with brand goals, market positioning, and customer needs.',
      'Built and integrated front-end components with backend APIs using Remix for seamless data flow.',
      'Ensured consistency in tone, messaging, and visual elements across website, social media, and email communications.',
      'Focused on creating content that effectively conveys product benefits and differentiates the brand in a competitive market.',
      'Led content audits to maintain quality and relevance, optimizing messaging for audience engagement and retention.',
      'Collaborated with design and product teams to ensure content aligns with brand aesthetics and user experience (UX) standards.',
    ],
  },
  {
    company: 'Lorem Ipsum Dev',
    location: 'Cincinnati, Ohio, USA',
    role: 'Junior Developer',
    period: 'September 2024 – Current',
    bullets: [
      'Developed responsive user interfaces and interactive features using React and TypeScript.',
      'Created and maintained reusable components and styles using Tailwind CSS and vanilla JavaScript.',
      'Built and integrated front-end components with backend APIs using Remix for seamless data flow.',
      'Implemented TypeScript for robust type checking and improved code quality across projects.',
      'Collaborated with the design team to ensure adherence to UI/UX principles and accessibility standards.',
      'Participated in code reviews and contributed to the improvement of best practices in front-end development.',
    ],
  },
  {
    company: 'GameRiv',
    location: 'Dhaka, Bangladesh',
    role: 'Deputy Editor',
    period: '2023 – Current',
    bullets: [
      'Developed management skills and gained insights into SEO and WordPress.',
      'Developed ways to do quality control on articles written by other writers.',
      'Wrote, researched, and published articles for a section of the website.',
    ],
  },
  {
    company: 'Yosemite Keys',
    location: 'Dhaka, Bangladesh',
    role: 'CEO',
    period: '2021 – Current',
    bullets: ['Founded the first game rental service in Bangladesh for Xbox users.'],
  },
  {
    company: 'Universal Food Fashion',
    location: 'Dhaka, Bangladesh',
    role: 'Manager and Video Editor',
    period: 'Nov 2020 – Current',
    bullets: [
      'Helped a non-sponsored channel reach 579 subscribers and 95K views in just 5 months.',
    ],
  },
  {
    company: 'Freelancer.com',
    location: 'Dhaka, Bangladesh',
    role: 'Freelancer',
    period: 'Jan 2019 – Current',
    bullets: ['Completed various jobs to gain experience using a diverse set of skills.'],
  },
  {
    company: 'Gumiti Textiles',
    location: 'Dhaka, Bangladesh',
    role: 'Junior Trainee Accountant',
    period: 'May 2022 – Jan 2023',
    bullets: [
      'Learned basic office operations and day-to-day responsibilities in the accounts department.',
      'Managed the bills department, overseeing financial transactions and ensuring accurate tracking of income and expenses.',
    ],
  },
  {
    company: 'GameRiv',
    location: 'Dhaka, Bangladesh',
    role: 'Guides Writer',
    period: '2019 – 2023',
    bullets: [
      'Gained experience with SEO and WordPress, specializing in creating content for gaming topics.',
      'Researched and played games to produce well-informed and engaging articles.',
    ],
  },
];

export const honors = [
  '2024 Runner Up, 2nd Start Up Competition — IUB, Dhaka, Bangladesh',
];
