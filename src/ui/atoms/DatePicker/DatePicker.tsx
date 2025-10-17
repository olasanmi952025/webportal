import React, { useState, useRef, useEffect } from 'react';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  min?: string;
  max?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = '[dd/MM/yyyy]',
  label,
  className = '',
  disabled = false,
  required = false,
  min,
  max
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Formatear fecha para mostrar
  const formatDateForDisplay = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Convertir string a Date
  const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    
    // Si viene en formato ISO (YYYY-MM-DD)
    if (dateString.includes('-')) {
      return new Date(dateString + 'T00:00:00');
    }
    
    // Si viene en formato DD/MM/YYYY
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/');
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }
    
    return null;
  };

  // Convertir Date a formato ISO para el input hidden
  const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Inicializar valores
  useEffect(() => {
    const date = parseDate(value);
    if (date) {
      setSelectedDate(date);
      setDisplayValue(formatDateForDisplay(date));
      setCurrentMonth(new Date(date.getFullYear(), date.getMonth()));
    } else {
      setSelectedDate(null);
      setDisplayValue('');
    }
  }, [value]);

  // Manejar cambio de fecha
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setDisplayValue(formatDateForDisplay(date));
    onChange(formatDateForInput(date));
    setIsOpen(false);
  };

  // Generar días del mes
  const generateDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Días del mes anterior
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevDate = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push(
        <button
          key={`prev-${i}`}
          className="w-8 h-8 text-gray-400 hover:bg-gray-100 rounded text-sm"
          onClick={() => setCurrentMonth(new Date(year, month - 1))}
        >
          {prevDate.getDate()}
        </button>
      );
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = selectedDate && 
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear();
      
      const isToday = date.toDateString() === new Date().toDateString();
      const isDisabled = Boolean((min && date < parseDate(min)!) || (max && date > parseDate(max)!));

      days.push(
        <button
          key={day}
          className={`w-8 h-8 rounded text-sm transition-colors ${
            isSelected
              ? 'bg-blue-600 text-white'
              : isToday
              ? 'bg-blue-100 text-blue-600 font-semibold'
              : isDisabled
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => !isDisabled && handleDateSelect(date)}
          disabled={isDisabled}
        >
          {day}
        </button>
      );
    }

    // Días del mes siguiente
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push(
        <button
          key={`next-${day}`}
          className="w-8 h-8 text-gray-400 hover:bg-gray-100 rounded text-sm"
          onClick={() => setCurrentMonth(new Date(year, month + 1))}
        >
          {nextDate.getDate()}
        </button>
      );
    }

    return days;
  };

  // Nombres de los meses
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Nombres de los días de la semana
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  // Cerrar calendario al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm text-left font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={(e) => setDisplayValue(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm ${
            disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
          }`}
        />
        
        {/* Icono de calendario */}
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>

        {/* Input hidden para compatibilidad con formularios */}
        <input
          type="hidden"
          value={selectedDate ? formatDateForInput(selectedDate) : ''}
        />
      </div>

      {/* Calendario desplegable */}
      {isOpen && !disabled && (
        <div
          ref={calendarRef}
          className="absolute z-50 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-80"
        >
          {/* Header del calendario */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <h3 className="text-sm font-semibold text-gray-900">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Días del mes */}
          <div className="grid grid-cols-7 gap-1">
            {generateDays()}
          </div>

          {/* Botones de acción */}
          <div className="flex justify-between mt-4 pt-3 border-t border-gray-200">
            <button
              onClick={() => {
                const today = new Date();
                handleDateSelect(today);
              }}
              className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Hoy
            </button>
            
            <button
              onClick={() => {
                setSelectedDate(null);
                setDisplayValue('');
                onChange('');
                setIsOpen(false);
              }}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 font-medium"
            >
              Limpiar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
