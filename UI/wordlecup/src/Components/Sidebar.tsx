
import React, { useState } from 'react';
import { FaUsers } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const onlineUsers = ['User1', 'User2', 'User3'];

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`bg-teal-500 text-white h-screen flex flex-col items-center justify-center transition-width duration-300 ${isSidebarOpen ? 'w-48' : 'w-16'}`}>
      <button className="text-xl mb-4" onClick={toggleSidebar}>
        <FaUsers />
      </button>

      {isSidebarOpen && (
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Online Users</h2>
          <ul>
            {onlineUsers.map((user, index) => (
              <li key={index} className="text-gray-600 mb-1">{user}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
