// src/components/NavBar.jsx
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">💧 Water Supply Monitor</div>

      <div className="navbar-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>Home</NavLink>
        <NavLink to="/introduction" className={({ isActive }) => (isActive ? "active-link" : "")}>Introduction</NavLink>
        <NavLink to="/map" className={({ isActive }) => (isActive ? "active-link" : "")}>Map</NavLink>
        <NavLink to="/statistics" className={({ isActive }) => (isActive ? "active-link" : "")}>Statistics</NavLink>
        <NavLink to="/report_contact" className={({ isActive }) => (isActive ? "active-link" : "")}>Contact Us</NavLink>
      </div>
    </nav>
  );
}

export default NavBar;