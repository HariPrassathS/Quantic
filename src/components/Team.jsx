import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const teamMembers = [
  {
    name: 'Hari Prassath S',
    role: 'Full Stack AI Engineer | System Architect',
    bio: 'Architects scalable backend systems and AI-integrated applications. Specializes in building production-grade platforms from database design to deployment, with deep expertise in intelligent automation and conversational AI.',
    domains: ['Java Full Stack', 'AI Systems'],
    skills: ['Java', 'Spring Boot', 'React', 'REST APIs', 'MongoDB', 'MySQL', 'AI/ML', 'System Architecture', 'Database Design'],
    projects: [
      { name: 'LuxeStay', desc: 'Full Stack + AI Chatbot + Voice Assistant' },
      { name: 'AI Food Ordering System', desc: 'AI-powered online food platform' },
      { name: 'AURA AI Chatbot', desc: 'Conversational AI assistant' },
      { name: 'Document Analyzer AI', desc: 'RAG-based document analysis' },
      { name: 'ArcNova', desc: 'Particle manipulation for stress buster' },
      { name: 'CM-X', desc: 'Mobile-first printing platform' },
    ],
    color: 'var(--accent-blue)',
    badgeClass: '',
    initials: 'HP',
  },
  {
    name: 'Madhavan P',
    role: 'Cybersecurity Specialist | Ethical Penetration Tester',
    bio: 'Expert in offensive security, network penetration testing, and privacy-focused systems. Proficient with 200+ Kali Linux tools and specializes in building security-hardened applications with multi-layer encryption.',
    domains: ['Cybersecurity', 'Blockchain'],
    skills: ['Kali Linux', 'Tor Routing', 'Metasploit', 'Network Security', 'Ethical Hacking', 'Blockchain', 'Wireshark', 'Nmap'],
    projects: [
      { name: 'GHOSTLINK', desc: 'Private browser with multi-layer Tor routing' },
      { name: 'Cloudflare Pentester', desc: 'Security testing tool for Cloudflare' },
      { name: 'Webhook Annotation Tool', desc: 'Webhook analysis & annotation' },
      { name: 'Metasploit Reverse Handler', desc: 'APK-based reverse shell handler' },
      { name: 'Local Network Security Monitor', desc: 'Network intrusion detection' },
      { name: 'NexusStrikePro', desc: 'Offline FPS game' },
      { name: 'AI Coder', desc: 'AI-powered Java code generator' },
    ],
    color: 'var(--accent-rose)',
    badgeClass: 'badge-rose',
    initials: 'MP',
  },
  {
    name: 'Chidambaram S',
    role: 'UI/UX Designer | React Developer | Creative Technologist',
    bio: 'Crafts pixel-perfect interfaces and modern user experiences. Combines design thinking with frontend engineering to deliver visually stunning, performant, and accessible web applications.',
    domains: ['UI/UX Design', 'Frontend Engineering'],
    skills: ['React', 'Figma', 'Adobe XD', 'Canva', 'Affinity', 'DaVinci Resolve', 'CSS/SASS', 'JavaScript'],
    projects: [
      { name: 'ChowGPT', desc: 'AI nutrition analyzer UI' },
      { name: 'Table Reservation Frontend', desc: 'Restaurant booking interface' },
      { name: 'Online Auction System', desc: 'Auction platform UI/UX' },
      { name: 'Online Payroll System', desc: 'Payroll management frontend' },
    ],
    color: 'var(--accent-purple)',
    badgeClass: 'badge-purple',
    initials: 'CS',
  },
  {
    name: 'Abishek M',
    role: 'Web Developer | IoT Engineer',
    bio: 'Bridges the gap between web technologies and embedded systems. Builds smart IoT solutions that integrate seamlessly with modern web platforms for real-time monitoring and control.',
    domains: ['Smart Systems', 'Embedded Web'],
    skills: ['HTML/CSS', 'JavaScript', 'IoT Protocols', 'Arduino', 'Sensor Integration', 'Web Interfaces'],
    projects: [
      { name: 'Fitness Tracking Website', desc: 'Health & fitness tracking platform' },
      { name: 'Gas Leakage Detection System', desc: 'IoT-based gas leak alert system' },
    ],
    color: 'var(--accent-emerald)',
    badgeClass: 'badge-emerald',
    initials: 'AM',
  },
  {
    name: 'Abdul Majeeth M',
    role: 'Game Developer | IoT Hardware Designer | Prototype Engineer',
    bio: 'Combines hardware prototyping with software development to create innovative physical-digital solutions. Specializes in IoT hardware design and interactive game development.',
    domains: ['Game Dev', 'Hardware Prototyping'],
    skills: ['Game Development', 'IoT Hardware', 'Prototyping', 'Circuit Design', 'Embedded Systems', 'Research Tools'],
    projects: [
      { name: 'Word Length Finder', desc: 'Research & language analysis tool' },
      { name: 'Smart Waste Bin', desc: 'Automated waste segregation system' },
    ],
    color: 'var(--accent-amber)',
    badgeClass: 'badge-amber',
    initials: 'AM',
  },
  {
    name: 'Manikanda Prabhu C',
    role: 'Founder – Nexora | Full Stack Developer',
    bio: 'Builds scalable web platforms and automation systems from the ground up. Focused on creating future-ready digital products with clean architecture and robust deployment pipelines.',
    domains: ['Scalable Platforms', 'Automation'],
    skills: ['Full Stack Development', 'System Design', 'Web Architecture', 'Automation', 'CI/CD', 'Cloud Deployment'],
    projects: [
      { name: 'Smart Print Automation', desc: 'Automated printing management system' },
      { name: 'Event Registration Platform', desc: 'Scalable event management system' },
    ],
    color: 'var(--accent-indigo)',
    badgeClass: 'badge-purple',
    initials: 'MC',
  },
  {
    name: 'Boopathi M',
    role: 'Cloud & IoT Engineer | Game Developer',
    bio: 'Versatile engineer working across cloud infrastructure, IoT solutions, and game development. Passionate about building assistive technology and cloud-native applications.',
    domains: ['Cloud', 'IoT', 'Assistive Tech'],
    skills: ['Cloud Computing', 'IoT', 'Game Dev', 'Python', 'JavaScript', 'OCR', 'Voice Control', 'Hardware'],
    projects: [
      { name: 'YTB Cloud Storage', desc: 'Cloud storage device system' },
      { name: 'Voice-Controlled Smart Relay', desc: 'IoT voice-activated relay system' },
      { name: 'Paralysis Assistive Control', desc: 'Assistive technology for paralysis patients' },
      { name: 'LinkedIn OCR Analyzer', desc: 'Screenshot OCR analysis tool' },
      { name: 'Tic Tac Toe Web Game', desc: 'Interactive web-based game' },
      { name: 'CGPA Calculator', desc: 'Academic CGPA calculator web app' },
      { name: 'Expenses Calculator', desc: 'Personal finance tracking tool' },
    ],
    color: 'var(--accent-cyan)',
    badgeClass: 'badge-cyan',
    initials: 'BM',
  },
  {
    name: 'Jai Nithil',
    role: 'Full Stack Developer | AI Legal Systems Builder',
    bio: 'Specializes in building AI-powered legal technology platforms and scalable full-stack applications. Focused on bringing intelligent automation to the Indian legal systems landscape.',
    domains: ['AI Legal Tech', 'Full Stack'],
    skills: ['Full Stack Development', 'AI/ML', 'Legal Tech', 'Python', 'React', 'Database Design', 'API Development'],
    projects: [
      { name: 'Traffic Management System', desc: 'Intelligent traffic flow management' },
      { name: 'NYTRIX AI', desc: 'AI legal platform for India' },
    ],
    color: 'var(--accent-blue)',
    badgeClass: '',
    initials: 'JN',
  },
];

