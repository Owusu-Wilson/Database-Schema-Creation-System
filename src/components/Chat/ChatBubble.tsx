import React from 'react';
import { User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { ChatMessage } from '@/types';


interface ChatMessageProps {
  message: ChatMessage;
}

const ChatBubble = ({ message }: ChatMessageProps) => {
  const isAi = message.type === 'ai';
  
  return (
    <div className='flex'>
      <div className="flex-shrink-0 mr-3">
        {isAi ? (
          
          <div className=" max-w-3xl mt-5  text-md flex items-center rounded-lg  text-black bg-transparent py-2">
              {JSON.parse(message.content).response}
              {message.content}
          </div>
          
        ) :
         (
          <div className="max-w-3xl mt-5 text-md flex items-center rounded-2xl  bg-[#e8e8e890] text-black px-3 py-2">
              {message.content}
          </div>
        )}
      </div>
      
    </div>
  );
};

export default ChatBubble;