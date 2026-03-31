import { useState } from 'react';
import { Briefcase, MapPin, Clock, X, UploadCloud, Users, CheckCircle } from 'lucide-react';

const dummyJobs = [
  { id: 1, title: 'Senior Financial Analyst', category: 'Finance', location: 'London, UK', type: 'Full-time' },
  { id: 2, title: 'Renewable Energy Project Manager', category: 'Renewable Energy', location: 'Manchester, UK', type: 'Contract' },
  { id: 3, title: 'HR Business Partner', category: 'HR', location: 'Remote', type: 'Full-time' },
  { id: 4, title: 'Lead Full Stack Engineer', category: 'Technology', location: 'London, UK', type: 'Full-time' }
];

const Careers = () => {
  const [viewMode, setViewMode] = useState('candidates'); // 'candidates' or 'employers'
  
  const [filter, setFilter] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState('');
  const [employerStatus, setEmployerStatus] = useState('');

  const filteredJobs = filter === 'All' ? dummyJobs : dummyJobs.filter(job => job.category === filter);

  const handleApply = (e) => {
    e.preventDefault();
    setApplicationStatus(`Application submitted for ${selectedJob.title}`);
    setTimeout(() => {
      setApplicationStatus('');
      setSelectedJob(null);
    }, 4000);
  };

  const handleEmployerSubmit = (e) => {
    e.preventDefault();
    setEmployerStatus('Staffing request submitted successfully! A dedicated recruitment manager will contact you within 24 hours.');
    e.target.reset();
  };

  return (
    <div className="careers-page section" style={{ backgroundColor: 'var(--bg-color)', minHeight: '80vh' }}>
      <div className="container">
        
        <div className="text-center mb-12">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Recruitment & Staffing</h1>
          <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem' }}>
            Whether you're looking for your next big career move or searching for elite talent to build your team, we've got you covered.
          </p>
        </div>

        {/* Toggle Switch */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
          <div style={{ background: 'var(--surface-color)', padding: '0.5rem', borderRadius: '50px', border: '1px solid var(--border-color)', display: 'inline-flex', boxShadow: 'var(--shadow-sm)' }}>
            <button 
              className={`btn ${viewMode === 'candidates' ? 'btn-primary' : ''}`}
              style={{ borderRadius: '50px', background: viewMode === 'candidates' ? '' : 'transparent', color: viewMode === 'candidates' ? 'white' : 'var(--text-secondary)', border: 'none', boxShadow: viewMode === 'candidates' ? '' : 'none', padding: '0.6rem 1.25rem', fontSize: '1rem' }}
              onClick={() => setViewMode('candidates')}
            >
              <Briefcase size={18} style={{ marginRight: '0.5rem' }} /> I'm Looking for Work
            </button>
            <button 
              className={`btn ${viewMode === 'employers' ? 'btn-primary' : ''}`}
              style={{ borderRadius: '50px', background: viewMode === 'employers' ? '' : 'transparent', color: viewMode === 'employers' ? 'white' : 'var(--text-secondary)', border: 'none', boxShadow: viewMode === 'employers' ? '' : 'none', padding: '0.6rem 1.25rem', fontSize: '1rem' }}
              onClick={() => setViewMode('employers')}
            >
              <Users size={18} style={{ marginRight: '0.5rem' }} /> I'm Looking to Hire
            </button>
          </div>
        </div>

        {viewMode === 'candidates' ? (
          <div className="animate-fade-in">
            {/* Job Filters */}
            <div className="mb-8" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['All', 'Finance', 'Renewable Energy', 'HR', 'Technology'].map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setFilter(cat)}
                  className={`btn btn-sm ${filter === cat ? 'btn-primary' : 'btn-outline'}`}
                  style={{ padding: '0.4rem 1rem', borderRadius: '50px' }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Job Listings */}
            <div key={filter} className="grid animate-tab" style={{ gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
              {filteredJobs.map(job => (
                <div key={job.id} style={{ 
                  backgroundColor: 'var(--surface-color)', 
                  padding: '1.5rem', 
                  borderRadius: 'var(--border-radius-md)', 
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: '1px solid var(--border-color)',
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }} 
                onClick={() => setSelectedJob(job)}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                >
                  <div>
                    <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary-color)' }}>{job.title}</h3>
                    <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Briefcase size={14}/> {job.category}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14}/> {job.location}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14}/> {job.type}</span>
                    </div>
                  </div>
                  <button className="btn btn-outline btn-sm" style={{ padding: '0.5rem 1rem' }}>View Details</button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="card-glass" style={{ padding: '3rem' }}>
              <h2 className="mb-4 text-center">Submit a Staffing Request</h2>
              <p className="text-center text-muted mb-8">Tell us about the roles you need to fill, and our specialized recruitment team will source the perfect candidates.</p>
              
              {employerStatus && (
                <div style={{ padding: '1.5rem', backgroundColor: '#dcfce7', color: '#166534', borderRadius: 'var(--border-radius-md)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: '500' }}>
                  <CheckCircle size={24} /> {employerStatus}
                </div>
              )}

              <form onSubmit={handleEmployerSubmit}>
                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div className="form-group mb-4">
                    <label className="form-label">Company Name</label>
                    <input type="text" className="form-input" required placeholder="e.g. Acme Corp" />
                  </div>
                  <div className="form-group mb-4">
                    <label className="form-label">Contact Name</label>
                    <input type="text" className="form-input" required placeholder="e.g. Jane Doe" />
                  </div>
                </div>

                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div className="form-group mb-4">
                    <label className="form-label">Work Email</label>
                    <input type="email" className="form-input" required placeholder="jane@acmecorp.com" />
                  </div>
                  <div className="form-group mb-4">
                    <label className="form-label">Phone Number</label>
                    <input type="tel" className="form-input" required placeholder="+44 7700 900000" />
                  </div>
                </div>

                <div className="form-group mb-4">
                  <label className="form-label">Primary Sector / Industry</label>
                  <select className="form-input" required defaultValue="" style={{ appearance: 'auto' }}>
                    <option value="" disabled>Select Sector</option>
                    <option value="Finance">Finance</option>
                    <option value="Renewable Energy">Renewable Energy</option>
                    <option value="Construction">Construction</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group mb-4">
                  <label className="form-label">Upload Job Descriptions (Optional)</label>
                  <div style={{ 
                    border: '2px dashed var(--border-color)', 
                    padding: '2rem', 
                    textAlign: 'center', 
                    borderRadius: 'var(--border-radius-md)',
                    backgroundColor: 'rgba(255,255,255,0.4)',
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary-color)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                  >
                    <UploadCloud size={32} color="var(--primary-color)" className="mb-2" style={{ margin: '0 auto' }}/>
                    <p className="text-muted mb-2">Drag & drop your JDs or specs here</p>
                    <input type="file" style={{ display: 'block', margin: '0 auto' }} multiple />
                  </div>
                </div>

                <div className="form-group mb-6">
                  <label className="form-label">Role Details & Requirements</label>
                  <textarea className="form-textarea" rows="5" required placeholder="Please describe the roles you're hiring for, headcount, and key requirements..."></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit Staffing Request</button>
              </form>
            </div>
          </div>
        )}

        {/* Application Modal (For Candidates) */}
        {selectedJob && (
          <div style={{ 
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem'
          }}>
            <div style={{ 
              backgroundColor: 'var(--surface-color)', 
              padding: '2.5rem', 
              borderRadius: 'var(--border-radius-lg)', 
              width: '100%', 
              maxWidth: '600px', 
              maxHeight: '90vh', 
              overflowY: 'auto',
              position: 'relative'
            }}>
              <button 
                onClick={() => setSelectedJob(null)} 
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
              >
                <X size={24} />
              </button>
              
              <h2 className="mb-2">Apply for {selectedJob.title}</h2>
              <p className="text-muted mb-8">{selectedJob.location} • {selectedJob.type}</p>

              {applicationStatus ? (
                <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#dcfce7', color: '#166534', borderRadius: 'var(--border-radius-md)' }}>
                  <h3 className="mb-2">Success!</h3>
                  <p>{applicationStatus}</p>
                </div>
              ) : (
                <form onSubmit={handleApply}>
                  <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group mb-4">
                      <label className="form-label">First Name</label>
                      <input type="text" className="form-input" required />
                    </div>
                    <div className="form-group mb-4">
                      <label className="form-label">Last Name</label>
                      <input type="text" className="form-input" required />
                    </div>
                  </div>
                  <div className="form-group mb-4">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" required />
                  </div>
                  
                  <div className="form-group mb-4">
                    <label className="form-label">Upload CV / Resume</label>
                    <div style={{ 
                      border: '2px dashed var(--border-color)', 
                      padding: '2rem', 
                      textAlign: 'center', 
                      borderRadius: 'var(--border-radius-md)',
                      backgroundColor: 'rgba(255,255,255,0.4)',
                      transition: 'all 0.2s', cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary-color)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                    >
                      <UploadCloud size={32} color="var(--primary-color)" className="mb-2" style={{ margin: '0 auto' }}/>
                      <p className="text-muted mb-2">Drag & drop your file here, or click to browse</p>
                      <input type="file" required style={{ display: 'block', margin: '0 auto' }}/>
                    </div>
                  </div>

                  <div className="form-group mb-6">
                    <label className="form-label">Cover Message</label>
                    <textarea className="form-textarea" rows="4" placeholder="Briefly tell us why you're a great fit..."></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit Application</button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Careers;
