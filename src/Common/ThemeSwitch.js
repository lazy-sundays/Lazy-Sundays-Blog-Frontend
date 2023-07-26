import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import useDarkMode from "../hooks/useDarkMode";

export default function ThemeSwitch() {
    const [theme, setTheme] = useDarkMode();
    const [dark, setDark] = useState(theme === "light" ? true : false);
    const [checked, setChecked] = useState(dark);
    const [greeting, setGreeting] = useState(false);

    useEffect(() => { //hide greeting message once animation has played
        const timer = setTimeout(() => {
            if (greeting) setGreeting(false);
        }, 1000);

        return () => { //clear timer if animation doesn't finish
            clearTimeout(timer);
        }
    }, [checked]);

    const toggleDarkMode = (checked) => {
        //change dark mode preference
        setTheme(theme);
        setDark(checked);
        setChecked((prevState) => !prevState); //toggle icon on front-end

        //show greeting message
        setGreeting(true);
    };

    //possibly further refine animation: https://dribbble.com/shots/12234916--Like-Button-for-Figma-Cool
    return (
        <>
            <button 
                title="Toggle Dark Mode" 
                onClick={toggleDarkMode} 
                className={checked ? "hover:brightness-75" : "hover:brightness-200"}>
                <FontAwesomeIcon icon={checked ? faMoon : faSun} className="w-5 h-5 align-middle sm:align-[-0.23em]" />
            </button>
            {greeting && <span className={`absolute animate-blink whitespace-nowrap opacity-0 ${checked ? "-translate-x-12": "-translate-x-14"} translate-y-7`}>Good {checked ? "Night" : "Morning"}!</span>}
        </>
    );
}