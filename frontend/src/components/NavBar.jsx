// src/components/NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          CodeArena
        </Link>
      </div>
      <div className="nav-right">
        <Link to="/courses">Courses</Link>
        <Link to="/problems">Problems</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
};

export default NavBar;
