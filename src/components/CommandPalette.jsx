import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, X, Command } from 'lucide-react';
import { scrollTo } from '../smoothScroll';

/* ── Command Palette (Ctrl+K / ⌘K) ───────────
   - Keyboard navigable
   - Fuzzy search across sections & projects
   - GPU-friendly overlay (backdrop-filter)
   - Mobile accessible via floating FAB        */

const SECTIONS = [
  { label: 'About', target: '#about', type: 'Section' },
  { label: 'Achievements', target: '#achievements', type: 'Section' },
  { label: 'Team', target: '#team', type: 'Section' },
  { label: 'Projects', target: '#projects', type: 'Section' },
  { label: 'Innovation', target: '#innovation', type: 'Section' },
  { label: 'Contact', target: '#contact', type: 'Section' },
];

/* Quick-access project highlights */
const PROJECTS = [
  { label: 'LuxeStay', target: '#projects', type: 'Project' },
  { label: 'AURA AI Chatbot', target: '#projects', type: 'Project' },
  { label: 'GHOSTLINK', target: '#projects', type: 'Project' },
  { label: 'ArcNova', target: '#projects', type: 'Project' },
  { label: 'NYTRIX AI', target: '#projects', type: 'Project' },
  { label: 'CM-X Printing', target: '#projects', type: 'Project' },
  { label: 'Document Analyser AI', target: '#projects', type: 'Project' },
  { label: 'NexusStrikePro', target: '#projects', type: 'Project' },
];

const ACTIONS = [
  { label: 'Go to Top', target: '#hero', type: 'Action' },
  { label: 'Send Message', target: '#contact', type: 'Action' },
];

const ALL_ITEMS = [...SECTIONS, ...PROJECTS, ...ACTIONS];

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);

  /* Filtered results */
  const results = useMemo(() => {
    if (!query.trim()) return ALL_ITEMS;
    const q = query.toLowerCase();
    return ALL_ITEMS.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q)
    );
  }, [query]);

  /* Reset selection on results change */
  useEffect(() => setSelected(0), [results]);

  /* Keyboard shortcut: Ctrl+K / Cmd+K */
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  /* Focus input when opened */
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  /* Navigate results with arrow keys */
  const onInputKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === 'Enter' && results[selected]) {
      e.preventDefault();
      handleSelect(results[selected]);
    }
  };

  const handleSelect = (item) => {
    setOpen(false);
    setTimeout(() => scrollTo(item.target), 100);
  };

  const typeColors = {
    Section: 'var(--accent-blue)',
    Project: 'var(--accent-cyan)',
    Action: 'var(--accent-emerald)',
  };

  return (
    <>
      {/* Floating trigger — mobile & desktop hint */}
      <button
        className="cmd-trigger"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
      >
        <Command size={16} />
        <span className="cmd-trigger-label">Quick Jump</span>
        <kbd className="cmd-kbd">Ctrl K</kbd>
      </button>

      {/* Palette Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="cmd-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="cmd-palette"
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Input */}
              <div className="cmd-input-wrap">
                <Search size={18} className="cmd-search-icon" />
                <input
                  ref={inputRef}
                  className="cmd-input"
                  type="text"
                  placeholder="Search sections, projects..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onInputKeyDown}
                  autoComplete="off"
                  spellCheck={false}
                />
                <button className="cmd-close" onClick={() => setOpen(false)}>
                  <X size={14} />
                </button>
              </div>

              {/* Results */}
              <div className="cmd-results">
                {results.length === 0 ? (
                  <div className="cmd-empty">No results found</div>
                ) : (
                  results.map((item, i) => (
                    <button
                      key={`${item.type}-${item.label}`}
                      className={`cmd-result ${i === selected ? 'cmd-result-active' : ''}`}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelected(i)}
                    >
                      <span
                        className="cmd-result-type"
                        style={{ color: typeColors[item.type] }}
                      >
                        {item.type}
                      </span>
                      <span className="cmd-result-label">{item.label}</span>
                      <ArrowRight size={14} className="cmd-result-arrow" />
                    </button>
                  ))
                )}
              </div>

              {/* Footer hints */}
              <div className="cmd-footer">
                <span><kbd>↑↓</kbd> Navigate</span>
                <span><kbd>↵</kbd> Select</span>
                <span><kbd>Esc</kbd> Close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandPalette;
