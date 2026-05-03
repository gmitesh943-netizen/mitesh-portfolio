import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const timeline = [
  {
    year: '2019 – 2020',
    title: 'Secondary School (10th Std)',
    company: 'School Life · Gujarat Board',
    desc: 'Completed Secondary School (SSC) with good marks. Discovered my first interest in computers and technology. Started playing around with basic PC tools and developed a curiosity for how software works.',
    tags: ['10th Std', 'SSC', 'Gujarat Board'],
    icon: '📚',
    color: '#3b82f6',
  },
  {
    year: '2020 – 2022',
    title: 'Higher Secondary (11th & 12th)',
    company: 'HSC · Science / Commerce Stream',
    desc: 'Completed Higher Secondary (HSC) in 2022. During these years, I explored programming on the side — watching YouTube tutorials, building basic projects, and falling in love with coding while studying core subjects.',
    tags: ['12th Passed', 'HSC 2022', 'Self-Learning'],
    icon: '🎒',
    color: '#8b5cf6',
  },
  {
    year: '2022 – 2024',
    title: 'Self-Learning & Skill Building',
    company: 'Personal Projects · Freelance',
    desc: 'After 12th, spent two productive years deeply learning web development — HTML, CSS, JavaScript, PHP, Java, and .NET. Built personal projects, explored WordPress, and sharpened backend skills before joining college.',
    tags: ['.NET', 'PHP', 'Java', 'WordPress', 'HTML/CSS'],
    icon: '💻',
    color: '#06b6d4',
  },
  {
    year: '2024 – Present',
    title: 'BCA at RK University',
    company: '🏛️ RK University, Main Campus – Tramba, Gujarat',
    desc: 'Currently pursuing Bachelor of Computer Applications (BCA) from RK University\'s prestigious Main Campus in Tramba, Gujarat. Completed 4 semesters successfully. Actively applying programming knowledge from coursework in real projects and assignments.',
    tags: ['BCA', 'RK University', 'Tramba', 'Sem 4 Completed'],
    icon: '🎓',
    color: '#10b981',
  },
  {
    year: '2024 – Present',
    title: 'Building Real Projects',
    company: 'Personal Development · Portfolio',
    desc: 'Alongside college, actively building real-world applications — Employee Management System, E-Commerce Platform, Student Portal, and experimenting with AI APIs. Created this portfolio to showcase skills to the world.',
    tags: ['React', 'Portfolio', '.NET', 'AI APIs'],
    icon: '🚀',
    color: '#f59e0b',
  },
  {
    year: '2025 – 2027',
    title: 'Complete BCA & Enter Industry',
    company: 'Future Plan · RK University',
    desc: 'Plan to complete remaining semesters of BCA from RK University. Goal is to secure a developer role or internship while still in college, and build deeper expertise in .NET, AI/ML, and full-stack development.',
    tags: ['BCA Final Year', 'Internship', 'Job Ready'],
    icon: '🏆',
    color: '#ec4899',
    isFuture: true,
  },
  {
    year: '2027+',
    title: 'AI-Driven Full Stack Engineer',
    company: 'Dream Goal',
    desc: 'The ultimate vision — become a complete AI-native developer combining strong .NET backend expertise with machine learning, cloud deployments, and intelligent software that creates real-world impact.',
    tags: ['AI/ML Engineer', '.NET', 'Cloud', 'Full Stack'],
    icon: '✨',
    color: '#a78bfa',
    isFuture: true,
  },
];

function TimelineCard({ item }) {
  return (
    <motion.div
      className="glass"
      whileHover={{ scale: 1.02, boxShadow: `0 15px 40px ${item.color}25` }}
      style={{
        padding: '22px',
        borderLeft: `3px solid ${item.color}`,
        opacity: item.isFuture ? 0.82 : 1,
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
        <span style={{ fontSize: '24px', flexShrink: 0 }}>{item.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '2px' }}>
            <p style={{
              fontSize: '10px', fontWeight: 800, letterSpacing: '2px',
              textTransform: 'uppercase', color: item.color,
            }}>
              {item.year}
            </p>
            {item.isFuture && (
              <span style={{
                fontSize: '9px', padding: '2px 8px', borderRadius: '999px', fontWeight: 700,
                background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)',
                color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '1px',
              }}>
                Goal
              </span>
            )}
          </div>
          <h3 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 700,
            color: '#f1f5f9', fontSize: '0.95rem', margin: '0 0 3px',
          }}>
            {item.title}
          </h3>
          <p style={{ fontSize: '11px', color: '#64748b' }}>{item.company}</p>
        </div>
      </div>
      <p style={{ color: '#94a3b8', fontSize: '0.83rem', lineHeight: 1.75, marginBottom: '14px' }}>
        {item.desc}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        {item.tags.map(tag => (
          <span key={tag} style={{
            fontSize: '10px', padding: '3px 9px', borderRadius: '5px', fontWeight: 600,
            background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30`,
          }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="experience"
      ref={ref}
      style={{ padding: '96px 0', background: 'rgba(15,23,42,0.4)', position: 'relative' }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px' }}>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <span style={{
            display: 'inline-block', padding: '6px 16px', borderRadius: '999px',
            fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase',
            background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.3)',
            color: '#a78bfa', marginBottom: '16px',
          }}>
            My Story
          </span>
          <h2 className="section-title" style={{
            fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800, display: 'inline-block',
          }}>
            My <span className="gradient-text">Journey</span>
          </h2>
          <p style={{ color: '#94a3b8', marginTop: '20px', maxWidth: '480px', margin: '20px auto 0', lineHeight: 1.7 }}>
            From 10th standard to BCA at RK University — every chapter of my story that made me the developer I am today.
          </p>
        </motion.div>

        {/* Desktop: Alternating left-right timeline */}
        <div className="timeline-desktop" style={{ position: 'relative' }}>

          {/* Vertical center line */}
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: '2px', transform: 'translateX(-50%)',
            background: 'linear-gradient(to bottom, transparent, #3b82f6 10%, #8b5cf6 40%, #10b981 70%, #a78bfa 90%, transparent)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '44px' }}>
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={item.year + item.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 56px 1fr',
                    alignItems: 'center',
                  }}
                >
                  {/* Left card */}
                  <div style={{ paddingRight: isLeft ? '24px' : 0, visibility: isLeft ? 'visible' : 'hidden' }}>
                    {isLeft && <TimelineCard item={item} />}
                  </div>

                  {/* Center dot */}
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.35 }}
                      style={{
                        width: '18px', height: '18px', borderRadius: '50%',
                        background: item.color,
                        border: `3px solid #020817`,
                        boxShadow: `0 0 12px ${item.color}, 0 0 28px ${item.color}50`,
                        flexShrink: 0,
                      }}
                    />
                  </div>

                  {/* Right card */}
                  <div style={{ paddingLeft: !isLeft ? '24px' : 0, visibility: !isLeft ? 'visible' : 'hidden' }}>
                    {!isLeft && <TimelineCard item={item} />}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Single column */}
        <div className="timeline-mobile" style={{ display: 'none', flexDirection: 'column', gap: '20px' }}>
          {timeline.map((item, i) => (
            <motion.div
              key={`mob-${item.title}`}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <TimelineCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
