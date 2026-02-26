import React from 'react';
import { Zap } from 'lucide-react';
import { scrollTo } from '../smoothScroll';

const footerLinks = [
  {
    title: 'Navigation',
    links: [
      { name: 'About', href: '#about' },
      { name: 'Achievements', href: '#achievements' },
      { name: 'Team', href: '#team' },
      { name: 'Projects', href: '#projects' },
    ],
  },
  {
    title: 'Domains',
    links: [
      { name: 'Full Stack', href: '#about' },
      { name: 'AI Systems', href: '#about' },
      { name: 'Cybersecurity', href: '#about' },
      { name: 'IoT Solutions', href: '#about' },
      { name: 'Game Development', href: '#about' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
    ],
  },
];

const Footer = () => {
  const handleClick = (e, href) => {
    if (href.startsWith('#') && href !== '#') {
      e.preventDefault();
      scrollTo(href);
    }
  };

  return (
    <footer
      style={{
        borderTop: '1px solid var(--glass-border)',
        padding: '64px 24px 32px',
        background: 'var(--bg-secondary)',
      }}
    >
      <div className="container">
        {/* Top Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '40px',
            marginBottom: '48px',
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'var(--gradient-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 15px rgba(59, 130, 246, 0.25)',
                }}
              >
                <Zap size={16} color="#fff" />
              </div>
              <span
                className="font-display"
                style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em' }}
              >
                QUANTIC<span style={{ color: 'var(--accent-blue)' }}>LABS</span>
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.7, maxWidth: '300px', marginBottom: '20px' }}>
              Engineering intelligent systems for the future. A technology collective building scalable platforms across AI, cybersecurity, IoT, and more.
            </p>
            <p
              className="font-display"
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--text-tertiary)',
                fontStyle: 'italic',
              }}
            >
              "Empowering the Next Gen Developer"
            </p>
          </div>

          {/* Link Columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <p
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: 'var(--text-tertiary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginBottom: '20px',
                }}
              >
                {group.title}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {group.links.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      transition: 'color 0.2s',
                    }}
                    className="footer-link"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--glass-border)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
            © {new Date().getFullYear()} Quantic Labs. All rights reserved.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
            Designed & Engineered by Quantic Labs
          </p>
        </div>
      </div>

      <style>{`
        .footer-link:hover {
          color: var(--accent-blue) !important;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
