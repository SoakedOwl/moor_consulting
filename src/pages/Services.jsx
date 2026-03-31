import { Link } from 'react-router-dom';
import { Target, LayoutList, UserCheck, Package } from 'lucide-react';

const Services = () => {
  return (
    <div className="services-page">
      <div className="section text-center" style={{ padding: '4rem 0', backgroundColor: 'var(--surface-color)', borderBottom: '1px solid var(--border-color)' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Our Services</h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem' }}>
          Comprehensive solutions designed to accelerate your business across every operational layer.
        </p>
      </div>

      <div className="container section">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          
          {/* Advisory & Consulting */}
          <div className="grid" style={{ gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'flex-start' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: 'rgba(2,132,199,0.1)', borderRadius: '50%', marginBottom: '1rem' }}>
                <Target size={48} color="var(--primary-color)" />
              </div>
              <h2 style={{ fontSize: '1.75rem' }}>Advisory & Consulting</h2>
            </div>
            <div>
              <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                Navigate complex business landscapes with our expert consultants. We offer tailored strategy across finance, technology, healthcare, and more to ensure your company remains competitive and compliant.
              </p>
              <ul className="mb-4" style={{ listStylePosition: 'inside', color: 'var(--text-secondary)' }}>
                <li>Strategic Business Planning</li>
                <li>Financial Risk Assessment</li>
                <li>Technology Protocol Implementation</li>
                <li>Regulatory Compliance Checks</li>
              </ul>
              <Link to="/consultations" className="btn btn-primary">Book Consultation</Link>
            </div>
          </div>

          <hr style={{ border: 0, borderTop: '1px solid var(--border-color)' }} />

          {/* Project Management */}
          <div className="grid" style={{ gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'flex-start' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: 'rgba(13,148,136,0.1)', borderRadius: '50%', marginBottom: '1rem' }}>
                <LayoutList size={48} color="var(--accent-color)" />
              </div>
              <h2 style={{ fontSize: '1.75rem' }}>Project Management</h2>
            </div>
            <div>
              <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                From construction blueprints to event execution, our PMs ensure that deliverables are completed on-time and within budget using industry-best frameworks.
              </p>
              <ul className="mb-4" style={{ listStylePosition: 'inside', color: 'var(--text-secondary)' }}>
                <li>Agile & Waterfall Methodologies</li>
                <li>Budget & Resource Allocation</li>
                <li>Quality Assurance & Safety</li>
              </ul>
              <Link to="/consultations" className="btn btn-accent">Request Timeline</Link>
            </div>
          </div>

          <hr style={{ border: 0, borderTop: '1px solid var(--border-color)' }} />

          {/* Recruitment Services */}
          <div className="grid" style={{ gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'flex-start' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: 'rgba(2,132,199,0.1)', borderRadius: '50%', marginBottom: '1rem' }}>
                <UserCheck size={48} color="var(--primary-color)" />
              </div>
              <h2 style={{ fontSize: '1.75rem' }}>Recruitment Services</h2>
            </div>
            <div>
              <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                Finding the right talent is critical. Our dedicated recruitment team specializes in fulfilling high-demand roles across all 8 of our target sectors.
              </p>
              <Link to="/careers" className="btn btn-primary">View Job Portal</Link>
            </div>
          </div>

          <hr style={{ border: 0, borderTop: '1px solid var(--border-color)' }} />

          {/* Product Sourcing */}
          <div className="grid" style={{ gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'flex-start' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: 'rgba(13,148,136,0.1)', borderRadius: '50%', marginBottom: '1rem' }}>
                <Package size={48} color="var(--accent-color)" />
              </div>
              <h2 style={{ fontSize: '1.75rem' }}>Product Sourcing</h2>
            </div>
            <div>
              <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                We bridge the gap between manufacturers and businesses, ensuring you receive high-tier products—especially in the renewable energy and solar sector—at competitive rates.
              </p>
              <Link to="/sourcing" className="btn btn-accent">Explore Products</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Services;
