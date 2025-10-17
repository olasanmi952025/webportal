import { cva } from "class-variance-authority";
import { cn } from "../../../utils";
import type { ButtonConfig, AllowedVariants } from "./button.types";





const defaultConfig = {
  variants: {
    variant: {
      primary: "bg-[#006FB3] text-white hover:bg-[#005a9c] focus:ring-[#006FB3]",
      secondary: "bg-white text-[#006FB3] border border-[#006FB3] hover:bg-[#EEEEEE] focus:ring-[#006FB3]",
      outline: "border border-[#A8B7C7] bg-white text-[#4A4A4A] hover:bg-[#EEEEEE]",
      danger: "bg-[#FE6565] text-white hover:bg-[#e55a5a] focus:ring-[#FE6565]",
    },
    size: {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    },
  },
  defaultVariants: {
    variant: "primary" as const,
    size: "md" as const,
  },
};


const createButtonVariants = (config: ButtonConfig) => {
  return cva(
    "cursor-pointer inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50",
    {
      variants: config.variants,
      defaultVariants: config.defaultVariants || defaultConfig.defaultVariants,
    }
  );
};


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: AllowedVariants;
  size?: "md" | "sm" | "lg";
  loading?: boolean;
  config?: ButtonConfig;

}

const Button = ({ className, variant, size, loading, children, config = defaultConfig, ...props }: ButtonProps) => {

  const buttonVariants = createButtonVariants(config);

  const spinnerColor =
    variant === "primary" || variant === "danger"
      ? "border-white"
      : variant === "secondary"
        ? "border-blue-400"
        : "border-gray-400";

  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <>
          <span className={cn("h-4 w-4 border-2 border-t-transparent rounded-full animate-spin mr-1", spinnerColor)}></span>
          <span className="sr-only">Loading...</span>
        </>

      )}
      {children}
    </button>
  );
}


export default Button;