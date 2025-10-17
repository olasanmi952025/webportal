import React from "react";
import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { IconProps } from "./icons.types";

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}) => {
  const IconComponent = Icons[name] as React.ComponentType<LucideProps>;

  if (!IconComponent) {
    console.warn(`El ícono "${name}" no existe en lucide-react.`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
    />
  );
};

export default Icon;
