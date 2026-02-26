import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Cinematic Preloader ──────────────────────────────
   Sequence:
   0.0s  — Black screen, particles drift in
   0.4s  — Horizontal light streak flashes across
   0.8s  — "Q" glitches into existence (large, centered)
   1.2s  — "Q" shrinks, "UANTIC" types in letter-by-letter
   1.8s  — "LABS" slams in with glow
   2.2s  — Tagline fades in below
   2.6s  — Progress bar + counter appear
   3.8s  — Everything shatters/dissolves — cinematic bars retract
─────────────────────────────────────────────────────── */

const TAGLINE = 'ENGINEERING INTELLIGENT SYSTEMS';

const Preloader = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const rafRef = useRef(null);

  /* Particles for background atmosphere */
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 2,
      })),
    []
  );

  /* Phase timeline */
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),   // light streak
      setTimeout(() => setPhase(2), 800),   // Q appears
      setTimeout(() => setPhase(3), 1400),  // UANTIC types
      setTimeout(() => setPhase(4), 2000),  // LABS slams
      setTimeout(() => setPhase(5), 2400),  // tagline
      setTimeout(() => setPhase(6), 2800),  // progress
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  /* Progress counter — starts at phase 6 */
  useEffect(() => {
    if (phase < 6) return;
    const startTime = performance.now();
    const duration = 1400;

    const animate = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.floor(eased * 100));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => setIsVisible(false), 500);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [phase]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          className="cine-preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* ─── Cinematic Letterbox Bars ─── */}
          <motion.div
            className="cine-bar cine-bar-top"
            initial={{ height: '12vh' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="cine-bar cine-bar-bottom"
            initial={{ height: '12vh' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* ─── Background Particles ─── */}
          <div className="cine-particles">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="cine-particle"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  y: [0, -40, -80],
                  x: [0, (Math.random() - 0.5) * 20],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                }}
              />
            ))}
          </div>

          {/* ─── Horizontal light streak ─── */}
          <AnimatePresence>
            {phase >= 1 && phase < 3 && (
              <motion.div
                className="cine-streak"
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '200%', opacity: [0, 1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            )}
          </AnimatePresence>

          {/* ─── Center Content ─── */}
          <div className="cine-center">
            {/* "Q" — Glitch appearance */}
            <AnimatePresence>
              {phase >= 2 && (
                <motion.div
                  className="cine-logo-wrap"
                  initial={{ scale: 3, opacity: 0 }}
                  animate={{
                    scale: phase >= 3 ? 1 : 2.5,
                    opacity: 1,
                    x: phase >= 3 ? 0 : 0,
                  }}
                  transition={{
                    scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.15 },
                  }}
                >
                  <div className="cine-brand-row">
                    {/* The Q with glitch */}
                    <motion.span
                      className="cine-q font-display"
                      animate={
                        phase === 2
                          ? {
                              textShadow: [
                                '2px 0 #f43f5e, -2px 0 #3b82f6',
                                '0px 0 transparent',
                                '-3px 0 #f43f5e, 3px 0 #06b6d4',
                                '0px 0 transparent',
                              ],
                            }
                          : { textShadow: '0px 0px transparent' }
                      }
                      transition={{ duration: 0.4, times: [0, 0.3, 0.6, 1] }}
                    >
                      Q
                    </motion.span>

                    {/* "UANTIC" — letter-by-letter type-in */}
                    {phase >= 3 && (
                      <span className="cine-uantic">
                        {'UANTIC'.split('').map((char, i) => (
                          <motion.span
                            key={i}
                            className="cine-letter font-display"
                            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{
                              duration: 0.25,
                              delay: i * 0.06,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          >
                            {char}
                          </motion.span>
                        ))}
                      </span>
                    )}

                    {/* "LABS" — slam in */}
                    {phase >= 4 && (
                      <motion.span
                        className="cine-labs font-display"
                        initial={{ opacity: 0, scale: 2.5, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={{
                          duration: 0.35,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        LABS
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tagline — letter cascade */}
            {phase >= 5 && (
              <motion.div className="cine-tagline">
                {TAGLINE.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: char === ' ' ? 0.4 : 0.5 }}
                    transition={{ duration: 0.03, delay: i * 0.025 }}
                    className="font-mono"
                    style={{ display: 'inline-block', width: char === ' ' ? '0.5em' : 'auto' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.div>
            )}

            {/* Progress bar + counter */}
            {phase >= 6 && (
              <motion.div
                className="cine-progress"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="cine-progress-track">
                  <motion.div
                    className="cine-progress-fill"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: progress / 100 }}
                    transition={{ duration: 0.05 }}
                  />
                  {/* Glow tip at the end of progress */}
                  <div
                    className="cine-progress-glow"
                    style={{ left: `${progress}%` }}
                  />
                </div>
                <div className="cine-counter font-mono">{progress}%</div>
              </motion.div>
            )}
          </div>

          {/* ─── Corner Accents ─── */}
          <motion.div
            className="cine-corner cine-corner-tl"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 2 ? 0.3 : 0 }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            className="cine-corner cine-corner-br"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 2 ? 0.3 : 0 }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
