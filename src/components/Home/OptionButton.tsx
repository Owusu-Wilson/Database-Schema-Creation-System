import React from 'react';

interface OptionButtonProps {
  text: string;
}

const OptionButton: React.FC<OptionButtonProps> = ({ text }) => {
  return (
    <button className="option-button transition-all text-xs text-gray-400 hover:scale-105">
      {text}
    </button>
  );
};

export default OptionButton;
