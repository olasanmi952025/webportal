import React from 'react';
import { Button } from '../../ui/atoms/Button';

interface ResultsCardProps {
  title: string;
  count?: number;
  onBack: () => void;
  actions?: React.ReactNode;
  children: React.ReactNode;
  showBackButton?: boolean;
}

/**
 * Componente reutilizable para tarjetas de resultados
 * Incluye botón de volver, título y acciones opcionales
 */
export const ResultsCard: React.FC<ResultsCardProps> = ({
  title,
  count,
  onBack,
  actions,
  children,
  showBackButton = true
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Botón Volver */}
      {showBackButton && (
        <div className="flex justify-start mb-6">
          <Button
            onClick={onBack}
            variant="outline"
            className="border-[#A8B7C7] text-[#4A4A4A] hover:bg-[#EEEEEE] hover:border-[#8A8A8A] px-6 py-2 rounded-lg font-semibold transition-all duration-200"
          >
            ← Volver
          </Button>
        </div>
      )}

      {/* Header de resultados */}
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg sm:text-xl font-semibold text-[#111111] text-left">
            {title}{count !== undefined && `: ${count}`}
          </h2>
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
      </div>

      {/* Contenido */}
      {children}
    </div>
  );
};

