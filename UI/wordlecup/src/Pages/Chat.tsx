import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar.tsx';
import ChatMessage from '../Components/Chatmessage.tsx';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001/messages');
    setSocket(ws);

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'userMessages') {
        setMessages(data.userMessages);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && inputMessage.trim() !== '') {
      const username = localStorage.getItem('username');
      const data = { type: 'sendMessage', username, message: inputMessage };
      socket.send(JSON.stringify(data));
      setInputMessage('');
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-grow p-4 overflow-y-auto bg-gray-100">
        <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-white">
        <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <ChatMessage key={index} user={msg.username} message={msg.message} />
            ))}
          </div>

          <div className="p-4 border-t flex items-center">
            <input
              className="border rounded-md p-2 w-full focus:outline-none"
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-md ml-2"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
