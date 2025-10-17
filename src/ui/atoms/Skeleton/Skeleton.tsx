import React from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { cn } from "../../../utils";
import type { SkeletonConfig } from "./skeleton.types";


const defaultConfig: SkeletonConfig = {
  variants: {
    variant: {
      text: "rounded bg-gray-300",
      avatar: "rounded-full bg-gray-300",
      rect: "rounded-md bg-gray-300",
      card: "rounded-lg bg-gray-300",
    },
    size: {
      sm: "h-4 w-24",
      md: "h-6 w-32",
      lg: "h-8 w-48",
    },
  },
  defaultVariants: {
    variant: "rect",
    size: "md",
  },
};

const createSkeletonVariants = (config: SkeletonConfig) => {
  return cva("animate-pulse", {
    variants: config.variants,
    defaultVariants: config.defaultVariants || defaultConfig.defaultVariants,
  });
};

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<ReturnType<typeof createSkeletonVariants>> {
  config?: SkeletonConfig;
}

const Skeleton = ({
  className,
  variant,
  size,
  config = defaultConfig,
  ...props
}: SkeletonProps) => {
  const skeletonVariants = createSkeletonVariants(config);

  return (
    <div
      className={cn(skeletonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export default Skeleton;