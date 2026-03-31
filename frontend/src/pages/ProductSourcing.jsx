import { Sun, BatteryCharging, Wrench, ShieldCheck, ArrowRight, UploadCloud } from 'lucide-react';
import { useState } from 'react';

const ProductSourcing = () => {
  const [status, setStatus] = useState('');

  const handleQuote = (e) => {
    e.preventDefault();
    setStatus('Quote request submitted! Our sourcing team will respond within 24 hours.');
    e.target.reset();
  };

  return (
    <div className="sourcing-page">
      {/* Header */}
      <div className="section" style={{ backgroundColor: 'var(--surface-color)', borderBottom: '1px solid var(--border-color)', textAlign: 'center', padding: '4rem 0' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>Product Sourcing</h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem' }}>
          Premium B2B product procurement specializing in advanced renewable energy and solar solutions.
        </p>
      </div>

      <div className="container section">
        
        {/* Categories Showcase */}
        <h2 className="text-center mb-12">Featured Categories</h2>
        <div className="grid mb-12" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          
          <div style={{ padding: '2rem', backgroundColor: '#f8fafc', borderRadius: 'var(--border-radius-lg)', textAlign: 'center', border: '1px solid var(--border-color)' }}>
            <Sun size={48} color="#eab308" className="mb-4" style={{ margin: '0 auto' }} />
            <h3 className="mb-2">Solar Panels</h3>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>High-efficiency monocrystalline and polycrystalline photovoltaic panels.</p>
          </div>

          <div style={{ padding: '2rem', backgroundColor: '#f8fafc', borderRadius: 'var(--border-radius-lg)', textAlign: 'center', border: '1px solid var(--border-color)' }}>
            <BatteryCharging size={48} color="var(--primary-color)" className="mb-4" style={{ margin: '0 auto' }} />
            <h3 className="mb-2">Energy Storage</h3>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Industrial-scale battery arrays and smart inverter systems for grid backup.</p>
          </div>

          <div style={{ padding: '2rem', backgroundColor: '#f8fafc', borderRadius: 'var(--border-radius-lg)', textAlign: 'center', border: '1px solid var(--border-color)' }}>
            <Wrench size={48} color="var(--accent-color)" className="mb-4" style={{ margin: '0 auto' }} />
            <h3 className="mb-2">Construction Tech</h3>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Smart materials and eco-friendly machinery sourced directly from manufacturers.</p>
          </div>

          <div style={{ padding: '2rem', backgroundColor: '#f8fafc', borderRadius: 'var(--border-radius-lg)', textAlign: 'center', border: '1px solid var(--border-color)' }}>
            <ShieldCheck size={48} color="#059669" className="mb-4" style={{ margin: '0 auto' }} />
            <h3 className="mb-2">Compliance Goods</h3>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Certified safety gear and regulatory compliance hardware for multiple sectors.</p>
          </div>

        </div>

        {/* Quote Request Form */}
        <div style={{ backgroundColor: '#1e293b', padding: '4rem', borderRadius: 'var(--border-radius-lg)', color: 'white', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          
          <div>
            <h2 className="mb-4" style={{ color: 'white' }}>Ready to Scale?</h2>
            <p className="mb-6" style={{ color: '#cbd5e1', fontSize: '1.1rem' }}>
              We bypass retail markups by negotiating directly with global OEMs. Request a custom quote today to see how much your project can save on critical hardware and solar infrastructure.
            </p>
            <ul style={{ listStylePosition: 'inside', color: '#cbd5e1', marginBottom: '2rem' }}>
              <li className="mb-2">Guaranteed wholesale rates</li>
              <li className="mb-2">End-to-end logistics & shipping management</li>
              <li>Verified global supplier network</li>
            </ul>
          </div>

          <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: 'var(--border-radius-md)', color: 'var(--text-primary)' }}>
            <h3 className="mb-6">Request a Custom Quote</h3>
            {status && <div className="mb-4" style={{ padding: '1rem', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '4px' }}>{status}</div>}
            <form onSubmit={handleQuote}>
              <div className="form-group mb-4">
                <label className="form-label">Product Type / Category</label>
                <input type="text" className="form-input" required placeholder="e.g. 500W Solar Panels" />
              </div>
              
              <div className="grid mb-4" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group mb-0">
                  <label className="form-label">Quantity</label>
                  <input type="number" className="form-input" required min="1" placeholder="100" />
                </div>
                <div className="form-group mb-0">
                  <label className="form-label">Est. Budget ($)</label>
                  <input type="text" className="form-input" placeholder="e.g. $50,000" />
                </div>
              </div>

              <div className="form-group mb-4">
                <label className="form-label">Project Details & Requirements</label>
                <textarea className="form-textarea" rows="3" required placeholder="Please provide specifications..."></textarea>
              </div>

              <div className="form-group mb-6">
                <label className="form-label">Spec Documents (Optional)</label>
                <div style={{ 
                  border: '1px dashed var(--border-color)', 
                  padding: '1.5rem', 
                  textAlign: 'center', 
                  borderRadius: 'var(--border-radius-md)',
                  backgroundColor: 'rgba(255,255,255,0.4)',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary-color)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                >
                  <UploadCloud size={24} color="var(--primary-color)" className="mb-2" style={{ margin: '0 auto' }}/>
                  <p className="text-muted mb-2" style={{ fontSize: '0.8rem' }}>Upload project blueprints or part lists</p>
                  <input type="file" style={{ display: 'block', margin: '0 auto', fontSize: '0.8rem' }} multiple />
                </div>
              </div>

              <button type="submit" className="btn btn-accent" style={{ width: '100%' }}>
                Get Quote <ArrowRight size={18} style={{ marginLeft: '0.5rem' }}/>
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductSourcing;
