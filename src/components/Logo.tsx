
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
    <div className={`font-bold flex items-center ${sizeClasses[size]} ${className} relative`}>
      <span className="text-[#FF9933] tracking-tight">Edu</span>
      <span className="text-[#138808] tracking-tight">Sense</span>
      <span className="absolute -bottom-1 w-full h-[2px] bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"></span>
    </div>
  );
};

export default Logo;
