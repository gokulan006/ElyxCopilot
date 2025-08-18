import React, { useState } from 'react';

interface TooltipProps {
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ children }) => {
  const [show, setShow] = useState(false);
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {show && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 z-10 min-w-max">
          <div className="bg-white shadow-xl rounded-lg p-3 border border-gray-200">
            {children}
          </div>
          <div className="absolute top-full left-1/2 w-4 h-4 bg-white border-r border-b border-gray-200 transform -translate-x-1/2 -translate-y-2 rotate-45"></div>
        </div>
      )}
      <div>{/* This is where the trigger element will be placed */}</div>
    </div>
  );
};

export default Tooltip;
