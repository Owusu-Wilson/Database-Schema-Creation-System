import React from 'react';
import { User, Bot } from 'lucide-react';

type Message = {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
};

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isAi = message.type === 'ai';
  
  return (
    <div className={`flex ${isAi ? 'text-white' : 'text-schema-gray'}`}>
      <div className="flex-shrink-0 mr-3">
        {isAi ? (
          <div className="w-8 h-8 rounded-full bg-schema-blue flex items-center justify-center">
            <Bot size={18} />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-schema-gray flex items-center justify-center">
            <User size={18} />
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold mb-1">
          {isAi ? 'schema AI' : 'You'}
        </div>
        <div className="text-sm whitespace-pre-line">
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;