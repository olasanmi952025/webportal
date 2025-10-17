import React from "react";
import type { PaginationProps } from "./pagination.types";


const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  size = "sm",
  totalRecords,
  pageSize,
}) => {
  if (totalPages <= 1 && !totalRecords) return null;

  const isSmall = size === "sm";

  const start = pageSize ? (currentPage - 1) * pageSize + 1 : null;
  const end =
    pageSize && totalRecords
      ? Math.min(currentPage * pageSize, totalRecords)
      : null;

  return (
    <div className="flex flex-col items-center gap-2">

      <nav aria-label="Page navigation" className="flex justify-center">
        <ul
          className={`flex items-center -space-x-px ${
            isSmall ? "h-8 text-sm" : "h-10 text-base"
          }`}
        >
          <li>
            <button
              disabled={currentPage === 1}
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              className={`flex items-center justify-center ${
                isSmall ? "px-3 h-8" : "px-4 h-10"
              } ms-0 leading-tight border rounded-s-lg
              ${
                currentPage === 1
                  ? "text-gray-300 bg-gray-100 cursor-not-allowed"
                  : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
              border-gray-300 dark:border-gray-700`}
            >
              <span className="sr-only">Previous</span>
              <svg
                className={`${isSmall ? "w-2.5 h-2.5" : "w-3 h-3"} rtl:rotate-180`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li key={page}>
              <button
                onClick={() => onPageChange(page)}
                aria-current={page === currentPage ? "page" : undefined}
                className={`flex items-center justify-center ${
                  isSmall ? "px-3 h-8" : "px-4 h-10"
                } leading-tight border 
                  ${
                    page === currentPage
                      ? "z-10 text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                      : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
              >
                {page}
              </button>
            </li>
          ))}


          <li>
            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                currentPage < totalPages && onPageChange(currentPage + 1)
              }
              className={`flex items-center justify-center ${
                isSmall ? "px-3 h-8" : "px-4 h-10"
              } leading-tight border rounded-e-lg
              ${
                currentPage === totalPages
                  ? "text-gray-300 bg-gray-100 cursor-not-allowed"
                  : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
              border-gray-300 dark:border-gray-700`}
            >
              <span className="sr-only">Next</span>
              <svg
                className={`${isSmall ? "w-2.5 h-2.5" : "w-3 h-3"} rtl:rotate-180`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>

 
        </ul>
        
      </nav>
      {totalRecords && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {pageSize && start && end
            ? `${start} – ${end} de ${totalRecords} registros`
            : `Total de registros: ${totalRecords}`}
        </p>
      )}
    </div>
  );
};


export default Pagination;