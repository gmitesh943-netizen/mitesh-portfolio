import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import ThreeScene from './ThreeScene';

const roles = ['BCA Student', '.NET Developer', 'AI/ML Enthusiast', 'Full Stack Learner', 'Problem Solver'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  // Typing animation
  useEffect(() => {
    const current = roles[roleIndex];
    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
        return () => clearTimeout(t);
      } else {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIndex]);

  // Mouse tilt for profile
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const resetMouse = () => { x.set(0); y.set(0); };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden"
      style={{ paddingTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div style={{
          position: 'absolute', top: '-20%', left: '-10%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-10%',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
      </div>

      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>

          {/* LEFT: Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 order-2 lg:order-1 items-start"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
                style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', color: '#3b82f6' }}>
                👋 Welcome to my portfolio
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '4px' }}>
              Hi, I'm{' '}
              <span className="gradient-text">Mitesh</span>
              <br />
              <span className="gradient-text">Gauswami</span>
            </motion.h1>

            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <span className="text-2xl font-semibold text-slate-300" style={{ fontFamily: 'Syne, sans-serif' }}>
                {displayed}
              </span>
              <span className="text-2xl text-blue-400 animate-pulse">|</span>
            </motion.div>

            <motion.p variants={itemVariants} className="text-slate-400 text-lg leading-relaxed max-w-lg">
              I build <span className="text-blue-400 font-medium">scalable applications</span> and explore{' '}
              <span className="text-purple-400 font-medium">AI-driven solutions</span> — crafting software that makes an impact.
            </motion.p>

            {/* Stats */}
            <motion.div variants={itemVariants} className="flex gap-8">
              {[['BCA', 'Degree'], ['4', 'Sems Done'], ['10+', 'Projects']].map(([num, label]) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-bold gradient-text">{num}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              >
                🚀 Hire Me
              </motion.button>
              <motion.button
                className="btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              >
                View Projects →
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-4">
              {[
                { href: 'https://github.com/', icon: '⌥', label: 'GitHub' },
                { href: 'https://linkedin.com/', icon: 'in', label: 'LinkedIn' },
                { href: 'mailto:mitesh@email.com', icon: '@', label: 'Email' },
              ].map(({ href, icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold text-blue-400 transition-all"
                  style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)' }}
                  title={label}
                >
                  {icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center gap-6 order-1 lg:order-2"
          >
            {/* 3D Scene above image */}
            <div className="w-full max-w-xs">
              <ThreeScene />
            </div>


            {/* Profile Image with tilt effect */}
            <motion.div
              className="float-anim"
              onMouseMove={handleMouse}
              onMouseLeave={resetMouse}
              style={{ perspective: 1000, cursor: 'pointer' }}
            >
              <motion.div
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {/* Outer glow ring */}
                <div className="profile-glow" style={{ display: 'inline-block' }}>
                  {/* Image container - circular crop showing upper body */}
                  <div style={{
                    width: '340px',
                    height: '340px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    position: 'relative',
                  }}>
                    <img
                      src="/profile.jpg"
                      alt="Mitesh Gauswami"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top center',
                        display: 'block',
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Badge below image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="glass px-4 py-2 flex items-center gap-2"
              style={{ borderRadius: '30px' }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block" style={{ boxShadow: '0 0 8px #4ade80' }} />
              <span className="text-sm text-slate-300">Available for work</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-2 mt-16"
        >
          <p className="text-xs text-slate-600 uppercase tracking-widest">Scroll Down</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-slate-700 flex items-start justify-center pt-1"
          >
            <div className="w-1 h-2 rounded-full bg-blue-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
