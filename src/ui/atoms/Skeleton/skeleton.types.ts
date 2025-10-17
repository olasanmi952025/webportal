type AllowedVariants = "text" | "avatar" | "rect" | "card";
type AllowedSizes = "sm" | "md" | "lg";

export type SkeletonConfig = {
  variants: {
    variant: Record<AllowedVariants, string>;
    size: Record<AllowedSizes, string>;
  };
  defaultVariants?: {
    variant?: AllowedVariants;
    size?: AllowedSizes;
  };
};
