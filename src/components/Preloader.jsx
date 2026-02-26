import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── PEAK CINEMATIC PRELOADER v2 ──────────────────────
   0.0s  — Pitch black, vignette breathes
   0.3s  — Static noise + glitch bands rip across
   0.7s  — Vertical energy slash splits the darkness
   1.0s  — "Q" SMASHES in — screen shakes, white flash, chromatic split
   1.5s  — "UANTIC" rapid-types with cursor
   2.1s  — "LABS" slams — lens flare + particle burst
   2.6s  — Tagline scramble-decodes
   3.0s  — Logo breathes with glow, pulse rings expand
   3.6s  — White flash + blade wipe → reveal site
─────────────────────────────────────────────────────── */

const TAGLINE = 'ENGINEERING INTELLIGENT SYSTEMS';
const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:<>?/~\\▓▒░█▄▀';

const useScrambleDecode = (text, active, duration = 700) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    if (!active) return;
    const total = text.length;
    const interval = duration / (total * 2.5);
    let frame = 0;
    const maxFrames = total * 2.5;
    const tick = () => {
      frame++;
      const resolved = Math.floor(frame / 2.5);
      let result = '';
      for (let i = 0; i < total; i++) {
        if (text[i] === ' ') { result += ' '; continue; }
        if (i < resolved) result += text[i];
        else result += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      }
      setDisplay(result);
      if (frame < maxFrames) setTimeout(tick, interval);
    };
    tick();
  }, [active, text, duration]);
  return display;
};

