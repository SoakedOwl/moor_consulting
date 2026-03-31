import { Mail, Phone, MapPin, Send, UploadCloud } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const ContactInfo = ({ icon, title, children }) => (
  <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
    <div style={{
      width: 48, height: 48, flexShrink: 0,
      background: 'linear-gradient(135deg, rgba(2,132,199,0.12), rgba(79,70,229,0.12))',
      borderRadius: '14px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {icon}
    </div>
    <div>
      <h4 style={{ marginBottom: '0.25rem', fontSize: '0.95rem' }}>{title}</h4>
      <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{children}</p>
    </div>
  </div>
);

const Contact = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(`Message sent successfully! We'll get back to you shortly.`);
    e.target.reset();
    setTimeout(() => setStatus(''), 5000);
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <div className="section text-center" style={{ background: 'linear-gradient(135deg, rgba(2,132,199,0.06), rgba(79,70,229,0.06))', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Get in Touch</h1>
        <p className="text-muted" style={{ maxWidth: 600, margin: '0 auto', fontSize: '1.125rem' }}>
          Have a question or need assistance? Our team is here to help.
        </p>
      </div>

      <div className="container section">
        <div className="grid" style={{ gridTemplateColumns: 'minmax(280px, 1fr) minmax(400px, 2fr)', gap: '4rem', alignItems: 'start' }}>

          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingTop: '0.5rem' }}
          >
            <div>
              <h2 style={{ marginBottom: '0.5rem' }}>Contact Information</h2>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>We typically respond within one business day.</p>
            </div>
            <ContactInfo icon={<MapPin size={20} color="var(--primary-color)" />} title="Our Office">
              123 Business Avenue<br />London, UK EC1A 1BB
            </ContactInfo>
            <ContactInfo icon={<Phone size={20} color="var(--primary-color)" />} title="Phone">
              +44 123 456 7890
            </ContactInfo>
            <ContactInfo icon={<Mail size={20} color="var(--primary-color)" />} title="Email">
              contact@moorconsultations.co.uk
            </ContactInfo>
          </motion.div>

          {/* Right: Form Card */}
          <motion.div
            className="card-glass"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ padding: '2.5rem' }}
          >
            <h2 style={{ marginBottom: '2rem' }}>Send us a Message</h2>

            {status && (
              <div style={{
                padding: '0.875rem 1rem',
                background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(5,150,105,0.1))',
                border: '1px solid rgba(16,185,129,0.3)',
                color: '#065f46',
                borderRadius: 'var(--border-radius-md)',
                marginBottom: '1.5rem',
                fontSize: '0.9rem',
              }}>
                {status}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input type="text" className="form-input" required placeholder="John" />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input type="text" className="form-input" required placeholder="Doe" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input" required placeholder="john@example.com" />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-textarea" rows="5" required placeholder="How can we help you?" />
              </div>

              <div className="form-group">
                <label className="form-label">Attachment (Optional)</label>
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
                  <p className="text-muted mb-2" style={{ fontSize: '0.8rem' }}>Upload screenshots, docs, or PDFs</p>
                  <input type="file" style={{ display: 'block', margin: '0 auto', fontSize: '0.8rem' }} />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.25rem' }}>
                <Send size={18} style={{ marginRight: '0.5rem' }} /> Send Message
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
