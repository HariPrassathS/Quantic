import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Shield, Wifi, Code2, Gamepad2, Cog, Link, Eye, Target, Rocket } from 'lucide-react';

const coreDomains = [
  { icon: <Code2 size={22} />, name: 'Full Stack Development', color: 'var(--accent-indigo)' },
  { icon: <Brain size={22} />, name: 'Artificial Intelligence', color: 'var(--accent-blue)' },
  { icon: <Shield size={22} />, name: 'Cybersecurity', color: 'var(--accent-rose)' },
  { icon: <Wifi size={22} />, name: 'IoT & Embedded Systems', color: 'var(--accent-emerald)' },
  { icon: <Gamepad2 size={22} />, name: 'Game Development', color: 'var(--accent-purple)' },
  { icon: <Cog size={22} />, name: 'Automation Systems', color: 'var(--accent-cyan)' },
  { icon: <Link size={22} />, name: 'Blockchain Exploration', color: 'var(--accent-amber)' },
];

const About = () => {
  return (
    <section id="about">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">ABOUT US</span>
            <h2 className="section-title">
              Who We <span className="text-accent">Are</span>
            </h2>
            <p className="section-subtitle mx-auto" style={{ textAlign: 'center' }}>
              Quantic Labs is a technology collective focused on building scalable digital systems,
              intelligent automation platforms, AI-integrated applications, and cybersecurity solutions.
              We craft clean, performant, and future-ready digital products.
            </p>
          </motion.div>
        </div>

        {/* Vision & Mission */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '80px',
          }}
        >
          {[
            {
              icon: <Eye size={24} />,
              title: 'Our Vision',
              text: 'To become a leading innovation lab that engineers intelligent, scalable systems powering the next generation of digital infrastructure — from AI to IoT, cybersecurity to game development.',
            },
            {
              icon: <Target size={24} />,
              title: 'Our Mission',
              text: 'To bridge the gap between complex engineering and elegant digital experiences. We build high-performance solutions that empower businesses and push the boundaries of what technology can achieve.',
            },
            {
              icon: <Rocket size={24} />,
              title: 'Our Approach',
              text: 'Security-first architecture, performance-optimized codebases, and AI-augmented workflows. Every project is built for scale, designed for humans, and engineered for the future.',
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card glass-card-glow tilt-card"
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-blue)',
                }}
              >
                {item.icon}
              </div>
              <h3 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 700 }}>
                {item.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Core Domains */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>
            Core Domains
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            The verticals we specialize in
          </p>
        </motion.div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '14px',
          }}
        >
          {coreDomains.map((domain, i) => (
            <motion.div
              key={domain.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{
                y: -4,
                borderColor: domain.color,
                boxShadow: `0 4px 20px ${domain.color}25`,
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 22px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                cursor: 'default',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ color: domain.color, display: 'flex' }}>{domain.icon}</span>
              <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                {domain.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
