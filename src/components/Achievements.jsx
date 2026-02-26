import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Hotel, UtensilsCrossed, Bot, FileSearch, Atom, Printer } from 'lucide-react';

const achievements = [
  {
    icon: <Hotel size={28} />,
    title: 'LuxeStay',
    subtitle: 'Smart Hotel Reservation Platform',
    description: 'Full-stack hotel management system with integrated AI chatbot for guest inquiries and voice assistant for hands-free booking. Built with enterprise-grade architecture.',
    tags: ['Full Stack', 'AI', 'Voice Assistant'],
    color: 'var(--accent-blue)',
  },
  {
    icon: <UtensilsCrossed size={28} />,
    title: 'AI Food Ordering System',
    subtitle: 'Intelligent Online Food Platform',
    description: 'AI-powered food ordering system with smart recommendations, real-time order tracking, and automated kitchen management workflows.',
    tags: ['AI', 'Full Stack', 'Automation'],
    color: 'var(--accent-emerald)',
  },
  {
    icon: <Bot size={28} />,
    title: 'AURA',
    subtitle: 'AI Chatbot Assistant',
    description: 'A sophisticated personal AI assistant with natural language understanding, contextual responses, and task automation capabilities.',
    tags: ['AI', 'NLP', 'Machine Learning'],
    color: 'var(--accent-purple)',
  },
  {
    icon: <FileSearch size={28} />,
    title: 'Document Analyser AI',
    subtitle: 'RAG-based Intelligent Analysis',
    description: 'Retrieval-Augmented Generation system that processes, indexes, and intelligently queries documents with semantic understanding.',
    tags: ['AI', 'RAG', 'NLP'],
    color: 'var(--accent-cyan)',
  },
  {
    icon: <Atom size={28} />,
    title: 'ArcNova',
    subtitle: 'WebGL Particle Morphing System',
    description: 'Interactive 3D particle manipulation system built with WebGL for stress relief and creative visualization experiences.',
    tags: ['WebGL', 'Creative Tech', '3D'],
    color: 'var(--accent-indigo)',
  },
  {
    icon: <Printer size={28} />,
    title: 'CM-X',
    subtitle: 'Mobile-first Printing Platform',
    description: 'Cloud-connected printing management platform with mobile-first design, real-time status tracking, and automated queue management.',
    tags: ['Full Stack', 'Mobile', 'Cloud'],
    color: 'var(--accent-amber)',
  },
];

const Achievements = () => {
  return (
    <section id="achievements">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">PORTFOLIO</span>
            <h2 className="section-title">
              Core <span className="text-accent">Achievements</span>
            </h2>
            <p className="section-subtitle mx-auto" style={{ textAlign: 'center' }}>
              Major systems we have designed, engineered, and deployed
            </p>
          </motion.div>
        </div>

        {/* Achievement Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card tilt-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Glow accent */}
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '120px',
                  height: '120px',
                  background: `radial-gradient(circle, ${item.color}15 0%, transparent 70%)`,
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }}
              />

              {/* Icon + Title */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: 'var(--radius-md)',
                    background: `${item.color}12`,
                    border: `1px solid ${item.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.color,
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '2px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7, flex: 1 }}>
                {item.description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {item.tags.map((tag) => (
                  <span key={tag} className="skill-tag">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          #achievements .glass-card { padding: 20px; }
        }
        @media (max-width: 400px) {
          #achievements div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Achievements;
