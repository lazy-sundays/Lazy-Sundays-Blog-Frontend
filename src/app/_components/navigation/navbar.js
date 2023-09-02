'use client'
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";
import Image from 'next/image';
import ThemeSwitch from "./theme-switch";
import Logo from "/public/logo.svg" ;

export default function Navbar() {
    let links = [
        {key: 1, name: "The Archives", href: "/the-archives"},
        {key: 2, name: "About Us", href: "/about-us"},
    ];

    return (
        <nav className="sticky w-full px-4 sm:px-14 lg:px-20 mt-7 mb-14 max-w-screen-readable mx-auto">
            <div className="flex flex-wrap sm:flex-nowrap">
                <Link href="/" className="max-w-[50%] mr-auto flex items-center">
                    <Logo className="min-w-[7rem] w-[10vw] max-w-[13rem] h-auto text-textprimary"/>
                </Link>
                <div className="hidden sm:flex justify-around justify-items-center sm:pr-10 lg:pr-30 mt-4">
                    <a href={"/random-article"} className="sm:ml-8 px-1 md:text-xl hover:underline hover:decoration-accentprimary hover:decoration-2">Random Article</a>
                    {links.map((link) => {
                        return (
                            <Link key={link.key} href={link.href} className="sm:ml-8 px-1 md:text-xl hover:underline hover:decoration-accentprimary hover:decoration-2">{link.name}</Link>
                        );
                    })}
                </div>
                <div className="mr-4 sm:mr-0 mt-4">
                        <ThemeSwitch />
                </div>

                {/* Mobile menu, show/hide based on menu state. */}
                <Menu>
                    {({ open }) => (
                        <>
                            <Menu.Button className={"sm:collapse self-start"}><FontAwesomeIcon className={"mt-4 mr-4 w-5 h-5 hover:opacity-75"} icon={open ? faXmark : faBars}/></Menu.Button>
                            
                            <Transition as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className={"sm:hidden grid grid-flow-col text-center auto-cols-auto w-full justify-around mt-2 py-2 bg-bgsecondary"}>
                                    <a href={"/random-article"} className="px-1 text-md w-full hover:underline hover:decoration-accentprimary hover:decoration-2">Random Article</a>
                                    {links.map((link) => (
                                        <Menu.Item 
                                            as={Link}
                                            key={link.key} 
                                            href={link.href}
                                            className={"px-1 text-md w-full hover:underline hover:decoration-accentprimary hover:decoration-2"}
                                        >
                                            {link.name}
                                        </Menu.Item>
                                    ))}
                                </Menu.Items>
                            </Transition>
                        </>
                    )}  
                </Menu>
            </div>
        </nav>
    );
}