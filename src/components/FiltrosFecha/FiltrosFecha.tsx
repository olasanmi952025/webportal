import React from 'react';
import { Button } from '../../ui/atoms/Button';
import { DatePicker } from '../../ui/atoms/DatePicker';

interface FiltrosFechaProps {
  fechaInicio: string;
  fechaTermino: string;
  onFechaInicioChange: (fecha: string) => void;
  onFechaTerminoChange: (fecha: string) => void;
  onBuscar: () => void;
}

export const FiltrosFecha: React.FC<FiltrosFechaProps> = ({
  fechaInicio,
  fechaTermino,
  onFechaInicioChange,
  onFechaTerminoChange,
  onBuscar
}) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="flex-1">
          <DatePicker
            label="Fecha Inicio"
            value={fechaInicio}
            onChange={onFechaInicioChange}
            placeholder="[dd/MM/yyyy]"
            required
          />
        </div>
        
        <div className="flex-1">
          <DatePicker
            label="Fecha Término"
            value={fechaTermino}
            onChange={onFechaTerminoChange}
            placeholder="[dd/MM/yyyy]"
            required
          />
        </div>
        
        <div className="flex-1">
          <Button
            onClick={onBuscar}
            className="w-full bg-[#006FB3] hover:bg-[#005a9c] text-white px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all duration-200"
          >
            Manifiestos
          </Button>
        </div>
      </div>
    </div>
  );
};
