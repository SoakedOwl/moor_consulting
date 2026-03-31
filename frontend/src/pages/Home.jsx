import { Link } from 'react-router-dom';
import { ArrowRight, BarChart, Building, Users, Sun, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import './Home.css';
import AnimatedAnalyticsSection from '../components/AnimatedAnalyticsSection';

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
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)', lineHeight: '1.2' }}
          >
            Your Multi-Sector Consultancy Partner
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            style={{ fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '800px', margin: '0 auto 2.5rem', opacity: 0.9 }}
          >
            Delivering excellence across construction, HR, finance, technology, events, healthcare, social care, and renewable energy. We are your central digital hub for growth.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
          >
            <Link to="/consultations" className="btn btn-accent">Book Consultation</Link>
            <Link to="/services" className="btn btn-outline" style={{ backdropFilter: 'none' }}>Explore Services</Link>
          </motion.div>
        </div>
      </section>

      {/* Insert Animated Analytics here */}
      <AnimatedAnalyticsSection />

      {/* Services Grid */}
      <section className="section bg-glass" style={{ position: 'relative', zIndex: 5 }}>
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-center mb-12 text-gradient" 
            style={{ fontSize: '2.5rem' }}
          >
            Our Core Services
          </motion.h2>
          
          <motion.div 
            className="grid" 
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
          >
            {/* Service 1 */}
            <motion.div 
              className="card-glass" style={{ padding: '2rem' }}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
              }}
              whileHover={{ scale: 1.03, y: -8, transition: { type: "spring", stiffness: 300, damping: 15 } }}
            >
              <BarChart size={40} color="var(--primary-hover)" className="mb-4" />
              <h3 className="mb-2">Advisory & Consulting</h3>
              <p className="text-muted mb-4">Strategic guidance tailored to your sector's unique challenges and opportunities.</p>
              <Link to="/services" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Learn More</Link>
            </motion.div>
            
            {/* Service 2 */}
            <motion.div 
              className="card-glass" style={{ padding: '2rem' }}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
              }}
              whileHover={{ scale: 1.03, y: -8, transition: { type: "spring", stiffness: 300, damping: 15 } }}
            >
              <Building size={40} color="var(--primary-hover)" className="mb-4" />
              <h3 className="mb-2">Project Management</h3>
              <p className="text-muted mb-4">End-to-end project delivery across construction, tech, and events.</p>
              <Link to="/services" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Learn More</Link>
            </motion.div>

            {/* Achievement */}
            <motion.div 
              className="card-glass" style={{ padding: '2rem' }}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
              }}
              whileHover={{ scale: 1.03, y: -8, transition: { type: "spring", stiffness: 300, damping: 15 } }}
            >
              <Trophy size={40} color="var(--primary-hover)" className="mb-4" />
              <h3 className="mb-2">Achievements</h3>
              <p className="text-muted mb-4">Recognized globally for delivering measurable impact and driving sustainable growth.</p>
              <Link to="/achievements" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>View Awards</Link>
            </motion.div>

            {/* Profiles */}
            <motion.div 
              className="card-glass" style={{ padding: '2rem' }}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
              }}
              whileHover={{ scale: 1.03, y: -8, transition: { type: "spring", stiffness: 300, damping: 15 } }}
            >
              <Users size={40} color="var(--primary-hover)" className="mb-4" />
              <h3 className="mb-2">Expert Profiles</h3>
              <p className="text-muted mb-4">Meet our dedicated specialists shaping the future of construction, tech, and finance.</p>
              <Link to="/profiles" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Meet the Team</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ position: 'relative', zIndex: 5 }}>
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-12 text-gradient" style={{ fontSize: '2.5rem' }}
          >
            Trusted by Industry Leaders
          </motion.h2>
          <motion.div 
            className="grid" 
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
          >
            <motion.div 
              className="card-glass" style={{ padding: '2rem' }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
              }}
              whileHover={{ scale: 1.02, y: -5, transition: { type: "spring", stiffness: 300, damping: 15 } }}
            >
              <p className="mb-4 text-muted" style={{ fontStyle: 'italic' }}>"MoorConsultations completely transformed our HR strategy. Their tailored approach and deep industry knowledge were invaluable."</p>
              <p style={{ fontWeight: 600, color: 'var(--primary-hover)' }}>- Sarah Jenkins, TechCorp</p>
            </motion.div>
            <motion.div 
              className="card-glass" style={{ padding: '2rem' }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
              }}
              whileHover={{ scale: 1.02, y: -5, transition: { type: "spring", stiffness: 300, damping: 15 } }}
            >
              <p className="mb-4 text-muted" style={{ fontStyle: 'italic' }}>"The solar harvesting products sourced by MoorConsultations were top-tier and their project management was flawless."</p>
              <p style={{ fontWeight: 600, color: 'var(--primary-hover)' }}>- David O., Green Future Energy</p>
            </motion.div>
            <motion.div 
              className="card-glass" style={{ padding: '2rem' }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
              }}
              whileHover={{ scale: 1.02, y: -5, transition: { type: "spring", stiffness: 300, damping: 15 } }}
            >
              <p className="mb-4 text-muted" style={{ fontStyle: 'italic' }}>"Reliable, professional, and transparent. The client portal makes tracking our ongoing projects incredibly easy."</p>
              <p style={{ fontWeight: 600, color: 'var(--primary-hover)' }}>- Emily R., BuildRight Ltd</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
