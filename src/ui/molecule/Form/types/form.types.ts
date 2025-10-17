export interface InFormField {
  type: 'input' | 'select';
  label?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSelect?: (value: string) => void;
  placeholder?: string;
  inputType?: string;
  options?: Array<{ value: string; label: string }>;
  props?: Record<string, string>;
  disabled?: boolean;
  required?: boolean;
}

export interface InFormSection {
  title: string;
  cols?: 1 | 2 | 3 | 4;
  fields?: InFormField[];
  customContent?: React.ReactNode;
  className?: string;
}

