import React from 'react';
import { DatePicker } from '../../ui/atoms/DatePicker';
import { Label } from '../../ui/atoms/Label';
import { validateDateRange } from '../../utils';

interface DateRangeFilterProps {
  fechaDesde: string;
  fechaHasta: string;
  onFechaDesdeChange: (value: string) => void;
  onFechaHastaChange: (value: string) => void;
  labelDesde?: string;
  labelHasta?: string;
  showError?: boolean;
  className?: string;
}

/**
 * Componente reutilizable para filtros de rango de fechas
 * Incluye validación automática del rango
 */
export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  fechaDesde,
  fechaHasta,
  onFechaDesdeChange,
  onFechaHastaChange,
  labelDesde = 'Fecha Desde:',
  labelHasta = 'Fecha Hasta:',
  showError = true,
  className = ''
}) => {
  const hasError = showError && fechaDesde && fechaHasta && !validateDateRange(fechaDesde, fechaHasta);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      <div className="flex flex-col">
        <Label htmlFor="fecha-desde" className="text-white mb-2">
          {labelDesde}
        </Label>
        <DatePicker
          value={fechaDesde}
          onChange={onFechaDesdeChange}
          placeholder="dd/MM/yyyy"
          className={`w-full ${hasError ? 'border-red-500' : ''}`}
        />
      </div>
      
      <div className="flex flex-col">
        <Label htmlFor="fecha-hasta" className="text-white mb-2">
          {labelHasta}
        </Label>
        <DatePicker
          value={fechaHasta}
          onChange={onFechaHastaChange}
          placeholder="dd/MM/yyyy"
          className={`w-full ${hasError ? 'border-red-500' : ''}`}
        />
      </div>
      
      {hasError && (
        <div className="col-span-full">
          <p className="text-red-300 text-sm">
            La fecha desde debe ser menor o igual a la fecha hasta
          </p>
        </div>
      )}
    </div>
  );
};

