import { Link } from 'react-router-dom';
import { Briefcase, Mail, Phone, MapPin } from 'lucide-react';
import { memo } from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container grid footer-grid">
        <div className="footer-brand">
          <Link to="/" className="navbar-logo footer-logo">
            <Briefcase className="logo-icon" />
            <span>MoorConsultations</span>
          </Link>
          <p className="text-muted mt-4">
            A multi-sector consultancy providing premium services across construction, HR, finance, technology, events, healthcare, social care, and renewable energy.
          </p>
        </div>
        <div className="footer-links">
          <h4 className="footer-heading">Quick Links</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/sourcing">Product Sourcing</Link></li>
            <li><Link to="/admin">Admin Mockup</Link></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4 className="footer-heading">Contact Us</h4>
          <ul>
            <li><Phone size={16}/> +44 123 456 7890</li>
            <li><Mail size={16}/> contact@moorconsultations.co.uk</li>
            <li><MapPin size={16}/> 123 Business Avenue, London</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p className="text-center text-muted">&copy; {new Date().getFullYear()} MoorConsultations Ltd. All rights reserved. MVP Prototype.</p>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
