import type { Header } from "../../atoms/Table";

export type FilterField = {
  key: string;
  label: string;
  type: "text" | "select" | "date" | "daterange" | "search";
  options?: { value: string; label: string }[];
  placeholder?: string;
  searchable?: boolean;
  required?: boolean;
  error?: string;
  showError?: boolean;
}

export type FilterValues = {
  [key: string]: string | { start: string; end: string };
}



export type SearchTableTemplateProps<T> = {
  // Props para filtros
  title?: string;
  subtitle?: string;
  filterFields: FilterField[];
  onFiltersChange: (filters: FilterValues) => void;
  onSearch: () => void;
  onClearFilters: () => void;

  // Props para tabla
  headers: Header<T>[];
  data: T[];
  loading?: boolean;
  error?: string | null;
  actions?: (row: T) => React.ReactNode;

  // Props adicionales
  showResults?: boolean;
  resultsInfo?: string;
}
