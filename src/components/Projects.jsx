import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    title: 'Car Rental Website',
    description: 'Full-featured car rental web application built with PHP and MySQL. Includes vehicle listing, booking system, user registration/login, admin panel, and complete database management for reservations and billing.',
    tech: ['PHP', 'MySQL', 'HTML/CSS', 'JavaScript'],
    emoji: '🚗',
    color: '#3b82f6',
    github: '#',
    live: '#',
    status: 'Completed',
    category: 'Web App',
  },
  {
    title: 'Digital Locker',
    description: 'Desktop application built in C# (.NET) that acts as a secure digital locker — store, encrypt, and manage sensitive files and documents with password protection and access control.',
    tech: ['C#', '.NET', 'Windows Forms', 'SQL Server'],
    emoji: '🔐',
    color: '#8b5cf6',
    github: '#',
    live: '#',
    status: 'Completed',
    category: 'Desktop App',
  },
  {
    title: 'Chocolate Store — E-Commerce',
    description: 'Complete WordPress e-commerce website for a chocolate brand. Features product catalog, shopping cart, WooCommerce integration, custom theme, SEO optimization, and mobile-responsive design.',
    tech: ['WordPress', 'WooCommerce', 'PHP', 'CSS'],
    emoji: '🍫',
    color: '#92400e',
    github: '#',
    live: '#',
    status: 'Delivered',
    category: 'E-Commerce',
  },
  {
    title: 'Chocolate Online Selling',
    description: 'Online chocolate selling platform built with Advanced Java (ADS Java). Features product browsing, order placement, customer management, and a fully connected database backend using JDBC.',
    tech: ['Advanced Java', 'JDBC', 'JSP/Servlets', 'MySQL'],
    emoji: '🛍️',
    color: '#d97706',
    github: '#',
    live: '#',
    status: 'Completed',
    category: 'Web App',
  },
  {
    title: 'Bionic Hand — IoT Robot',
    description: 'Mini bionic robot hand built using sensor technology and IoT. The hand detects finger flex sensor inputs and mimics human hand movements. A hardware-software integration project combining electronics and programming.',
    tech: ['IoT', 'Sensors', 'C/C++', 'Hardware'],
    emoji: '🦾',
    color: '#10b981',
    github: '#',
    live: '#',
    status: 'Built',
    category: 'IoT / Hardware',
  },
  {
    title: 'Game Store Website',
    description: 'Full-featured game store web application built with PHP and a complete MySQL database. Browse games by genre, add to cart, user accounts, admin product management, and order tracking system.',
    tech: ['PHP', 'MySQL', 'HTML/CSS', 'JavaScript'],
    emoji: '🎮',
    color: '#ec4899',
    github: '#',
    live: '#',
    status: 'Completed',
    category: 'Web App',
  },
];

function ProjectCard({ project, index, inView }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-80, 80], [6, -6]);
  const rotateY = useTransform(x, [-80, 80], [-6, 6]);

  const handleMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const reset = () => { x.set(0); y.set(0); };

  const statusColor =
    project.status === 'Completed' ? '#10b981' :
    project.status === 'Delivered' ? '#3b82f6' :
    project.status === 'Built' ? '#8b5cf6' : '#f59e0b';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
    >
      <motion.div
        className="glass project-card"
        style={{
          rotateX, rotateY,
          transformStyle: 'preserve-3d',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '24px',
        }}
      >
        {/* Top Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '26px', background: `${project.color}20`, border: `1px solid ${project.color}40`,
            flexShrink: 0,
          }}>
            {project.emoji}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
            <span style={{
              fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '999px',
              background: `${statusColor}15`, border: `1px solid ${statusColor}40`, color: statusColor,
              letterSpacing: '1px', textTransform: 'uppercase',
            }}>
              {project.status}
            </span>
            <span style={{
              fontSize: '9px', fontWeight: 600, padding: '2px 8px', borderRadius: '999px',
              background: `${project.color}10`, border: `1px solid ${project.color}25`,
              color: project.color, letterSpacing: '1px', textTransform: 'uppercase',
            }}>
              {project.category}
            </span>
          </div>
        </div>

        {/* Title & Desc */}
        <h3 style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#f1f5f9',
          fontSize: '1.05rem', marginBottom: '10px',
        }}>
          {project.title}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.84rem', lineHeight: 1.75, flexGrow: 1 }}>
          {project.description}
        </p>

        {/* Divider */}
        <div style={{
          height: '1px', background: `linear-gradient(90deg, ${project.color}50, transparent)`,
          margin: '16px 0',
        }} />

        {/* Tech Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
          {project.tech.map(t => (
            <span key={t} style={{
              fontSize: '11px', padding: '4px 10px', borderRadius: '6px', fontWeight: 600,
              background: `${project.color}15`, border: `1px solid ${project.color}30`, color: project.color,
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <motion.a
            href={project.github} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            style={{
              flex: 1, padding: '8px', borderRadius: '8px', textAlign: 'center',
              background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)',
              color: '#818cf8', fontSize: '12px', fontWeight: 600, textDecoration: 'none',
            }}
          >
            ⌥ GitHub
          </motion.a>
          <motion.a
            href={project.live} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            style={{
              flex: 1, padding: '8px', borderRadius: '8px', textAlign: 'center',
              background: `${project.color}15`, border: `1px solid ${project.color}30`,
              color: project.color, fontSize: '12px', fontWeight: 600, textDecoration: 'none',
            }}
          >
            ↗ View
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" ref={ref} style={{ padding: '96px 0', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

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
            background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)',
            color: '#06b6d4', marginBottom: '16px',
          }}>
            What I've Built
          </span>
          <h2 className="section-title" style={{
            fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800, display: 'inline-block',
          }}>
            My <span className="gradient-text">Projects</span>
          </h2>
          <p style={{ color: '#94a3b8', marginTop: '20px', maxWidth: '540px', margin: '20px auto 0', lineHeight: 1.7 }}>
            6 real-world projects across Web, Desktop, E-Commerce, and IoT — each one built with genuine passion and purpose.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} inView={inView} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{ textAlign: 'center', marginTop: '56px' }}
        >
          <p style={{ color: '#64748b', marginBottom: '16px', fontSize: '0.9rem' }}>
            More projects coming soon as I continue learning →
          </p>
          <motion.a
            href="https://github.com/" target="_blank" rel="noopener noreferrer"
            className="btn-outline"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            style={{ textDecoration: 'none', display: 'inline-block' }}
          >
            View GitHub Profile ↗
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
