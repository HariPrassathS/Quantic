import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Shield, Zap, Brain, Settings, GitBranch } from 'lucide-react';

const principles = [
  {
    icon: <Layers size={28} />,
    title: 'Clean Architecture',
    description: 'Every system we build follows modular, layered architecture principles — separating concerns, enabling testability, and ensuring long-term maintainability.',
    color: 'var(--accent-blue)',
  },
  {
    icon: <GitBranch size={28} />,
    title: 'Scalable Systems',
    description: 'From database schema to API design, our systems are designed to handle growth. We think in terms of scale from day one, not as an afterthought.',
    color: 'var(--accent-emerald)',
  },
  {
    icon: <Shield size={28} />,
    title: 'Security-First Design',
    description: 'Security is embedded into our development lifecycle. From input validation to encryption, authentication to penetration testing — every layer is hardened.',
    color: 'var(--accent-rose)',
  },
  {
    icon: <Zap size={28} />,
    title: 'Performance Optimization',
    description: 'We obsess over milliseconds. Code splitting, lazy loading, database indexing, caching strategies — performance is a first-class priority in every build.',
    color: 'var(--accent-amber)',
  },
  {
    icon: <Brain size={28} />,
    title: 'AI Integration',
    description: 'We integrate intelligent systems — from conversational AI to predictive analytics — to add cognitive capabilities that make applications smarter over time.',
    color: 'var(--accent-purple)',
  },
  {
    icon: <Settings size={28} />,
    title: 'Automation-Driven',
    description: 'Manual processes are engineering debt. We automate testing, deployment, monitoring, and workflows — letting engineers focus on building, not babysitting.',
    color: 'var(--accent-cyan)',
  },
];

const Innovation = () => {
  return (
    <section id="innovation">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">PHILOSOPHY</span>
            <h2 className="section-title">
              Innovation <span className="text-accent">Principles</span>
            </h2>
            <p className="section-subtitle mx-auto" style={{ textAlign: 'center' }}>
              The engineering philosophy that guides every system we design and build
            </p>
          </motion.div>
        </div>

        {/* Principles Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card tilt-card"
              style={{
                display: 'flex',
                gap: '20px',
                alignItems: 'flex-start',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Glow */}
              <div
                style={{
                  position: 'absolute',
                  top: '-20px',
                  left: '-20px',
                  width: '80px',
                  height: '80px',
                  background: `radial-gradient(circle, ${p.color}10 0%, transparent 70%)`,
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-md)',
                  background: `${p.color}12`,
                  border: `1px solid ${p.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: p.color,
                  flexShrink: 0,
                }}
              >
                {p.icon}
              </div>

              <div>
                <h3 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>
                  {p.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7 }}>
                  {p.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginTop: '80px',
            padding: '40px',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
          }}
        >
          <p
            className="font-display"
            style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '12px',
              lineHeight: 1.4,
            }}
          >
            "Build things that work. Build things that scale.{' '}
            <span className="text-accent">Build things that matter.</span>"
          </p>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', fontWeight: 500 }}>
            — The Quantic Labs Engineering Team
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          #innovation div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
          #innovation .glass-card {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
};

export default Innovation;
