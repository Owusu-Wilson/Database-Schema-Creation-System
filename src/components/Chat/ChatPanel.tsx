import React, { useState, useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatInput from '@/components/Chat/ChatInput';
import ChatMessage from '@/components/Chat/ChatMessage';
import { Send, Terminal } from 'lucide-react';

type Message = {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
};

const ChatPanel = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "I've created a modern AI helper interface with the following features:\n\n1. Clean, minimal design with a professional look\n2. Message history with distinct user and AI messages\n3. Loading states and animations\n4. Responsive layout that works on all screen sizes\n5. Smooth scrolling to the latest messages\n6. Icon integration using lucide-react\n7. Input form with validation and proper button states\n\nThe interface currently simulates AI responses (with a 1-second delay). To make it fully functional, you would need to:\n\n1. Connect it to an AI backend service (like OpenAI's API)\n2. Add proper error handling\n3. Implement message persistence\n4. Add authentication if needed\n\nWould you like me to implement any of these additional features or make any adjustments to the current interface?",
      timestamp: new Date(),
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const addMessage = (content: string, type: 'user' | 'ai') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    addMessage(content, 'user');
    
    // Simulate AI response with loading state
    setLoading(true);
    setTimeout(() => {
      addMessage("This is a simulated AI response. Connect to a real AI service to get actual responses.", 'ai');
      setLoading(false);
    }, 1000);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen z-50 pt-10">


      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {messages.map((message) => (
            <ChatMessage 
              key={message.id} 
              message={message} 
            />
          ))}
          {loading && (
            <div className="flex space-x-2 items-center pl-10 animate-pulse">
              <div className="h-2 w-2 bg-schema-blue rounded-full"></div>
              <div className="h-2 w-2 bg-schema-blue rounded-full animation-delay-200"></div>
              <div className="h-2 w-2 bg-schema-blue rounded-full animation-delay-400"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-schema-gray">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatPanel;
