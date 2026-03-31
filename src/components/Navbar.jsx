import { Menu, X, Briefcase, ChevronDown } from 'lucide-react';
import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const NavLink = memo(({ to, children, className, onClick }) => {
  return (
    <Link to={to} onClick={onClick} className={className}>
      {children}
    </Link>
  );
});

NavLink.displayName = 'NavLink';

const Dropdown = memo(({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="nav-dropdown"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <button className="nav-dropdown-btn">
        {title} <ChevronDown size={14} className={`dropdown-icon ${isOpen ? 'open' : ''}`} />
      </button>
      <div className={`nav-dropdown-content ${isOpen ? 'show' : ''}`}>
        {children}
      </div>
    </div>
  );
});

Dropdown.displayName = 'Dropdown';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        <NavLink to="/" className="navbar-logo">
          <Briefcase className="logo-icon" />
          <span>MoorConsultations</span>
        </NavLink>
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X /> : <Menu />}
        </button>
        <nav className={`navbar-links ${isOpen ? 'open' : ''}`}>
          <NavLink to="/" onClick={close}>Home</NavLink>

          <Dropdown title="Solutions">
            <NavLink to="/services" onClick={close}>Advisory & Management</NavLink>
            <NavLink to="/careers" onClick={close}>Recruitment & Staffing</NavLink>
            <NavLink to="/sourcing" onClick={close}>Product Sourcing</NavLink>
          </Dropdown>

          <Dropdown title="Company">
            <NavLink to="/about" onClick={close}>About Us</NavLink>
            <NavLink to="/achievements" onClick={close}>Achievements</NavLink>
            <NavLink to="/profiles" onClick={close}>Expert Profiles</NavLink>
          </Dropdown>

          <NavLink to="/contact" onClick={close}>Contact</NavLink>
          <NavLink to="/portal" className="btn btn-outline btn-sm portal-btn" onClick={close}>Client Portal</NavLink>
          <NavLink to="/consultations" className="btn btn-primary btn-sm" onClick={close}>Book Consultation</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default memo(Navbar);
