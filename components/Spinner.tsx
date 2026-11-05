import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Spinner = ({ size = 'md', className = '' }: SpinnerProps) => {
  const sizes = {
    sm: 'w-5 h-4 border-2',
    md: 'w-9 h-7 border-2',
    lg: 'w-14 h-11 border-[3px]',
    xl: 'w-20 h-16 border-[3px]',
  };

  return (
    <div className={`flex items-center justify-center ${className}`} role="status">
      <div
        className={`manga-loader relative overflow-hidden border-foreground bg-card ${sizes[size]}`}
        aria-label="Loading"
      >
        <span className="manga-loader-sun absolute left-[42%] top-1/2 h-[32%] w-[18%] -translate-y-1/2 rounded-full bg-[#e6392d]" />
        <span className="manga-loader-line manga-loader-line-one absolute left-[-25%] top-[23%] h-[10%] w-[62%] bg-foreground" />
        <span className="manga-loader-line manga-loader-line-two absolute left-[-25%] top-[45%] h-[10%] w-[82%] bg-[#f9c846]" />
        <span className="manga-loader-line manga-loader-line-three absolute left-[-25%] top-[67%] h-[10%] w-[48%] bg-foreground" />
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
};

export default Spinner;