const TeamCard = ({ member, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="glass-card tilt-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        padding: '28px',
      }}
    >
      {/* Corner Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '100px',
          height: '100px',
          background: `radial-gradient(circle, ${member.color}12 0%, transparent 70%)`,
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Profile Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: 'var(--radius-md)',
            background: `linear-gradient(135deg, ${member.color}30, ${member.color}10)`,
            border: `1px solid ${member.color}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.1rem',
            fontWeight: 800,
            color: member.color,
            flexShrink: 0,
            fontFamily: 'Outfit, sans-serif',
          }}
        >
          {member.initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '2px' }}>
            {member.name}
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontWeight: 500, lineHeight: 1.4 }}>
            {member.role}
          </p>
        </div>
      </div>

      {/* Domain Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {member.domains.map((d) => (
          <span key={d} className={`badge ${member.badgeClass}`}>
            {d}
          </span>
        ))}
      </div>

      {/* Bio */}
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.7 }}>
        {member.bio}
      </p>

      {/* Skills */}
      <div>
        <p
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            color: 'var(--text-tertiary)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '8px',
          }}
        >
          Tech Stack
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {member.skills.map((skill) => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>

      {/* Projects Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '10px 14px',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--glass-border)',
          color: 'var(--text-secondary)',
          fontSize: '0.82rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        <span>Projects ({member.projects.length})</span>
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Projects List */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                paddingTop: '4px',
              }}
            >
              {member.projects.map((project) => (
                <div
                  key={project.name}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>
                      {project.name}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                      {project.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Team = () => {
  return (
    <section id="team">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">THE TEAM</span>
            <h2 className="section-title">
              Meet the <span className="text-accent">Engineers</span>
            </h2>
            <p className="section-subtitle mx-auto" style={{ textAlign: 'center' }}>
              A collective of specialists, each bringing deep expertise in their respective domains
            </p>
          </motion.div>
        </div>

        {/* Team Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {teamMembers.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          #team div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Team;
