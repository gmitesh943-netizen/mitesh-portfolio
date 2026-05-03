import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const contactInfo = [
  { icon: '📧', label: 'Email', value: 'mitesh.gauswami@email.com', href: 'mailto:mitesh.gauswami@email.com' },
  { icon: '📍', label: 'Location', value: 'Gujarat, India', href: null },
  { icon: '💼', label: 'Availability', value: 'Open to Work', href: null },
  { icon: '⏰', label: 'Response Time', value: 'Within 24 hours', href: null },
];

const socials = [
  { label: 'GitHub', icon: 'GH', href: 'https://github.com/', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
  { label: 'LinkedIn', icon: 'in', href: 'https://linkedin.com/', color: '#0ea5e9', bg: 'rgba(14,165,233,0.12)' },
  { label: 'Twitter', icon: '𝕏', href: 'https://twitter.com/', color: '#06b6d4', bg: 'rgba(6,182,212,0.12)' },
  { label: 'Email', icon: '@', href: 'mailto:mitesh.gauswami@email.com', color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)' },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'contacts'), {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        status: 'new',
        timestamp: serverTimestamp(),
      });
      setLoading(false);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setForm({ name: '', email: '', subject: '', message: '' });
      }, 4000);
    } catch (err) {
      console.error('Error saving message:', err);
      setLoading(false);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" ref={ref} style={{ padding: '96px 0', position: 'relative' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span style={{
            display: 'inline-block', padding: '6px 16px', borderRadius: '999px',
            fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase',
            background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
            color: '#10b981', marginBottom: '16px',
          }}>
            Contact Me
          </span>
          <h2 className="section-title" style={{
            fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800, display: 'inline-block',
          }}>
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p style={{ color: '#94a3b8', marginTop: '20px', maxWidth: '520px', margin: '20px auto 0', lineHeight: 1.7 }}>
            Have a project in mind or want to collaborate? I'm always open to new opportunities and conversations.
          </p>
        </motion.div>

        {/* Two column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          alignItems: 'start',
        }}>

          {/* LEFT: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            {/* Intro Card */}
            <div className="glass" style={{ padding: '28px', borderLeft: '3px solid #3b82f6' }}>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.2rem', color: '#f1f5f9', marginBottom: '10px' }}>
                Let's Work Together 🤝
              </h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '0.9rem' }}>
                I'm currently open for <span style={{ color: '#3b82f6' }}>freelance projects</span>,
                <span style={{ color: '#8b5cf6' }}> full-time roles</span>, and
                <span style={{ color: '#06b6d4' }}> AI/ML collaborations</span>.
                Whether it's a small website or a large enterprise system — let's build something great.
              </p>
            </div>

            {/* Contact Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {contactInfo.map(({ icon, label, value, href }) => (
                <motion.div
                  key={label}
                  className="glass"
                  whileHover={{ x: 6 }}
                  style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px', transition: 'all 0.3s ease' }}
                >
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '20px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
                    flexShrink: 0,
                  }}>
                    {icon}
                  </div>
                  <div>
                    <p style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2px' }}>
                      {label}
                    </p>
                    {href ? (
                      <a href={href} style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
                        {value}
                      </a>
                    ) : (
                      <p style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.9rem' }}>{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="glass" style={{ padding: '24px' }}>
              <p style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '16px' }}>
                Find me on
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {socials.map(({ label, icon, href, color, bg }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -4 }}
                    title={label}
                    style={{
                      width: '52px', height: '52px', borderRadius: '14px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: '14px',
                      background: bg, border: `1px solid ${color}30`,
                      color, textDecoration: 'none', transition: 'all 0.2s ease',
                    }}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="glass" style={{ padding: '36px' }}>
              {sent ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', gap: '16px', textAlign: 'center' }}
                >
                  <span style={{ fontSize: '56px' }}>🎉</span>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.4rem', color: '#f1f5f9' }}>
                    Message Sent!
                  </h3>
                  <p style={{ color: '#94a3b8', maxWidth: '280px', lineHeight: 1.7 }}>
                    Thanks for reaching out, {form.name || 'friend'}! I'll get back to you within 24 hours. 🚀
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#f1f5f9', marginBottom: '4px' }}>
                    Send a Message ✉️
                  </h3>

                  {/* Name + Email row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>
                        Your Name *
                      </label>
                      <input
                        type="text" name="name" value={form.name}
                        onChange={handleChange} placeholder="Mitesh" required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>
                        Email *
                      </label>
                      <input
                        type="email" name="email" value={form.email}
                        onChange={handleChange} placeholder="you@email.com" required
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>
                      Subject
                    </label>
                    <input
                      type="text" name="subject" value={form.subject}
                      onChange={handleChange} placeholder="Project Inquiry / Collaboration"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>
                      Message *
                    </label>
                    <textarea
                      name="message" rows={5} value={form.message}
                      onChange={handleChange}
                      placeholder="Hi Mitesh, I'd like to discuss a .NET project..."
                      required style={{ resize: 'vertical' }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="btn-primary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ fontSize: '1rem', padding: '14px', width: '100%', opacity: loading ? 0.7 : 1 }}
                    disabled={loading}
                  >
                    {loading ? '⏳ Sending...' : '🚀 Send Message'}
                  </motion.button>

                  <p style={{ textAlign: 'center', color: '#475569', fontSize: '12px' }}>
                    No spam. I'll only reply to your message.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