const Preloader = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [shaking, setShaking] = useState(false);

  const decodedTagline = useScrambleDecode(TAGLINE, phase >= 5, 800);

  const particles = useMemo(
    () => Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 0.5 + Math.random() * 1.5,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 2,
    })),
    []
  );

  /* Burst particles when LABS slams */
  const burstParticles = useMemo(
    () => Array.from({ length: 20 }, (_, i) => ({
      id: i,
      angle: (i / 20) * 360,
      distance: 80 + Math.random() * 120,
      size: 2 + Math.random() * 3,
      duration: 0.5 + Math.random() * 0.4,
    })),
    []
  );

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),     // glitch bands
      setTimeout(() => setPhase(2), 700),     // vertical slash
      setTimeout(() => { setPhase(3); setShaking(true); }, 1000),  // Q smash + shake
      setTimeout(() => setShaking(false), 1350),
      setTimeout(() => setPhase(4), 1500),    // UANTIC types
      setTimeout(() => setPhase(5), 2100),    // LABS + tagline
      setTimeout(() => setPhase(6), 3000),    // pulse + glow breathe
      setTimeout(() => setPhase(7), 3600),    // flash + wipe
      setTimeout(() => setIsVisible(false), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          className={`cine-preloader ${shaking ? 'cine-shake' : ''}`}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* ─── Scan Lines ─── */}
          <div className="cine-scanlines" />

          {/* ─── Animated Vignette ─── */}
          <div className="cine-vignette" />

          {/* ─── Letterbox ─── */}
          <motion.div
            className="cine-bar cine-bar-top"
            initial={{ height: '10vh' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="cine-bar cine-bar-bottom"
            initial={{ height: '10vh' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* ─── Ambient Particles ─── */}
          <div className="cine-particles">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="cine-particle"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0], y: [0, -60] }}
                transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
                style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px` }}
              />
            ))}
          </div>

          {/* ─── Glitch Bands (Phase 1) ─── */}
          <AnimatePresence>
            {phase >= 1 && phase < 3 && (
              <>
                {[15, 30, 45, 60, 75, 88].map((top, i) => (
                  <motion.div
                    key={`band-${i}`}
                    className="cine-glitch-band"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{
                      opacity: [0, 1, 0, 0.7, 0],
                      scaleX: [0, 1.2, 0, 0.8, 0],
                      x: [0, i % 2 === 0 ? 30 : -30, 0],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.04, ease: 'easeOut' }}
                    style={{ top: `${top}%`, height: `${1 + Math.random() * 4}px` }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* ─── Vertical Energy Slash (Phase 2) ─── */}
          <AnimatePresence>
            {phase >= 2 && phase < 4 && (
              <>
                <motion.div
                  className="cine-vslash"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: [0, 1, 0.9, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* Afterglow */}
                <motion.div
                  className="cine-vslash-glow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                />
              </>
            )}
          </AnimatePresence>

          {/* ─── Q Impact Flash (Phase 3) ─── */}
          <AnimatePresence>
            {phase >= 3 && phase < 4 && (
              <motion.div
                className="cine-impact-flash"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.7, 0] }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            )}
          </AnimatePresence>

          {/* ─── Center Content ─── */}
          <div className="cine-center">
            <AnimatePresence>
              {phase >= 3 && (
                <motion.div
                  className="cine-logo-wrap"
                  initial={{ scale: 5, opacity: 0 }}
                  animate={{ scale: phase >= 4 ? 1 : 2.2, opacity: 1 }}
                  transition={{
                    scale: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.08 },
                  }}
                >
                  <div className={`cine-brand-row ${phase >= 6 ? 'cine-glow-breathe' : ''}`}>
                    {/* Q — chromatic smash */}
                    <motion.span
                      className="cine-q font-display"
                      animate={
                        phase === 3
                          ? {
                              x: [12, -8, 5, -3, 0],
                              y: [0, -4, 2, 0],
                              textShadow: [
                                '6px 0 #f43f5e, -6px 0 #3b82f6, 0 4px #06b6d4',
                                '-4px 0 #06b6d4, 4px 0 #f43f5e',
                                '3px 0 #f43f5e, -3px 0 #3b82f6',
                                '0px 0 transparent',
                              ],
                            }
                          : { x: 0, y: 0, textShadow: '0px 0px transparent' }
                      }
                      transition={{ duration: 0.35, times: [0, 0.2, 0.5, 1] }}
                    >
                      Q
                    </motion.span>

                    {/* UANTIC — rapid type with cursor */}
                    {phase >= 4 && (
                      <span className="cine-uantic">
                        {'UANTIC'.split('').map((char, i) => (
                          <motion.span
                            key={i}
                            className="cine-letter font-display"
                            initial={{ opacity: 0, y: 40, filter: 'blur(16px)', scale: 1.3 }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                            transition={{ duration: 0.18, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                          >
                            {char}
                          </motion.span>
                        ))}
                        <motion.span
                          className="cine-cursor"
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.5, repeat: phase < 5 ? Infinity : 0 }}
                          style={{ opacity: phase >= 5 ? 0 : 1 }}
                        />
                      </span>
                    )}

                    {/* LABS — slam with burst */}
                    {phase >= 5 && (
                      <motion.span className="cine-labs-wrap">
                        <motion.span
                          className="cine-labs font-display"
                          initial={{ opacity: 0, scale: 3.5, x: 60, filter: 'blur(20px)' }}
                          animate={{ opacity: 1, scale: 1, x: 0, filter: 'blur(0px)' }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        >
                          LABS
                        </motion.span>
                        {/* Lens Flare */}
                        <motion.div
                          className="cine-lens-flare"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: [0, 1, 0.3, 0], scale: [0.3, 1.8, 2.5, 3] }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                        />
                        {/* Particle Burst */}
                        {burstParticles.map((bp) => (
                          <motion.div
                            key={`burst-${bp.id}`}
                            className="cine-burst"
                            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                            animate={{
                              opacity: 0,
                              x: Math.cos((bp.angle * Math.PI) / 180) * bp.distance,
                              y: Math.sin((bp.angle * Math.PI) / 180) * bp.distance,
                              scale: 0,
                            }}
                            transition={{ duration: bp.duration, ease: 'easeOut' }}
                            style={{ width: `${bp.size}px`, height: `${bp.size}px` }}
                          />
                        ))}
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tagline — scramble decode */}
            {phase >= 5 && (
              <motion.div
                className="cine-tagline font-mono"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                {decodedTagline}
              </motion.div>
            )}

            {/* Horizontal accent line under tagline */}
            {phase >= 5 && (
              <motion.div
                className="cine-accent-line"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            )}

            {/* Pulse Rings (Phase 6) */}
            <AnimatePresence>
              {phase >= 6 && (
                <>
                  {[0, 0.12, 0.24].map((delay, i) => (
                    <motion.div
                      key={`ring-${i}`}
                      className="cine-pulse-ring"
                      initial={{ scale: 0, opacity: 0.7 }}
                      animate={{ scale: 10, opacity: 0 }}
                      transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>

          {/* ─── Exit Flash + Wipe (Phase 7) ─── */}
          <AnimatePresence>
            {phase >= 7 && (
              <>
                <motion.div
                  className="cine-exit-flash"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.9, 0] }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
                <motion.div
                  className="cine-wipe"
                  initial={{ x: '-110%' }}
                  animate={{ x: '110%' }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                />
              </>
            )}
          </AnimatePresence>

          {/* ─── Corner Brackets ─── */}
          <motion.div
            className="cine-corner cine-corner-tl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: phase >= 3 ? 0.4 : 0, scale: 1 }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            className="cine-corner cine-corner-br"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: phase >= 3 ? 0.4 : 0, scale: 1 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
