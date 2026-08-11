export const projects = {
  web: {
    title: "Web Development",
    icon: "🌐",
    projects: [
      {
        name: "CRM Snowy",
        description: "Full-stack customer relationship management system with analytics dashboard and automated workflows.",
        tech: ["React", "Node.js", "PostgreSQL", "Redis"],
        link: "#",
        github: "#",
      },
      {
        name: "POS Snowy",
        description: "Cloud-based point of sale system with real-time inventory tracking and payment processing.",
        tech: ["React", "Node.js", "Stripe", "WebSocket"],
        link: "#",
        github: "#",
      },
      {
        name: "Local POS Snowy",
        description: "Offline-first point of sale solution designed for low-connectivity environments with sync capabilities.",
        tech: ["React", "IndexedDB", "Electron", "Node.js"],
        link: "#",
        github: "#",
      },
    ],
  },
  games: {
    title: "Game Development",
    icon: "🎮",
    projects: [
      {
        name: "Project 13",
        description: "2D game with custom engine and hand-crafted pixel art levels.",
        tech: ["JavaScript", "Canvas", "Game Design"],
        link: "#",
        github: "#",
      },
      {
        name: "Super Swipe",
        description: "Fast-paced digital card game with swipe mechanics, competitive rankings, and deck building.",
        tech: ["React", "WebSocket", "Game Design"],
        link: "#",
        github: "#",
      },
      {
        name: "Terminal 13",
        description: "Interactive detective mystery game. Terminal-style UI with evidence investigation and deduction mechanics.",
        tech: ["Astro", "React", "Game Design"],
        link: "https://terminal13.vercel.app",
        github: "#",
      },
    ],
  },
  writing: {
    title: "Projects",
    icon: "✍️",
    projects: [
      {
        name: "HDMI Project",
        description: "Hardware integration project bridging physical displays with web-based control interfaces.",
        tech: ["Hardware", "Web API", "Integration"],
        link: "#",
        github: "#",
      },
      {
        name: "Fame",
        description: "Social platform and branding tool for content creators and influencers.",
        tech: ["Next.js", "Tailwind", "Database"],
        link: "#",
        github: "#",
      },
      {
        name: "Fatink",
        description: "Digital platform with creative tools and messaging features.",
        tech: ["React", "Node.js", "WebSocket"],
        link: "#",
        github: "#",
      },
    ],
  },
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

export const commands = {
  help: "Available commands: about, web, games, writing, clear, reboot",
  about: aboutMe,
  reboot: "REBOOTING...",
};