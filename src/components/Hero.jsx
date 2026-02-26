import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Brain, Shield, Wifi, Gamepad2, Cog } from 'lucide-react';
import { scrollTo } from '../smoothScroll';
import MagneticButton from './MagneticButton';

/* ── Scramble Text Effect ─────────────────── */
const WORDS = ['Intelligent', 'Scalable', 'Secure', 'Innovative', 'Autonomous'];
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*';

const ScrambleText = () => {
  const [display, setDisplay] = useState(WORDS[0]);
  const indexRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const cycle = () => {
      const nextIndex = (indexRef.current + 1) % WORDS.length;
      const target = WORDS[nextIndex];
      let frame = 0;
      const totalFrames = target.length * 3;

      const scramble = () => {
        frame++;
        const progress = frame / totalFrames;
        const resolved = Math.floor(progress * target.length);

        setDisplay(
          target
            .split('')
            .map((char, i) =>
              i < resolved
                ? char
                : CHARS[Math.floor(Math.random() * CHARS.length)]
            )
            .join('')
        );

        if (frame < totalFrames) {
          timeoutRef.current = setTimeout(scramble, 35);
        } else {
          setDisplay(target);
          indexRef.current = nextIndex;
          timeoutRef.current = setTimeout(cycle, 3000);
        }
      };

      scramble();
    };

    timeoutRef.current = setTimeout(cycle, 3000);
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return <span className="scramble-text gradient-text">{display}</span>;
};

/* ── Animated Counter ─────────────────────── */
const AnimatedCounter = ({ value, suffix = '', label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const duration = 2000;
          const numValue = parseInt(value, 10) || 0;

          const animate = (now) => {
            const elapsed = now - start;
            const t = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - t, 4);
            setCount(Math.round(eased * numValue));
            if (t < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="stat-item">
      <div className="stat-value font-display">
        {count}
        {suffix && <span className="stat-suffix">{suffix}</span>}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

/* ── Hero Section ─────────────────────────── */
const Hero = () => {
  const domains = [
    { icon: <Brain size={14} />, label: 'AI' },
    { icon: <Shield size={14} />, label: 'Cybersecurity' },
    { icon: <Wifi size={14} />, label: 'IoT' },
    { icon: <Cog size={14} />, label: 'Full Stack' },
    { icon: <Gamepad2 size={14} />, label: 'Game Dev' },
    { icon: <Cog size={14} />, label: 'Automation' },
  ];

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label hero-label">
            NEXT-GEN TECHNOLOGY COLLECTIVE
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="hero-heading font-display"
        >
          <span className="hero-line">Engineering</span>
          <span className="hero-line">
            <ScrambleText />
          </span>
          <span className="hero-line">Systems for the Future</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hero-subtitle"
        >
          A collective of 8 engineers building production-grade platforms across
          AI, cybersecurity, IoT, and beyond.
        </motion.p>

        {/* Domain Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hero-domains"
        >
          {domains.map((d, i) => (
            <motion.span
              key={d.label}
              className="hero-domain-tag"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
            >
              {d.icon}
              {d.label}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="hero-ctas"
        >
          <MagneticButton
            onClick={() => scrollTo('#projects')}
            className="btn btn-primary"
          >
            View Projects <ArrowRight size={18} />
          </MagneticButton>
          <MagneticButton
            onClick={() => scrollTo('#team')}
            className="btn btn-secondary"
          >
            <Users size={18} /> Meet the Team
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="hero-stats"
        >
          <AnimatedCounter value={8} label="Engineers" />
          <div className="stat-divider" />
          <AnimatedCounter value={25} suffix="+" label="Projects Built" />
          <div className="stat-divider" />
          <AnimatedCounter value={6} label="Core Domains" />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="scroll-mouse">
          <div className="scroll-dot" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
