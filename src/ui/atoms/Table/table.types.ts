export interface Header<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  visible?: boolean;
}

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface TableProps<T> {
  headers: Header<T>[];
  data: T[];
  loading?: boolean;
  error?: string | null;
  actions?: (row: T) => React.ReactNode;
  emptyState?: EmptyStateProps;
}
