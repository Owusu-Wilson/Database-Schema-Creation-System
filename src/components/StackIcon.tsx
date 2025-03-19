import React, { useState } from 'react';

// Define the props interface
interface StackIconProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Accepts any React component (e.g., icons)
  toolbarText: string; // Text to display in the toolbar
  iconSize?: string; // Optional: Custom size for the icon (default: 'w-8 h-8')
  iconColor?: string; // Optional: Custom color for the icon (default: 'text-gray-600')
  toolbarPosition?: 'top' | 'bottom' | 'left' | 'right'; // Optional: Position of the toolbar (default: 'right')
}

const StackIcon: React.FC<StackIconProps> = ({
  icon: Icon,
  toolbarText,
  iconSize = 'w-8 h-8',
  iconColor = 'text-gray-600',
  toolbarPosition = 'bottom',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine toolbar position
  const toolbarClasses = {
    right: 'left-10 top-0',
    left: 'right-10 top-0',
    top: 'bottom-10 left-0',
    bottom: '',
  };

  return (
    <div className="flex flex-col gap-2 h-10 items-center">
      {/* Icon */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Icon className={`${iconSize} ${iconColor} hover:text-gray-500 cursor-pointer`} />
      </div>

      {/* Toolbar (conditionally rendered) */}
      {isHovered && (
    
          <p className={`${toolbarClasses[toolbarPosition]}  bg-transparent border border-schema-gray text-white self-center rounded-md px-2 py-1 text-xs transition-all duration-300`}>
            {toolbarText}
          </p>
        
      )}
    </div>
  );
};

export default StackIcon;