import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const cards = [
    {
      icon: '🖥️',
      title: '.NET Development',
      desc: 'Building robust, scalable backend systems using .NET 6/8, C#, ASP.NET Core Web APIs, MVC, and Entity Framework with clean architecture principles.',
      color: '#3b82f6',
    },
    {
      icon: '🤖',
      title: 'AI / ML Journey',
      desc: 'Actively transitioning into AI & ML — learning Python, NumPy, Pandas, Scikit-learn, and exploring neural networks, LLMs, and data pipelines.',
      color: '#8b5cf6',
    },
    {
      icon: '🌐',
      title: 'Full Stack Skills',
      desc: 'Frontend to database — React, JavaScript, HTML/CSS for UI, SQL Server & MySQL for data, REST APIs for seamless integration.',
      color: '#06b6d4',
    },
    {
      icon: '🎨',
      title: 'Web & WordPress',
      desc: 'Delivered 5+ custom WordPress websites with SEO optimization, custom themes, plugins, and pixel-perfect responsive designs for real clients.',
      color: '#10b981',
    },
  ];

  const infoItems = [
    ['📍', 'Location', 'Gujarat, India'],
    ['🎓', 'College', 'RK University, Tramba'],
    ['📖', 'Degree', 'BCA (Running)'],
    ['📅', '12th Passed', '2022'],
    ['🔢', 'Semesters', '4 Completed'],
    ['🚀', 'Goal', 'Software Developer'],
  ];

  return (
    <section id="about" style={{ padding: '96px 0', position: 'relative' }} ref={ref}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', color: '#3b82f6' }}>
            Who Am I
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold section-title" style={{ fontFamily: 'Syne, sans-serif' }}>
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '64px', alignItems: 'start' }}>

          {/* LEFT: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <p className="text-slate-300 text-lg leading-relaxed">
              I'm <span className="text-blue-400 font-semibold">Mitesh Gauswami</span>, a passionate
              <span className="text-purple-400 font-semibold"> BCA student</span> at
              <span className="text-cyan-400 font-semibold"> RK University, Main Campus – Tramba, Gujarat</span>.
              Currently in my 3rd year with 4 semesters completed, I combine academic learning with
              real-world project building every single day.
            </p>

            <p className="text-slate-400 leading-relaxed">
              I completed my 12th standard (HSC) in <span className="text-blue-300">2022</span> and joined BCA in <span className="text-blue-300">2024</span>.
              In the gap years, I spent time deeply learning programming —
              <span className="text-blue-300"> .NET, C#, Java, PHP, and SQL</span> — building projects and
              sharpening my skills before college even began. That head start has given me a strong
              practical foundation beyond what's taught in classrooms.
            </p>

            <p className="text-slate-400 leading-relaxed">
              Today, alongside my BCA coursework, I'm exploring
              <span className="text-cyan-400 font-medium"> Artificial Intelligence & Machine Learning</span>.
              My dream is to graduate as a job-ready full-stack developer with deep AI knowledge —
              building intelligent applications that make a real impact.
            </p>

            {/* Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
              {infoItems.map(([icon, label, value]) => (
                <motion.div
                  key={label}
                  className="glass p-3"
                  whileHover={{ y: -3, borderColor: 'rgba(59,130,246,0.4)' }}
                  style={{ transition: 'all 0.3s ease' }}
                >
                  <p className="text-xs text-slate-500 uppercase tracking-wider">{icon} {label}</p>
                  <p className="text-slate-200 font-medium mt-1 text-sm">{value}</p>
                </motion.div>
              ))}
            </div>

            {/* Fun Facts */}
            <div className="glass p-5 mt-2" style={{ borderLeft: '3px solid #3b82f6' }}>
              <p className="text-xs text-blue-400 uppercase tracking-widest font-bold mb-3">⚡ Quick Facts</p>
              <ul className="flex flex-col gap-2">
                {[
                  '🏛️ BCA Student at RK University, Main Campus – Tramba',
                  '📅 12th Passed in 2022 · BCA Started in 2024',
                  '✅ 4 Semesters of BCA Successfully Completed',
                  '💻 Built 10+ projects in .NET, Java, PHP & WordPress',
                  '📖 Currently learning Python & Machine Learning alongside college',
                ].map((fact) => (
                  <li key={fact} className="text-slate-400 text-sm flex items-start gap-2">
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-2">
              <motion.a
                href="/resume.pdf"
                download
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ textDecoration: 'none' }}
              >
                📄 Download Resume
              </motion.a>
              <motion.button
                className="btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              >
                Let's Connect →
              </motion.button>
            </div>
          </motion.div>

          {/* RIGHT: Feature Cards */}
          <div className="flex flex-col gap-4">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                className="glass p-6 flex gap-4 items-start"
                whileHover={{ x: 6 }}
                style={{
                  borderLeft: `3px solid ${card.color}`,
                  transition: 'all 0.3s ease',
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${card.color}20`, border: `1px solid ${card.color}40` }}>
                  {card.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 mb-1.5" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {card.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* Stats banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glass p-5 mt-2"
              style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))' }}
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                {[['BCA', 'RK University', '#3b82f6'], ['4', 'Sems Done', '#8b5cf6'], ['10+', 'Projects Built', '#06b6d4']].map(
                  ([num, label, color]) => (
                    <div key={label}>
                      <p className="text-2xl font-bold" style={{ color }}>{num}</p>
                      <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{label}</p>
                    </div>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
