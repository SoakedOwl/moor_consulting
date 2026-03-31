import { useState } from 'react';
import { LayoutDashboard, Users, Clock, Briefcase, FileText, Settings, Search, Bell, MoreVertical, Edit, Trash2, Mail, Download, Filter, Plus, CreditCard } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const navBtnStyle = (isActive) => ({
    display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.85rem 1.25rem',
    borderRadius: '12px', backgroundColor: isActive ? 'var(--primary-color)' : 'transparent',
    color: isActive ? 'white' : '#94a3b8', border: 'none', cursor: 'pointer',
    textAlign: 'left', width: '100%', fontWeight: 500, fontSize: '0.95rem',
    transition: 'all 0.2s ease', marginBottom: '0.5rem'
  });

  return (
    <div className="admin-dashboard bg-light animate-fade-in" style={{ display: 'flex', height: '100vh', backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
      
      {/* Sidebar */}
      <aside style={{ width: '280px', backgroundColor: '#0f172a', padding: '2rem 1.5rem', flexShrink: 0, overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem', paddingLeft: '0.5rem' }}>
          <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--primary-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: 800 }}>M</span>
          </div>
          <h2 style={{ color: 'white', fontSize: '1.25rem', margin: 0 }}>Moor Admin</h2>
        </div>
        
        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b', paddingLeft: '1rem', marginBottom: '1rem', fontWeight: 600 }}>Main Menu</p>
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          <button onClick={() => setActiveTab('overview')} style={navBtnStyle(activeTab === 'overview')}><LayoutDashboard size={18} /> Dashboard Overview</button>
          <button onClick={() => setActiveTab('users')} style={navBtnStyle(activeTab === 'users')}><Users size={18} /> Client & Accounts</button>
          <button onClick={() => setActiveTab('enquiries')} style={navBtnStyle(activeTab === 'enquiries')}><Clock size={18} /> Active Consultations</button>
        </nav>

        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b', paddingLeft: '1rem', marginBottom: '1rem', marginTop: '2rem', fontWeight: 600 }}>Workflows</p>
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          <button onClick={() => setActiveTab('applications')} style={navBtnStyle(activeTab === 'applications')}><Briefcase size={18} /> Staffing & Recruitment <span style={{ marginLeft: 'auto', background: '#ef4444', color: 'white', fontSize: '0.7rem', padding: '0.1rem 0.5rem', borderRadius: '50px' }}>3</span></button>
          <button onClick={() => setActiveTab('quotes')} style={navBtnStyle(activeTab === 'quotes')}><FileText size={18} /> Sourcing & Procurement</button>
        </nav>

        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b', paddingLeft: '1rem', marginBottom: '1rem', marginTop: '2rem', fontWeight: 600 }}>System</p>
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          <button onClick={() => setActiveTab('settings')} style={navBtnStyle(activeTab === 'settings')}><Settings size={18} /> Platform Settings</button>
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '4rem' }}>
          <div style={{ padding: '1.5rem', backgroundColor: '#1e293b', borderRadius: '16px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#0284c7', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>AZ</div>
              <div>
                <p style={{ margin: 0, color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>Admin Zaid</p>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.8rem' }}>Superadmin</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flexGrow: 1, padding: '2.5rem', overflowY: 'auto' }}>
        
        {/* Top Navbar */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', margin: 0, color: '#0f172a' }}>Platform Operations</h1>
            <p className="text-muted" style={{ margin: 0, fontSize: '0.95rem' }}>Manage users, leads, and operational workflows.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ position: 'relative' }}>
              <input type="text" placeholder="Search entire platform..." style={{ width: '300px', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '50px', border: '1px solid #cbd5e1', backgroundColor: 'white', outline: 'none' }} />
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            </div>
            <div style={{ position: 'relative', cursor: 'pointer', padding: '0.5rem', backgroundColor: 'white', borderRadius: '50%', border: '1px solid #cbd5e1' }}>
              <Bell size={20} color="#475569" />
              <div style={{ position: 'absolute', top: '2px', right: '4px', width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%' }}></div>
            </div>
          </div>
        </header>

        <div key={activeTab} className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
          
          {/* ====== OVERVIEW TAB ====== */}
          {activeTab === 'overview' && (
            <div>
              {/* Metric Cards */}
              <div className="grid mb-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                <div style={{ backgroundColor: 'white', padding: '1.75rem', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <p className="text-muted mb-0" style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Revenue (MTD)</p>
                    <div style={{ padding: '0.5rem', backgroundColor: '#e0f2fe', borderRadius: '8px', color: '#0284c7' }}><CreditCard size={20}/></div>
                  </div>
                  <h3 style={{ fontSize: '2.5rem', margin: 0 }}>£42,850</h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#16a34a', fontWeight: 500, marginTop: '0.5rem' }}>↑ +14.2% from last month</p>
                </div>
                <div style={{ backgroundColor: 'white', padding: '1.75rem', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <p className="text-muted mb-0" style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Active Clients</p>
                    <div style={{ padding: '0.5rem', backgroundColor: '#f3e8ff', borderRadius: '8px', color: '#9333ea' }}><Users size={20}/></div>
                  </div>
                  <h3 style={{ fontSize: '2.5rem', margin: 0 }}>2,841</h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#16a34a', fontWeight: 500, marginTop: '0.5rem' }}>↑ 12 new this week</p>
                </div>
                <div style={{ backgroundColor: 'white', padding: '1.75rem', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <p className="text-muted mb-0" style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Open Staffing Req</p>
                    <div style={{ padding: '0.5rem', backgroundColor: '#fef3c7', borderRadius: '8px', color: '#d97706' }}><Briefcase size={20}/></div>
                  </div>
                  <h3 style={{ fontSize: '2.5rem', margin: 0 }}>24</h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#ef4444', fontWeight: 500, marginTop: '0.5rem' }}>6 requiring urgent attention</p>
                </div>
                <div style={{ backgroundColor: 'white', padding: '1.75rem', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <p className="text-muted mb-0" style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pending Solar Quotes</p>
                    <div style={{ padding: '0.5rem', backgroundColor: '#dcfce7', borderRadius: '8px', color: '#16a34a' }}><FileText size={20}/></div>
                  </div>
                  <h3 style={{ fontSize: '2.5rem', margin: 0 }}>8</h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', fontWeight: 500, marginTop: '0.5rem' }}>Valued at approx £112k</p>
                </div>
              </div>
            </div>
          )}

          {/* ====== USERS TAB ====== */}
          {activeTab === 'users' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ margin: 0 }}>Client & Account Directory</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'white' }}><Filter size={16}/> Filter</button>
                  <button className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plus size={16}/> Add Client</button>
                </div>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <tr>
                      <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.85rem', textTransform: 'uppercase' }}>Client Name</th>
                      <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.85rem', textTransform: 'uppercase' }}>Company</th>
                      <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.85rem', textTransform: 'uppercase' }}>Subscription</th>
                      <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.85rem', textTransform: 'uppercase' }}>Status</th>
                      <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.85rem', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'John Doe', email: 'john@techsphere.com', comp: 'TechSphere Group', sub: 'Enterprise Elite', status: 'Active' },
                      { name: 'Alice Smith', email: 'alice@buildright.co.uk', comp: 'BuildRight Construction', sub: 'Consulting Pro', status: 'Active' },
                      { name: 'Marcus Johnson', email: 'marcus@solarsource.com', comp: 'Solar Source Inc.', sub: 'Pay-as-you-go', status: 'Inactive' },
                      { name: 'Emma Davis', email: 'emma@healthedu.org', comp: 'Health Edu Trust', sub: 'Enterprise Elite', status: 'Active' },
                    ].map((user, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: 'white' }}>
                        <td style={{ padding: '1rem 1.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#475569' }}>{user.name.charAt(0)}</div>
                            <div>
                              <p style={{ margin: 0, fontWeight: 600, color: '#0f172a' }}>{user.name}</p>
                              <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '1rem 1.5rem', color: '#475569', fontWeight: 500 }}>{user.comp}</td>
                        <td style={{ padding: '1rem 1.5rem' }}>
                          <span style={{ backgroundColor: user.sub === 'Enterprise Elite' ? '#ede9fe' : '#f1f5f9', color: user.sub === 'Enterprise Elite' ? '#6d28d9' : '#475569', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600 }}>{user.sub}</span>
                        </td>
                        <td style={{ padding: '1rem 1.5rem' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: user.status === 'Active' ? '#16a34a' : '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: user.status === 'Active' ? '#22c55e' : '#cbd5e1' }}></span> {user.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', color: '#94a3b8' }}><MoreVertical size={18}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ====== ENQUIRIES & APPLICATIONS BOARD ====== */}
          {(activeTab === 'enquiries' || activeTab === 'applications' || activeTab === 'quotes') && (
            <div>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ margin: 0, textTransform: 'capitalize' }}>{activeTab} Workflow</h2>
                <button className="btn btn-outline btn-sm" style={{ backgroundColor: 'white' }}><Download size={16} className="mr-2" style={{ marginRight: '0.5rem' }}/> Export CSV</button>
              </div>

              {/* Kanban Style Layout */}
              <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem' }}>
                
                {/* Column 1: New */}
                <div style={{ width: '350px', flexShrink: 0, backgroundColor: '#f8fafc', borderRadius: '16px', padding: '1rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0 0.5rem' }}>
                    <h3 style={{ fontSize: '1rem', margin: 0, color: '#334155' }}>New Requests <span style={{ backgroundColor: '#cbd5e1', color: '#334155', padding: '0.1rem 0.5rem', borderRadius: '50px', fontSize: '0.75rem', marginLeft: '0.5rem' }}>3</span></h3>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}><MoreVertical size={16} color="#94a3b8"/></button>
                  </div>
                  
                  {/* Card 1 */}
                  <div style={{ backgroundColor: 'white', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', marginBottom: '1rem', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#0284c7', backgroundColor: '#e0f2fe', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{activeTab === 'applications' ? 'HR Staffing' : 'Advisory Support'}</span>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>1h ago</span>
                    </div>
                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem', color: '#0f172a' }}>{activeTab === 'applications' ? 'Senior Risk Analyst (x2)' : 'Cross-Sector Risk Assessment'}</h4>
                    <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>Requested by Acme Corp. Looking to fulfill role within 30 days...</p>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#64748b', backgroundColor: '#f1f5f9', padding: '0.3rem 0.6rem', borderRadius: '6px' }}><FileText size={12}/> 2 Docs Attached</span>
                    </div>
                  </div>
                </div>

                {/* Column 2: In Review */}
                <div style={{ width: '350px', flexShrink: 0, backgroundColor: '#f8fafc', borderRadius: '16px', padding: '1rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0 0.5rem' }}>
                    <h3 style={{ fontSize: '1rem', margin: 0, color: '#334155' }}>In Review <span style={{ backgroundColor: '#cbd5e1', color: '#334155', padding: '0.1rem 0.5rem', borderRadius: '50px', fontSize: '0.75rem', marginLeft: '0.5rem' }}>1</span></h3>
                  </div>
                  
                  {/* Card 1 */}
                  <div style={{ backgroundColor: 'white', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', marginBottom: '1rem', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#d97706', backgroundColor: '#fef3c7', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{activeTab === 'applications' ? 'Technology' : 'Solar Procurement'}</span>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Yesterday</span>
                    </div>
                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem', color: '#0f172a' }}>{activeTab === 'applications' ? 'Lead Software Engineer' : '500kW Inverter Procurement'}</h4>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#0284c7', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold' }}>AZ</div>
                      <span style={{ fontSize: '0.8rem', color: '#64748b', alignSelf: 'center' }}>Assigned to Zaid</span>
                    </div>
                  </div>
                </div>

                {/* Column 3: Processing / Closed */}
                <div style={{ width: '350px', flexShrink: 0, backgroundColor: '#f8fafc', borderRadius: '16px', padding: '1rem', border: '1px dashed #cbd5e1', opacity: 0.7 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0 0.5rem' }}>
                    <h3 style={{ fontSize: '1rem', margin: 0, color: '#64748b' }}>Action Required / Processing</h3>
                  </div>
                  <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                    <p style={{ margin: 0, fontSize: '0.85rem' }}>Drag drop items here to update their status.</p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ====== SETTINGS TAB ====== */}
          {activeTab === 'settings' && (
             <div style={{ maxWidth: '800px' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>Platform Settings</h2>
                
                <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                  <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>Automated Email Receipts</h3>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Send confirmation emails to users when they submit forms.</p>
                    </div>
                    <div style={{ width: '48px', height: '24px', backgroundColor: '#22c55e', borderRadius: '12px', position: 'relative' }}>
                      <div style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
                    </div>
                  </div>

                  <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>Storage Bucket Limits</h3>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Enforce a 25MB maximum upload limit for documents across all endpoints.</p>
                    </div>
                    <div style={{ width: '48px', height: '24px', backgroundColor: '#e2e8f0', borderRadius: '12px', position: 'relative' }}>
                      <div style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px' }}></div>
                    </div>
                  </div>

                  <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>LMS Integration Keys</h3>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Manage API secrets for the E-Learning headless training system.</p>
                    </div>
                    <button className="btn btn-outline btn-sm">Manage Secrets</button>
                  </div>
                </div>
             </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;
