import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Consultations from './pages/Consultations';
import UserPortal from './pages/UserPortal';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact';
import Achievements from './pages/Achievements';
import ExpertProfiles from './pages/ExpertProfiles';
import Careers from './pages/Careers';
import ProductSourcing from './pages/ProductSourcing';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="consultations" element={<Consultations />} />
        <Route path="portal" element={<UserPortal />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="contact" element={<Contact />} />
        <Route path="achievements" element={<Achievements />} />
        <Route path="profiles" element={<ExpertProfiles />} />
        <Route path="careers" element={<Careers />} />
        <Route path="sourcing" element={<ProductSourcing />} />
      </Route>
    </Routes>
  );
}

export default App;
