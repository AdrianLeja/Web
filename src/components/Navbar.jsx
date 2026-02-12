import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const location = useLocation();

  useEffect(() => {
    if (dark) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const toggleTheme = () => setDark(!dark);

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <nav className="navbar glass-panel">
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '1.5rem' }}>TravelPlan</h1>
      </Link>

      <div className="nav-links">
        <Link to="/" className={`nav-link ${isActive("/")}`}>Home</Link>
        <Link to="/plan" className={`nav-link ${isActive("/plan")}`}>My Plan</Link>

        <button
          onClick={toggleTheme}
          className="btn btn-secondary"
          aria-label="Toggle Theme"
        >
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}
