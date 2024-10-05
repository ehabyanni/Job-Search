'use client'
import React from 'react';
import './style.scss';
import { Link, NavLink, Route } from 'react-router-dom';

function Navbar() {
  return (
    <div id='navbar' className="navbar">
      <h1>JobsNow</h1>
      <ul>
        <li>
          <NavLink to="/jobs" className={({ isActive }) => {
            return isActive ? "active-link" : "";
          }}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/jobs/search">Search</NavLink>
        </li>
        <li>
          <NavLink to="/history">History</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
