// Layout.js
import React, { useState } from 'react';
import LeftNav from '../Leftnav'; // Import your LeftNav component
import './Layout.css'

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`app-layout ${collapsed ? 'collapsed' : ''}`}>
      <LeftNav collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
