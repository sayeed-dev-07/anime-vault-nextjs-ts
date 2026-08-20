import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Spinner = ({ size = 'md', className = '' }: SpinnerProps) => {
  // Map size props to exact Tailwind dimensions and border thicknesses
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-[3px]',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4',
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      {/* We use a relative container to stack the two rings perfectly on top of each other */}
      <div className={`relative flex items-center justify-center ${sizes[size].split(' ')[0]} ${sizes[size].split(' ')[1]}`}>
        
        {/* Background Track (Faint outline) */}
        <div 
          className={`absolute inset-0 rounded-full border-muted/30 dark:border-muted/20 ${sizes[size].split(' ')[2]}`} 
        />
        
        {/* Spinning Highlight (Crimson) */}
        <div 
          className={`absolute inset-0 rounded-full border-transparent border-t-[crimson] animate-spin ${sizes[size].split(' ')[2]}`} 
        />
        
      </div>
    </div>
  );
};

export default Spinner;