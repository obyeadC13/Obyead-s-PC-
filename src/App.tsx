import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, ExternalLink, Copy, MapPin, Code, Gamepad2, BookOpen, Send, ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';
import { projects, skills, type Project } from './data/projects';
import AnimatedBackground from './AnimatedBackground';

const experiences = [
  {
    company: 'Self-Employed',
    role: 'Full-Stack Developer',
    period: '2023 - Present',
    description: 'Building full-stack web applications, CRMs, POS systems, and custom software solutions for clients.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    current: true,
  },
  {
    company: 'Terminal 13',
    role: 'Solo Developer & Designer',
    period: '2024',
    description: 'Designed and shipped an interactive detective mystery game with terminal-style UI and evidence investigation mechanics.',
    tech: ['Astro', 'React', 'Game Design'],
    current: false,
  },
  {
    company: 'CRM Snowy',
    role: 'Full-Stack Lead',
    period: '2024',
    description: 'Led development of a comprehensive CRM system with real-time analytics, automated workflows, and team collaboration.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    current: false,
  },
  {
    company: 'POS Snowy',
    role: 'Full-Stack Developer',
    period: '2024',
    description: 'Built a cloud-based POS system with real-time inventory tracking and Stripe payment integration.',
    tech: ['React', 'Node.js', 'Stripe', 'WebSocket'],
    current: false,
  },
  {
    company: 'Creative Writing',
    role: 'Author',
    period: 'Ongoing',
    description: 'Writing dark fantasy and sci-fi fiction. Published multiple chapters of original series and lore bibles.',
    tech: ['Dark Fantasy', 'Sci-Fi', 'World Building'],
    current: true,
  },
];

const stats = [
  { value: '9', label: 'Projects Shipped', suffix: '+' },
  { value: '3', label: 'Years Experience', suffix: '+' },
  { value: '500', label: 'Commits This Year', suffix: '+' },
];

