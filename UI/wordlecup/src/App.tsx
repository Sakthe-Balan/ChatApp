
import React, { useState, useEffect } from 'react';


const Home: React.FC = () => {
  const [name, setName] = useState<string>('');

 

  const handleStartChatClick = () => {
    try {
     localStorage.setItem('username', name);
     console.log(name);
      window.location.href = '/chat';  
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-green-100 via-green-200 to-green-300">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold mb-4 ">Welcome to Chat App</h1>
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
