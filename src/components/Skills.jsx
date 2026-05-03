import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const skillCategories = [
  {
    category: 'Web Development',
    icon: '🌐',
    color: '#3b82f6',
    skills: [
      { name: 'HTML5', level: 88 },
      { name: 'CSS3', level: 85 },
      { name: 'JavaScript', level: 75 },
      { name: 'PHP', level: 80 },
    ],
  },
  {
    category: 'Programming Languages',
    icon: '💻',
    color: '#8b5cf6',
    skills: [
      { name: 'Java', level: 78 },
      { name: 'Advanced Java (ADS)', level: 72 },
      { name: 'C#', level: 75 },
      { name: 'C / C++', level: 65 },
    ],
  },
  {
    category: 'Database & Backend',
    icon: '🗄️',
    color: '#06b6d4',
    skills: [
      { name: 'MySQL', level: 82 },
      { name: 'Oracle APEX', level: 65 },
      { name: 'SQL (Queries & Design)', level: 78 },
      { name: 'PHP + MySQL (Full)', level: 80 },
    ],
  },
  {
    category: 'Frameworks & Platforms',
    icon: '⚙️',
    color: '#10b981',
    skills: [
      { name: 'React (Learning)', level: 55 },
      { name: 'WordPress & WooCommerce', level: 80 },
      { name: '.NET / C# Apps', level: 75 },
      { name: 'JSP & Servlets', level: 68 },
    ],
  },
  {
    category: 'AI & Emerging Tech',
    icon: '🤖',
    color: '#f59e0b',
    skills: [
      { name: 'Python (Learning)', level: 50 },
      { name: 'AI Tools (Daily Use)', level: 78 },
      { name: 'AI / ML (Beginner)', level: 35 },
      { name: 'IoT & Sensors', level: 55 },
    ],
  },
  {
    category: 'Soft Skills',
    icon: '🧠',
    color: '#ec4899',
    skills: [
      { name: 'Self-Learning', level: 95 },
      { name: 'Communication', level: 80 },
      { name: 'Problem Solving', level: 85 },
      { name: 'Fast Learner', level: 92 },
    ],
  },
];

// Proficiency label based on level
function getLevelLabel(level) {
  if (level >= 85) return 'Advanced';
  if (level >= 70) return 'Intermediate';
  if (level >= 50) return 'Learning';
  return 'Beginner';
}

function getLevelColor(level) {
  if (level >= 85) return '#10b981';
  if (level >= 70) return '#3b82f6';
  if (level >= 50) return '#f59e0b';
  return '#94a3b8';
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="skills"
      ref={ref}
      style={{ padding: '96px 0', background: 'rgba(15,23,42,0.5)', position: 'relative' }}
    >
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
            background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)',
            color: '#8b5cf6', marginBottom: '16px',
          }}>
            What I Know
          </span>
          <h2 className="section-title" style={{
            fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800, display: 'inline-block',
          }}>
            My <span className="gradient-text">Skills</span>
          </h2>
          <p style={{ color: '#94a3b8', marginTop: '20px', maxWidth: '520px', margin: '20px auto 0', lineHeight: 1.7 }}>
            A growing skill set across web development, programming, databases, and AI — built through real projects and self-learning.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: '24px',
        }}>
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.category}
              className="glass"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.1 }}
              whileHover={{ y: -6, boxShadow: `0 20px 50px ${cat.color}25` }}
              style={{ padding: '24px', transition: 'all 0.3s ease' }}
            >
              {/* Category Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', background: `${cat.color}20`, border: `1px solid ${cat.color}40`,
                  flexShrink: 0,
                }}>
                  {cat.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#f1f5f9', fontSize: '0.95rem' }}>
                    {cat.category}
                  </h3>
                  <div style={{ height: '2px', width: '32px', borderRadius: '2px', background: cat.color, marginTop: '4px' }} />
                </div>
              </div>

              {/* Skill Bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {cat.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ color: '#cbd5e1', fontSize: '0.83rem', fontWeight: 500 }}>{skill.name}</span>
                      <span style={{
                        color: getLevelColor(skill.level),
                        fontSize: '9px', fontWeight: 700,
                        padding: '2px 7px', borderRadius: '999px',
                        background: `${getLevelColor(skill.level)}15`,
                        border: `1px solid ${getLevelColor(skill.level)}30`,
                        textTransform: 'uppercase', letterSpacing: '1px',
                      }}>
                        {getLevelLabel(skill.level)}
                      </span>
                    </div>
                    <div style={{
                      height: '6px', borderRadius: '999px',
                      background: 'rgba(30,41,59,0.8)', overflow: 'hidden',
                    }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1.1, delay: ci * 0.1 + si * 0.08 + 0.3, ease: 'easeOut' }}
                        style={{
                          height: '100%', borderRadius: '999px',
                          background: `linear-gradient(90deg, ${cat.color}, ${cat.color}80)`,
                          boxShadow: `0 0 8px ${cat.color}50`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Also familiar with - tag cloud */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{ textAlign: 'center', marginTop: '64px' }}
        >
          <p style={{
            color: '#64748b', fontSize: '11px', textTransform: 'uppercase',
            letterSpacing: '3px', marginBottom: '20px',
          }}>
            Also working with / exploring
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {[
              'Oracle APEX', 'Bootstrap', 'Git', 'WooCommerce',
              'JSP / Servlets', 'JDBC', 'REST APIs', 'Windows Forms',
              'Arduino (IoT)', 'Figma (Basic)', 'VS Code', 'XAMPP',
              'AI Prompting', 'ChatGPT / Gemini', 'Agile Basics',
            ].map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.08, y: -2 }}
                style={{
                  padding: '6px 14px', borderRadius: '999px', fontSize: '0.8rem', color: '#94a3b8',
                  background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(99,102,241,0.2)',
                  cursor: 'default', transition: 'all 0.2s ease',
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Beginner note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
            className="glass"
            style={{
              maxWidth: '600px', margin: '32px auto 0', padding: '16px 24px',
              borderLeft: '3px solid #f59e0b', textAlign: 'left',
            }}
          >
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.7 }}>
              <span style={{ color: '#f59e0b', fontWeight: 700 }}>⚡ Learning Mindset: </span>
              I'm a self-learner who uses AI tools daily to build faster. Many skills are at beginner–intermediate level,
              but I improve constantly through real projects. Growth &gt; Perfection.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
