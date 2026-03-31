import { Link } from 'react-router-dom';
import { BarChart, Building, Users, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { memo } from 'react';
import './Home.css';
import AnimatedAnalyticsSection from '../components/AnimatedAnalyticsSection';

// Memoized service card component
const ServiceCard = memo(({ icon: Icon, title, description, link, linkText }) => (
  <motion.div
    className="card-glass"
    style={{ padding: '2rem' }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.4 }}
  >
    <Icon size={40} color="var(--primary-hover)" className="mb-4" />
    <h3 className="mb-2">{title}</h3>
    <p className="text-muted mb-4">{description}</p>
    <Link to={link} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
      {linkText}
    </Link>
  </motion.div>
));

ServiceCard.displayName = 'ServiceCard';

// Memoized testimonial component
const Testimonial = memo(({ quote, author }) => (
  <motion.div
    className="card-glass"
    style={{ padding: '2rem' }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.4 }}
  >
    <p className="mb-4 text-muted" style={{ fontStyle: 'italic' }}>{quote}</p>
    <p style={{ fontWeight: 600, color: 'var(--primary-hover)' }}>{author}</p>
  </motion.div>
));

Testimonial.displayName = 'Testimonial';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-animated">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="container text-center hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)', lineHeight: '1.2' }}
          >
            Your Multi-Sector Consultancy Partner
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            style={{ fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '800px', margin: '0 auto 2.5rem', opacity: 0.9 }}
          >
            Delivering excellence across construction, HR, finance, technology, events, healthcare, social care, and renewable energy. We are your central digital hub for growth.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
          >
            <Link to="/consultations" className="btn btn-accent">Book Consultation</Link>
            <Link to="/services" className="btn btn-outline" style={{ backdropFilter: 'none' }}>Explore Services</Link>
          </motion.div>
        </div>
      </section>

      {/* Animated Analytics */}
      <AnimatedAnalyticsSection />

      {/* Services Grid */}
      <section className="section bg-glass" style={{ position: 'relative', zIndex: 5 }}>
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 text-gradient"
            style={{ fontSize: '2.5rem' }}
          >
            Our Core Services
          </motion.h2>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <ServiceCard
              icon={BarChart}
              title="Advisory & Consulting"
              description="Strategic guidance tailored to your sector's unique challenges and opportunities."
              link="/services"
              linkText="Learn More"
            />
            <ServiceCard
              icon={Building}
              title="Project Management"
              description="End-to-end project delivery across construction, tech, and events."
              link="/services"
              linkText="Learn More"
            />
            <ServiceCard
              icon={Trophy}
              title="Achievements"
              description="Recognized globally for delivering measurable impact and driving sustainable growth."
              link="/achievements"
              linkText="View Awards"
            />
            <ServiceCard
              icon={Users}
              title="Expert Profiles"
              description="Meet our dedicated specialists shaping the future of construction, tech, and finance."
              link="/profiles"
              linkText="Meet the Team"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ position: 'relative', zIndex: 5 }}>
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 text-gradient"
            style={{ fontSize: '2.5rem' }}
          >
            Trusted by Industry Leaders
          </motion.h2>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <Testimonial
              quote="MoorConsultations completely transformed our HR strategy. Their tailored approach and deep industry knowledge were invaluable."
              author="- Sarah Jenkins, TechCorp"
            />
            <Testimonial
              quote="The solar harvesting products sourced by MoorConsultations were top-tier and their project management was flawless."
              author="- David O., Green Future Energy"
            />
            <Testimonial
              quote="Reliable, professional, and transparent. The client portal makes tracking our ongoing projects incredibly easy."
              author="- Emily R., BuildRight Ltd"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(Home);
