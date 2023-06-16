import { useState, useEffect } from "react";
  
//modified from source: https://www.geeksforgeeks.org/how-to-add-dark-mode-in-reactjs-using-tailwind-css/
export default function useDarkMode() {
    const [theme, setTheme] = useState(localStorage.theme);
    const colorTheme = theme === "dark" ? "light" : "dark";
  
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme, colorTheme]);
  
    return [colorTheme, setTheme]
}