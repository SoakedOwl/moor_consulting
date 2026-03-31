const About = () => {
  const sectors = [
    'Construction', 'HR', 'Finance', 'Technology', 
    'Events', 'Healthcare', 'Social Care', 'Renewable Energy'
  ];

  return (
    <div className="about-page">
      <div className="section" style={{ backgroundColor: 'var(--primary-color)', color: 'white', padding: '4rem 0' }}>
        <div className="container text-center">
          <h1 style={{ color: 'white', fontSize: '3rem' }}>About MoorConsultations</h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '1rem auto 0' }}>
            Bridging gaps and driving success across multiple industries.
          </p>
        </div>
      </div>

      <div className="section">
        <div className="container grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h2 className="mb-4" style={{ fontSize: '2rem' }}>Our Mission</h2>
            <p className="mb-4 text-muted" style={{ fontSize: '1.125rem' }}>
              To provide centralized, top-tier advisory, management, and resourcing solutions that empower businesses to thrive in a rapidly changing world.
            </p>
            <h2 className="mb-4" style={{ fontSize: '2rem', marginTop: '2rem' }}>Our Vision</h2>
            <p className="text-muted" style={{ fontSize: '1.125rem' }}>
              To be the digital and operational hub for enterprises worldwide, setting the standard for multi-sector consultancy.
            </p>
          </div>
          <div style={{ padding: '2rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 className="mb-4">Why Choose Us?</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li className="mb-2" style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: 'var(--accent-color)' }}>✓</span> Unified Multi-Sector Expertise
              </li>
              <li className="mb-2" style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: 'var(--accent-color)' }}>✓</span> Centralized Digital Hub
              </li>
              <li className="mb-2" style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: 'var(--accent-color)' }}>✓</span> Tailored Advisory & Strategy
              </li>
              <li className="mb-2" style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: 'var(--accent-color)' }}>✓</span> Seamless Project Delivery
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="section" style={{ backgroundColor: '#f1f5f9' }}>
        <div className="container">
          <h2 className="text-center mb-8" style={{ fontSize: '2.5rem' }}>Sectors We Serve</h2>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {sectors.map((sector, index) => (
              <div key={index} style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: 'var(--border-radius-md)', textAlign: 'center', boxShadow: 'var(--shadow-sm)', fontWeight: 600 }}>
                {sector}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
