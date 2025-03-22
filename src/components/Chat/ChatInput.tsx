import React, { useState } from "react";
import { ArrowUp } from "lucide-react";

interface ChatInputProps {
  value: string;
  setValue: (value: string) => void;
  onSubmit: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ value, setValue, onSubmit }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="w-full flex justify-center px-6 py-8 transition-all">
      <div className="w-full max-w-2xl flex items-center rounded-full border border-gray-200 bg-white shadow-sm overflow-hidden transition-all duration-300">
        <input
          type="text"
          placeholder="Ask anything"
          className="w-full h-16 py-3 px-6 outline-none text-gray-800 bg-transparent "
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          
        />
        <button
          disabled={!value}
          onClick={onSubmit}
          className="flex items-center justify-center p-2 mr-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
          aria-label="Submit"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
