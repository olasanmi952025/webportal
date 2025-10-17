import React, { type ReactNode } from 'react';

interface FormSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
  className = ""
}) => (
  <div className={`relative border border-gray-300 rounded-lg p-4 bg-white shadow-sm ${className}`}>
    {title && (
      <div className="absolute -top-3 left-0 bg-white px-2 pt-1 rounded-t-md">

        <h3 className="text-sm font-semibold text-gray-800  tracking-wide">
          {title}
        </h3>

      </div>
    )}
    <div className="pt-2">
      {children}
    </div>
  </div>
);


export default FormSection;