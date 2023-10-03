import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton'; // Import IconButton
import LogoutIcon from '@mui/icons-material/Logout';
import './Leftnav.css';

const LeftNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogOut = () => {
    localStorage.clear();
    navigate('/login');
  };

  const categories = [
    { name: "Create Todo", link: "/CreateTodo" },
    { name: "All Todos", link: "/" },
    { name: "Daily Todos", link: "/DailyTodos" },
    { name: "Priority Todos", link: "/PriorityTodos" },
    { name: "Work Todos", link: "/WorkTodos" },
    { name: "Project Todos", link: "/ProjectTodos" },
    { name: "Personal Todos", link: "/PersonalTodos" },
    { name: "Completed Todos", link: "/completedTodos" },
  ];

  return (
    <div className={`left-nav ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar">
        <div className="toggle-button" onClick={toggleSidebar}>
          {!collapsed ? '◄' : '►'}
        </div>
        <ul className="nav-links">
          {categories.map((category, index) => (
            <li key={index}>
              <Link to={category.link}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ display: 'flex', position: 'absolute', marginTop: '40rem', color: '#FFFFFF' }}>
        <IconButton
          color="inherit"
          onClick={handleLogOut}
          style={{ backgroundColor: 'transparent', border: 'none' }}
        >
          <LogoutIcon />
        </IconButton>
        <h4>Log Out</h4>
      </div>
    </div>
  );
};

export default LeftNav;
