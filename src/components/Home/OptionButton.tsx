import React from 'react';

interface OptionButtonProps {
  text: string;
  onClick: (option: string) => void; 
}

const OptionButton: React.FC<OptionButtonProps> = ({ text, onClick }) => {
  return (
    <button 
      onClick={() => onClick(text)} // <-- Pass text to onClick
      className="option-button transition-all text-xs text-gray-400 hover:scale-105"
    >
      {text}
    </button>
  );
};

export default OptionButton;
