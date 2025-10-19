import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showDecorator?: boolean;
  decoratorColor?: string;
}

/**
 * Componente reutilizable para headers de página
 * Incluye título y franja decorativa
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  showDecorator = true,
  decoratorColor = 'from-[#006FB3] to-[#FE6565]'
}) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-2">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm text-[#4A4A4A] mb-2">
          {subtitle}
        </p>
      )}
      {showDecorator && (
        <div className={`mt-2 w-32 h-1.5 bg-gradient-to-r ${decoratorColor} rounded-full shadow-sm`}></div>
      )}
    </div>
  );
};

