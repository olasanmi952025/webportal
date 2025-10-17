export type AllowedVariants = "primary" | "secondary" | "outline" | "danger";

type AllowedSizes = "sm" | "md" | "lg";

export type ButtonConfig = {
  variants: {
    variant: Record<AllowedVariants, string>;
    size: Record<AllowedSizes, string>;
  };
  defaultVariants?: {
    variant?: AllowedVariants;
    size?: AllowedSizes;
  };
};


