import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../utils";

type AllowedVariants = "success" | "error" | "info" | "danger";
type AllowedSizes = "sm" | "md" | "lg";

const badgeVariants = cva(
  "inline-flex items-center rounded-full font-medium transition-colors", 
  {
    variants: {
      variant: {
        success: "bg-green-400 text-white hover:bg-green-700",
        error: "bg-red-500 text-white hover:bg-red-700",
        info: "bg-blue-500 text-white hover:bg-blue-700",
        danger: "bg-yellow-500 text-white hover:bg-yellow-700",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base",
      },
    },
    defaultVariants: {
      variant: "success",
      size: "md",
    },
  }
);

 interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
  VariantProps<typeof badgeVariants> {
  variant?: AllowedVariants;
  size?: AllowedSizes;

}

 const Badge: React.FC<BadgeProps> = ({
  className,
  variant,
  size,
  children,
  ...props
}) => {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </span>
  );
};


export default Badge;