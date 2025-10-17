import React from 'react';

interface GovLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const GovLogo: React.FC<GovLogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Escudo chileno simplificado */}
      <div className="relative">
        <div className={`${sizeClasses[size]} bg-blue-500 rounded-lg flex items-center justify-center`}>
          <div className="w-3/4 h-3/4 bg-white rounded-full flex items-center justify-center">
            <div className="w-3/4 h-3/4 bg-blue-500 rounded-full flex items-center justify-center">
              <div className="w-3/4 h-3/4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="absolute -right-1 top-0 w-1/3 h-full bg-red-500 rounded-r-lg"></div>
      </div>
      
      {showText && (
        <div className="text-white">
          <h1 className={`${textSizeClasses[size]} font-bold`}>Gobierno de Chile</h1>
          <p className={`${size === 'sm' ? 'text-xs' : 'text-sm'} opacity-90`}>
            Aduana de Chile
          </p>
        </div>
      )}
    </div>
  );
};

export default GovLogo;
