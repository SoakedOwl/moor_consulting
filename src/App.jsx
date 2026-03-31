import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';

// Lazy load non-critical pages
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Consultations = lazy(() => import('./pages/Consultations'));
const UserPortal = lazy(() => import('./pages/UserPortal'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Contact = lazy(() => import('./pages/Contact'));
const Achievements = lazy(() => import('./pages/Achievements'));
const ExpertProfiles = lazy(() => import('./pages/ExpertProfiles'));
const Careers = lazy(() => import('./pages/Careers'));
const ProductSourcing = lazy(() => import('./pages/ProductSourcing'));

// Simple loading component
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    fontSize: '1.2rem',
    color: 'var(--text-secondary)'
  }}>
    Loading...
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
        <Route path="services" element={<Suspense fallback={<PageLoader />}><Services /></Suspense>} />
        <Route path="consultations" element={<Suspense fallback={<PageLoader />}><Consultations /></Suspense>} />
        <Route path="portal" element={<Suspense fallback={<PageLoader />}><UserPortal /></Suspense>} />
        <Route path="admin" element={<Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense>} />
        <Route path="contact" element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>} />
        <Route path="achievements" element={<Suspense fallback={<PageLoader />}><Achievements /></Suspense>} />
        <Route path="profiles" element={<Suspense fallback={<PageLoader />}><ExpertProfiles /></Suspense>} />
        <Route path="careers" element={<Suspense fallback={<PageLoader />}><Careers /></Suspense>} />
        <Route path="sourcing" element={<Suspense fallback={<PageLoader />}><ProductSourcing /></Suspense>} />
      </Route>
    </Routes>
  );
}

export default App;
