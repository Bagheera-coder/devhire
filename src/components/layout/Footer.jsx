import { Link } from "react-router-dom";
import "./Footer.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="public-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1 */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo">
              <svg width="24" height="24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" rx="20" fill="#0052cc"/>
                <rect x="25" y="30" width="15" height="40" rx="4" fill="#ffffff" />
                <rect x="45" y="20" width="15" height="50" rx="4" fill="#ffffff" fill-opacity="0.7" />
                <rect x="65" y="40" width="15" height="30" rx="4" fill="#ffffff" fill-opacity="0.4" />
              </svg>
              <span>FlowBoard</span>
            </Link>
            <p className="footer-tagline">Plan. Track. Deliver.</p>
            <p className="footer-desc">
              A modern workspace for organizing projects, managing tasks, and keeping teams aligned.
            </p>
          </div>

          {/* Column 2 */}
          <div className="footer-col">
            <h4 className="footer-heading">Product</h4>
            <ul className="footer-links">
              <li><Link to="/overview">Overview</Link></li>
              <li><Link to="/board">Board</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/team">Team</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="footer-col">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><Link to="/#about">About</Link></li>
              <li><Link to="/#features">Features</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="footer-col">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li><Link to="/#help">Help Center</Link></li>
              <li><Link to="/#contact">Contact</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Column 5 */}
          <div className="footer-col">
            <h4 className="footer-heading">Connect</h4>
            <ul className="footer-links">
              <li><a href="mailto:kumarabhishek5968@gmail.com">kumarabhishek5968@gmail.com</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} FlowBoard. All rights reserved.
          </p>
          <p className="made-with">
            Made with <span role="img" aria-label="love">❤️</span> by Abhishek Kumar Yadav
          </p>
        </div>
      </div>
    </footer>
  );
}
