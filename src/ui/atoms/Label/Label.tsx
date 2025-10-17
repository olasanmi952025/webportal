import clsx from "clsx";
import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}

 const Label: React.FC<LabelProps> = ({
  htmlFor,
  children,
  className,
  required,
  ...props
}) => (
  <label
    htmlFor={htmlFor}
    className={clsx(
      "block text-xs md:text-sm font-medium leading-6 text-gray-900 dark:text-white mb-1",
      className
    )}
    {...props}
  >
    {children}
    {required && <span className="text-red-400 ml-1">*</span>}
  </label>
);

export default Label;