
import React from 'react';

interface ChatMessageProps {
  user: string;
  message: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ user, message }) => {
  return (
    <div className="mb-2">
      <div className="max-w-md p-3 bg-gray-200 text-gray-800 border rounded-lg border-gray-300">
        <strong>{user}:</strong> {message}
      </div>
    </div>
  );
};

export default ChatMessage;
