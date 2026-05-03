import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="py-8 relative" style={{ borderTop: '1px solid rgba(99,102,241,0.15)' }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-slate-500 text-sm"
        >
          © 2025 <span className="gradient-text font-semibold">Mitesh Gauswami</span>. All rights reserved.
        </motion.div>
        <p className="text-slate-600 text-sm">
          Built with <span className="text-blue-500">React</span> · <span className="text-purple-500">Framer Motion</span> · <span className="text-cyan-500">Three.js</span>
        </p>
      </div>
    </footer>
  );
}
