export type User = {
  name: string;
  email: string;
  role: string;
  initials: string;
}

export type UserMenuOption = {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  danger?: boolean;
}
export type HeaderProps = {
  user: User;
  options?: UserMenuOption[];
  onLogout: () => void;
  showThemeToggle?: boolean;
  rightContent?: React.ReactNode; 
}
