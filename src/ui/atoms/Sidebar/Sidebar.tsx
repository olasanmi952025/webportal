import { useState } from "react";
import type { SidebarItem, SidebarProps } from "./sidebar.types";


const Sidebar = ({
  items,
  platformName = "Mi Plataforma",
  isOpen,
  onToggle
}: SidebarProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const onCloseMobile = () => {
    setIsMobileOpen(false)
    if (isOpen) onToggle()
  }



  return (
    <>
      <button
        className="md:hidden absolute top-4 left-4 z-50 p-2 bg-blue-950 text-white rounded-lg"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
      </button>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 h-screen bg-primary text-white shadow-lg
          transition-all duration-300 z-50
          ${isOpen ? "w-64" : "w-16"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-white">
          {isOpen && <span className="text-lg font-bold">{platformName}</span>}
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-blue-800 cursor-pointer"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            )}
          </button>
        </div>

        <nav className="mt-4 space-y-1">
          {items.map((item, i) => (
            <SidebarLink
              key={i}
              item={item}
              isOpen={isOpen}
              onNavigate={() => setIsMobileOpen(false)}
            />
          ))}
        </nav>
      </div>
    </>
  );
}

function SidebarLink({
  item,
  isOpen,
  onNavigate,
}: {
  item: SidebarItem;
  isOpen: boolean;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  if (item.children && item.children.length > 0) {
    return (
      <div>
        <button
          className="flex items-center justify-between w-full px-4 py-3 hover:bg-blue-800 transition-colors cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center gap-3">
            {item.icon}
            {isOpen && <span className="truncate">{item.label}</span>}
          </div>
          {isOpen && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`w-4 h-4 transition-transform ${expanded ? "rotate-90" : ""
                }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </button>
        {expanded && isOpen && (
          <div className="ml-6 border-l border-blue-900 ">
            {item.children.map((child, i) => (
              <a
                key={i}
                href={child.to}
                onClick={onNavigate}
                className="block px-4 py-2 text-sm hover:bg-blue-900"
              >
                {child.label}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <a
      href={item.to}
      onClick={onNavigate}
      className="flex items-center gap-3 px-4 py-3 hover:bg-blue-900 transition-colors"
    >
      {item.icon}
      {isOpen && <span className="truncate">{item.label}</span>}
    </a>
  );
}

export default Sidebar;