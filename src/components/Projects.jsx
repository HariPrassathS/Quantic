import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import ProjectModal from './ProjectModal';

const allProjects = [
  // AI
  {
    title: 'LuxeStay',
    description: 'Smart hotel reservation platform with AI-powered chatbot, voice assistant integration, and real-time booking management.',
    techStack: ['Java', 'Spring Boot', 'React', 'MongoDB', 'OpenAI', 'WebSocket'],
    impact: 'Reduced booking time by 60% with AI-assisted voice reservations',
    category: 'AI',
    owner: 'Hari Prassath S',
  },
  {
    title: 'AURA AI Chatbot',
    description: 'Sophisticated personal AI assistant with natural language understanding and contextual task automation capabilities.',
    techStack: ['Python', 'NLP', 'Machine Learning', 'REST API'],
    impact: 'Handles 500+ unique conversation intents with 92% accuracy',
    category: 'AI',
    owner: 'Hari Prassath S',
  },
  {
    title: 'Document Analyser AI',
    description: 'RAG-based intelligent document analysis system that processes, indexes, and semantically queries large document sets.',
    techStack: ['Python', 'LangChain', 'Vector DB', 'RAG', 'React'],
    impact: 'Processes 1000+ page documents in under 30 seconds',
    category: 'AI',
    owner: 'Hari Prassath S',
  },
  {
    title: 'AI Food Ordering System',
    description: 'AI-powered food ordering platform with intelligent recommendations, real-time order tracking, and automated kitchen workflows.',
    techStack: ['Java', 'Spring Boot', 'React', 'MySQL', 'AI/ML'],
    impact: 'Smart recommendations increased average order value by 25%',
    category: 'AI',
    owner: 'Hari Prassath S',
  },
  {
    title: 'NYTRIX AI',
    description: 'AI-powered legal platform designed for the Indian legal system, automating legal research and case analysis.',
    techStack: ['Python', 'React', 'NLP', 'Legal NER', 'Database'],
    impact: 'Automates 70% of routine legal research tasks',
    category: 'AI',
    owner: 'Jai Nithil',
  },
  {
    title: 'ChowGPT',
    description: 'AI-powered nutrition analyzer with beautiful UI for diet tracking, meal planning, and nutritional insights.',
    techStack: ['React', 'Figma', 'AI API', 'CSS3'],
    impact: 'Provides instant nutritional breakdown with visual charts',
    category: 'AI',
    owner: 'Chidambaram S',
  },
  {
    title: 'AI Coder for Java',
    description: 'AI-powered Java code generation tool that understands requirements and produces clean, compilable code.',
    techStack: ['Python', 'Java', 'AI/ML', 'Code Generation'],
    impact: 'Generates boilerplate Java code 10x faster than manual coding',
    category: 'AI',
    owner: 'Madhavan P',
  },
  {
    title: 'LinkedIn OCR Analyzer',
    description: 'Extracts and analyzes text from LinkedIn screenshots using advanced OCR for data insights.',
    techStack: ['Python', 'OCR', 'Image Processing', 'Web App'],
    impact: 'Extracts structured data from screenshots with 95% accuracy',
    category: 'AI',
    owner: 'Boopathi M',
  },

  // Cybersecurity
  {
    title: 'GHOSTLINK',
    description: 'Privacy-focused browser with multi-layer Tor routing, encrypted tunneling, and anonymous browsing capabilities.',
    techStack: ['Python', 'Tor Network', 'Encryption', 'Proxy Chains'],
    impact: 'Multi-layer routing through 5+ relay nodes for maximum anonymity',
    category: 'Cybersecurity',
    owner: 'Madhavan P',
  },
  {
    title: 'Cloudflare Pentester',
    description: 'Security testing tool for analyzing and identifying vulnerabilities in Cloudflare-protected web applications.',
    techStack: ['Python', 'Kali Linux', 'HTTP Analysis', 'Security'],
    impact: 'Identifies WAF bypass vectors in protected applications',
    category: 'Cybersecurity',
    owner: 'Madhavan P',
  },
  {
    title: 'Local Network Security Monitor',
    description: 'Real-time network intrusion detection and monitoring system for local area networks.',
    techStack: ['Python', 'Wireshark', 'Nmap', 'Network Protocols'],
    impact: 'Detects anomalous network activity within 2 seconds',
    category: 'Cybersecurity',
    owner: 'Madhavan P',
  },
  {
    title: 'Webhook Annotation Tool',
    description: 'Tool for intercepting, annotating, and analyzing webhook payloads for debugging and security analysis.',
    techStack: ['Python', 'REST API', 'Webhook', 'JSON'],
    impact: 'Simplifies webhook debugging with real-time payload analysis',
    category: 'Cybersecurity',
    owner: 'Madhavan P',
  },
  {
    title: 'Metasploit Reverse Handler',
    description: 'APK-based reverse shell handler for authorized penetration testing and security assessments.',
    techStack: ['Metasploit', 'Android', 'Security', 'Shell'],
    impact: 'Enables controlled security testing of mobile environments',
    category: 'Cybersecurity',
    owner: 'Madhavan P',
  },

  // IoT
  {
    title: 'Gas Leakage Detection System',
    description: 'IoT-based real-time gas leak detection with automated alerts, sensor data logging, and emergency response triggers.',
    techStack: ['Arduino', 'IoT Sensors', 'Web Dashboard', 'Alerts'],
    impact: 'Triggers alert within 500ms of gas detection',
    category: 'IoT',
    owner: 'Abishek M',
  },
  {
    title: 'Smart Waste Bin',
    description: 'Automated waste segregation system using sensors and actuators for intelligent waste management.',
    techStack: ['IoT', 'Sensors', 'Embedded C', 'Hardware'],
    impact: 'Automates waste sorting with 85% classification accuracy',
    category: 'IoT',
    owner: 'Abdul Majeeth M',
  },
  {
    title: 'Voice-Controlled Smart Relay',
    description: 'IoT voice-activated relay system for home automation and smart device control.',
    techStack: ['IoT', 'Voice Recognition', 'Relay Module', 'WiFi'],
    impact: 'Controls 8 devices simultaneously with voice commands',
    category: 'IoT',
    owner: 'Boopathi M',
  },
  {
    title: 'Paralysis Assistive Control',
    description: 'Assistive technology system designed to help paralysis patients control devices through minimal input methods.',
    techStack: ['IoT', 'Sensors', 'Hardware', 'Accessibility'],
    impact: 'Enables device control with minimal physical movement',
    category: 'IoT',
    owner: 'Boopathi M',
  },
  {
    title: 'YTB Cloud Storage Device',
    description: 'Custom cloud storage device with web interface for personal file management and backup.',
    techStack: ['Cloud', 'IoT', 'Web Interface', 'Storage'],
    impact: 'Provides private cloud storage with zero subscription costs',
    category: 'IoT',
    owner: 'Boopathi M',
  },

  // Game Development
  {
    title: 'NexusStrikePro',
    description: 'Offline first-person shooter game with realistic physics, AI enemies, and multiple gameplay modes.',
    techStack: ['Game Engine', 'C#', '3D Graphics', 'Physics Engine'],
    impact: 'Full offline FPS experience with progressive difficulty',
    category: 'Game Development',
    owner: 'Madhavan P',
  },
  {
    title: 'ArcNova',
    description: 'Interactive WebGL particle morphing system for creative visualization and stress relief experiences.',
    techStack: ['WebGL', 'Three.js', 'JavaScript', 'Shaders'],
    impact: 'Real-time particle manipulation with 60fps rendering',
    category: 'Game Development',
    owner: 'Hari Prassath S',
  },
  {
    title: 'Tic Tac Toe Web Game',
    description: 'Interactive web-based Tic Tac Toe game with AI opponent and multiplayer mode.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Game Logic'],
    impact: 'Engaging gameplay with intelligent AI opponent',
    category: 'Game Development',
    owner: 'Boopathi M',
  },

  // Full Stack
  {
    title: 'CM-X Printing Platform',
    description: 'Cloud-connected mobile-first printing management platform with real-time status tracking and automated queue management.',
    techStack: ['Java', 'Spring Boot', 'React', 'Cloud', 'WebSocket'],
    impact: 'Manages 200+ print jobs daily with zero queue conflicts',
    category: 'Full Stack',
    owner: 'Hari Prassath S',
  },
  {
    title: 'Smart Print Automation',
    description: 'Automated printing management system with smart scheduling and resource optimization.',
    techStack: ['Full Stack', 'Automation', 'Web App', 'API'],
    impact: 'Reduces manual print management overhead by 80%',
    category: 'Full Stack',
    owner: 'Manikanda Prabhu C',
  },
  {
    title: 'Event Registration Platform',
    description: 'Scalable event management and registration system with real-time capacity tracking and attendee management.',
    techStack: ['Full Stack', 'Database', 'Web App', 'API'],
    impact: 'Handles 1000+ concurrent registrations smoothly',
    category: 'Full Stack',
    owner: 'Manikanda Prabhu C',
  },
  {
    title: 'Traffic Management System',
    description: 'Intelligent traffic flow management platform with real-time data processing and optimization algorithms.',
    techStack: ['Python', 'React', 'Database', 'Algorithms'],
    impact: 'Optimizes traffic signal timing based on real-time flow data',
    category: 'Full Stack',
    owner: 'Jai Nithil',
  },
  {
    title: 'Online Auction System',
    description: 'Real-time auction platform with dynamic bidding, countdown timers, and secure transaction processing.',
    techStack: ['React', 'UI/UX', 'Real-time', 'Frontend'],
    impact: 'Supports real-time bidding with sub-second updates',
    category: 'Full Stack',
    owner: 'Chidambaram S',
  },
  {
    title: 'Online Payroll System',
    description: 'Comprehensive payroll management frontend with salary calculation, tax deductions, and report generation.',
    techStack: ['React', 'JavaScript', 'CSS', 'UI/UX'],
    impact: 'Streamlines payroll processing for 100+ employees',
    category: 'Full Stack',
    owner: 'Chidambaram S',
  },
  {
    title: 'Table Reservation Frontend',
    description: 'Restaurant table booking interface with real-time availability, floor plan view, and reservation management.',
    techStack: ['React', 'Figma', 'UI/UX', 'Frontend'],
    impact: 'Reduces booking friction with intuitive reservation flow',
    category: 'Full Stack',
    owner: 'Chidambaram S',
  },
  {
    title: 'Fitness Tracking Website',
    description: 'Health and fitness tracking platform with workout logging, progress visualization, and goal setting.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Web App'],
    impact: 'Tracks fitness goals with visual progress dashboards',
    category: 'Full Stack',
    owner: 'Abishek M',
  },

  // Automation
  {
    title: 'Word Length Finder',
    description: 'Research and language analysis tool for analyzing word patterns, frequencies, and lengths across texts.',
    techStack: ['Python', 'NLP', 'Data Analysis', 'Research'],
    impact: 'Processes 10,000+ words per second for pattern analysis',
    category: 'Automation',
    owner: 'Abdul Majeeth M',
  },
  {
    title: 'CGPA Calculator',
    description: 'Academic CGPA calculation web app with semester-wise tracking and grade prediction.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Web App'],
    impact: 'Used by 200+ students for academic planning',
    category: 'Automation',
    owner: 'Boopathi M',
  },
  {
    title: 'Expenses Calculator',
    description: 'Personal finance tracking tool with categorized expense logging and monthly analysis.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Web App'],
    impact: 'Helps users track spending with categorized breakdowns',
    category: 'Automation',
    owner: 'Boopathi M',
  },
];

