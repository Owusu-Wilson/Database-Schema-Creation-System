import React from 'react';

const Announcement = () => {
  return (
    <div className="glass-panel inline-flex items-center gap-2 px-4 py-2 mx-auto mb-16 opacity-0 animate-fade-in animate-delay-100">
      <div className="flex items-center justify-center w-5 h-5 rounded-sm bg-gradient-to-r from-blue-400 to-purple-400">
        <span className="text-xs font-bold">F</span>
      </div>
      <p className="text-sm text-gray-200">New! Introducing Figma to Bolt</p>
    </div>
  );
};

export default Announcement;