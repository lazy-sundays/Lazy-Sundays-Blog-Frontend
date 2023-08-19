'use client'
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";
import Image from 'next/image';
import ThemeSwitch from "./theme-switch";
import logo from "/public/logo.svg" ;

export default function Navbar() {
    let links = [
        {key: 1, name: "The Archives", href: "/the-archives"},
        {key: 2, name: "About Us", href: "/about-us"},
    ];

    return (
        <nav className="sticky px-4 sm:px-14 lg:px-20">
            <div className="flex flex-wrap sm:flex-nowrap items-center py-3">
                <Link href="/" className="max-w-[50%] mr-auto flex items-center">
                    {/* <img src={"/logo.svg"} alt="lazy sundays logo" className="max-h-full" /> */}
                    <Image 
                        src={logo}
                        alt="lazy sundays logo"
                        className="justify-left"
                    />
                </Link>
                <div className="hidden sm:flex justify-around justify-items-center sm:pr-10 lg:pr-30">
                    <a href={"/random-article"} className="sm:ml-8 px-1 md:text-xl hover:underline hover:decoration-accentprimary hover:decoration-2">Random Article</a>
                    {links.map((link) => {
                        return (
                            <Link key={link.key} href={link.href} className="sm:ml-8 px-1 md:text-xl hover:underline hover:decoration-accentprimary hover:decoration-2">{link.name}</Link>
                        );
                    })}
                </div>
                <div className="mr-4 sm:mr-0">
                        <ThemeSwitch />
                </div>

                {/* Mobile menu, show/hide based on menu state. */}
                <Menu>
                    {({ open }) => (
                        <>
                            <Menu.Button className={"sm:collapse"}><FontAwesomeIcon className={"mr-4 w-5 h-5 align-middle hover:opacity-75"} icon={open ? faXmark : faBars}/></Menu.Button>
                            <hr />
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