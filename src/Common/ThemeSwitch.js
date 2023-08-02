import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import useDarkMode from "../hooks/useDarkMode";

export default function ThemeSwitch() {
    const [theme, setTheme] = useDarkMode();
    const [dark, setDark] = useState(theme === "light" ? true : false);
    const [checked, setChecked] = useState(dark);

    const toggleDarkMode = (checked) => {
        //change dark mode preference
        setTheme(theme);
        setDark(checked);
        setChecked((prevState) => !prevState); //toggle icon on front-end
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
        </>
    );
}