import React, { type ReactNode } from 'react';

interface FormGridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
}

 const FormGrid: React.FC<FormGridProps> = ({ children, cols = 2 }) => {
  const colsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };
  
  return (
    <div className={`grid ${colsClass[cols]} gap-4`}>
      {children}
    </div>
  );
};


export default FormGrid;