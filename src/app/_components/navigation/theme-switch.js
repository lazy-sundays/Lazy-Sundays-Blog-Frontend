"use client" 
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from 'next-themes'

const THEMES = ["light", "dark"];

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false);
    const {theme, setTheme} = useTheme();
    const [themeIndex, setThemeIndex] = useState(THEMES.findIndex((x) => (x === theme)));

    const toggleDarkMode = () => {
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
                {mounted && <FontAwesomeIcon icon={theme === 'light' ? faSun : faMoon} className="sm:align-[-0.23em]" />}
            </button>
        </>
    );
}