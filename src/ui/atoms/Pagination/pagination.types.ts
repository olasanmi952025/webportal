export type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  size?: "sm" | "md";
  totalRecords?: number;  
  pageSize?: number;     
}