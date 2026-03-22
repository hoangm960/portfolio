"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="relative p-2 rounded-full transition-colors duration-300 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <Sun
        size={20}
        className="text-amber-500 transition-opacity duration-300 rotate-0 dark:opacity-0 dark:-rotate-90"
        strokeWidth={2}
      />
      <Moon
        size={20}
        className="absolute inset-0 m-2 text-slate-300 transition-opacity duration-300 opacity-0 rotate-90 dark:opacity-100 dark:rotate-0"
        strokeWidth={2}
      />
    </button>
  );
}
