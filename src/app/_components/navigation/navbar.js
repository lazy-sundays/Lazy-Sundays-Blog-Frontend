"use client";
import Link from "next/link";
import ThemeSwitch from "./theme-switch";
import ThemeLogo from "./theme-logo";
import MobileNav from "./mobile-nav";

export default function Navbar() {
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
          <MobileNav links={links} />
        </div>
      </div>
    </nav>
  );
}
