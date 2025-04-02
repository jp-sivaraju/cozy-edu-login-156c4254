
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl',
  };

  return (
    <div className={`font-bold flex items-center ${sizeClasses[size]} ${className}`}>
      <span className="text-[#FF9933]">Edu</span>
      <span className="text-[#138808]">Sense</span>
    </div>
  );
};

export default Logo;
