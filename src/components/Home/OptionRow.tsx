import React from 'react';
import OptionButton from './OptionButton';

interface OptionRowProps {
  options: string[];
  delay: number;
}

const OptionRow: React.FC<OptionRowProps> = ({ options, delay }) => {
  return (
    <div className={`flex flex-wrap justify-center gap-3 mb-4 opacity-0 animate-fade-in animate-delay-${delay}`}>
      {options.map((option, index) => (
        <OptionButton key={index} text={option} />
      ))}
    </div>
  );
};

export default OptionRow;
