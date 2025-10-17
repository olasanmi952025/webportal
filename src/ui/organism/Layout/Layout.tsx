import React, { useState } from "react";
import { Header } from "../../molecule/Header";
import { Sidebar } from "../../atoms/Sidebar";
import type { LayoutProps } from ".";



const Layout: React.FC<LayoutProps> = ({ children, user, options, sidebarItems, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen max-w-screen flex flex-col bg-white">
      <Header
        user={user}
        options={options}
        onLogout={onLogout}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar items={sidebarItems}
          platformName="ARKHO UI"
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className={`
            flex-1 p-6 overflow-y-auto transition-all duration-300 
            ${sidebarOpen ? "md:ml-64" : "md:ml-16"} 
          `}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
