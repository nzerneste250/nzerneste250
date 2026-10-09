"use client";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
const storageKey = "erneste-theme";
type Theme = "dark" | "light";
function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#08111D" : "#F4F7FA");
}
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    const current = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setTheme(current); applyTheme(current);
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const update = () => {
      let saved: string | null = null;
      try { saved = localStorage.getItem(storageKey); } catch { /* Use the OS preference when storage is unavailable. */ }
      const next = saved === "light" || saved === "dark" ? saved : media.matches ? "light" : "dark";
      applyTheme(next); setTheme(next);
    };
    media.addEventListener("change", update); window.addEventListener("storage", update);
    return () => { media.removeEventListener("change", update); window.removeEventListener("storage", update); };
  }, []);
  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    applyTheme(next); setTheme(next);
    try { localStorage.setItem(storageKey, next); } catch { /* The theme still works for this visit. */ }
  }
  return <button className="theme-toggle" type="button" onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}><Icon name={theme === "dark" ? "sun" : "moon"}/></button>;
}
