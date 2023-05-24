import React, { useState } from "react";
import useDarkMode from "../hooks/useDarkMode";

export default function ThemeSwitch() {
    const [theme, setTheme] = useDarkMode();
    const [dark, setDark] = useState(theme === "light" ? true : false);
    const [checked, setChecked] = useState(dark);

    const toggleDarkMode = (checked) => {
        setTheme(theme);
        setDark(checked);
        setChecked((prevState) => !prevState);
    };

    return (
        <>
            <input type={"checkbox"} checked={checked} onChange={toggleDarkMode} className="accent-1-primary"></input>
        </>
    );
}