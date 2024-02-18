import Image from 'next/image';
import Link from 'next/link';
import ImageSourceBadge from './img-source-badge';

export default function ArticleHeader({
    hero, 
    heroAltText, 
    publishedAt,
    title, 
    tagline,
    readTime,
    authors,
    views,
}) {
    return (
        <>
            <header className="">
                <div className={"md:relative"}>
                    <div className={`${(hero) ? "xl:z-10 xl:absolute xl:bottom-0 text-left" : "text-center"} px-4 pb-4 text-5xl`}>
                        <h2 className={`${(hero) ? "xl:mr-20 xl:p-2 xl:bg-bgprimary/75 w-fit" : ""} font-header font-bold break-words pb-2 max-w-prose`}>
                            {title}
                        </h2>
                        <p className={`${(hero) ? "xl:ml-8 xl:mr-12 xl:p-2 xl:bg-bgprimary/75 w-fit" : ""} font-sans text-2xl text-texttertiary italic break-words max-w-prose`}>
                            {tagline}
                        </p>
                    </div>
                    <div className={`relative mt-4 ${(hero == null) ? "" : "aspect-21/9"}`}>
                        { (hero != null) &&
                            <Image fill={true} className="object-center object-cover" src={hero} alt={heroAltText}/>
                        }
                        {/* <ImageSourceBadge 
                            srcText='Sabotage Studio' 
                            srcUrl={"https://sabotagestudio.com/"}
                            className='absolute bg-bgprimary/75 px-1 top-2 right-2 font-sans text-texttertiary italic' 
                        /> */}
                    </div>
                </div>
                {/* article info */}
                {
                    <div className="flex flex-wrap justify-center justify-items-center gap-x-10 gap-y-2 text-center max-w-96 mx-auto mt-5 px-5 text-sm" aria-hidden>
                        <span className="italic">
                            {       
                                (new Date(publishedAt)).toLocaleDateString( "en-US",
                                    {month: 'short', day: 'numeric', year: 'numeric'})
                            }
                        </span>
                        <span className="">
                            Words by {(authors.data.length === 0) && "Anonymous"}
                            {
                                authors.data.map((author, i, all) => {
                                    return (
                                        <>
                                            <Link href={`/authors/${author.attributes.slug}`} className="text-accentprimary font-bold hover:underline hover:decoration-accentprimary hover:decoration-2">
                                                {author.attributes.name}
                                            </Link>{(all.length > 1 && i < all.length-1) ? ", ": ""}
                                        </>
                                    );
                                })
                            }
                        </span>
                        <span className="italic">
                            ~ {Math.round(readTime)} min. read
                        </span>
                        { views &&
                            <span className="italic">
                                <span className='text-accentsecondary font-bold'>{views}</span> views
                            </span>
                        }
                    </div>
                }
            </header>
            {<hr className="w-[75ch] max-w-[80%] my-5 border-textprimary/25 m-auto" aria-hidden />}
        </>
    );
}