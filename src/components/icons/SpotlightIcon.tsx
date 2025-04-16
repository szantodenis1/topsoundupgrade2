import React from 'react';

const SpotlightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    {/* Main spotlight body */}
    <path d="M8 8 L16 8 L16 13 L8 13 L8 8" />
    
    {/* Mount/handle */}
    <path d="M11 8 L11 6 L13 6 L13 8" />
    
    {/* Light beam */}
    <path d="M16 10.5 L19 12" />
    <path d="M8 10.5 L5 12" />
  </svg>
);

export default SpotlightIcon;