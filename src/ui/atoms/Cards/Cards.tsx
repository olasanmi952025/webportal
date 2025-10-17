import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../utils";
import type { CardConfig } from "./cards.types";





const defaultConfig: CardConfig = {
  variants: {
    variant: {
      default: "bg-white border border-gray-200",
      outlined: "bg-white border-2 border-gray-200",
      shadow: "bg-white shadow-md",
    },
    orientation: {
      vertical: "flex flex-col",
      horizontal: "flex flex-col md:flex-row",
    },
  },
  defaultVariants: {
    variant: "default",
    orientation: "vertical",
  },
};

const createCardVariants = (config: CardConfig) =>
  cva("rounded-xl overflow-hidden transition-colors", {
    variants: config.variants,
    defaultVariants: config.defaultVariants || defaultConfig.defaultVariants,
  });

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<ReturnType<typeof createCardVariants>> {
  config?: CardConfig;
}

 const Card = ({
  className,
  children,
  variant,
  orientation,
  config = defaultConfig,
  ...props
}: CardProps) => {
  const cardVariants = createCardVariants(config);

  return (
    <div
      className={cn(cardVariants({ variant, orientation }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;