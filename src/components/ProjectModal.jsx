import React, { useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Layers, Zap, User } from 'lucide-react';

/* ── Project Case Study Modal ─────────────────
   - Opens on project card click
   - AnimatePresence enter / exit
   - GPU-optimized (transform + opacity only)
   - Body scroll lock
   - Close on Escape / backdrop click
   - Fully responsive, mobile-first           */

const badgeClass = (category) => {
  switch (category) {
    case 'Cybersecurity': return 'badge badge-rose';
    case 'IoT': return 'badge badge-emerald';
    case 'Game Development': return 'badge badge-purple';
    case 'Automation': return 'badge badge-amber';
    case 'AI': return 'badge badge-cyan';
    default: return 'badge';
  }
};

const ProjectModal = ({ project, onClose }) => {
  const overlayRef = useRef(null);

  /* Lock body scroll */
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  /* Close on Escape */
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, onClose]);

  /* Close on backdrop click */
  const onBackdropClick = useCallback((e) => {
    if (e.target === overlayRef.current) onClose();
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          ref={overlayRef}
          className="pm-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onBackdropClick}
        >
          <motion.div
            className="pm-card"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close Button */}
            <button className="pm-close" onClick={onClose} aria-label="Close modal">
              <X size={18} />
            </button>

            {/* Header */}
            <div className="pm-header">
              <span className={badgeClass(project.category)}>
                {project.category}
              </span>
              <h2 className="pm-title font-display">{project.title}</h2>
            </div>

            {/* Body */}
            <div className="pm-body">
              {/* Description */}
              <p className="pm-description">{project.description}</p>

              {/* Impact Metric */}
              <div className="pm-impact">
                <Zap size={16} className="pm-impact-icon" />
                <span>{project.impact}</span>
              </div>

              {/* Tech Stack */}
              <div className="pm-section">
                <div className="pm-section-label">
                  <Layers size={14} />
                  <span>Tech Stack</span>
                </div>
                <div className="pm-tags">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="skill-tag">{tech}</span>
                  ))}
                </div>
              </div>

              {/* Creator */}
              <div className="pm-section">
                <div className="pm-section-label">
                  <User size={14} />
                  <span>Created by</span>
                </div>
                <span className="pm-owner">{project.owner}</span>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pm-footer">
              <button className="btn btn-ghost pm-action" tabIndex={0}>
                <Github size={15} /> View Code
              </button>
              <button className="btn btn-ghost pm-action" tabIndex={0}>
                <ExternalLink size={15} /> Live Demo
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
