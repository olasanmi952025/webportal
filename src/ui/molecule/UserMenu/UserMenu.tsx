import React from "react";
import Avatar from "../../atoms/Avatar/Avatar";
import type { UserMenuProps } from "./userMenu.types";


const UserMenu: React.FC<UserMenuProps> = ({
  user,
  isOpen,
  onToggle,
  onClose,
  onLogout,
  options = [],
  showAvatar = true,
  avatarSize = "md",
}) => {
  return (
    <>
      <div className="relative">
        <button
          onClick={onToggle}
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          {showAvatar && <Avatar initials={user.initials} size={avatarSize} />}
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-gray-800 ">
              {user.name}
            </p>
            <p className="text-xs text-gray-500">
              {user.role}
            </p>
          </div>
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white  rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50 transition-all duration-100 transform">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-200 ">
              <div className="flex items-center space-x-3 mb-2">
                <Avatar initials={user.initials} size="lg" />
                <div>
                  <p className="text-sm font-medium text-gray-800 ">
                    {user.name}
                  </p>
                  <p className="text-xs text-emerald-600">
                    {user.role}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                {user.email}
              </p>
            </div>

            <div className="py-2">
              {options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    opt.onClick();
                    onClose();
                  }}
                  className={`flex items-center w-full px-4 py-2 text-sm transition-colors duration-150 ${
                    opt.danger
                      ? "text-red-600 hover:bg-red-50 "
                      : "text-gray-800  hover:bg-gray-100 "
                  }`}
                >
                  {opt.icon && <span className="w-4 h-4 mr-3">{opt.icon}</span>}
                  {opt.label}
                </button>
              ))}

              {/* Divider */}
              {options.length > 0 && (
                <div className="border-t border-gray-200  my-2"></div>
              )}

              {/* Logout - siempre visible */}
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
              >
                <svg
                  className="w-4 h-4 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </div>

      {isOpen && <div className="fixed inset-0 z-40" onClick={onClose} />}
    </>
  );
};

export default UserMenu;
