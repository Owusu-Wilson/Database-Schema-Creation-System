import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { Textarea } from '../ui/textarea';


interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative glass-panel rounded-lg">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="How can schema help you today?"
        className="resize-none bg-transparent border-none focus:outline-none focus:ring-0 text-white placeholder-gray-500 min-h-[60px]"
      />
      <div className="flex justify-between items-center px-3 py-2 border-t border-schema-gray">
        <button className="text-schema-light-gray hover:text-white transition-colors">
          <Paperclip size={18} />
        </button>
        <button 
          onClick={handleSendMessage}
          className="bg-schema-blue text-white rounded-full p-2 hover:bg-opacity-80 transition-colors"
          disabled={!message.trim()}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;