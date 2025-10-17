import React from "react";
import { Button } from "../../atoms/Button";
import type { ButtonGroupProps } from "./";
import { cn } from "../../../utils";



 const ButtonGroup: React.FC<ButtonGroupProps> = ({
  items,
  className,
  size = "md",
  variant = "primary",
}) => {
  return (
    <div
      className={cn(
        "inline-flex rounded-md shadow-xs overflow-hidden",
        className
      )}
      role="group"
    >
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;

        return (
          <Button
            key={index}
            onClick={item.onClick}
            variant={item.variant || variant}
            size={item.size || size}
            disabled={item.disabled}
            className={cn(
              isFirst && "rounded-r-none",
              isLast && "rounded-l-none",
              !isFirst && !isLast && "rounded-none border-l-0"
            )}
          >
            {item.icon && <span className="w-4 h-4 mr-2">{item.icon}</span>}
            {item.label}
          </Button>
        );
      })}
    </div>
  );
};


export default ButtonGroup;