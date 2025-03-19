import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Send, Link, Paperclip } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Bolt, your AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        text: "I've created a modern AI helper interface with the following features:\n\n1. Clean, minimal design with a professional look\n2. Message history with distinct user and AI messages\n3. Loading states and animations\n4. Responsive layout that works on all screen sizes\n5. Smooth scrolling to the latest messages\n6. Icon integration using lucide-react\n7. Input form with validation and proper button states",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      {/* Header */}
      <header className="bg-[#1A1A1A] border-b border-gray-800 p-4 flex justify-between items-center">
        <RouterLink to="/" className="text-2xl font-bold">bolt</RouterLink>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600">
            Deploy
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Chat Section */}
        <div className="w-1/2 border-r border-gray-800 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.sender === 'user'
                      ? 'bg-blue-500'
                      : 'bg-[#1A1A1A]'
                  }`}
                >
                  <pre className="whitespace-pre-wrap font-sans">{message.text}</pre>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#1A1A1A] rounded-lg p-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
            <div className="bg-[#1A1A1A] rounded-lg p-4">
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="How can Bolt help you today?"
                  className="flex-1 bg-transparent focus:outline-none"
                  disabled={isLoading}
                />
                <div className="flex gap-2">
                  <button type="button" className="p-2 hover:bg-gray-800 rounded">
                    <Link className="w-5 h-5" />
                  </button>
                  <button type="button" className="p-2 hover:bg-gray-800 rounded">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="p-2 bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Output Section */}
        <div className="w-1/2 p-4 bg-[#0D0D0D]">
          <div className="bg-[#1A1A1A] rounded-lg p-4 h-full">
            <h2 className="text-xl font-semibold mb-4">Output</h2>
            <div className="space-y-4">
              <p className="text-gray-400">
                The interface currently simulates AI responses (with a 1-second delay). To make it fully functional, you would need to:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-400">
                <li>Connect it to an AI backend service (like OpenAI's API)</li>
                <li>Add proper error handling</li>
                <li>Implement message persistence</li>
                <li>Add authentication if needed</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;