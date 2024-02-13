
import React from 'react';

interface ChatMessageProps {
  user: string;
  message: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ user, message }) => {
  return (
    <div className="mb-2">
      <strong>{user}:</strong> {message}
    </div>
  );
};

export default ChatMessage;
