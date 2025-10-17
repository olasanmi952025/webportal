import React, { useState, useRef, useEffect } from 'react';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { cn } from '../../../utils';
import type { SearchInputProps } from './searchInput.types';

const searchInputStyles = `
  .search-input-custom input[type="search"]::-webkit-search-decoration,
  .search-input-custom input[type="search"]::-webkit-search-cancel-button,
  .search-input-custom input[type="search"]::-webkit-search-results-button,
  .search-input-custom input[type="search"]::-webkit-search-results-decoration {
    display: none;
  }
`;

const SearchInput: React.FC<SearchInputProps> = ({
  value = '',
  placeholder = 'Buscar...',
  onChange,
  onSearch,
  onClear,
  disabled = false,
  hasError = false,
  maxLength = 100,
  autoFocus = false,
  
  showSearchButton = true,
  showClearButton = true,
  searchButtonText = 'Buscar',
  searchButtonVariant = 'primary',
  searchButtonSize = 'md',
  
  internalButtonVariant = 'outline',
  internalButtonSize = 'sm',

  externalButton = false,
  loading = false,
  
  className,
  containerClassName,
  inputClassName,
  searchButtonClassName,
  clearButtonClassName,
  iconClassName = 'text-white',
}) => {
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const styleId = 'search-input-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = searchInputStyles;
      document.head.appendChild(style);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      onSearch?.(inputValue.trim());
    }
  };

  const handleClear = () => {
    setInputValue('');
    onChange?.('');
    onClear?.();
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const hasValue = inputValue.length > 0;

  return (
    <div className={cn('flex gap-2 w-full search-input-custom', containerClassName || className)}>
      {/* Input de búsqueda */}
      <div className="relative flex-1">
        <Input
          type="search"
          value={inputValue}
          placeholder={placeholder}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          hasError={hasError}
          maxLength={maxLength}
          autoFocus={autoFocus}
          className={cn(
            !externalButton ? "pr-20" : "pr-12",
            inputClassName
          )}
        />
        
        {/* Botón de limpiar */}
        {showClearButton && hasValue && !disabled && (
          <Button
            variant={internalButtonVariant}
            size={internalButtonSize}
            onClick={handleClear}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 p-1 h-6 w-6 min-w-0",
              externalButton ? "right-3" : "right-12",
              clearButtonClassName
            )}
            aria-label="Limpiar búsqueda"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-3 h-3"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </Button>
        )}

        {/* Icono de búsqueda o botón interno */}
        {!externalButton ? (
          showSearchButton && (
            <Button
              variant={internalButtonVariant}
              size={internalButtonSize}
              onClick={handleSearch}
              disabled={disabled || !hasValue}
              loading={loading}
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 p-1 h-6 w-6 min-w-0",
                searchButtonClassName
              )}
              aria-label="Buscar"
            >
              {!loading && (
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-3 h-3"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" 
                />
              </svg>
              )}
            </Button>
          )
        ) : (
          <div className={cn(
            "absolute top-1/2 -translate-y-1/2 pointer-events-none",
            hasValue ? 'right-12' : 'right-3',
            iconClassName
          )}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-4 h-4"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" 
              />
            </svg>
          </div>
        )}
      </div>

      {/* Botón de búsqueda externo */}
      {showSearchButton && externalButton && (
        <Button
          variant={searchButtonVariant}
          size={searchButtonSize}
          onClick={handleSearch}
          disabled={disabled || !hasValue}
          loading={loading}
          className={cn("shrink-0", searchButtonClassName)}
        >
          {searchButtonText}
        </Button>
      )}
    </div>
  );
};

export default SearchInput;
