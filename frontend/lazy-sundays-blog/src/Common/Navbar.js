import React, { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

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
            <div className="flex flex-wrap sm:flex-nowrap items-center py-3">
                <a href="/" className="mr-auto h-14 sm:h-20 flex items-center">
                    <img src={logo} alt="lazy sundays logo" className="max-h-full" />
                </a>
                <div className="hidden sm:flex justify-around justify-items-center sm:pr-10 lg:pr-30">
                    {links.map((link) => {
                        return (
                            <a href={link.href} className="sm:ml-8 px-1 md:text-lg hover:underline hover:decoration-1-primary hover:decoration-4">{link.name}</a>
                        );
                    })}
                </div>
                <div className="mr-4 sm:mr-0 sm:ml-4">
                        <ThemeSwitch />
                </div>

                {/* Mobile menu, show/hide based on menu state. */}
                <Menu>
                    <Menu.Button><FontAwesomeIcon className="sm:hidden mr-4 w-5 h-5 align-middle" icon={faBars} /></Menu.Button>
                    <hr />
                    <Transition as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className={"flex w-full justify-around mt-2 py-2 bg-stone-100 dark:bg-slate-900"}>
                            {links.map((link) => (
                                <Menu.Item key={link.href} as={Fragment}>
                                    {({ active }) => (
                                        <a href={link.href} className={"sm:ml-8 px-1 md:text-lg hover:underline hover:decoration-1-primary hover:decoration-4"}>
                                            {link.name}
                                        </a>  
                                    )}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </nav>
    );
}