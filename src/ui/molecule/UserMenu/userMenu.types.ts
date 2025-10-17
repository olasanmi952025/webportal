type AvatarSize = "sm" | "md" | "lg";

export type User = {
  initials: string;
  name: string;
  role: string;
  email: string;
}

export type UserMenuOption = {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  danger?: boolean;
}

export type UserMenuProps = {
  user: User;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onLogout: () => void;
  options?: UserMenuOption[]; 
  showAvatar?: boolean;
  avatarSize?: AvatarSize;
}
