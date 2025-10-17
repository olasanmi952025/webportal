type AllowedVariants = "default" | "outlined" | "shadow";
type Orientation = "vertical" | "horizontal";


export type CardConfig = {
  variants: {
    variant: Record<AllowedVariants, string>;
    orientation: Record<Orientation, string>;
  };
  defaultVariants?: {
    variant?: AllowedVariants;
    orientation?: Orientation;
  };
};