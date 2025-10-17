import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../utils';
import type { AvatarProps } from './avatar.types';

const avatarVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors",
  {
    variants: {
      size: {
        sm: "h-6 w-6 text-xs",
        md: "h-8 w-8 text-sm",
        lg: "h-10 w-10 text-base",
        xl: "h-12 w-12 text-lg",
        "2xl": "h-16 w-16 text-xl"
      },
      variant: {
        primary: "bg-primary text-white hover:bg-dark-primary",
        "primary-gradient": "bg-gradient-to-r from-primary to-dark-primary text-white",
        "primary-outline": "border-2 border-primary text-primary hover:bg-primary hover:text-white",
        secondary: "bg-white text-gray-800 hover:bg-gray-50",
        "secondary-gradient": "bg-gradient-to-r from-white to-gray-50 text-gray-800",
        "secondary-outline": "border-2 border-gray-200 text-gray-800 hover:bg-gray-200 hover:text-gray-800",
      },
      defaultVariants: {
        size: "md",
        variant: "emerald-gradient"
      }
    }
  }

);



const Avatar: React.FC<AvatarProps> = ({
  initials,
  size = 'md',
  variant = 'primary',
  className,
  ...props
}) => {


  return (
    <div
      className={cn(avatarVariants({ size, variant }), className)}
      {...props}
    >
      <span className="select-none">
        {initials}
      </span>
    </div>
  );
};


export default Avatar;