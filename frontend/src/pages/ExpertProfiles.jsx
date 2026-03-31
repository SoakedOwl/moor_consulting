import { motion } from 'framer-motion';
import { Mail, ExternalLink } from 'lucide-react';

const experts = [
  {
    name: 'James Hargreaves',
    title: 'Managing Director & Lead Consultant',
    specialisms: ['Corporate Strategy', 'M&A Advisory', 'Market Entry'],
    bio: 'With over 22 years of experience advising FTSE 250 companies and high-growth SMEs, James has led transformative projects across the UK, UAE, and Sub-Saharan Africa. His strategic acumen and sector-agnostic thinking make him a trusted advisor to boards and senior leadership teams.',
    initials: 'JH',
    accent: '#0284c7',
  },
  {
    name: 'Amira Al-Rashid',
    title: 'Head of Financial Advisory',
    specialisms: ['Investment Strategy', 'Risk Management', 'Regulatory Compliance'],
    bio: 'Amira brings 16 years of experience from tier-1 investment banks and regulatory bodies. She specialises in building resilient financial frameworks that balance growth with governance, helping clients navigate complex regulatory environments across multiple jurisdictions.',
    initials: 'AA',
    accent: '#4f46e5',
  },
  {
    name: 'Daniel Osei',
    title: 'Director of Digital Transformation',
    specialisms: ['Technology Strategy', 'AI & Automation', 'Programme Delivery'],
    bio: 'Daniel has spearheaded digital transformation programmes for organisations ranging from NHS Trusts to global FinTechs. His hands-on approach to technology adoption — combining strategic vision with delivery rigour — consistently delivers measurable performance gains.',
    initials: 'DO',
    accent: '#10b981',
  },
  {
    name: 'Sarah Whitmore',
    title: 'Head of Construction & Infrastructure',
    specialisms: ['Project Management', 'Procurement Strategy', 'Contract Negotiation'],
    bio: 'Sarah is a chartered civil engineer and construction specialist with a 19-year career spanning major infrastructure projects across Europe and the Middle East. She provides end-to-end advisory from feasibility through to handover, ensuring projects arrive on time and within budget.',
    initials: 'SW',
    accent: '#f59e0b',
  },
  {
    name: 'Tariq Mansoor',
    title: 'Senior Consultant — HR & Talent',
    specialisms: ['Talent Acquisition', 'Workforce Planning', 'Leadership Development'],
    bio: 'Tariq combines deep expertise in organisational psychology with practical HR consulting to help organisations attract, develop, and retain exceptional talent. He has designed leadership development programmes for over 50 leadership cohorts across the public and private sectors.',
    initials: 'TM',
    accent: '#ec4899',
  },
  {
    name: 'Chloe Benton',
    title: 'Senior Analyst — Data & Insights',
    specialisms: ['Data Analytics', 'Business Intelligence', 'Operational Efficiency'],
    bio: 'Chloe translates complex datasets into clear, actionable commercial insights. With a background in mathematics and 9 years of consulting experience, she helps clients build analytics capability that drives smarter decision-making at every level of the organisation.',
    initials: 'CB',
    accent: '#8b5cf6',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const ExpertProfiles = () => (
  <div>
    {/* Hero */}
    <div className="section text-center" style={{ background: 'linear-gradient(135deg, rgba(2,132,199,0.06), rgba(79,70,229,0.06))', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary-color)', marginBottom: '1rem' }}>Our People</p>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Expert Profiles</h1>
        <p className="text-muted" style={{ maxWidth: 640, margin: '0 auto', fontSize: '1.1rem' }}>
          Meet the specialists behind our results. Collectively, our team brings over 100 years of consulting experience across finance, technology, construction, and more.
        </p>
      </motion.div>
    </div>

    {/* Stats bar */}
    <div style={{ background: 'linear-gradient(90deg, var(--primary-color), var(--accent-color))', padding: '1.5rem 0' }}>
      <div className="container">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center' }}>
          {[['100+', 'Years Combined Experience'], ['6', 'Core Specialisms'], ['200+', 'Projects Led'], ['14', 'Countries Worked In']].map(([v, l]) => (
            <div key={l}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white' }}>{v}</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Cards */}
    <div className="container section">
      <motion.div
        className="grid"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.75rem' }}
        variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
      >
        {experts.map((e) => (
          <motion.div
            key={e.name}
            className="card-glass"
            style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            variants={itemVariants}
            whileHover={{ y: -6, scale: 1.01, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
          >
            {/* Avatar + name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{
                width: 60, height: 60, borderRadius: '50%', flexShrink: 0,
                background: `linear-gradient(135deg, ${e.accent}22, ${e.accent}44)`,
                border: `2px solid ${e.accent}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem', fontWeight: 800, color: e.accent,
              }}>
                {e.initials}
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.2rem' }}>{e.name}</h3>
                <p style={{ fontSize: '0.8rem', color: e.accent, fontWeight: 600, lineHeight: 1.4 }}>{e.title}</p>
              </div>
            </div>

            {/* Specialisms */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {e.specialisms.map((s) => (
                <span key={s} style={{
                  fontSize: '0.72rem', fontWeight: 600, padding: '0.25rem 0.65rem',
                  borderRadius: 999, background: `${e.accent}12`, color: e.accent,
                  border: `1px solid ${e.accent}25`,
                }}>{s}</span>
              ))}
            </div>

            {/* Bio */}
            <p className="text-muted" style={{ fontSize: '0.875rem', lineHeight: 1.7, flexGrow: 1 }}>{e.bio}</p>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <a href={`mailto:contact@moorconsultations.co.uk`} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                <Mail size={14} /> Email
              </a>
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                <ExternalLink size={14} /> LinkedIn
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </div>
);

export default ExpertProfiles;
