import React, { useState } from "react";

import logo from "../media/logo.svg";
import ThemeSwitch from "./ThemeSwitch";

export default function Navbar() {
    let rnd = 1;
    let links = [
        {key: 0, name: "Random Article", href: `/articles/${rnd}`},
        {key: 1, name: "The Archives", href: "/articles"},
        {key: 2, name: "About Us", href: "/about-us"},
    ];

    return (
        <nav className="sticky min-h-fit px-4 sm:px-6 md:px-14 lg:px-20">
            <div className="flex items-center py-3">
                <a href="/" className="mr-auto h-14 sm:h-20 flex items-center">
                    <img src={logo} alt="lazy sundays logo" className="max-h-full" />
                </a>
                <div className="flex justify-around justify-items-center sm:pr-10 lg:pr-30">
                    {links.map((link) => {
                        return (
                            <a href={link.href} className="sm:ml-8 px-1 md:text-lg hover:underline hover:decoration-1-primary hover:decoration-4">{link.name}</a>
                        );
                    })}
                    <div className="sm:ml-4">
                        <ThemeSwitch />
                    </div>
                </div>
            </div>
        </nav>
    );
}