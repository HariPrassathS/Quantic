import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Background = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        top: `${(i * 5.13 + 3) % 100}%`,
        left: `${(i * 7.79 + 11) % 100}%`,
        duration: 5 + (i % 5) * 1.5,
        delay: (i % 7) * 0.8,
        size: 1.5 + (i % 3),
      })),
    []
  );

  return (
    <div
      className="bg-fixed overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Grid Pattern */}
      <div className="bg-grid" />

      {/* Gradient Orbs */}
      <motion.div
        className="bg-orb bg-orb-1"
        animate={{ scale: [1, 1.15, 1], x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="bg-orb bg-orb-2"
        animate={{ scale: [1, 1.3, 1], x: [0, -60, 0], y: [0, -30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="bg-orb bg-orb-3"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />

      {/* Vignette */}
      <div className="bg-vignette" />

      {/* Film Grain Overlay */}
      <div className="bg-grain" />

      {/* Subtle Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: 0.15 + (p.id % 4) * 0.05,
          }}
        />
      ))}
    </div>
  );
};

export default Background;
