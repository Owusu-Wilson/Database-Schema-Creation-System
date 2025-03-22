import React from 'react';
import OptionButton from './OptionButton';

interface OptionRowProps {
  options: string[];
  delay: number;
  onSelect: (option: string) => void; // <-- Accept an onSelect prop
}

const OptionRow: React.FC<OptionRowProps> = ({ options, delay, onSelect }) => {
  return (
    <div className={`flex flex-wrap justify-center gap-3 mb-4 opacity-0 animate-fade-in animate-delay-${delay}`}>
      {options.map((option, index) => (
        <OptionButton 
          key={index} 
          text={option} 
          onClick={() => onSelect(option)} // <-- Call onSelect when clicked
        />
      ))}
    </div>
  );
};

export default OptionRow;
