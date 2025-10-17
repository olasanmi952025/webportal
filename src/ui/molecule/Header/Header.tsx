import { useState } from "react";
import {UserMenu} from "../UserMenu";
import type { HeaderProps } from ".";


const Header: React.FC<HeaderProps> = ({
  user,
  onLogout,
  showThemeToggle = true,
  rightContent,
  options = [],
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const handleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-end h-16 px-4 sm:px-6 lg:px-8">

        <div className="flex items-center space-x-4">
          {rightContent && rightContent}

          {showThemeToggle && (
            <button
              onClick={handleTheme}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700  hover:bg-gray-100 transition-colors duration-200"
            >
              {!isDark ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>
          )}

          {/* User Menu */}
          <UserMenu
            user={user}
            isOpen={userMenuOpen}
            onToggle={() => setUserMenuOpen(!userMenuOpen)}
            onClose={() => setUserMenuOpen(false)}
            onLogout={onLogout}
            showAvatar={true}
            avatarSize="md"
            options={options}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
