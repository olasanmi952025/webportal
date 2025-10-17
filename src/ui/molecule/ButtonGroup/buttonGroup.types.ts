import type { ButtonProps } from "../../atoms/Button/Button";

export type GroupButtonItem = {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  disabled?: boolean;
}

export type ButtonGroupProps = {
  items: GroupButtonItem[];
  className?: string;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
}