
import React, { useState } from 'react';

const Home: React.FC = () => {
  const [name, setName] = useState<string>('');

  const handleStartChatClick = () => {
    localStorage.setItem('userName', name);
    alert(`Welcome, ${name}! Chat is ready.`);
    window.location.href = '/chat';
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Welcome to Chat App</h1>
        <input
          className="border rounded-md p-2 mb-4 w-full"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none"
          onClick={handleStartChatClick}
        >
          Start Chatting
        </button>
      </div>
    </div>
  );
};

export default Home;
