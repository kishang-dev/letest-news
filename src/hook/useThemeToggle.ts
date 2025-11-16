// hooks/useThemeToggle.ts
import { useEffect, useState } from "react";

export function useThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initial: "light" | "dark" =
      savedTheme === "dark" || savedTheme === "light"
        ? (savedTheme as "light" | "dark")
        : prefersDark
        ? "dark"
        : "light";

    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  // Apply theme + persist in localStorage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}
