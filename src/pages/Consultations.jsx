import { useState } from 'react';
import { Calendar, User, Clock, ChevronDown, UploadCloud, File } from 'lucide-react';

const Consultations = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Consultation booked successfully! We will email you with your confirmation details shortly.');
    e.target.reset();
  };

  return (
    <div className="consultations-page section">
      <div className="container">
        <div className="text-center mb-12">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Book a Consultation</h1>
          <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem' }}>
            Schedule a session with our expert advisors to discuss your multi-sector needs and strategize for future growth.
          </p>
        </div>

        <div style={{ maxWidth: '700px', margin: '0 auto', backgroundColor: 'var(--surface-color)', padding: '3rem', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
          {status && (
            <div style={{ padding: '1rem', backgroundColor: '#dcfce7', color: '#166534', borderRadius: 'var(--border-radius-md)', marginBottom: '2rem', textAlign: 'center', fontWeight: '500' }}>
              {status}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div className="form-group mb-0">
                <label className="form-label">First Name</label>
                <input type="text" className="form-input" required placeholder="Jane" />
              </div>
              <div className="form-group mb-0">
                <label className="form-label">Last Name</label>
                <input type="text" className="form-input" required placeholder="Doe" />
              </div>
            </div>

            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div className="form-group mb-0">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input" required placeholder="jane@example.com" />
              </div>
              <div className="form-group mb-0">
                <label className="form-label">Phone Number</label>
                <input type="tel" className="form-input" required placeholder="+44 7700 900077" />
              </div>
            </div>

            <div className="form-group mb-6">
              <label className="form-label">Service Category</label>
              <div style={{ position: 'relative' }}>
                <select className="form-select" required style={{ appearance: 'none' }} defaultValue="">
                  <option value="" disabled>Select a service to discuss</option>
                  <option value="advisory">Advisory & Consulting</option>
                  <option value="pm">Project Management</option>
                  <option value="recruitment">Recruitment Services</option>
                  <option value="sourcing">Product Sourcing (Solar/Tech)</option>
                  <option value="other">General / Multiple Services</option>
                </select>
                <ChevronDown size={20} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)' }} />
              </div>
            </div>

            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div className="form-group mb-0">
                <label className="form-label">Preferred Date</label>
                <div style={{ position: 'relative' }}>
                  <input type="date" className="form-input" required style={{ paddingLeft: '2.5rem' }} />
                  <Calendar size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                </div>
              </div>
              <div className="form-group mb-0">
                <label className="form-label">Preferred Time</label>
                <div style={{ position: 'relative' }}>
                  <input type="time" className="form-input" required style={{ paddingLeft: '2.5rem' }} />
                  <Clock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                </div>
              </div>
            </div>

            <div className="form-group mb-8">
              <label className="form-label">Message / Details</label>
              <textarea className="form-textarea" rows="4" placeholder="Please provide any specific topics you'd like to discuss..."></textarea>
            </div>

            <div className="form-group mb-8">
              <label className="form-label">Supporting Documents (Optional)</label>
              <div style={{ 
                border: '2px dashed var(--border-color)', 
                padding: '2rem', 
                textAlign: 'center', 
                borderRadius: 'var(--border-radius-md)',
                backgroundColor: 'rgba(255,255,255,0.4)',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary-color)'; e.currentTarget.style.backgroundColor = 'var(--surface-color)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.4)'; }}
              >
                <UploadCloud size={32} color="var(--primary-color)" className="mb-2" style={{ margin: '0 auto' }}/>
                <p className="text-muted mb-2" style={{ fontSize: '0.9rem' }}>Upload project briefs or relevant context</p>
                <input type="file" style={{ display: 'block', margin: '0 auto', fontSize: '0.85rem' }} multiple />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '1.125rem', padding: '1rem' }}>
              Request a Consultation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Consultations;
