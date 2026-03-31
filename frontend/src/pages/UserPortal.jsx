import { useState } from 'react';
import { User, FileText, Calendar, MessageSquare, LogOut, Download, CreditCard, PlayCircle, Award, CheckCircle, ChevronRight, Video, FileCheck, HelpCircle } from 'lucide-react';

const UserPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const navItemStyle = (isActive) => ({
    width: '100%',
    textAlign: 'left',
    padding: '0.85rem 1.2rem',
    borderRadius: '8px',
    backgroundColor: isActive ? 'var(--bg-color)' : 'transparent',
    color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
    fontWeight: isActive ? '600' : '500',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.25rem'
  });

  if (!isLoggedIn) {
    return (
      <div className="section animate-fade-in" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(2,132,199,0.03), rgba(79,70,229,0.03))' }}>
        <div className="card-glass" style={{ padding: '3.5rem', width: '100%', maxWidth: '480px', borderRadius: '24px' }}>
          <div className="text-center mb-8">
            <h2 className="mb-2" style={{ fontSize: '2rem' }}>Client Portal</h2>
            <p className="text-muted" style={{ fontSize: '1.05rem' }}>Sign in to manage your ecosystem.</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="form-group mb-5">
              <label className="form-label" style={{ fontSize: '0.85rem' }}>Email Address</label>
              <input type="email" className="form-input" required defaultValue="client@business.co.uk" />
            </div>
            <div className="form-group mb-8">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Password</label>
                <span style={{ fontSize: '0.8rem', color: 'var(--primary-color)', cursor: 'pointer', fontWeight: '500' }}>Forgot?</span>
              </div>
              <input type="password" className="form-input" required defaultValue="password123" />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.1rem', fontSize: '1.1rem' }}>Access Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="portal-page animate-fade-in" style={{ backgroundColor: 'var(--bg-color)', minHeight: '80vh', paddingBottom: '4rem' }}>
      <div className="container section" style={{ paddingTop: '3rem' }}>
        
        <div className="mb-8" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>Welcome back, John</h1>
            <p className="text-muted" style={{ fontSize: '1.1rem' }}>Manage your MoorConsultations enterprise services.</p>
          </div>
          <button className="btn btn-outline" onClick={() => setIsLoggedIn(false)} style={{ borderRadius: '50px' }}>
            <LogOut size={18} className="mr-2" style={{ marginRight: '0.5rem' }}/> Secure Sign Out
          </button>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'minmax(250px, 280px) 1fr', gap: '2.5rem', alignItems: 'start' }}>
          
          {/* Sidebar */}
          <div className="card-glass" style={{ padding: '1.5rem', borderRight: 'none' }}>
            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1rem' }}>Core</h4>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
              <li>
                <button onClick={() => setActiveTab('profile')} style={navItemStyle(activeTab === 'profile')}>
                  <User size={18} style={{ marginRight: '0.8rem' }}/> Profile Settings
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('documents')} style={navItemStyle(activeTab === 'documents')}>
                  <FileText size={18} style={{ marginRight: '0.8rem' }}/> Document Vault
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('history')} style={navItemStyle(activeTab === 'history')}>
                  <Calendar size={18} style={{ marginRight: '0.8rem' }}/> Case History
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('messages')} style={navItemStyle(activeTab === 'messages')}>
                  <MessageSquare size={18} style={{ marginRight: '0.8rem' }}/> Secure Inbox <span style={{ marginLeft: 'auto', background: 'var(--primary-color)', color: 'white', fontSize: '0.7rem', padding: '0.1rem 0.5rem', borderRadius: '50px' }}>1</span>
                </button>
              </li>
            </ul>

            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '1rem', paddingLeft: '1rem' }}>Modules</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <button onClick={() => setActiveTab('billing')} style={navItemStyle(activeTab === 'billing')}>
                  <CreditCard size={18} style={{ marginRight: '0.8rem' }}/> Billing & Plans
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('training')} style={navItemStyle(activeTab === 'training')}>
                  <PlayCircle size={18} style={{ marginRight: '0.8rem' }}/> Training Center
                </button>
              </li>
            </ul>
          </div>

          {/* Main Content Area */}
          <div key={activeTab} className="animate-fade-in card-glass" style={{ padding: '3rem', minHeight: '600px' }}>
            
            {/* ====== PROFILE TAB ====== */}
            {activeTab === 'profile' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                  <h2 style={{ fontSize: '1.75rem' }}>Enterprise Profile</h2>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#dcfce7', color: '#166534', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600 }}>
                    <CheckCircle size={16} /> Verified Account
                  </span>
                </div>
                
                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                  <div className="form-group mb-0">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-input" defaultValue="John Doe" readOnly style={{ backgroundColor: 'transparent' }}/>
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-input" defaultValue="john@business.co.uk" readOnly style={{ backgroundColor: 'transparent' }}/>
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Company Name</label>
                    <input type="text" className="form-input" defaultValue="TechSphere Group Ltd" readOnly style={{ backgroundColor: 'transparent' }}/>
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Phone Number</label>
                    <input type="text" className="form-input" defaultValue="+44 7700 900123" readOnly style={{ backgroundColor: 'transparent' }}/>
                  </div>
                </div>
                
                <div style={{ padding: '2rem', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-md)', backgroundColor: 'var(--bg-color)' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Security & Access</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <p style={{ fontWeight: 600 }}>Password</p>
                      <p className="text-muted" style={{ fontSize: '0.85rem' }}>Last changed 45 days ago</p>
                    </div>
                    <button className="btn btn-outline btn-sm">Update</button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontWeight: 600 }}>Two-Factor Authentication (2FA)</p>
                      <p className="text-muted" style={{ fontSize: '0.85rem' }}>Add an extra layer of security to your account.</p>
                    </div>
                    <button className="btn btn-primary btn-sm">Enable 2FA</button>
                  </div>
                </div>
              </div>
            )}

            {/* ====== DOCUMENTS TAB ====== */}
            {activeTab === 'documents' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                  <h2 style={{ fontSize: '1.75rem' }}>Document Vault</h2>
                  <button className="btn btn-primary btn-sm"><Download size={16} style={{ marginRight: '0.5rem' }}/> Upload Brief</button>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { id: 1, name: 'Sourcing_Specification_Q4.pdf', type: 'Solar Procurement', date: 'Oct 28, 2023', size: '2.4 MB' },
                    { id: 2, name: 'HR_Staffing_Requirements.docx', type: 'Recruitment', date: 'Oct 15, 2023', size: '1.1 MB' },
                    { id: 3, name: 'Moor_NDA_Signed_JD.pdf', type: 'Legal', date: 'Sep 02, 2023', size: '0.5 MB' },
                  ].map((doc) => (
                    <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '12px', transition: 'all 0.2s', backgroundColor: 'rgba(255,255,255,0.4)', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary-color)'; e.currentTarget.style.transform = 'translateY(-2px)' }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.transform = 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'linear-gradient(135deg, rgba(2,132,199,0.1), rgba(79,70,229,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FileCheck size={24} color="var(--primary-color)" />
                        </div>
                        <div>
                          <p style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.25rem' }}>{doc.name}</p>
                          <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                            <span>{doc.type}</span>•<span>{doc.date}</span>•<span>{doc.size}</span>
                          </div>
                        </div>
                      </div>
                      <button className="btn btn-outline" style={{ borderRadius: '50%', padding: '0.75rem', width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Download size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ====== HISTORY TAB ====== */}
            {activeTab === 'history' && (
              <div>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '2.5rem' }}>Case & Consultation History</h2>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                        <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Case ID</th>
                        <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Date</th>
                        <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Service Sector</th>
                        <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Consultant</th>
                        <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }}>
                        <td style={{ padding: '1rem', fontWeight: 600 }}>#MC-0842</td>
                        <td style={{ padding: '1rem' }}>Oct 15, 2023</td>
                        <td style={{ padding: '1rem' }}>HR & Recruitment</td>
                        <td style={{ padding: '1rem' }}>Sarah Jenkins</td>
                        <td style={{ padding: '1rem' }}><span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.3rem 0.75rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600 }}>Completed</span></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '1rem', fontWeight: 600 }}>#MC-0891</td>
                        <td style={{ padding: '1rem' }}>Nov 02, 2023</td>
                        <td style={{ padding: '1rem' }}>Product Sourcing (Solar)</td>
                        <td style={{ padding: '1rem' }}>David Miller</td>
                        <td style={{ padding: '1rem' }}><span style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '0.3rem 0.75rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600 }}>In Review</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ====== MESSAGES TAB ====== */}
            {activeTab === 'messages' && (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '2.5rem' }}>Secure Inbox</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', height: '500px' }}>
                  {/* Message List */}
                  <div style={{ borderRight: '1px solid var(--border-color)', paddingRight: '1rem', overflowY: 'auto' }}>
                    <div style={{ padding: '1.25rem', backgroundColor: 'rgba(2,132,199,0.05)', borderLeft: '4px solid var(--primary-color)', borderRadius: '0 8px 8px 0', cursor: 'pointer', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <h4 style={{ margin: 0 }}>David Miller</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>10:42 AM</span>
                      </div>
                      <p style={{ fontSize: '0.875rem', margin: 0, color: 'var(--text-primary)', fontWeight: 500 }}>Update on Solar Sourcing...</p>
                    </div>
                    <div style={{ padding: '1.25rem', cursor: 'pointer', borderRadius: '8px', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-color)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <h4 style={{ margin: 0 }}>Sarah Jenkins</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Oct 14</span>
                      </div>
                      <p style={{ fontSize: '0.875rem', margin: 0, color: 'var(--text-secondary)' }}>Follow up: HR Strategy Plan</p>
                    </div>
                  </div>

                  {/* Message View */}
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>DM</div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>David Miller</h3>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Senior Sourcing Consultant</p>
                      </div>
                    </div>
                    <div style={{ flexGrow: 1, overflowY: 'auto' }}>
                      <div style={{ backgroundColor: 'var(--bg-color)', padding: '1.5rem', borderRadius: '12px 12px 12px 0', maxWidth: '85%', marginBottom: '1rem' }}>
                        <p style={{ margin: 0, lineHeight: 1.6 }}>Hi John,</p>
                        <br/>
                        <p style={{ margin: 0, lineHeight: 1.6 }}>Our procurement team tracked down a new supplier for the tier-1 solar inverters you requested. The estimated lead time is roughly 4 weeks, beating our initial estimate. I've uploaded the new spec sheet to your document vault.</p>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>Today, 10:42 AM</span>
                    </div>
                    <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <input type="text" className="form-input" placeholder="Type your secure reply..." style={{ flexGrow: 1 }} />
                        <button className="btn btn-primary" style={{ padding: '0 2rem' }}>Send</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ====== BILLING & E-COM TAB ====== */}
            {activeTab === 'billing' && (
              <div className="animate-fade-in">
                <h2 style={{ fontSize: '1.75rem', marginBottom: '2.5rem' }}>Billing & Subscriptions</h2>
                
                {/* Active Plan Card */}
                <div style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', borderRadius: '20px', padding: '2.5rem', color: 'white', marginBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(79,70,229,0.4) 0%, transparent 70%)', borderRadius: '50%' }}></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                    <div>
                      <p style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>Current Plan</p>
                      <h3 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Enterprise Elite</h3>
                      <p style={{ color: '#94a3b8', maxWidth: '400px', lineHeight: 1.6 }}>Full-service advisory and priority procurement tracking across all business sectors.</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>£2,499<span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 400 }}>/mo</span></p>
                      <button className="btn btn-accent mt-4" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>Manage Subscription</button>
                    </div>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Invoice History</h3>
                <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem', backgroundColor: 'var(--bg-color)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ color: 'var(--text-secondary)' }}>
                        <th style={{ padding: '1rem', fontWeight: 500 }}>Invoice #</th>
                        <th style={{ padding: '1rem', fontWeight: 500 }}>Date</th>
                        <th style={{ padding: '1rem', fontWeight: 500 }}>Amount</th>
                        <th style={{ padding: '1rem', fontWeight: 500 }}>Status</th>
                        <th style={{ padding: '1rem', fontWeight: 500, textAlign: 'right' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderTop: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '1rem', fontWeight: 600 }}>INV-2023-084</td>
                        <td style={{ padding: '1rem' }}>Nov 01, 2023</td>
                        <td style={{ padding: '1rem' }}>£2,499.00</td>
                        <td style={{ padding: '1rem' }}><span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.25rem 0.6rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 600 }}>Paid</span></td>
                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                          <button style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontWeight: 600, cursor: 'pointer' }}>PDF</button>
                        </td>
                      </tr>
                      <tr style={{ borderTop: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '1rem', fontWeight: 600 }}>INV-2023-012</td>
                        <td style={{ padding: '1rem' }}>Oct 01, 2023</td>
                        <td style={{ padding: '1rem' }}>£2,499.00</td>
                        <td style={{ padding: '1rem' }}><span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.25rem 0.6rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 600 }}>Paid</span></td>
                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                          <button style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontWeight: 600, cursor: 'pointer' }}>PDF</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ====== TRAINING & E-LEARNING TAB ====== */}
            {activeTab === 'training' && (
              <div className="animate-fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Training Center (LMS)</h2>
                    <p className="text-muted">Manage your corporate learning and compliance modules.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '0.85rem', margin: 0, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Overall Progress</p>
                      <p style={{ margin: 0, fontWeight: 700, color: 'var(--primary-color)', fontSize: '1.25rem' }}>68%</p>
                    </div>
                  </div>
                </div>

                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                  
                  {/* Course Card 1 */}
                  <div style={{ border: '1px solid var(--border-color)', borderRadius: '16px', overflow: 'hidden', backgroundColor: 'var(--bg-color)', transition: 'transform 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
                    <div style={{ height: '160px', background: 'linear-gradient(45deg, #0f172a, #334155)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      <Video size={48} color="rgba(255,255,255,0.2)" />
                      <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.75rem', backdropFilter: 'blur(4px)' }}>12 Modules</div>
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0ea5e9', textTransform: 'uppercase' }}>Construction</span>
                        <Award size={16} color="var(--text-secondary)" />
                      </div>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', lineHeight: 1.4 }}>Site Health & Safety Compliance v4</h3>
                      
                      <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>
                          <span>Module 8 of 12</span>
                          <span style={{ fontWeight: 600 }}>66%</span>
                        </div>
                        <div style={{ height: '6px', width: '100%', backgroundColor: 'var(--border-color)', borderRadius: '10px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: '66%', backgroundColor: '#0ea5e9', borderRadius: '10px' }}></div>
                        </div>
                      </div>

                      <button className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem' }}>
                        <PlayCircle size={18} /> Resume Course
                      </button>
                    </div>
                  </div>

                  {/* Course Card 2 */}
                  <div style={{ border: '1px solid var(--border-color)', borderRadius: '16px', overflow: 'hidden', backgroundColor: 'var(--bg-color)', transition: 'transform 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
                    <div style={{ height: '160px', background: 'linear-gradient(45deg, #166534, #22c55e)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      <Video size={48} color="rgba(255,255,255,0.3)" />
                      <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.75rem', backdropFilter: 'blur(4px)' }}>5 Modules</div>
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#22c55e', textTransform: 'uppercase' }}>Renewables</span>
                        <Award size={16} color="var(--text-secondary)" />
                      </div>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', lineHeight: 1.4 }}>Solar Subsidies & ROI Strategy</h3>
                      
                      <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>
                          <span>Unstarted</span>
                          <span style={{ fontWeight: 600 }}>0%</span>
                        </div>
                        <div style={{ height: '6px', width: '100%', backgroundColor: 'var(--border-color)', borderRadius: '10px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: '0%', backgroundColor: '#22c55e', borderRadius: '10px' }}></div>
                        </div>
                      </div>

                      <button className="btn btn-outline" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem' }}>
                        Start Course <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPortal;
