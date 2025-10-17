export type ModalAction = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger" | "outline";
}

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footerActions?: ModalAction[];
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}