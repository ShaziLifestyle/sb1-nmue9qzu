import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '../../hooks/useDarkMode';

export function ThemeToggle() {
  const { isDark, setIsDark } = useDarkMode();

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed top-4 right-4 p-2 rounded-lg bg-white/10 backdrop-blur-lg 
        border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300
        dark:bg-dark-800/50 dark:border-dark-700"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700" />
      )}
    </button>
  );
}