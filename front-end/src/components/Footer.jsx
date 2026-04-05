// src/components/Footer.jsx
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-logo">Water Supply Monitor</span>
          <p className="footer-tagline">Monitoring water infrastructure for communities</p>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/introduction">Introduction</Link>
          <Link to="/map">Map</Link>
          <Link to="/statistics">Statistics</Link>
          <Link to="/report_contact">Contact Us</Link>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Water Supply Monitor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
