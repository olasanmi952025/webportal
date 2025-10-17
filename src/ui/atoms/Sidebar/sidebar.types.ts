export type SidebarItem = {
  label: string;
  to?: string;
  icon?: React.ReactNode;
  children?: SidebarItem[];
};

export type SidebarProps = {
  items: SidebarItem[];
  platformName?: string;
  isOpen: boolean;
  onToggle: () => void;
}
