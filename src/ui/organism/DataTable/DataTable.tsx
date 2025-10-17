import { useState, useMemo } from "react";
import {Pagination} from "../../atoms/Pagination";
import { Table } from "../../atoms/Table";
import type { DataTableProps } from "./";



 function DataTable<T extends Record<string, unknown>>({
  headers,
  data,
  loading = false,
  error = null,
  actions,
  pageSize = 10,
  showPagination = true,
  paginationSize = "sm",
  onPageChange,
  currentPage: externalCurrentPage,
  totalRecords: externalTotalRecords,
}: DataTableProps<T>) {
  // Estado interno para paginación (solo si no se maneja externamente)
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);

  // Determinar si la paginación es interna o externa
  const isExternalPagination = Boolean(onPageChange && externalCurrentPage !== undefined);
  const currentPage = isExternalPagination ? externalCurrentPage! : internalCurrentPage;
  const totalRecords = externalTotalRecords || data.length;

  const paginatedData = useMemo(() => {
    if (isExternalPagination) {
      return data;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, pageSize, isExternalPagination]);

  // Calcular total de páginas
  const totalPages = Math.ceil(totalRecords / pageSize);

  // Handler para cambio de página
  const handlePageChange = (page: number) => {
    if (isExternalPagination) {
      onPageChange!(page);
    } else {
      setInternalCurrentPage(page);
    }
  };

  return (
    <div className="space-y-4">
      <Table
        headers={headers}
        data={paginatedData}
        loading={loading}
        error={error}
        actions={actions}
      />

      {showPagination && totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            size={paginationSize}
            totalRecords={totalRecords}
            pageSize={pageSize}
          />
        </div>
      )}
    </div>
  );
}


export default DataTable;