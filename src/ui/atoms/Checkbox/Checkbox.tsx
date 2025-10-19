import React from "react";
import type { CheckboxProps } from "./checkbox.types";

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  description,
  checked = false,
  onChange,
  disabled = false,
}) => {
  const handleClick = () => {
    if (!disabled) {
      onChange?.(!checked);
    }
  };

  return (
    <div 
      className={`group relative flex items-start rounded-xl transition-all duration-200 ${
        label ? 'p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50' : 'p-1'
      } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center relative">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          className="sr-only"
        />
        
        <div 
          className={`
            relative w-5 h-5 rounded-md border-2 transition-all duration-200 ease-in-out
            ${checked 
              ? 'bg-gradient-to-br from-blue-500 to-blue-600 border-blue-500 shadow-lg shadow-blue-500/25' 
              : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
            }
            ${disabled 
              ? 'opacity-50 cursor-not-allowed' 
              : 'cursor-pointer hover:shadow-md hover:scale-105'
            }
          `}
        >
          {/* Checkmark */}
          <svg 
            className={`
              absolute inset-0 w-full h-full text-white transition-all duration-200
              ${checked ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
            `}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={3}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M5 13l4 4L19 7" 
            />
          </svg>
          
          {/* Focus ring */}
          <div className={`
            absolute inset-0 rounded-md ring-2 ring-blue-500/20 transition-opacity duration-200
            ${checked ? 'opacity-100' : 'opacity-0'}
          `} />
        </div>
      </div>

      {label && (
        <div className="ml-3 flex-1">
          <label
            htmlFor={id}
            className={`
              block text-sm font-semibold leading-5 transition-colors duration-200 cursor-pointer
              ${disabled 
                ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                : 'text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400'
              }
            `}
            style={{ color: disabled ? '#9CA3AF' : '#111827' }}
            onClick={(e) => {
              e.preventDefault();
              if (!disabled) {
                onChange?.(!checked);
              }
            }}
          >
            {label}
          </label>
          
          {description && (
            <p
              id={`${id}-description`}
              className={`
                mt-1 text-xs leading-4 transition-colors duration-200 cursor-pointer
                ${disabled 
                  ? 'text-gray-400 dark:text-gray-500' 
                  : 'text-gray-600 dark:text-gray-400'
                }
              `}
              onClick={(e) => {
                e.preventDefault();
                if (!disabled) {
                  onChange?.(!checked);
                }
              }}
            >
              {description}
            </p>
          )}
        </div>
      )}
      
      {checked && !disabled && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none" />
      )}
    </div>
  );
};

export default Checkbox