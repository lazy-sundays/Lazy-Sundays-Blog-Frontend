import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'

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
                                    <a href={link.href} className="ml-4 hover:underline hover:decoration-1-primary md:ml-6">{link.name}</a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="inline-flex items-center justify-center w-full">
                    <hr className="w-4/5 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700"/>
                    <div className="absolute px-6 -translate-x-1/2 bg-stone-100 left-1/2 dark:bg-slate-900">
                        <FontAwesomeIcon icon={faSun} className="bg-transparent"/>
                    </div>
                </div>
                <span className="block text-xs text-center">
                    <div className="mb-2">Est. 2023.</div>
                    {/* TODO: add links to names so that they link to author page */}
                    <div className="">Designed by Devin Toms and Jenny Leidig</div>
                </span>
            </div>
        </footer>
    );
}