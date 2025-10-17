import type { SidebarItem } from "../../atoms/Sidebar";

export type LayoutProps = {
  children: React.ReactNode;
  user: {
    initials: string;
    name: string;
    email: string;
    role: string;
  };
  options: { label: string; onClick: () => void }[];
  sidebarItems: SidebarItem[];
  onLogout: () => void;
}