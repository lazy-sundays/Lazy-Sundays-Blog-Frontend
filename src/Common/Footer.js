import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import RandomArticle from "./RandomArticle";

export default function Footer() {
    let links = [
        {key: 0, name: "Random Article", href: `/random-article`},
        {key: 1, name: "The Archives", href: "/the-archives"},
        {key: 2, name: "About Us", href: "/about-us"},
    ];

    return (
        <footer className="bg-neutral-200 dark:bg-slate-700 shadoww-full h-full mx-auto p-4 md:py-4 mt-auto">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-4">
                <div className="flex items-center justify-between">
                    <a href="/" className="flex items-center mb-4 sm:mb-0">
                        <span className="self-center text-md font-semibold whitespace-nowrap">Lazy Sundays Blog</span>
                    </a>
                    <ul className="flex flex-wrap items-center justify-center mb-4 text-sm font-medium sm:mb-0">
                        {links.map((link) => {
                            return (
                                 <li>
                                    <a href={link.href} className="ml-4 hover:underline hover:decoration-1-primary hover:decoration-2 md:ml-6">{link.name}</a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="inline-flex items-center justify-center w-full">
                    <hr className="w-4/5 h-1 my-8 dark:bg-white/25 bg-slate-900/25 border-0 rounded "/>
                    <div className="absolute px-6 -translate-x-1/2 bg-neutral-200 left-1/2 dark:bg-slate-700">
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