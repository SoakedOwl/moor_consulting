import { motion } from 'framer-motion';
import { Award, Globe, TrendingUp, Users, Star, CheckCircle } from 'lucide-react';

const awards = [
  {
    year: '2024',
    title: 'Best Multi-Sector Consultancy',
    body: 'UK Consultancy Awards',
    description: 'Recognised for excellence across construction, technology, and financial services sectors, demonstrating unparalleled breadth of expertise.',
    icon: Award,
    color: '#f59e0b',
  },
  {
    year: '2024',
    title: 'Top 50 SME Advisors',
    body: 'The Financial Times',
    description: `Listed among the Financial Times' top 50 advisors to small and medium enterprises in the United Kingdom for sustained client impact.`,
    icon: Star,
    color: '#0284c7',
  },
  {
    year: '2023',
    title: 'Excellence in Digital Transformation',
    body: 'Tech Advisory Summit',
    description: 'Awarded for guiding over 30 organisations through complex digital transformation programmes with measurable ROI.',
    icon: TrendingUp,
    color: '#4f46e5',
  },
  {
    year: '2023',
    title: 'Client Satisfaction Gold Standard',
    body: 'Consultancy.uk',
    description: 'Achieved a 97% client satisfaction rating across all active engagements, earning the Gold Standard certification.',
    icon: CheckCircle,
    color: '#10b981',
  },
  {
    year: '2022',
    title: 'Global Reach Recognition',
    body: 'International Business Review',
    description: 'Honoured for successfully delivering cross-border projects across 14 countries within a single fiscal year.',
    icon: Globe,
    color: '#8b5cf6',
  },
  {
    year: '2022',
    title: 'People-First Culture Award',
    body: 'HR Excellence Awards',
    description: 'Recognised for building a high-performance, inclusive culture that attracts and retains top-tier consulting talent.',
    icon: Users,
    color: '#ec4899',
  },
];

const stats = [
  { value: '97%', label: 'Client Satisfaction Rate' },
  { value: '14+', label: 'Countries Served' },
  { value: '200+', label: 'Projects Delivered' },
  { value: '£1.2B+', label: 'Client Value Generated' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Achievements = () => (
  <div>
    {/* Hero */}
    <div className="section text-center" style={{ background: 'linear-gradient(135deg, rgba(2,132,199,0.06), rgba(79,70,229,0.06))', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary-color)', marginBottom: '1rem' }}>Recognition & Awards</p>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Our Achievements</h1>
        <p className="text-muted" style={{ maxWidth: 620, margin: '0 auto', fontSize: '1.1rem' }}>
          A track record of delivering exceptional results — recognised by leading industry bodies and clients around the world.
        </p>
      </motion.div>
    </div>

    {/* Stats */}
    <div className="container" style={{ padding: '4rem 1rem' }}>
      <motion.div
        className="grid"
        style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '5rem' }}
        variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
      >
        {stats.map((s) => (
          <motion.div key={s.label} className="card-glass" style={{ padding: '2rem', textAlign: 'center' }} variants={itemVariants}>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem' }}>{s.value}</div>
            <p className="text-muted" style={{ fontSize: '0.9rem', fontWeight: 500 }}>{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Awards Grid */}
      <motion.div
        className="grid"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}
        variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
      >
        {awards.map((a) => {
          const Icon = a.icon;
          return (
            <motion.div
              key={a.title}
              className="card-glass"
              style={{ padding: '2rem' }}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.01, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                <div style={{ width: 52, height: 52, flexShrink: 0, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${a.color}18` }}>
                  <Icon size={24} color={a.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.3 }}>{a.title}</h3>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.05)', padding: '0.2rem 0.6rem', borderRadius: 999, flexShrink: 0 }}>{a.year}</span>
                  </div>
                  <p style={{ fontSize: '0.78rem', fontWeight: 600, color: a.color, marginBottom: '0.75rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{a.body}</p>
                  <p className="text-muted" style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>{a.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </div>
);

export default Achievements;
