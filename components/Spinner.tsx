import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Spinner = ({ size = 'md', className = '' }: SpinnerProps) => {
  // Map size props to exact Tailwind dimensions and border thicknesses.
  // Brutalist sizes are kept slightly tighter for a dense, mechanical feel.
  const sizes = {
    sm: 'w-3.5 h-3.5 border-[1.5px]',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-2',
    xl: 'w-14 h-14 border-[3px]',
  };

  const parts = sizes[size].split(' ');
  const widthHeight = `${parts[0]} ${parts[1]}`;
  const borderThickness = parts[2];

  return (
    <div className={`flex justify-center items-center ${className}`}>

      {/* Strict architectural square, replacing the generic circular ring */}
      <div className={`relative flex items-center justify-center ${widthHeight}`}>

        {/* Background Track (Faint geometric outline inheriting parent text color) */}
        <div
          className={`absolute inset-0 rounded-none border-current opacity-20 ${borderThickness}`}
        />

        {/* 
          Spinning Highlight 
          Uses a sharp crimson top edge, leaving the rest transparent to create the spin effect.
        */}
        <div
          className={`absolute inset-0 rounded-none border-transparent border-t-[crimson] animate-spin ${borderThickness}`}
        />

        {/* Inner static dot for the larger sizes to give it a 'radar/crosshair' feel */}
        {size !== 'sm' && (
          <div className="w-1.5 h-1.5 bg-[crimson]/50 rounded-none animate-pulse" />
        )}

      </div>
    </div>
  );
};

export default Spinner;