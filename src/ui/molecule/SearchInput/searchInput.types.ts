export interface SearchInputProps {
  // Props básicas del Input
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  disabled?: boolean;
  hasError?: boolean;
  maxLength?: number;
  autoFocus?: boolean;
  
  // Props de botones
  showSearchButton?: boolean;
  showClearButton?: boolean;
  searchButtonText?: string;
  searchButtonVariant?: 'primary' | 'secondary' | 'outline' | 'danger';
  searchButtonSize?: 'sm' | 'md' | 'lg';
  
  // Props de botones internos
  internalButtonVariant?: 'primary' | 'secondary' | 'outline' | 'danger';
  internalButtonSize?: 'sm' | 'md' | 'lg';
  
  // Props de comportamiento
  externalButton?: boolean;
  loading?: boolean;
  
  // Props de estilos
  className?: string;
  containerClassName?: string;
  inputClassName?: string;
  searchButtonClassName?: string;
  clearButtonClassName?: string;
  iconClassName?: string;
}
