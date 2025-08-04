"use client";
import { useEffect, useRef } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function MobileNavPopover({ links, close }) {
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        close();
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [close]);

  return (
    <div ref={popoverRef}>
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
}

export default function MobileNav({ links }) {
  return (
    <Popover>
      {({ open, close }) => (
        <>
          <PopoverButton className={"sm:hidden text-2xl focus:outline-none"}>
            <FontAwesomeIcon
              className={`hover:opacity-75 ${open ? "opacity-75" : ""}`}
              icon={faBars}
            />
          </PopoverButton>
          {open && <MobileNavPopover links={links} close={close} />}
        </>
      )}
    </Popover>
  );
}
