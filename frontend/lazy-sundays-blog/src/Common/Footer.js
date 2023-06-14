import React from "react";

export default function Footer() {
    let rnd = 1;
    let links = [
        {key: 0, name: "Random Article", href: `/articles/${rnd}`},
        {key: 1, name: "The Archives", href: "/articles"},
        {key: 2, name: "About Us", href: "/about-us"},
    ];

    return (
        <footer className="bg-stone-100 dark:bg-slate-900 shadoww-full h-full mx-auto p-4 md:py-4 mt-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-4">
                <div className="flex items-center justify-between">
                    <a href="/" className="flex items-center mb-4 sm:mb-0">
                    <span className="self-center text-md font-semibold whitespace-nowrap">Lazy Sundays Blog</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-4 text-sm font-medium sm:mb-0">
                        {links.map((link) => {
                            return (
                                 <li>
                                    <a href={link.href} className="ml-4 hover:underline md:ml-6">{link.name}</a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <hr className="my-6 mx-auto lg:my-8"/>
                <span className="block text-sm text-center mb-2">Est. 2023.</span>
                <span className="block text-sm text-center">Designed by Devin Toms and Jenny Leidig</span>
            </div>
        </footer>
    );
}