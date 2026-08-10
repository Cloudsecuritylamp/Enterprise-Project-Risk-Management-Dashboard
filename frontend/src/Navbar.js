import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Risk Dashboard</h2>
      <div className="nav-links">
        <Link to="/risks">Risks</Link>
        <Link to="/new-risk">New Risk</Link>
        <Link to="/auditlogs">Audit Logs</Link>
      </div>
      <button className="logout-btn">Logout</button>
    </nav>
  );
}

export default Navbar;
