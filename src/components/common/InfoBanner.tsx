import React from 'react';

interface InfoBannerProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
  variant?: 'info' | 'warning' | 'success' | 'error';
}

/**
 * Componente reutilizable para banners informativos
 */
export const InfoBanner: React.FC<InfoBannerProps> = ({
  title,
  message,
  icon,
  variant = 'info'
}) => {
  const variantStyles = {
    info: 'from-[#006FB3] to-[#FE6565]',
    warning: 'from-[#FFA11B] to-[#E0701E]',
    success: 'from-[#2D717C] to-[#006FB3]',
    error: 'from-[#FE6565] to-[#E0701E]'
  };

  const defaultIcon = (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <div className={`bg-gradient-to-r ${variantStyles[variant]} rounded-lg shadow-sm p-4 mb-6`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {icon || defaultIcon}
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{title}</h3>
            <p className="text-white text-xs opacity-90">{message}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white bg-opacity-50 rounded-full"></div>
          <div className="w-2 h-2 bg-white bg-opacity-25 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

