import React, { useState } from 'react';
import { FaUsers } from 'react-icons/fa'; 

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const onlineUsers = ['User1', 'User2', 'User3']; 

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="sidebar">
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FaUsers />
      </button>

      {isSidebarOpen && (
        <div className="online-users">
          <h2>Online Users</h2>
          <ul>
            {onlineUsers.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
