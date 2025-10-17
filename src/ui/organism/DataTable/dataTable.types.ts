export type Header<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  visible?: boolean;
}

export type DataTableProps<T> = {
  headers: Header<T>[];
  data: T[];
  loading?: boolean;
  error?: string | null;
  actions?: (row: T) => React.ReactNode;
//Propiedades de paginación
  pageSize?: number;
  showPagination?: boolean;
  paginationSize?: "sm" | "md";
  onPageChange?: (page: number) => void;
  currentPage?: number;
  totalRecords?: number;
}