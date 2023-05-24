import React from "react";

export default function Navbar() {
    let rnd = 1;
    let links = [
        {name: "Random Article", href: `/articles/${rnd}`},
        {name: "The Archives", href: "/articles"},
        {name: "About Us", href: "/about-us"},
    ];

    return (
        <nav className="sticky min-h-fit px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="flex items-center py-3">
                <a href="/" className="mr-auto h-20">logo goes here</a>
                <div className="flex justify-around justify-items-center sm:pr-10 lg:pr-30">
                    {links.map((link) => {
                        return (
                            <a href={link.href} className="ml-8 px-0.5 hover:bg-1-primary hover:text-white">{link.name}</a>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}