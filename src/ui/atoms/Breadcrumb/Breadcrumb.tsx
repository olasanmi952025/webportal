import React from "react";
import { Home, ChevronRight } from "lucide-react";
import type { BreadcrumbProps } from "./breadcrumb.types";


 const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex overflow-x-auto max-w-full" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="inline-flex items-center m-1">
              {index === 0 ? (
                item.href ? (
                  <a
                    href={item.href}
                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-400"
                  >
                    <Home className="hidden md:block w-4 h-4 mr-2" />
                    {item.label}
                  </a>
                ) : (
                  <span className="inline-flex items-center text-sm font-medium text-gray-500">
                    <Home className="w-4 h-4 mr-2" />
                    {item.label}
                  </span>
                )
              ) : (
                <div className="flex items-center">
                  <ChevronRight className="rtl:rotate-180 w-3 h-3 text-gray-800 mx-1" />
                  {isLast || item.current ? (
                    <span className="ms-1 text-sm font-bold text-gray-800 md:ms-2">
                      {item.label}
                    </span>
                  ) : item.href ? (
                    <a
                      href={item.href}
                      className="ms-1 text-sm font-medium text-gray-500 hover:text-blue-400 md:ms-2"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2">
                      {item.label}
                    </span>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;