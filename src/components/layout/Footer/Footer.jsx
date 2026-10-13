import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MessageCircle, Mail, Globe } from 'lucide-react';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <Briefcase className={styles.logoIcon} />
              <span>DevHire</span>
            </Link>
            <p className={styles.tagline}>
              Your next opportunity starts here. Find the job you love with the best platform for tech professionals.
            </p>
          </div>
          
          <div>
            <h4 className={styles.colTitle}>Product</h4>
            <div className={styles.links}>
              <Link to="/jobs" className={styles.link}>Find Jobs</Link>
              <Link to="/saved" className={styles.link}>Saved Jobs</Link>
              <Link to="/applications" className={styles.link}>Application Tracker</Link>
            </div>
          </div>

          <div>
            <h4 className={styles.colTitle}>Company</h4>
            <div className={styles.links}>
              <Link to="/about" className={styles.link}>About</Link>
              <Link to="/contact" className={styles.link}>Contact</Link>
              <Link to="/careers" className={styles.link}>Careers</Link>
            </div>
          </div>

          <div>
            <h4 className={styles.colTitle}>Resources</h4>
            <div className={styles.links}>
              <Link to="/help" className={styles.link}>Help Center</Link>
              <Link to="/privacy" className={styles.link}>Privacy Policy</Link>
              <Link to="/terms" className={styles.link}>Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} DevHire. All rights reserved.
          </p>
          <div className={styles.social}>
            <a href="#" className={styles.socialLink} aria-label="Social">
              <MessageCircle size={20} />
            </a>
            <a href="#" className={styles.socialLink} aria-label="Email">
              <Mail size={20} />
            </a>
            <a href="#" className={styles.socialLink} aria-label="Website">
              <Globe size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
