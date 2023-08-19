"use client" 
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from 'next-themes'

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false);
    const [themeIndex, setThemeIndex] = useState(0);
    const {theme, setTheme} = useTheme();
    const THEMES = ["light", "dark"];

    const toggleDarkMode = (checked) => {
        const newIndex = (themeIndex + 1) % THEMES.length;
        //change dark mode preference
        setThemeIndex(newIndex);
        setTheme(THEMES[newIndex]); //toggle icon on front-end
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            <button 
                title="Toggle Dark Mode" 
                onClick={toggleDarkMode} 
                className={"hover:opacity-75"}>
                {mounted && <FontAwesomeIcon icon={theme === 'light' ? faSun : faMoon} className="w-5 h-5 align-middle sm:align-[-0.23em]" />}
            </button>
        </>
    );
}