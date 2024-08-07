// components/Tooltip.tsx
import React, { useState, useRef } from 'react';

interface TooltipProps {
  content: React.ReactNode; // Accepts any valid React content
  children: React.ReactNode; // The element the tooltip will be attached to
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right'; // Default is 'top'
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  className = '',
  position = 'top',
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);

  return (
    <div 
      className={`${className} group relative inline-block`} // Added group class for Tailwind interaction
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip && (
        <div 
          className={`
            tooltip absolute z-10 p-2 rounded-md shadow-md bg-gray-800 text-white text-2xl
            ${position === 'top' && 'bottom-full -translate-y-1'}
            ${position === 'bottom' && 'top-full translate-y-1'}
            ${position === 'left' && 'right-full -translate-x-1'}
            ${position === 'right' && 'left-full translate-x-1'}
            group-hover:opacity-100 transition-opacity duration-300 opacity-0
          `}
          ref={tooltipRef}
          role="tooltip" // Added for accessibility and look
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;