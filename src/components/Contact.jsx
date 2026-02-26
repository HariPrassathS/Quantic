import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone, Send, Github, Instagram } from 'lucide-react';

const WEB3FORMS_KEY = '3007764c-530e-453a-aaf9-88192f23537a';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          from_name: formData.name,
          replyto: formData.email,
          subject: `New Inquiry: ${formData.subject}`,
          name: formData.name,
          email: formData.email,
          Subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact">
      <div className="container" style={{ maxWidth: '1100px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">CONTACT</span>
            <h2 className="section-title">
              Let's Build Something <span className="text-accent">Together</span>
            </h2>
            <p className="section-subtitle mx-auto" style={{ textAlign: 'center' }}>
              Have a vision? We have the tools and expertise to bring it to life. Reach out for a consultation.
            </p>
          </motion.div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'start',
          }}
        >
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
          >
            {/* Email */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(59, 130, 246, 0.08)',
                  border: '1px solid rgba(59, 130, 246, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-blue)',
                  flexShrink: 0,
                }}
              >
                <Mail size={22} />
              </div>
              <div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontWeight: 500, marginBottom: '2px' }}>
                  Email us at
                </p>
                <a href="mailto:quanticlabs26@gmail.com" style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)', textDecoration: 'none' }}>quanticlabs26@gmail.com</a>
              </div>
            </div>

            {/* Phone */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(6, 182, 212, 0.08)',
                  border: '1px solid rgba(6, 182, 212, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-cyan)',
                  flexShrink: 0,
                }}
              >
                <Phone size={22} />
              </div>
              <div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontWeight: 500, marginBottom: '2px' }}>
                  Call us
                </p>
                <a href="tel:+917810013572" style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)', textDecoration: 'none' }}>+91 78100 13572</a>
              </div>
            </div>

            {/* Collaboration */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-emerald)',
                  flexShrink: 0,
                }}
              >
                <MessageSquare size={22} />
              </div>
              <div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontWeight: 500, marginBottom: '2px' }}>
                  Collaboration
                </p>
                <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>Open for project inquiries</p>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: 'var(--text-tertiary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '14px',
                }}
              >
                Connect with us
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[
                  { Icon: Github, label: 'GitHub', url: 'https://github.com/HariPrassathS' },
                  { Icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/_stark_vibes_/' },
                ].map(({ Icon, label, url }) => (
                  <motion.a
                    key={label}
                    href={url}
                    target={url !== '#' ? '_blank' : undefined}
                    rel={url !== '#' ? 'noopener noreferrer' : undefined}
                    whileHover={{ y: -3, borderColor: 'var(--accent-blue)' }}
                    aria-label={label}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--glass-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-secondary)',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Collaboration CTA */}
            <div
              style={{
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
              }}
            >
              <p className="font-display" style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '8px' }}>
                Looking to collaborate?
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                We're always open to discussing new projects, innovative ideas, and opportunities to build impactful technology together.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{ padding: '32px' }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    color: 'var(--accent-emerald)',
                    fontSize: '1.5rem',
                  }}
                >
                  ✓
                </div>
                <p className="font-display" style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '8px' }}>
                  Message Sent!
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
                {error && (
                  <div style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', background: 'rgba(244, 63, 94, 0.08)', border: '1px solid rgba(244, 63, 94, 0.2)', color: 'var(--accent-rose)', fontSize: '0.85rem' }}>
                    {error}
                  </div>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
                <textarea
                  name="message"
                  placeholder="Tell us about your project or idea..."
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="form-input"
                  style={{ resize: 'vertical', minHeight: '120px' }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={sending}
                  style={{ width: '100%', padding: '14px', fontSize: '0.95rem', opacity: sending ? 0.7 : 1, cursor: sending ? 'not-allowed' : 'pointer' }}
                >
                  {sending ? 'Sending...' : 'Send Message'} {!sending && <Send size={18} />}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          #contact form div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
