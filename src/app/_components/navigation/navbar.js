"use client";
import { Fragment, useEffect, useRef } from "react";
import { Menu, Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import ThemeSwitch from "./theme-switch";
import ThemeLogo from "./theme-logo";

export default function Navbar() {
  const popoverRef = useRef(null);

  let links = [
    { key: 1, name: "The Archives", href: "/the-archives" },
    { key: 2, name: "About Us", href: "/about-us" },
  ];

  return (
    <nav className="sticky w-full px-4 sm:px-14 lg:px-20 mt-2 mb-14 max-w-screen-readable mx-auto">
      <div className="flex flex-wrap sm:flex-nowrap sm:items-top">
        <Link href="/" className="max-w-[50%] mr-auto">
          <ThemeLogo
            label={"the lazy sundays blog logo"}
            className="min-w-[7rem] w-[10vw] max-w-[13rem] h-auto"
          />
        </Link>
        <div className="hidden h-fit sm:flex sm:pt-6 justify-around justify-items-center">
          <a
            href={"/random-article"}
            className="ml-8 md:text-xl hover:underline hover:decoration-accentprimary hover:decoration-2"
          >
            Random Article
          </a>
          {links.map((link) => {
            return (
              <Link
                key={link.key}
                href={link.href}
                className="ml-8 md:text-xl hover:underline hover:decoration-accentprimary hover:decoration-2"
              >
                {link.name}
              </Link>
            );
          })}
        </div>
        <div className="sm:block sm:grid-rows-none sm:mt-0 grid grid-rows-1 grid-flow-col mt-16 items-center">
          <div className="sm:mr-0 sm:pt-6 ml-8 text-2xl mr-5">
            <ThemeSwitch />
          </div>

          {/* Mobile menu, show/hide based on menu state. */}
          <Popover ref={popoverRef}>
            {({ open, close }) => {
              // Add click-outside listener when popover is open
              useEffect(() => {
                if (!open) return;

                const handleClickOutside = (event) => {
                  if (
                    popoverRef.current &&
                    !popoverRef.current.contains(event.target)
                  ) {
                    close();
                  }
                };

                // Use click event to allow link navigation to happen first
                // Add a small delay to ensure this runs after any link clicks
                const timeoutId = setTimeout(() => {
                  document.addEventListener("click", handleClickOutside);
                }, 0);

                return () => {
                  clearTimeout(timeoutId);
                  document.removeEventListener("click", handleClickOutside);
                };
              }, [open, close]);

              return (
                <div>
                  <PopoverButton
                    className={"sm:hidden text-2xl focus:outline-none"}
                  >
                    <FontAwesomeIcon
                      className={`hover:opacity-60 ${open ? "opacity-60" : ""}`}
                      icon={faBars}
                    />
                  </PopoverButton>
                  <PopoverPanel
                    transition
                    anchor="bottom"
                    className="w-full px-4 origin-top transition duration-300 ease-in-out data-[closed]:opacity-0 data-[closed]:-translate-y-2"
                  >
                    <div className="h-4 bg-bgsecondary w-4 absolute top-3 right-4 transform rotate-45 origin-top-right rounded-sm"></div>
                    <div
                      className={
                        "mt-3 bg-bgsecondary p-3 flex flex-row text-center place-content-center rounded-sm"
                      }
                    >
                      <a
                        href={"/random-article"}
                        className="px-1 text-md w-full hover:underline hover:decoration-accentprimary hover:decoration-2"
                        onClick={() => close()}
                      >
                        Random Article
                      </a>
                      {links.map((link) => (
                        <Link
                          key={link.key}
                          href={link.href}
                          className={
                            "px-1 text-md w-full hover:underline hover:decoration-accentprimary hover:decoration-2"
                          }
                          onClick={() => close()}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </PopoverPanel>
                </div>
              );
            }}
          </Popover>
        </div>
      </div>
    </nav>
  );
}
