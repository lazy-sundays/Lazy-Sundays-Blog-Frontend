import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function Footer() {
    let links = [
        {key: 1, name: "The Archives", href: "/the-archives"},
        {key: 2, name: "About Us", href: "/about-us"},
    ];

    const views = (await redis.get(["pageviews", "page", `home`].join(":"))) ?? 0;

    return (
        <footer className="bg-bgsecondary w-full h-full mx-auto p-4 md:py-4 mt-auto">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-4">
                <div className="flex items-center justify-between">
                    <div className='flex flex-col text-center'>
                        <Link href="/" className="flex items-center mb-4 sm:mb-0">
                            <span className="self-center text-md font-semibold whitespace-nowrap">the lazy sundays blog</span>
                        </Link>
                        <span className='italic text-sm font-sans'>You are visitor <span className='text-accentsecondary font-bold'>#{views}</span>!</span>
                    </div>
                    <ul className="flex flex-wrap items-center justify-center mb-4 text-sm font-medium sm:mb-0">
                        <li key={"/random-article"}>
                            <a href={"/random-article"} className="ml-4 hover:underline hover:decoration-accentprimary hover:decoration-2 md:ml-6">Random Article</a>
                        </li>
                        {links.map((link) => {
                            return (
                                 <li key={link.href}>
                                    <Link href={link.href} className="ml-4 hover:underline hover:decoration-accentprimary hover:decoration-2 md:ml-6">{link.name}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="inline-flex items-center justify-center w-full">
                    <hr className="w-4/5 h-1 my-8 bg-textprimary/25 border-0 rounded "/>
                    <div className="absolute px-5 -translate-x-1/2 bg-bgsecondary left-1/2 ">
                        <FontAwesomeIcon icon={faSun} className="w-5 bg-transparent"/>
                    </div>
                </div>
                <span className="block text-xs text-center">
                    <div className="">Est. 2023.</div>
                    <div className="">Designed by <Link href="/authors/devin-toms" className="text-accentprimary font-bold hover:underline hover:decoration-accentprimary hover:decoration-2">Devin Toms</Link> and <Link href="/authors/jenny-leidig" className="text-accentprimary font-bold hover:underline hover:decoration-accentprimary hover:decoration-2">Jenny Leidig</Link></div>
                    <div className="mb-2">Lazy Sundays &copy; 2023</div>
                </span>
            </div>
        </footer>
    );
}