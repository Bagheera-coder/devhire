import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Sun, Moon, Menu, X, User } from 'lucide-react';
import { Button } from '../../ui/Button/Button';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find Jobs', path: '/jobs' },
    { name: 'Saved', path: '/saved' },
    { name: 'Applications', path: '/applications' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <Briefcase className={styles.logoIcon} />
          <span>DevHire</span>
        </Link>

        <div className={styles.navLinks}>
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`${styles.link} ${location.pathname === link.path ? styles.activeLink : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className={styles.actions}>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          
          <div className={styles.navLinks}>
             {isAuthenticated ? (
               <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                 <Link to="/profile">
                   <Button variant="ghost" size="icon">
                     <User size={20} />
                   </Button>
                 </Link>
                 <Button variant="outline" onClick={logout}>Logout</Button>
               </div>
             ) : (
               <Link to="/login">
                 <Button variant="primary">Login</Button>
               </Link>
             )}
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            className={styles.mobileMenuBtn}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`${styles.link} ${location.pathname === link.path ? styles.activeLink : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" style={{ width: '100%' }}>Profile</Button>
              </Link>
              <Button variant="primary" onClick={() => { logout(); setIsMobileMenuOpen(false); }} style={{ width: '100%' }}>Logout</Button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="primary" style={{ width: '100%' }}>Login</Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};
