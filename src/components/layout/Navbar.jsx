import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Moon, Sun, LayoutDashboard } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import "./Navbar.css";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Esc
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate(`/#${targetId}`);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "features", label: "Features" },
    { id: "help", label: "Help" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className={`public-navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <svg width="24" height="24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="20" fill="#0052cc"/>
            <rect x="25" y="30" width="15" height="40" rx="4" fill="#ffffff" />
            <rect x="45" y="20" width="15" height="50" rx="4" fill="#ffffff" fill-opacity="0.7" />
            <rect x="65" y="40" width="15" height="30" rx="4" fill="#ffffff" fill-opacity="0.4" />
          </svg>
          <span>FlowBoard</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar-links">
          {navLinks.map((link) => (
            <a 
              key={link.id} 
              href={`/#${link.id}`} 
              onClick={(e) => handleNavClick(e, link.id)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Right */}
        <div className="navbar-actions">
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <Link to="/overview" className="btn btn-primary cta-btn">
            Open Board
          </Link>
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)} />
        <nav className="mobile-menu-content">
          {navLinks.map((link) => (
            <a 
              key={link.id} 
              href={`/#${link.id}`} 
              onClick={(e) => handleNavClick(e, link.id)}
              className="mobile-nav-link"
            >
              {link.label}
            </a>
          ))}
          <div className="mobile-menu-divider" />
          <div className="mobile-menu-actions">
            <Link to="/overview" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setIsMobileMenuOpen(false)}>
              <LayoutDashboard size={18} style={{ marginRight: '8px' }} />
              Open Board
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
