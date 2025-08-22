import React from "react";
import { NavLink } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Sidebar.css';

function Sidebar({ adminName }) {
  const dummyValue = 75;

  return (
    <aside className="sidebar">
      <div className="welcome-section">
        <h3>Welcome, {adminName}</h3>
        <div className="performance-circle">
          <CircularProgressbar
            value={dummyValue}
            text={`${dummyValue}%`}
            styles={buildStyles({
              pathColor: '#2563eb',
              textColor: '#2563eb',
              trailColor: '#dbeafe',
              textSize: '16px',
            })}
          />
        </div>
        <p>App Performance</p>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
        <NavLink to="/admin/instructors" className={({ isActive }) => isActive ? 'active' : ''}>Instructors</NavLink>
        <NavLink to="/admin/users" className={({ isActive }) => isActive ? 'active' : ''}>Users</NavLink>
        <NavLink to="/admin/profile" className={({ isActive }) => isActive ? 'active' : ''}>Profile</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
