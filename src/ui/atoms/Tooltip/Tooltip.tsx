import { cn } from "../../../utils";
import type { TooltipProps } from "./tooltip.types";

const Tooltip = ({ children, text, position = "top", className }: TooltipProps) => {

  const positionClasses =
    position === "top"
      ? "bottom-full mb-2"
      : "top-full mt-2";

  return (
    <div className="relative group inline-block">
      {children}
      <span
        className={cn(
          `absolute left-1/2 -translate-x-1/2 ${positionClasses} w-max max-w-xs px-2 py-1 rounded-md text-xs text-white bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity z-10`,
          className
        )}
      >
        {text}
      </span>
    </div>
  );
}

export default Tooltip;