const navItems = ['About', 'Projects', 'Experience', 'Skills', 'Contact'];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['about', 'projects', 'experience', 'skills', 'contact'];
      for (const s of sections.reverse()) {
        const el = document.getElementById(s);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(s);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Background */}
      <AnimatedBackground />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button onClick={() => scrollTo('hero')} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#863bff] to-[#7e14ff] flex items-center justify-center">
                <span className="text-xs font-bold">OB</span>
              </div>
              <span className="font-bold text-lg hidden sm:block">obyead</span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.toLowerCase()
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <div className="h-px bg-[#863bff] mt-1" />
                  )}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://github.com/obyead"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                title="GitHub"
              >
                <ExternalLink size={18} />
              </a>
              <a
                href="https://linkedin.com/in/obyead"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                title="LinkedIn"
              >
                <ExternalLink size={18} />
              </a>
              <button
                onClick={() => scrollTo('contact')}
                className="px-5 py-2.5 rounded-xl bg-[#863bff] text-white text-sm font-medium hover:bg-[#954dff] transition-all shadow-lg shadow-[#863bff]/25"
              >
                Contact Me
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-6 py-4 space-y-1">
              {navItems.map(item => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="block w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => scrollTo('contact')}
                className="w-full mt-4 px-5 py-3 rounded-xl bg-[#863bff] text-white text-sm font-medium"
              >
                Contact Me
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-medium text-green-400">Available for projects</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Making Your
                <br />
                World a{' '}
                <span className="bg-gradient-to-r from-[#863bff] to-[#c084fc] bg-clip-text text-transparent">
                  Pain Free
                </span>
              </h1>

              <p className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed">
                Full-stack developer, game creator, and writer. I build things that work, play things I make, and write about both.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={() => scrollTo('projects')}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#863bff] text-white font-medium hover:bg-[#954dff] transition-all shadow-lg shadow-[#863bff]/25"
                >
                  View My Work
                  <ArrowUpRight size={16} />
                </button>
                <button
                  onClick={() => scrollTo('contact')}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/20 transition-all"
                >
                  <Mail size={16} />
                  Contact Me
                </button>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  <span>Based on the internet</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon size={14} />
                  <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[#863bff]/20 to-[#7e14ff]/20 rounded-3xl blur-3xl" />
                <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] border border-white/10 flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#863bff]/30 to-[#7e14ff]/30 border border-[#863bff]/20 flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl font-bold text-white">OB</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">Obyead</h3>
                    <p className="text-sm text-[#863bff]/70">System Operator</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          >
            <ChevronDown size={24} className="text-gray-500" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <Section id="about">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <SectionHeader
            label="Introduction"
            title="About Me"
            description="My passion lies in crafting elegant, functional digital experiences. I love simplicity, pure and simple."
          />

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#863bff]/20 transition-all"
              >
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.value}<span className="text-[#863bff] text-2xl">{stat.suffix}</span>
                </div>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Who I Am</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                I'm a full-stack developer, game creator, and writer based on the internet. I build things that work, play things I make, and write about both.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Currently exploring the intersection of interactive narratives and modern web technologies. Terminal 13 was my first shipped game. This portfolio is my second experiment.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">What I Do</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Code size={20} />, title: 'Full-Stack Web', color: '#863bff' },
                  { icon: <Gamepad2 size={20} />, title: 'Game Development', color: '#10b981' },
                  { icon: <BookOpen size={20} />, title: 'Creative Writing', color: '#f59e0b' },
                  { icon: <Mail size={20} />, title: 'UI/UX Design', color: '#ec4899' },
                ].map((area, i) => (
                  <motion.div
                    key={area.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all cursor-pointer"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                      style={{ background: `${area.color}15`, color: area.color }}
                    >
                      {area.icon}
                    </div>
                    <h4 className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                      {area.title}
                    </h4>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <SectionHeader
            label="Portfolio"
            title="Selected Work"
            description="A collection of projects that showcase my skills and passion for creating digital experiences."
          />

          <div className="space-y-8">
            {projects
              .filter(p => p.featured)
              .map((project, index) => (
                <FeaturedProject key={project.id} project={project} index={index} />
              ))}
          </div>

          <div className="mt-16">
            <h3 className="text-lg font-bold mb-6">More Projects</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter(p => !p.featured)
                .map((project, index) => (
                  <CompactProject key={project.id} project={project} index={index} />
                ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <SectionHeader
            label="Journey"
            title="Experience"
            description="A timeline of my professional journey and key milestones."
          />

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-[#863bff]/40 via-[#863bff]/20 to-transparent" />

              <div className="space-y-8">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative pl-12 group"
                  >
                    <div
                      className={`absolute left-[13px] top-6 w-3 h-3 rounded-full border-2 z-10 ${
                        exp.current
                          ? 'bg-[#863bff] border-[#863bff]/50 shadow-sm shadow-[#863bff]/30'
                          : 'bg-[#0a0a0f] border-gray-700 group-hover:border-[#863bff]/40'
                      }`}
                    />

                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:border-white/10 transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-bold text-gray-200 group-hover:text-white transition-colors">
                            {exp.role}
                          </h4>
                          <p className="text-sm text-[#863bff]/70 font-medium">{exp.company}</p>
                        </div>
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                            exp.current
                              ? 'bg-[#863bff]/15 text-[#863bff] border border-[#863bff]/20'
                              : 'bg-white/5 text-gray-500 border border-white/5'
                          }`}
                        >
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-gray-400 leading-relaxed mb-4">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map(t => (
                          <span key={t} className="px-2.5 py-1 rounded-lg bg-white/5 text-xs text-gray-400 border border-white/5">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <SectionHeader
            label="Expertise"
            title="Skills & Tech Stack"
            description="The tools and technologies I use to bring ideas to life."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { key: 'frontend', label: 'Frontend', color: '#863bff' },
              { key: 'backend', label: 'Backend', color: '#10b981' },
              { key: 'database', label: 'Database', color: '#f59e0b' },
              { key: 'tools', label: 'Tools', color: '#ec4899' },
              { key: 'design', label: 'Design', color: '#06b6d4' },
              { key: 'exploring', label: 'Currently Exploring', color: '#f97316' },
            ].map((cat, i) => (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
              >
                <h3
                  className="text-sm font-bold uppercase tracking-wider mb-4"
                  style={{ color: cat.color }}
                >
                  {cat.label}
                </h3>
                {['tools', 'design', 'exploring'].includes(cat.key) ? (
                  <div className="flex flex-wrap gap-2">
                    {(skills[cat.key as keyof typeof skills] as string[]).map(s => (
                      <span
                        key={s}
                        className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-gray-300 border border-white/10 hover:border-white/20 transition-colors"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {(skills[cat.key as keyof typeof skills] as Array<{ name: string; level: string; description: string }>).map(sk => (
                      <div key={sk.name} className="flex items-start justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <div>
                          <h4 className="text-sm font-medium text-gray-300">{sk.name}</h4>
                          <p className="text-xs text-gray-500 mt-1">{sk.description}</p>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded bg-white/5 text-gray-400">{sk.level}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <SectionHeader
            label="Get In Touch"
            title="Let's Work Together"
            description="Have a project in mind? I'd love to hear about it. Fill out the form below and I'll get back to you soon."
          />

          <div className="grid lg:grid-cols-2 gap-12">
            <ContactForm />

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <ContactItem
                    icon={<Mail size={18} />}
                    label="Email"
                    value="hello@obyead.dev"
                    clickable
                  />
                  <ContactItem
                    icon={<ExternalLink size={18} />}
                    label="GitHub"
                    value="github.com/obyead"
                    link="https://github.com/obyead"
                  />
                  <ContactItem
                    icon={<ExternalLink size={18} />}
                    label="LinkedIn"
                    value="linkedin.com/in/obyead"
                    link="https://linkedin.com/in/obyead"
                  />
                  <ContactItem
                    icon={<MapPin size={18} />}
                    label="Location"
                    value="Based on the internet"
                  />
                </div>
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <h4 className="text-sm font-bold mb-2">Available for</h4>
                <div className="flex flex-wrap gap-2">
                  {['Full-Stack Development', 'Game Development', 'Creative Writing', 'UI/UX Design', 'Consulting'].map(s => (
                    <span
                      key={s}
                      className="px-3 py-1.5 rounded-lg bg-[#863bff]/10 text-[#863bff] text-xs font-medium border border-[#863bff]/20"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-[#863bff] to-[#7e14ff] flex items-center justify-center">
                <span className="text-[10px] font-bold">OB</span>
              </div>
              <span className="text-sm text-gray-500">© {new Date().getFullYear()} obyead. All rights reserved.</span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/obyead"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
                title="GitHub"
              >
                <ExternalLink size={18} />
              </a>
              <a
                href="https://linkedin.com/in/obyead"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <ExternalLink size={18} />
              </a>
              <a
                href="mailto:hello@obyead.dev"
                className="text-gray-500 hover:text-white transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative z-10">
      {children}
    </section>
  );
}

function SectionHeader({ label, title, description }: { label: string; title: string; description: string }) {
  return (
    <div className="text-center mb-16">
      <p className="text-xs font-bold uppercase tracking-widest text-[#863bff] mb-3">{label}</p>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{title}</h2>
      <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">{description}</p>
    </div>
  );
}

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const [direction] = useState(index % 2 === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className={`group grid lg:grid-cols-2 gap-8 items-center rounded-3xl bg-white/[0.02] border border-white/5 overflow-hidden hover:border-[#863bff]/20 transition-all duration-500 ${
        direction ? '' : 'lg:direction-rtl'
      }`}
    >
      {/* Image */}
      <div className="relative h-64 lg:h-80 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#863bff]/5 to-[#7e14ff]/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#863bff]/20 to-[#7e14ff]/30 border border-[#863bff]/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-[#863bff]/10">
              <span className="text-4xl">{project.category === 'game' ? '🎮' : '🌐'}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
            <p className="text-sm text-gray-400">{project.shortDescription}</p>
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 rounded-full bg-[#863bff]/20 text-[#863bff] text-xs font-semibold border border-[#863bff]/30 uppercase tracking-wider">
            {project.category === 'game' ? 'Game' : 'Web'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-100 mb-4">{project.name}</h3>
        <p className="text-gray-400 leading-relaxed mb-6">{project.overview}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map(t => (
            <span key={t} className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-gray-400 border border-white/5">
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#863bff] text-white text-sm font-medium hover:bg-[#954dff] transition-all shadow-lg shadow-[#863bff]/25"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
          {project.githubUrl && project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/20 transition-all"
            >
              <ExternalLink size={14} />
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function CompactProject({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden hover:border-[#863bff]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#863bff]/5"
    >
      <div className="h-40 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#863bff]/5 to-[#7e14ff]/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#863bff]/20 to-[#7e14ff]/30 border border-[#863bff]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <span className="text-2xl">{project.category === 'game' ? '🎮' : '🌐'}</span>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h4 className="text-lg font-bold text-gray-200 group-hover:text-white transition-colors mb-2">
          {project.name}
        </h4>
        <p className="text-sm text-gray-500 mb-4">{project.shortDescription}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map(t => (
            <span key={t} className="px-2 py-1 rounded bg-white/5 text-xs text-gray-500">{t}</span>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-4">
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-[#863bff] font-medium hover:opacity-80 transition-opacity"
            >
              <ExternalLink size={12} /> Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '', budget: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const budgets = ['< $1,000', '$1,000 - $5,000', '$5,000 - $10,000', '$10,000 - $20,000', '> $20,000'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', message: '', budget: '' });
    }, 4000);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-full text-center p-8 rounded-3xl bg-white/[0.02] border border-white/5"
      >
        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-gray-400">Thanks for reaching out. I'll get back to you within 24 hours.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-8 rounded-3xl bg-white/[0.02] border border-white/5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-500 mb-2 block">Your Name *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl text-sm bg-white/[0.03] text-gray-300 outline-none border border-white/10 focus:border-[#863bff]/50 transition-colors placeholder:text-gray-600"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-2 block">Your Email *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl text-sm bg-white/[0.03] text-gray-300 outline-none border border-white/10 focus:border-[#863bff]/50 transition-colors placeholder:text-gray-600"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div>
        <label className="text-xs text-gray-500 mb-2 block">Budget Range</label>
        <div className="flex flex-wrap gap-2">
          {budgets.map(b => (
            <button
              key={b}
              type="button"
              onClick={() => setForm({ ...form, budget: b })}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                form.budget === b
                  ? 'bg-[#863bff]/15 text-[#863bff] border border-[#863bff]/30'
                  : 'text-gray-500 border border-white/5 hover:bg-white/5'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs text-gray-500 mb-2 block">Message *</label>
        <textarea
          required
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          rows={5}
          className="w-full px-4 py-3 rounded-xl text-sm bg-white/[0.03] text-gray-300 outline-none border border-white/10 focus:border-[#863bff]/50 transition-colors resize-none placeholder:text-gray-600"
          placeholder="Tell me about your project..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl text-sm font-semibold bg-[#863bff] text-white hover:bg-[#954dff] disabled:opacity-50 transition-all shadow-lg shadow-[#863bff]/25 flex items-center justify-center gap-2"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Send size={14} /> Send Message
          </>
        )}
      </button>
    </form>
  );
}

function ContactItem({ icon, label, value, link, clickable }: { icon: React.ReactNode; label: string; value: string; link?: string; clickable?: boolean }) {
  const handleClick = () => {
    if (clickable) {
      navigator.clipboard.writeText(value);
    }
  };

  const content = (
    <div
      className={`flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 ${
        link || clickable ? 'hover:border-[#863bff]/30 cursor-pointer' : ''
      } transition-all`}
      onClick={handleClick}
    >
      <div className="w-10 h-10 rounded-lg bg-[#863bff]/10 flex items-center justify-center text-[#863bff]">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm text-gray-300">{value}</p>
      </div>
      {link && <ExternalLink size={16} className="text-gray-500" />}
      {clickable && <Copy size={16} className="text-gray-500" />}
    </div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
        {content}
      </a>
    );
  }

  return content;
}

function ClockIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}