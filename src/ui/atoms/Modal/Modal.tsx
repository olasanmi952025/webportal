import React from "react";
import { cn } from "../../../utils";
import { Button } from "../Button";
import type { ModalProps } from "./modal.types";



const sizeMap = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footerActions,
  size = "md",
  className,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className={cn(
          "bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full p-4 md:p-6",
          sizeMap[size],
          className
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-600 pb-3 mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="cursor-pointer text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>
        )}

        {/* Body */}
        <div className="mb-4">{children}</div>

        {/* Footer */}
        {footerActions && footerActions.length > 0 && (
          <div className="flex justify-end gap-2 border-t border-gray-200 dark:border-gray-600 pt-3">
            {footerActions.map((action, idx) => (
              <Button
                key={idx}
                onClick={action.onClick}
                variant={action.variant}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;