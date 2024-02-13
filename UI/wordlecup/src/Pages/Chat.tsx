
import React from 'react';
import Sidebar from '../Components/Sidebar.tsx';
import ChatMessage from '../Components/Chatmessage.tsx';

const Chat: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-grow p-4 overflow-y-auto bg-gray-100">
        <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-white">
          <div className="flex-grow p-4 overflow-y-auto">
            <ChatMessage user="User1" message="Hello!" />
            <ChatMessage user="User2" message="Hi there!" />
            <ChatMessage user="User1" message="How are you?" />
            
          </div>

          <div className="p-4 border-t flex items-center">
            <input
              className="border rounded-md p-2 w-full focus:outline-none"
              type="text"
              placeholder="Type your message..."
            />
            <button className="bg-green-500 text-white py-2 px-4 rounded-md ml-2">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
