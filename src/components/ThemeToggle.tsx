import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 sm:p-2 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/30 active:scale-95 transition-all duration-200 shadow-lg touch-manipulation"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="h-6 w-6 sm:h-5 sm:w-5 text-gray-700 dark:text-gray-300" />
      ) : (
        <Sun className="h-6 w-6 sm:h-5 sm:w-5 text-yellow-500" />
      )}
    </button>
  );
};