const categories = ['All', 'AI', 'Cybersecurity', 'IoT', 'Game Development', 'Full Stack', 'Automation'];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [modalProject, setModalProject] = useState(null);
  const closeModal = useCallback(() => setModalProject(null), []);

  const filteredProjects = useMemo(
    () => activeFilter === 'All' ? allProjects : allProjects.filter((p) => p.category === activeFilter),
    [activeFilter]
  );

  return (
    <section id="projects">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">PROJECTS</span>
            <h2 className="section-title">
              Project <span className="text-accent">Showcase</span>
            </h2>
            <p className="section-subtitle mx-auto" style={{ textAlign: 'center' }}>
              Explore the full breadth of systems and products built by Quantic Labs
            </p>
          </motion.div>
        </div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '48px',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
            >
              {cat}
              {cat !== 'All' && (
                <span style={{
                  marginLeft: '6px',
                  fontSize: '0.7rem',
                  opacity: 0.7,
                }}>
                  ({allProjects.filter(p => p.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="glass-card tilt-card project-card-clickable"
                onClick={() => setModalProject(project)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  padding: '24px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Category Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span
                    className={`badge ${
                      project.category === 'Cybersecurity' ? 'badge-rose' :
                      project.category === 'IoT' ? 'badge-emerald' :
                      project.category === 'Game Development' ? 'badge-purple' :
                      project.category === 'Automation' ? 'badge-amber' :
                      project.category === 'AI' ? 'badge-cyan' : ''
                    }`}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                  {project.title}
                </h3>

                {/* Description */}
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.7, flex: 1 }}>
                  {project.description}
                </p>

                {/* Impact */}
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(59, 130, 246, 0.04)',
                    borderLeft: '3px solid var(--accent-blue)',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    fontStyle: 'italic',
                  }}
                >
                  {project.impact}
                </div>

                {/* Tech Stack */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {project.techStack.map((tech) => (
                    <span key={tech} className="skill-tag">{tech}</span>
                  ))}
                </div>

                {/* Footer */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '10px',
                    borderTop: '1px solid var(--glass-border)',
                    marginTop: 'auto',
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>
                    {project.owner}
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span className="btn-ghost" style={{ padding: '4px 10px', borderRadius: 'var(--radius-sm)', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Github size={12} /> Code
                    </span>
                    <span className="btn-ghost" style={{ padding: '4px 10px', borderRadius: 'var(--radius-sm)', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <ExternalLink size={12} /> Demo
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal project={modalProject} onClose={closeModal} />

      <style>{`
        @media (max-width: 480px) {
          #projects div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
